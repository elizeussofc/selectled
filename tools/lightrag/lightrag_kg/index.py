"""CLI: kg-index — incremental/full file indexer."""
import argparse
import asyncio
import fnmatch
import hashlib
import json
import re
import sys
from pathlib import Path

from rich.console import Console
from rich.progress import Progress, SpinnerColumn, TextColumn, BarColumn, TaskProgressColumn

from . import config
from . import rag as rag_mod

console = Console(stderr=True)

_LANG_MAP = {
    ".py": "python", ".ts": "typescript", ".tsx": "tsx", ".js": "javascript",
    ".jsx": "jsx", ".md": "markdown", ".json": "json", ".yaml": "yaml",
    ".yml": "yaml", ".toml": "toml", ".sql": "sql", ".graphql": "graphql",
    ".rs": "rust", ".go": "go",
}


def slugify(text: str) -> str:
    text = text.strip().lower()
    text = re.sub(r"[/\\]", "-", text)
    text = re.sub(r"[^a-z0-9\s_\-.]", "", text)
    text = re.sub(r"\s+", "-", text)
    text = re.sub(r"-+", "-", text).strip("-_")
    return text[:180] if text else "unknown"


def file_sha1(path: Path) -> str:
    return hashlib.sha1(path.read_bytes()).hexdigest()[:16]


def doc_id(rel_path: str) -> str:
    return "doc-" + hashlib.sha1(rel_path.encode()).hexdigest()[:12]


def _matches_exclude(rel: str) -> bool:
    parts = set(Path(rel).parts)
    if parts & config.EXCLUDE_DIRS:
        return True
    for pat in config.EXCLUDE_GLOBS:
        # "prefix/**" — check path prefix (Path.match doesn't work in 3.11)
        if pat.endswith("/**"):
            prefix = pat[:-3]
            if rel == prefix or rel.startswith(prefix + "/"):
                return True
        elif fnmatch.fnmatch(rel, pat):
            return True
    return False


def collect_files(root: Path) -> list[Path]:
    seen: set[Path] = set()
    for pattern in config.INCLUDE_GLOBS:
        for p in root.glob(pattern):
            if p.is_file() and p not in seen:
                rel = p.relative_to(root).as_posix()
                if not _matches_exclude(rel):
                    seen.add(p)
    return sorted(seen)


def load_manifest() -> dict:
    if config.MANIFEST_PATH.exists():
        with open(config.MANIFEST_PATH) as f:
            return json.load(f)
    return {}


def save_manifest(manifest: dict) -> None:
    with open(config.MANIFEST_PATH, "w") as f:
        json.dump(manifest, f, indent=2)


def wrap_content(rel: str, content: str) -> str:
    lang = _LANG_MAP.get(Path(rel).suffix, "text")
    return f"FILE: {rel}\nLANG: {lang}\n---\n{content}"


async def run_index(full: bool = False, dry_run: bool = False) -> None:
    root = config.PROJECT_ROOT
    files = collect_files(root)
    manifest = {} if full else load_manifest()

    to_process: list[tuple[Path, str]] = []
    for p in files:
        if p.stat().st_size > config.MAX_FILE_BYTES:
            continue
        rel = p.relative_to(root).as_posix()
        sha = file_sha1(p)
        if manifest.get(rel) != sha:
            to_process.append((p, rel))

    console.print(f"[bold]Files found:[/] {len(files)}  "
                  f"[bold]To index:[/] {len(to_process)}")

    if dry_run or not to_process:
        if dry_run:
            for _, rel in to_process[:20]:
                console.print(f"  [dim]{rel}[/]")
            if len(to_process) > 20:
                console.print(f"  ... +{len(to_process) - 20} more")
        return

    BATCH = 20
    with Progress(
        SpinnerColumn(), TextColumn("[progress.description]{task.description}"),
        BarColumn(), TaskProgressColumn(), console=console,
    ) as progress:
        task = progress.add_task("Indexing...", total=len(to_process))

        for i in range(0, len(to_process), BATCH):
            batch = to_process[i:i + BATCH]
            texts, ids, paths, rels = [], [], [], []
            for p, rel in batch:
                try:
                    raw = p.read_text(encoding="utf-8", errors="ignore")
                except Exception:
                    continue
                texts.append(wrap_content(rel, raw))
                ids.append(doc_id(rel))
                paths.append(str(p))
                rels.append(rel)

            if texts:
                try:
                    await rag_mod.insert_batch(texts, ids=ids, file_paths=paths)
                    for rel, p in zip(rels, [b[0] for b in batch]):
                        manifest[rel] = file_sha1(p)
                    save_manifest(manifest)
                except Exception as e:
                    console.print(f"[red]Batch error:[/] {e}")

            progress.advance(task, len(batch))

    console.print("[green]Indexing complete.[/]")


def main() -> None:
    p = argparse.ArgumentParser(prog="kg-index", description="Index project files into LightRAG")
    p.add_argument("--full", action="store_true", help="Rebuild from scratch")
    p.add_argument("--incremental", action="store_true", help="Only new/modified files (default)")
    p.add_argument("--dry-run", action="store_true", help="Show plan without indexing")
    args = p.parse_args()

    asyncio.run(run_index(full=args.full, dry_run=args.dry_run))


if __name__ == "__main__":
    main()
