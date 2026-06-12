"""Singleton LightRAG instance with lazy init."""
import asyncio
import json
from pathlib import Path
from lightrag import LightRAG, QueryParam
from . import config
from .llm import llm_model_func, gemini_embedding_func

_rag: LightRAG | None = None
_lock = asyncio.Lock()


async def get_rag() -> LightRAG:
    global _rag
    if _rag is not None:
        return _rag
    async with _lock:
        if _rag is not None:
            return _rag
        _rag = LightRAG(
            working_dir=str(config.STORAGE_DIR),
            llm_model_func=llm_model_func,
            embedding_func=gemini_embedding_func,
            llm_model_max_async=2,   # free tier: 5 req/min; upgrade to 8 on paid tier
            max_parallel_insert=2,
            embedding_batch_num=16,
            chunk_token_size=1200,
            chunk_overlap_token_size=100,
        )
        await _rag.initialize_storages()
    return _rag


async def query(text: str, mode: str = "hybrid") -> str:
    rag = await get_rag()
    return await rag.aquery(text, param=QueryParam(mode=mode))


async def insert_batch(
    texts: list[str],
    ids: list[str],
    file_paths: list[str],
) -> None:
    rag = await get_rag()
    await rag.ainsert(texts, ids=ids, file_paths=file_paths)


async def stats() -> dict:
    storage = config.STORAGE_DIR

    result: dict = {}

    graph_file = storage / "graph_chunk_entity_relation.graphml"
    if graph_file.exists():
        import networkx as nx
        g = nx.read_graphml(str(graph_file))
        result["entities"] = g.number_of_nodes()
        result["relations"] = g.number_of_edges()
    else:
        result["entities"] = 0
        result["relations"] = 0

    doc_status = storage / "kv_store_doc_status.json"
    if doc_status.exists():
        with open(doc_status) as f:
            docs = json.load(f)
        result["docs"] = len(docs)
        result["processed"] = sum(
            1 for v in docs.values()
            if isinstance(v, dict) and v.get("status") == "processed"
        )
    else:
        result["docs"] = 0
        result["processed"] = 0

    return result
