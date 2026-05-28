'use client'

import { useState, useEffect } from 'react'

interface Comment {
  id: string
  name: string
  text: string
  date: string
  pending?: boolean
}

export default function PostInteractions({ slug, title }: { slug: string; title: string }) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(12)
  const [copied, setCopied] = useState(false)
  const [comments, setComments] = useState<Comment[]>([])
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const likedKey = `guia_liked_${slug}`
    const countKey = `guia_likeCount_${slug}`
    const commentsKey = `guia_comments_${slug}`
    const isLiked = localStorage.getItem(likedKey) === '1'
    const count = parseInt(localStorage.getItem(countKey) || '12')
    setLiked(isLiked)
    setLikeCount(count)
    const stored = localStorage.getItem(commentsKey)
    if (stored) {
      try { setComments(JSON.parse(stored)) } catch {}
    }
  }, [slug])

  function toggleLike() {
    const likedKey = `guia_liked_${slug}`
    const countKey = `guia_likeCount_${slug}`
    const newLiked = !liked
    const newCount = newLiked ? likeCount + 1 : Math.max(0, likeCount - 1)
    setLiked(newLiked)
    setLikeCount(newCount)
    localStorage.setItem(likedKey, newLiked ? '1' : '0')
    localStorage.setItem(countKey, String(newCount))
  }

  function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  function shareOn(platform: 'whatsapp' | 'facebook' | 'twitter') {
    const url = encodeURIComponent(window.location.href)
    const txt = encodeURIComponent(title)
    const links = {
      whatsapp: `https://wa.me/?text=${txt}%20${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?text=${txt}&url=${url}`,
    }
    window.open(links[platform], '_blank', 'noopener')
  }

  function submitComment(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !text.trim()) return
    const commentsKey = `guia_comments_${slug}`
    const newComment: Comment = {
      id: Date.now().toString(),
      name: name.trim(),
      text: text.trim(),
      date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }),
    }
    const updated = [...comments, newComment]
    setComments(updated)
    localStorage.setItem(commentsKey, JSON.stringify(updated))
    setName('')
    setText('')
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  if (!mounted) return null

  return (
    <div className="mt-14">
      {/* ── Curtir + Compartilhar ── */}
      <div
        className="flex flex-wrap items-center gap-3 py-6 px-6 rounded-2xl mb-12"
        style={{ background: '#F6F0E4', border: '1px solid #E6D5B3' }}
      >
        {/* Curtir */}
        <button
          onClick={toggleLike}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200"
          style={liked
            ? { background: '#021A29', color: '#D0B273', border: '1.5px solid #021A29' }
            : { background: 'transparent', color: '#1A303D', border: '1.5px solid #B78828' }
          }
        >
          <svg className="w-4 h-4" fill={liked ? '#D0B273' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          {liked ? 'Curtido' : 'Curtir'}
          <span
            className="inline-flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-bold"
            style={liked
              ? { background: '#D0B273', color: '#021A29' }
              : { background: '#E6D5B3', color: '#1A303D' }
            }
          >
            {likeCount}
          </span>
        </button>

        {/* Divisor */}
        <div className="hidden sm:block w-px h-6 mx-1" style={{ background: '#E6D5B3' }} />

        {/* Compartilhar label */}
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#5A7080' }}>Compartilhar:</span>

        {/* WhatsApp */}
        <button
          onClick={() => shareOn('whatsapp')}
          title="Compartilhar no WhatsApp"
          className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-85"
          style={{ background: '#25D366' }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </button>

        {/* Facebook */}
        <button
          onClick={() => shareOn('facebook')}
          title="Compartilhar no Facebook"
          className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-85"
          style={{ background: '#1877F2' }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </button>

        {/* X / Twitter */}
        <button
          onClick={() => shareOn('twitter')}
          title="Compartilhar no X (Twitter)"
          className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-85"
          style={{ background: '#000' }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
          </svg>
        </button>

        {/* Copiar link */}
        <button
          onClick={copyLink}
          title="Copiar link"
          className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
          style={copied
            ? { background: '#021A29', color: '#D0B273', border: '1.5px solid #021A29' }
            : { background: 'transparent', color: '#1A303D', border: '1.5px solid #B78828' }
          }
        >
          {copied ? (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          )}
        </button>

        {copied && (
          <span className="text-xs font-semibold" style={{ color: '#B78828' }}>Link copiado!</span>
        )}
      </div>

      {/* ── Comentários ── */}
      <div>
        <div className="flex items-center gap-3 mb-8">
          <h3 className="font-display text-2xl font-bold" style={{ color: '#021A29' }}>
            Comentários
          </h3>
          {comments.length > 0 && (
            <span
              className="inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold"
              style={{ background: '#021A29', color: '#D0B273' }}
            >
              {comments.length}
            </span>
          )}
        </div>

        {/* Lista de comentários */}
        {comments.length === 0 ? (
          <p className="text-sm mb-8" style={{ color: '#5A7080' }}>
            Seja o primeiro a comentar neste artigo.
          </p>
        ) : (
          <div className="space-y-5 mb-10">
            {comments.map((c) => (
              <div key={c.id} className="flex gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                  style={{ background: '#021A29', color: '#D0B273' }}
                >
                  {c.name[0].toUpperCase()}
                </div>
                <div className="flex-1">
                  <div
                    className="rounded-2xl rounded-tl-none px-5 py-4"
                    style={{ background: '#F6F0E4', border: '1px solid #E6D5B3' }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-bold" style={{ color: '#021A29' }}>{c.name}</span>
                      <span className="text-xs" style={{ color: '#5A7080' }}>{c.date}</span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: '#304350' }}>{c.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Formulário */}
        <div
          className="rounded-2xl p-6"
          style={{ background: '#F6F0E4', border: '1px solid #E6D5B3' }}
        >
          <h4 className="font-display font-bold text-base mb-5" style={{ color: '#021A29' }}>
            Deixe seu comentário
          </h4>
          <form onSubmit={submitComment} className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome *"
              required
              className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors"
              style={{ background: '#fff', border: '1.5px solid #E6D5B3', color: '#021A29' }}
              onFocus={(e) => (e.target.style.borderColor = '#B78828')}
              onBlur={(e) => (e.target.style.borderColor = '#E6D5B3')}
            />
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Escreva seu comentário... *"
              required
              rows={4}
              className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors resize-none"
              style={{ background: '#fff', border: '1.5px solid #E6D5B3', color: '#021A29' }}
              onFocus={(e) => (e.target.style.borderColor = '#B78828')}
              onBlur={(e) => (e.target.style.borderColor = '#E6D5B3')}
            />
            <div className="flex items-center gap-4 flex-wrap">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                style={{ background: '#021A29', color: '#D0B273' }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Publicar comentário
              </button>
              {submitted && (
                <span className="text-sm font-semibold" style={{ color: '#B78828' }}>
                  ✓ Comentário publicado!
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
