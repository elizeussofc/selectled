"""Unified `rag` CLI — main entry point for end users."""
import argparse
import asyncio
import json
import sys
from pathlib import Path

from rich.console import Console
from rich.markdown import Markdown
from rich.table import Table

from . import rag as rag_mod, config

console = Console()

# Suppress LightRAG / nano-vectordb verbose INFO logging
import logging as _logging
for _lg in ("lightrag", "nano-vectordb", "google_genai", "httpx"):
    _logging.getLogger(_lg).setLevel(_logging.WARNING)


# ── search / ask / local / global / chunks ──────────────────────────────────

async def cmd_search(args) -> None:
    term = " ".join(args.term) if isinstance(args.term, list) else args.term
    try:
        ans = await rag_mod.query(term, mode=args.mode)
    except Exception as e:
        console.print(f"[red]Error:[/] {e}", highlight=False)
        sys.exit(1)
    if args.json:
        print(json.dumps({"mode": args.mode, "query": term, "answer": ans}))
    else:
        console.print(Markdown(ans))


# ── stats ────────────────────────────────────────────────────────────────────

async def cmd_stats(args) -> None:
    info = await rag_mod.stats()
    if args.json:
        print(json.dumps(info, indent=2))
    else:
        t = Table(title="LightRAG Stats")
        t.add_column("Metric", style="bold")
        t.add_column("Value", justify="right")
        for k, v in info.items():
            t.add_row(k, str(v))
        console.print(t)


# ── top ──────────────────────────────────────────────────────────────────────

async def cmd_top(args) -> None:
    import networkx as nx

    graph_file = config.STORAGE_DIR / "graph_chunk_entity_relation.graphml"
    if not graph_file.exists():
        console.print("[yellow]No graph found. Run: rag index[/]")
        return

    g = nx.read_graphml(str(graph_file))
    n = getattr(args, "n", 20)
    top = sorted(g.degree(), key=lambda x: x[1], reverse=True)[:n]

    if args.json:
        print(json.dumps([{"entity": e, "degree": d} for e, d in top], indent=2))
    else:
        t = Table(title=f"Top {n} Entities")
        t.add_column("Entity", style="bold cyan")
        t.add_column("Connections", justify="right")
        for entity, degree in top:
            t.add_row(str(entity), str(degree))
        console.print(t)


# ── find ─────────────────────────────────────────────────────────────────────

async def cmd_find(args) -> None:
    import networkx as nx

    graph_file = config.STORAGE_DIR / "graph_chunk_entity_relation.graphml"
    if not graph_file.exists():
        console.print("[yellow]No graph found. Run: rag index[/]")
        return

    g = nx.read_graphml(str(graph_file))
    term = " ".join(args.term) if isinstance(args.term, list) else args.term
    matches = [n for n in g.nodes() if term.lower() in str(n).lower()]

    if args.json:
        print(json.dumps(matches, indent=2))
    else:
        if not matches:
            console.print(f"[yellow]No entities matching '{term}'[/]")
        else:
            t = Table(title=f"Entities matching '{term}'")
            t.add_column("Entity", style="bold cyan")
            t.add_column("Degree", justify="right")
            for m in sorted(matches, key=lambda n: g.degree(n), reverse=True)[:30]:
                t.add_row(str(m), str(g.degree(m)))
            console.print(t)


# ── show ─────────────────────────────────────────────────────────────────────

async def cmd_show(args) -> None:
    import networkx as nx

    graph_file = config.STORAGE_DIR / "graph_chunk_entity_relation.graphml"
    if not graph_file.exists():
        console.print("[yellow]No graph found. Run: rag index[/]")
        return

    g = nx.read_graphml(str(graph_file))
    term = " ".join(args.term) if isinstance(args.term, list) else args.term

    node = None
    for n in g.nodes():
        if str(n).lower() == term.lower():
            node = n
            break
    if node is None:
        for n in g.nodes():
            if term.lower() in str(n).lower():
                node = n
                break

    if node is None:
        console.print(f"[yellow]Entity '{term}' not found. Try: rag find \"{term}\"[/]")
        return

    data = g.nodes[node]
    neighbors = [(str(nb), g.degree(nb)) for nb in g.neighbors(node)]
    neighbors.sort(key=lambda x: x[1], reverse=True)

    if args.json:
        print(json.dumps({"entity": node, "data": dict(data), "neighbors": neighbors}, indent=2, default=str))
        return

    console.print(f"\n[bold cyan]{node}[/]  [dim]{data.get('entity_type', '')}[/]")
    if data.get("description"):
        console.print(f"\n{data['description']}\n")

    if neighbors:
        t = Table(title="Neighbors")
        t.add_column("Entity", style="cyan")
        t.add_column("Degree", justify="right")
        for nb, deg in neighbors[:20]:
            t.add_row(nb, str(deg))
        console.print(t)


