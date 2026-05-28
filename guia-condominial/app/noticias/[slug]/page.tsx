export const revalidate = 3600

import { client } from '@/sanity/lib/client'
import { postBySlugQuery, postSlugsQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Topbar from '@/components/Topbar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WAFloat from '@/components/WAFloat'
import PostInteractions from '@/components/PostInteractions'
import type { Metadata } from 'next'

interface Post {
  title: string
  publishedAt: string
  excerpt?: string
  mainImage?: { asset: { _ref: string }; alt?: string }
  body: unknown[]
  category?: { title: string }
  seoTitle?: string
  seoDescription?: string
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const slugs: { slug: string }[] = await client.fetch(postSlugsQuery)
    return slugs.map((s) => ({ slug: s.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const post: Post = await client.fetch(postBySlugQuery, { slug })
    if (!post) return {}
    const title = post.seoTitle || `${post.title} | Guia Gestão Condominial`
    const description = post.seoDescription || post.excerpt
    const imageUrl = post.mainImage
      ? urlFor(post.mainImage).width(1200).height(630).url()
      : '/logo.png'
    return {
      title,
      description,
      alternates: { canonical: `https://guia-condominial.vercel.app/noticias/${slug}` },
      openGraph: {
        title,
        description,
        type: 'article',
        url: `https://guia-condominial.vercel.app/noticias/${slug}`,
        images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }],
      },
      twitter: { card: 'summary_large_image', title, description, images: [imageUrl] },
    }
  } catch {
    return {}
  }
}

const ptComponents = {
  types: {
    image: ({ value }: { value: { asset: { _ref: string }; alt?: string; caption?: string } }) => (
      <figure className="my-8">
        <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden">
          <Image
            src={urlFor(value).width(900).url()}
            alt={value.alt || ''}
            fill className="object-cover"
          />
        </div>
        {value.caption && <figcaption className="text-center text-xs text-brand-light mt-2">{value.caption}</figcaption>}
      </figure>
    ),
  },
  marks: {
    link: ({ value, children }: { value?: { href?: string }; children: React.ReactNode }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer" className="text-g700 underline underline-offset-2 hover:text-gold transition-colors">{children}</a>
    ),
  },
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  let post: Post | null = null
  try {
    post = await client.fetch(postBySlugQuery, { slug })
  } catch {
    // Sanity not configured
  }

  if (!post) notFound()

  return (
    <>
      <Topbar />
      <Navbar />
      <main className="bg-cream min-h-screen pt-24">
        {/* Hero image */}
        {post.mainImage && (
          <div className="relative w-full h-[400px] md:h-[520px] bg-g900">
            <Image
              src={urlFor(post.mainImage).width(1200).height(520).url()}
              alt={post.mainImage.alt || post.title}
              fill className="object-cover opacity-70"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-g900 via-g900/50 to-transparent" />
          </div>
        )}

        <div className="max-w-3xl mx-auto px-6 py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-brand-light mb-8">
            <Link href="/" className="hover:text-g700 transition-colors">Início</Link>
            <span>/</span>
            <Link href="/noticias" className="hover:text-g700 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-g700 truncate max-w-[200px]">{post.title}</span>
          </nav>

          {/* Meta */}
          <div className="flex items-center gap-3 mb-5">
            {post.category && (
              <span className="text-[11px] font-bold uppercase tracking-wider bg-g700 text-gold-light px-2.5 py-1 rounded-full">
                {post.category.title}
              </span>
            )}
            <time className="text-sm text-brand-light">{formatDate(post.publishedAt)}</time>
          </div>

          <h1 className="font-display text-[clamp(26px,4vw,44px)] font-bold text-g800 leading-tight mb-6">{post.title}</h1>

          {post.excerpt && (
            <p className="text-lg text-brand-mid leading-relaxed mb-10 pb-10 border-b border-g100">{post.excerpt}</p>
          )}

          {/* Body */}
          <div className="prose prose-lg max-w-none
            prose-headings:font-display prose-headings:text-g800
            prose-h2:text-[26px] prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-[20px] prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-brand-mid prose-p:leading-[1.85] prose-p:mb-5
            prose-li:text-brand-mid prose-li:leading-relaxed
            prose-strong:text-g800 prose-strong:font-semibold
            prose-blockquote:border-l-4 prose-blockquote:border-gold prose-blockquote:pl-5 prose-blockquote:italic prose-blockquote:text-brand-mid
          ">
            <PortableText value={post.body as Parameters<typeof PortableText>[0]['value']} components={ptComponents} />
          </div>

          {/* Interações: curtir, compartilhar, comentários */}
          <PostInteractions slug={slug} title={post.title} />

          {/* Back link */}
          <div className="mt-14 pt-10 border-t border-g100">
            <Link href="/noticias" className="inline-flex items-center gap-2 text-sm font-semibold text-g700 hover:text-gold transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Ver todos os artigos
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <WAFloat />
    </>
  )
}
