import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getAllPostSlugs, getAllPosts } from "@/lib/blog";
import { Container } from "@/components/ui/Container";
import { Calendar, Clock, ArrowLeft } from "lucide-react";

function XIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedinSvg({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
import { CitySearch } from "@/components/splash/CitySearch";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Blog Select LED`,
    description: post.description,
    openGraph: { title: post.title, description: post.description, type: "article", images: [post.image] },
    alternates: { canonical: `https://selectled.com.br/blog/${slug}` },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const related = allPosts.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: "Select LED" },
    publisher: { "@type": "Organization", name: "Select LED", logo: { "@type": "ImageObject", url: "https://selectled.com.br/logo.svg" } },
    image: `https://selectled.com.br${post.image}`,
    url: `https://selectled.com.br/blog/${slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="fixed top-0 left-0 right-0 z-40 bg-[rgba(10,10,10,0.9)] backdrop-blur-xl border-b border-[#2C2C2E]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#FF3B30] rounded-md flex items-center justify-center">
              <span className="text-white text-xs font-black">SL</span>
            </div>
            <span className="text-white font-bold" style={{ fontFamily: "var(--font-display)" }}>Select LED</span>
          </Link>
          <Link href="/blog" className="flex items-center gap-1.5 text-sm text-[#A1A1A6] hover:text-white transition-colors">
            <ArrowLeft size={14} /> Blog
          </Link>
        </div>
      </header>

      <main className="bg-[#0A0A0A] pt-16">
        {/* Hero */}
        <section className="py-16 border-b border-[#1C1C1E]">
          <Container>
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-2 mb-6">
                <Link href="/blog" className="text-xs text-[#6E6E73] hover:text-[#A1A1A6] transition-colors">Blog</Link>
                <span className="text-[#3A3A3C]">›</span>
                <span className="text-xs text-[#A1A1A6]">{post.category}</span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-[rgba(255,59,48,0.12)] text-[#FF3B30] px-3 py-1 rounded-full mb-4">
                {post.category}
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}>
                {post.title}
              </h1>
              <p className="text-lg text-[#A1A1A6] mb-6">{post.description}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-[#6E6E73]">
                <span className="flex items-center gap-1.5"><Calendar size={13} />{new Date(post.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}</span>
                <span className="flex items-center gap-1.5"><Clock size={13} />{post.readingTime}</span>
                <span className="text-[#3A3A3C]">por {post.author}</span>
              </div>
            </div>
          </Container>
        </section>

        {/* Conteúdo + Sidebar */}
        <div className="py-12">
          <Container>
            <div className="grid lg:grid-cols-4 gap-10">
              {/* Artigo */}
              <article className="lg:col-span-3 prose prose-invert prose-sm max-w-none
                prose-headings:font-bold prose-headings:text-white prose-headings:tracking-tight
                prose-p:text-[#A1A1A6] prose-p:leading-relaxed
                prose-a:text-[#FF3B30] prose-a:no-underline hover:prose-a:underline
                prose-strong:text-white
                prose-li:text-[#A1A1A6]
                prose-hr:border-[#2C2C2E]
                prose-blockquote:border-l-[#FF3B30] prose-blockquote:text-[#A1A1A6]
              ">
                <MDXRemote source={post.content} />
              </article>

              {/* Sidebar */}
              <aside className="hidden lg:block">
                <div className="sticky top-24 space-y-5">
                  <div className="bg-[#141414] border border-[#2C2C2E] rounded-2xl p-5">
                    <p className="text-xs font-semibold text-[#F5F5F7] mb-3">Compartilhar</p>
                    <div className="flex gap-2">
                      {[
                        { icon: XIcon, label: "X", href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=https://selectled.com.br/blog/${slug}` },
                        { icon: LinkedinSvg, label: "LinkedIn", href: `https://linkedin.com/sharing/share-offsite/?url=https://selectled.com.br/blog/${slug}` },
                      ].map(({ icon: Icon, label, href }) => (
                        <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-2 bg-[#1C1C1E] border border-[#2C2C2E] rounded-lg text-xs text-[#A1A1A6] hover:text-white transition-colors">
                          <Icon size={12} /> {label}
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* CTA contextual */}
                  <div className="bg-[rgba(255,59,48,0.06)] border border-[rgba(255,59,48,0.2)] rounded-2xl p-5">
                    <p className="text-xs font-semibold text-[#FF3B30] mb-2">Quer colocar em prática?</p>
                    <p className="text-xs text-[#A1A1A6] mb-4">Solicite orçamento na sua cidade.</p>
                    <CitySearch />
                  </div>
                </div>
              </aside>
            </div>
          </Container>
        </div>

        {/* CTA mobile */}
        <div className="lg:hidden py-8 border-t border-[#2C2C2E]">
          <Container>
            <div className="bg-[rgba(255,59,48,0.06)] border border-[rgba(255,59,48,0.2)] rounded-2xl p-5 text-center">
              <p className="text-sm font-semibold text-white mb-3">Solicite orçamento na sua cidade</p>
              <CitySearch />
            </div>
          </Container>
        </div>

        {/* Posts relacionados */}
        {related.length > 0 && (
          <section className="py-12 border-t border-[#1C1C1E]">
            <Container>
              <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-display)" }}>Posts relacionados</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {related.map((p) => (
                  <Link key={p.slug} href={`/blog/${p.slug}`}
                    className="group bg-[#141414] border border-[#2C2C2E] rounded-xl p-5 hover:border-[rgba(255,255,255,0.14)] transition-all">
                    <span className="text-xs font-semibold text-[#FF3B30]">{p.category}</span>
                    <h3 className="text-sm font-semibold text-white mt-1 line-clamp-2 group-hover:text-[#FF3B30] transition-colors">{p.title}</h3>
                    <p className="text-xs text-[#6E6E73] mt-1">{p.readingTime}</p>
                  </Link>
                ))}
              </div>
            </Container>
          </section>
        )}
      </main>

      <footer className="bg-[#0A0A0A] border-t border-[#2C2C2E] py-8">
        <Container>
          <p className="text-xs text-[#3A3A3C] text-center">© {new Date().getFullYear()} Select Led LTDA · CNPJ 35.554.822/0001-07</p>
        </Container>
      </footer>
    </>
  );
}