# ── insert ───────────────────────────────────────────────────────────────────

async def cmd_insert(args) -> None:
    import hashlib

    text = " ".join(args.text) if isinstance(args.text, list) else args.text
    source = args.source or "cli-insert"
    doc_id = "doc-" + hashlib.sha1(text.encode()).hexdigest()[:12]
    await rag_mod.insert_batch(
        [f"SOURCE: {source}\n---\n{text}"],
        ids=[doc_id],
        file_paths=[source],
    )
    if args.json:
        print(json.dumps({"inserted": doc_id, "source": source}))
    else:
        console.print(f"[green]Inserted[/] [bold]{doc_id}[/] (source: {source})")


# ── index ────────────────────────────────────────────────────────────────────

def cmd_index(args) -> None:
    from .index import run_index

    asyncio.run(run_index(full=args.full, dry_run=getattr(args, "dry_run", False)))


# ── export ───────────────────────────────────────────────────────────────────

def cmd_export(args) -> None:
    from .to_obsidian import export

    asyncio.run(export(clean=getattr(args, "clean", False)))


# ── shell (REPL) ─────────────────────────────────────────────────────────────

async def cmd_shell(args) -> None:
    console.print("[bold]LightRAG shell[/] — type your query, or:")
    console.print("  [dim]/local X  /global X  /chunks X  /stats  /top  /find X  /show X  /exit[/]\n")

    try:
        from prompt_toolkit import PromptSession
        session: object = PromptSession()
        get_input = lambda: session.prompt("rag> ")  # noqa: E731
    except ImportError:
        get_input = lambda: input("rag> ")  # noqa: E731

    while True:
        try:
            line = get_input().strip()
        except (EOFError, KeyboardInterrupt):
            break

        if not line:
            continue
        if line == "/exit":
            break
        elif line == "/stats":
            await cmd_stats(args)
        elif line == "/top":
            await cmd_top(args)
        elif line.startswith("/local "):
            ans = await rag_mod.query(line[7:], mode="local")
            console.print(Markdown(ans))
        elif line.startswith("/global "):
            ans = await rag_mod.query(line[8:], mode="global")
            console.print(Markdown(ans))
        elif line.startswith("/chunks "):
            ans = await rag_mod.query(line[8:], mode="naive")
            console.print(Markdown(ans))
        elif line.startswith("/find "):
            args.term = [line[6:]]
            await cmd_find(args)
        elif line.startswith("/show "):
            args.term = [line[6:]]
            await cmd_show(args)
        else:
            ans = await rag_mod.query(line, mode="hybrid")
            console.print(Markdown(ans))
        console.print()


# ── mcp-check ────────────────────────────────────────────────────────────────

async def cmd_mcp_check(args) -> None:
    import importlib.util

    root = config.PROJECT_ROOT
    mcp_file = root / ".mcp.json"

    ok = True
    checks: list[tuple[str, bool, str]] = []

    # 1. .mcp.json exists
    if mcp_file.exists():
        checks.append((".mcp.json exists", True, ""))
        with open(mcp_file) as f:
            mcp_data = json.load(f)
        servers = mcp_data.get("mcpServers", {})

        # 2. lightrag entry present
        if "lightrag" in servers:
            checks.append(("lightrag entry in .mcp.json", True, ""))
            entry = servers["lightrag"]
            proj_arg = ""
            for i, a in enumerate(entry.get("args", [])):
                if a == "--project" and i + 1 < len(entry["args"]):
                    proj_arg = entry["args"][i + 1]
                    break
            if proj_arg and Path(proj_arg).exists():
                checks.append(("--project path exists", True, proj_arg))
            else:
                checks.append(("--project path exists", False, f"Not found: {proj_arg}"))
                ok = False
        else:
            checks.append(("lightrag entry in .mcp.json", False, "Run setup wizard again"))
            ok = False
    else:
        checks.append((".mcp.json exists", False, str(mcp_file)))
        ok = False

    # 3. importable
    spec = importlib.util.find_spec("lightrag_kg.server")
    if spec is not None:
        checks.append(("lightrag_kg.server importable", True, ""))
    else:
        checks.append(("lightrag_kg.server importable", False, "Activate venv first"))
        ok = False

    if args.json:
        print(json.dumps([{"check": c, "ok": o, "detail": d} for c, o, d in checks], indent=2))
        return

    for check, passed, detail in checks:
        icon = "[green]OK[/]" if passed else "[red]FAIL[/]"
        line = f"  {icon} {check}"
        if detail:
            line += f"  [dim]{detail}[/]"
        console.print(line)

    console.print()
    if ok:
        console.print("[bold green]All checks passed.[/] Restart Claude Code to connect.")
    else:
        console.print("[bold red]Some checks failed.[/] See details above.")


