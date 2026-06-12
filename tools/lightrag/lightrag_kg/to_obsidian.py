"""CLI: kg-to-obsidian — export entities/relations to Obsidian markdown."""
import argparse
import asyncio
import json
import re
import shutil
from pathlib import Path

import networkx as nx
from rich.console import Console

from . import config

console = Console()


def slugify(text: str) -> str:
    text = text.strip().lower()
    text = re.sub(r"[/\\]", "-", text)
    text = re.sub(r"[^a-z0-9\s_\-.]", "", text)
    text = re.sub(r"\s+", "-", text)
    text = re.sub(r"-+", "-", text).strip("-_")
    return text[:180] if text else "unknown"


def _safe_name(raw: str) -> str:
    return re.sub(r'[<>:"/\\|?*]', "_", raw.strip())


def _load_graph() -> nx.Graph:
    graph_file = config.STORAGE_DIR / "graph_chunk_entity_relation.graphml"
    if not graph_file.exists():
        raise FileNotFoundError(f"Graph not found: {graph_file}. Run kg-index first.")
    return nx.read_graphml(str(graph_file))


def _load_entities() -> dict:
    f = config.STORAGE_DIR / "kv_store_full_docs.json"
    if f.exists():
        with open(f) as fh:
            return json.load(fh)
    return {}


async def export(clean: bool = False) -> None:
    vault = config.VAULT_PATH
    entities_dir = vault / "entities"
    communities_dir = vault / "communities"

    if clean and vault.exists():
        shutil.rmtree(str(vault))
        console.print("[yellow]Cleaned vault.[/]")

    vault.mkdir(parents=True, exist_ok=True)
    entities_dir.mkdir(parents=True, exist_ok=True)
    communities_dir.mkdir(parents=True, exist_ok=True)

    try:
        g = _load_graph()
    except FileNotFoundError as e:
        console.print(f"[red]{e}[/]")
        return

    console.print(f"Graph: {g.number_of_nodes()} entities, {g.number_of_edges()} relations")

    # Community detection
    try:
        communities = list(nx.community.louvain_communities(g.to_undirected(), seed=42))
    except Exception:
        communities = []

    entity_community: dict[str, int] = {}
    for i, community in enumerate(communities):
        for node in community:
            entity_community[node] = i

    # Write entity notes
    written = 0
    for node, data in g.nodes(data=True):
        name = _safe_name(str(node))
        slug = slugify(str(node))
        entity_type = data.get("entity_type", "UNKNOWN")
        description = data.get("description", "")
        source_ids = data.get("source_id", "")

        sources: list[str] = []
        if source_ids:
            for s in str(source_ids).split("<SEP>"):
                s = s.strip()
                if s:
                    sources.append(s)

        neighbors = [_safe_name(str(n)) for n in g.neighbors(node)]
        community_id = entity_community.get(node, -1)
        degree = g.degree(node)

        lines = [
            f"---",
            f"entity_type: {entity_type}",
            f"community: {community_id}",
            f"degree: {degree}",
            f"---",
            f"",
            f"# {name}",
            f"",
        ]
        if description:
            lines += [f"{description}", ""]

        if sources:
            lines += ["## Appears in", ""]
            for s in sources[:10]:
                lines.append(f"- `{s}`")
            lines.append("")

        if neighbors:
            lines += ["## Related", ""]
            for nb in sorted(neighbors)[:30]:
                lines.append(f"- [[{nb}]]")
            lines.append("")

        note_path = entities_dir / f"{slug}.md"
        note_path.write_text("\n".join(lines), encoding="utf-8")
        written += 1

    console.print(f"[green]Wrote {written} entity notes -> {entities_dir}[/]")

    # Write community notes
    for i, community in enumerate(communities):
        members = sorted([_safe_name(str(n)) for n in community])
        lines = [
            f"# Community {i}",
            "",
            f"**Members:** {len(members)}",
            "",
            "## Entities",
            "",
        ]
        for m in members[:50]:
            lines.append(f"- [[{m}]]")
        if len(members) > 50:
            lines.append(f"- ... +{len(members) - 50} more")
        note_path = communities_dir / f"community-{i:03d}.md"
        note_path.write_text("\n".join(lines), encoding="utf-8")

    console.print(f"[green]Wrote {len(communities)} community notes -> {communities_dir}[/]")

    # Write INDEX.md
    top_entities = sorted(g.nodes(data=True), key=lambda x: g.degree(x[0]), reverse=True)[:20]
    index_lines = [
        "# Knowledge Graph Index",
        "",
        f"**Entities:** {g.number_of_nodes()}  ",
        f"**Relations:** {g.number_of_edges()}  ",
        f"**Communities:** {len(communities)}",
        "",
        "## Top Entities (by connections)",
        "",
    ]
    for node, data in top_entities:
        name = _safe_name(str(node))
        slug = slugify(str(node))
        etype = data.get("entity_type", "")
        deg = g.degree(node)
        index_lines.append(f"- [[entities/{slug}|{name}]] `{etype}` ({deg} links)")

    index_lines += ["", "## Communities", ""]
    for i, community in enumerate(communities[:10]):
        index_lines.append(f"- [[communities/community-{i:03d}|Community {i}]] — {len(community)} entities")

    (vault / "INDEX.md").write_text("\n".join(index_lines), encoding="utf-8")
    console.print(f"[green]INDEX.md written -> {vault / 'INDEX.md'}[/]")


def main() -> None:
    p = argparse.ArgumentParser(prog="kg-to-obsidian", description="Export knowledge graph to Obsidian vault")
    p.add_argument("--clean", action="store_true", help="Remove vault and rebuild from scratch")
    args = p.parse_args()
    asyncio.run(export(clean=args.clean))


if __name__ == "__main__":
    main()
