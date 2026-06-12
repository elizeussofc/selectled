"""Smoke tests — run with: uv run --project tools/lightrag pytest tests/"""
import asyncio
import pytest


def test_config_imports():
    from lightrag_kg import config
    assert config.STORAGE_DIR.name == "rag_storage"
    assert config.PROJECT_ROOT.name == "2026"


def test_llm_module_loads():
    from lightrag_kg import llm
    assert callable(llm.llm_model_func)
    assert llm.gemini_embedding_func.embedding_dim == 3072


def test_slugify():
    from lightrag_kg.index import slugify
    assert slugify("Hello/World") == "hello-world"
    assert slugify("  spaces  ") == "spaces"
    assert slugify("a" * 200)[:180] == "a" * 180


def test_doc_id_deterministic():
    from lightrag_kg.index import doc_id
    assert doc_id("src/main.py") == doc_id("src/main.py")
    assert doc_id("src/main.py") != doc_id("src/other.py")


@pytest.mark.skipif(
    not __import__("os").environ.get("GOOGLE_API_KEY"),
    reason="GOOGLE_API_KEY not set",
)
def test_llm_probe():
    from lightrag_kg.llm import llm_model_func
    result = asyncio.run(llm_model_func("reply OK"))
    assert isinstance(result, str) and len(result) > 0