# ── main ─────────────────────────────────────────────────────────────────────

def main() -> None:
    p = argparse.ArgumentParser(
        prog="rag",
        description="LightRAG knowledge-graph CLI",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  rag search "how does auth work"
  rag ask "explain the project"
  rag stats
  rag top 20
  rag find "User"
  rag show "UserService"
  rag shell
  rag index --incremental
  rag export --clean
  rag insert "decision: use Zod" --source chat-2026-04-28
  rag mcp-check
""",
    )
    p.add_argument("--json", action="store_true", help="Machine-readable output")
    sub = p.add_subparsers(dest="cmd", required=True)

    # search / ask / chunks / local / global
    for name, mode in [
        ("search", "hybrid"),
        ("ask", "hybrid"),
        ("chunks", "naive"),
        ("local", "local"),
        ("global", "global"),
    ]:
        sp = sub.add_parser(name, help=f"Query in {mode} mode")
        sp.add_argument("term", nargs="+", help="Query text")
        sp.set_defaults(func=lambda a, m=mode: asyncio.run(cmd_search(a)), mode=mode, async_func=cmd_search)

    # stats
    sp_stats = sub.add_parser("stats", help="Show entity/relation/doc counts")
    sp_stats.set_defaults(func=lambda a: asyncio.run(cmd_stats(a)), async_func=cmd_stats)

    # top
    sp_top = sub.add_parser("top", help="Top N entities by connections")
    sp_top.add_argument("n", type=int, nargs="?", default=20)
    sp_top.set_defaults(func=lambda a: asyncio.run(cmd_top(a)), async_func=cmd_top)

    # find
    sp_find = sub.add_parser("find", help="Find entity by name (substring)")
    sp_find.add_argument("term", nargs="+")
    sp_find.set_defaults(func=lambda a: asyncio.run(cmd_find(a)), async_func=cmd_find)

    # show
    sp_show = sub.add_parser("show", help="Show entity details + neighbors")
    sp_show.add_argument("term", nargs="+")
    sp_show.set_defaults(func=lambda a: asyncio.run(cmd_show(a)), async_func=cmd_show)

    # insert
    sp_insert = sub.add_parser("insert", help="Insert ad-hoc text into graph")
    sp_insert.add_argument("text", nargs="+")
    sp_insert.add_argument("--source", default="cli-insert", help="Source label")
    sp_insert.set_defaults(func=lambda a: asyncio.run(cmd_insert(a)), async_func=cmd_insert)

    # index
    sp_index = sub.add_parser("index", help="Index project files")
    sp_index.add_argument("--full", action="store_true", help="Rebuild from scratch")
    sp_index.add_argument("--incremental", action="store_true", help="Only new/modified (default)")
    sp_index.add_argument("--dry-run", action="store_true", help="Show plan without indexing")
    sp_index.set_defaults(func=cmd_index)

    # export
    sp_export = sub.add_parser("export", help="Export to Obsidian vault")
    sp_export.add_argument("--clean", action="store_true", help="Rebuild vault from scratch")
    sp_export.set_defaults(func=cmd_export)

    # shell
    sp_shell = sub.add_parser("shell", help="Interactive REPL")
    sp_shell.set_defaults(func=lambda a: asyncio.run(cmd_shell(a)), async_func=cmd_shell)

    # mcp-check
    sp_mcp = sub.add_parser("mcp-check", help="Validate .mcp.json + MCP server")
    sp_mcp.set_defaults(func=lambda a: asyncio.run(cmd_mcp_check(a)), async_func=cmd_mcp_check)

    args = p.parse_args()

    # Normalize list terms to string
    if hasattr(args, "term") and isinstance(args.term, list):
        args.term = " ".join(args.term)
    if hasattr(args, "text") and isinstance(args.text, list):
        args.text = " ".join(args.text)

    args.func(args)


if __name__ == "__main__":
    main()
