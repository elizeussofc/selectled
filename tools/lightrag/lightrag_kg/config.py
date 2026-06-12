import os
from pathlib import Path
from dotenv import load_dotenv

# Project root is 3 levels up: lightrag_kg/ -> lightrag/ -> tools/ -> root
_root = Path(__file__).resolve().parents[3]

for _f in [".env.local", ".env"]:
    if (_root / _f).exists():
        load_dotenv(_root / _f, override=True)
        break

GOOGLE_API_KEY: str = os.environ.get("GOOGLE_API_KEY", "")

LLM_MODEL = "gemini-2.5-flash"
EMBED_MODEL = "gemini-embedding-001"
EMBED_DIM = 3072

TOOLS_DIR = Path(__file__).resolve().parents[1]
STORAGE_DIR = TOOLS_DIR / "rag_storage"
STORAGE_DIR.mkdir(parents=True, exist_ok=True)

PROJECT_ROOT = _root
VAULT_PATH = _root / "docs" / "knowledge-graph"

MANIFEST_PATH = TOOLS_DIR / ".index_manifest.json"

# Include globs relative to PROJECT_ROOT
INCLUDE_GLOBS = [
    "**/*.md",
    "**/*.py",
    "**/*.ts",
    "**/*.tsx",
    "**/*.js",
    "**/*.jsx",
    "**/*.json",
    "**/*.yaml",
    "**/*.yml",
    "**/*.toml",
    "**/*.sql",
    "**/*.graphql",
]

EXCLUDE_DIRS = {
    "node_modules", ".next", "dist", "build", ".git", "__pycache__",
    ".venv", "target", "rag_storage", ".index_manifest.json",
    "knowledge-graph", "_generated", "_build",
}

EXCLUDE_GLOBS = [
    "tools/lightrag/**",
    "docs/knowledge-graph/**",
    "**/*.lock",
    "**/*.tsbuildinfo",
    "**/*.min.js",
    "**/*.min.css",
]

MAX_FILE_BYTES = 200_000
