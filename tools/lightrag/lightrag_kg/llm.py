import asyncio
import numpy as np
from tenacity import retry, wait_exponential, stop_after_attempt, retry_if_exception_type
from lightrag.utils import EmbeddingFunc
from . import config

_client = None

def _get_client():
    global _client
    if _client is None:
        if not config.GOOGLE_API_KEY:
            raise RuntimeError("GOOGLE_API_KEY not set — check .env.local")
        from google import genai
        _client = genai.Client(api_key=config.GOOGLE_API_KEY)
    return _client

_LLM_FALLBACKS = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-2.5-flash-lite", "gemini-2.0-flash-lite"]
_EMBED_FALLBACKS = ["gemini-embedding-001", "text-embedding-004"]

# Errors that trigger model fallback (not just retry on same model)
_FALLBACK_TRIGGERS = ("404", "not found", "not supported", "unavailable model", "resource_exhausted", "quota")

_RETRYABLE = (Exception,)


@retry(
    wait=wait_exponential(multiplier=2, min=10, max=90),
    stop=stop_after_attempt(6),
    retry=retry_if_exception_type(_RETRYABLE),
    reraise=True,
)
async def llm_model_func(
    prompt: str,
    system_prompt: str | None = None,
    history_messages: list | None = None,
    **kwargs,
) -> str:
    from google.genai import types

    client = _get_client()
    history_messages = history_messages or []

    contents = []
    for msg in history_messages:
        role = msg.get("role", "user")
        if role == "assistant":
            role = "model"
        contents.append(
            types.Content(role=role, parts=[types.Part(text=msg["content"])])
        )
    contents.append(types.Content(role="user", parts=[types.Part(text=prompt)]))

    cfg_kwargs = dict(
        max_output_tokens=kwargs.get("max_tokens", 8192),
        temperature=kwargs.get("temperature", 0.0),
    )
    if system_prompt:
        cfg_kwargs["system_instruction"] = system_prompt

    from google.genai import types as gtypes
    cfg = gtypes.GenerateContentConfig(**cfg_kwargs)

    last_err = None
    for model in _LLM_FALLBACKS:
        try:
            resp = await asyncio.to_thread(
                client.models.generate_content,
                model=model,
                contents=contents,
                config=cfg,
            )
            return resp.text or ""
        except Exception as e:
            msg_lower = str(e).lower()
            if any(x in msg_lower for x in _FALLBACK_TRIGGERS):
                last_err = e
                continue
            raise
    raise RuntimeError(f"All Gemini LLM models exhausted. Last error: {last_err}")


@retry(
    wait=wait_exponential(multiplier=2, min=10, max=90),
    stop=stop_after_attempt(6),
    retry=retry_if_exception_type(_RETRYABLE),
    reraise=True,
)
async def _embed_batch(texts: list[str]) -> np.ndarray:
    client = _get_client()
    last_err = None
    for model in _EMBED_FALLBACKS:
        try:
            resp = await asyncio.to_thread(
                client.models.embed_content,
                model=model,
                contents=texts,
            )
            return np.array([e.values for e in resp.embeddings], dtype=np.float32)
        except Exception as e:
            msg_lower = str(e).lower()
            if any(x in msg_lower for x in _FALLBACK_TRIGGERS):
                last_err = e
                continue
            raise
    raise RuntimeError(f"All Gemini embedding models exhausted. Last error: {last_err}")


gemini_embedding_func = EmbeddingFunc(
    embedding_dim=config.EMBED_DIM,
    max_token_size=8192,
    func=_embed_batch,
)
