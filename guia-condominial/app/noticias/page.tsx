export const revalidate = 3600

import { client } from '@/sanity/lib/client'
import { postsQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import Link from 'next/link'
import Image from 'next/image'
import Topbar from '@/components/Topbar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WAFloat from '@/components/WAFloat'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Artigos, dicas e novidades sobre gestão condominial, inadimplência, assembleias e administração de condomínios em Brasília-DF.',
  alternates: { canonical: 'https://guia-condominial.vercel.app/noticias' },
  openGraph: {
    title: 'Blog | Guia Gestão Condominial',
    description: 'Artigos, dicas e novidades sobre gestão condominial, inadimplência e assembleias em Brasília-DF.',
    url: 'https://guia-condominial.vercel.app/noticias',
    images: [{ url: '/logo.png', width: 800, height: 400, alt: 'Guia Gestão Condominial' }],
  },
}

interface Post {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt?: string
  mainImage?: { asset: { _ref: string }; alt?: string }
  category?: { title: string }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
}

export default async function NoticiasPage() {
  let posts: Post[] = []
  try {
    posts = await client.fetch(postsQuery)
  } catch {
    // Sanity not configured — empty state
  }

  return (
    <>
      <Topbar />
      <Navbar />
      <main className="min-h-screen bg-cream pt-24">
        {/* ── Hero Banner ── */}
        <section className="relative overflow-hidden" style={{ background: '#021A29', minHeight: 320 }}>
          {/* Grade de pontos — canto esquerdo */}
          <div className="absolute top-6 left-6 opacity-20 pointer-events-none" aria-hidden>
            <svg width="120" height="120" viewBox="0 0 120 120">
              {Array.from({ length: 6 }).map((_, row) =>
                Array.from({ length: 6 }).map((_, col) => (
                  <circle key={`${row}-${col}`} cx={col * 20 + 10} cy={row * 20 + 10} r="2.5" fill="#B78828" />
                ))
              )}
            </svg>
          </div>

          {/* Linha diagonal decorativa — direita */}
          <div className="absolute right-0 top-0 h-full w-48 opacity-10 pointer-events-none" aria-hidden>
            <svg width="192" height="320" viewBox="0 0 192 320" preserveAspectRatio="none">
              {Array.from({ length: 8 }).map((_, i) => (
                <line key={i} x1={i * 28} y1="0" x2={i * 28 + 80} y2="320" stroke="#D0B273" strokeWidth="1.5"/>
              ))}
            </svg>
          </div>

          {/* Conteúdo central */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center pt-16 pb-14 px-6">
            {/* Logo */}
            <div className="mb-6">
              <Image
                src="/logo-nova.png"
                alt="Guia Gestão Condominial"
                width={160}
                height={52}
                className="object-contain"
                style={{ filter: 'brightness(0) invert(1)', opacity: 0.9 }}
                priority
              />
            </div>

            {/* Texto BLOG enorme */}
            <h1
              className="font-display font-black leading-none tracking-tight"
              style={{
                fontSize: 'clamp(80px, 18vw, 180px)',
                color: '#D0B273',
                textShadow: '0 4px 40px rgba(183,136,40,.25)',
                letterSpacing: '-0.02em',
              }}
            >
              BLOG
            </h1>

            {/* Linha dourada */}
            <div
              className="my-5 rounded-full"
              style={{ width: 64, height: 4, background: 'linear-gradient(90deg, #B78828, #D0B273)' }}
            />

            <p className="text-base max-w-md" style={{ color: 'rgba(255,255,255,.6)' }}>
              Artigos, dicas e novidades sobre gestão condominial, finanças e legislação.
            </p>
          </div>
        </section>

        {/* Posts grid */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          {posts.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-16 h-16 rounded-full bg-g100 flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7 text-g700" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
              </div>
              <h2 className="font-display text-2xl font-bold text-g800 mb-3">Nenhum artigo publicado ainda</h2>
              <p className="text-brand-mid mb-6">Acesse o painel para publicar seu primeiro conteúdo.</p>
              <Link href="/studio" className="inline-flex items-center gap-2 bg-g700 text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-g600 transition-colors">
                Acessar painel de administração
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article key={post._id} className="bg-white rounded-[14px] overflow-hidden border border-g100 hover:shadow-[0_12px_48px_rgba(10,31,21,.1)] hover:-translate-y-1 transition-all group">
                  <Link href={`/noticias/${post.slug.current}`}>
                    <div className="relative w-full aspect-[16/9] bg-g100 overflow-hidden">
                      {post.mainImage ? (
                        <Image
                          src={urlFor(post.mainImage).width(600).height(338).url()}
                          alt={post.mainImage.alt || post.title}
                          fill className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-g700 to-g900">
                          <svg className="w-12 h-12 text-gold/30" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
                        </div>
                      )}
                      {post.category && (
                        <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider bg-g700 text-gold-light px-2.5 py-1 rounded-full">
                          {post.category.title}
                        </span>
                      )}
                    </div>
                  </Link>

                  <div className="p-6">
                    <time className="text-xs text-brand-light">{formatDate(post.publishedAt)}</time>
                    <h2 className="font-display text-[17px] font-bold text-g800 leading-snug mt-2 mb-3 group-hover:text-g600 transition-colors line-clamp-2">
                      <Link href={`/noticias/${post.slug.current}`}>{post.title}</Link>
                    </h2>
                    {post.excerpt && <p className="text-sm text-brand-mid leading-relaxed line-clamp-3">{post.excerpt}</p>}
                    <Link href={`/noticias/${post.slug.current}`} className="inline-flex items-center gap-1.5 mt-5 text-sm font-semibold text-g700 hover:text-gold transition-colors">
                      Ler artigo
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
      <WAFloat />
    </>
  )
}
