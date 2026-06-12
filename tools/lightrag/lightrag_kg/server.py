"""MCP server (stdio) — exposes kg_query, kg_insert_text, kg_stats."""
import asyncio
import json
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import types as mcp_types

from . import rag as rag_mod

app = Server("lightrag-kg")


@app.list_tools()
async def list_tools() -> list[mcp_types.Tool]:
    return [
        mcp_types.Tool(
            name="kg_query",
            description=(
                "Query the project knowledge graph. "
                "mode: hybrid (default) | local | global | naive"
            ),
            inputSchema={
                "type": "object",
                "properties": {
                    "query": {"type": "string", "description": "Your question or search term"},
                    "mode": {
                        "type": "string",
                        "enum": ["hybrid", "local", "global", "naive"],
                        "default": "hybrid",
                    },
                },
                "required": ["query"],
            },
        ),
        mcp_types.Tool(
            name="kg_insert_text",
            description="Insert an ad-hoc text snippet into the knowledge graph.",
            inputSchema={
                "type": "object",
                "properties": {
                    "text": {"type": "string", "description": "Text content to insert"},
                    "source": {"type": "string", "description": "Label for the source (e.g. 'chat-2026-04-28')"},
                },
                "required": ["text"],
            },
        ),
        mcp_types.Tool(
            name="kg_stats",
            description="Return entity/relation/doc counts from the knowledge graph.",
            inputSchema={"type": "object", "properties": {}},
        ),
    ]


@app.call_tool()
async def call_tool(name: str, arguments: dict) -> list[mcp_types.TextContent]:
    if name == "kg_query":
        mode = arguments.get("mode", "hybrid")
        result = await rag_mod.query(arguments["query"], mode=mode)
        return [mcp_types.TextContent(type="text", text=result)]

    if name == "kg_insert_text":
        import hashlib
        text = arguments["text"]
        source = arguments.get("source", "manual-insert")
        doc_id = "doc-" + hashlib.sha1(text.encode()).hexdigest()[:12]
        await rag_mod.insert_batch(
            [f"SOURCE: {source}\n---\n{text}"],
            ids=[doc_id],
            file_paths=[source],
        )
        return [mcp_types.TextContent(type="text", text=f"Inserted as {doc_id}")]

    if name == "kg_stats":
        info = await rag_mod.stats()
        return [mcp_types.TextContent(type="text", text=json.dumps(info, indent=2))]

    return [mcp_types.TextContent(type="text", text=f"Unknown tool: {name}")]


def main() -> None:
    asyncio.run(_serve())


async def _serve() -> None:
    async with stdio_server() as (read_stream, write_stream):
        await app.run(read_stream, write_stream, app.create_initialization_options())


if __name__ == "__main__":
    main()
