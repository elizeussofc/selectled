import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { Container, Section } from "@/components/ui/Container";
import { Calendar, Clock, Tag, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | Select LED — Tudo sobre Painéis de LED para Eventos",
  description: "Artigos, guias e dicas sobre painéis de LED para eventos. Aprenda sobre modelos, preços, instalação e tendências do mercado.",
  alternates: { canonical: "https://selectled.com.br/blog" },
};

const CATEGORIES = ["Todos", "Locação", "Compra", "Técnico", "Igrejas", "Corporativo", "SEO Local"];

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-[rgba(10,10,10,0.9)] backdrop-blur-xl border-b border-[#2C2C2E]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#FF3B30] rounded-md flex items-center justify-center">
              <span className="text-white text-xs font-black">SL</span>
            </div>
            <span className="text-white font-bold" style={{ fontFamily: "var(--font-space)" }}>Select LED</span>
          </Link>
          <Link href="/sao-paulo" className="text-sm text-[#A1A1A6] hover:text-white transition-colors">
            ← Ir para São Paulo
          </Link>
        </div>
      </header>

      <main className="bg-[#0A0A0A] pt-16">
        <section className="py-20 border-b border-[#1C1C1E]">
          <Container>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#FF3B30] mb-3">Blog</p>
            <h1 className="text-5xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-space)", letterSpacing: "-0.03em" }}>
              Tudo sobre painéis de LED
            </h1>
            <p className="text-lg text-[#A1A1A6] max-w-xl">
              Guias práticos, comparações técnicas e dicas para quem produz ou contrata eventos.
            </p>
          </Container>
        </section>

        <Section>
          <Container>
            {posts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-[#6E6E73] text-lg">Posts em breve.</p>
                <p className="text-[#3A3A3C] text-sm mt-2">Estamos preparando conteúdo de qualidade para você.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group bg-[#141414] border border-[#2C2C2E] rounded-2xl overflow-hidden hover:border-[rgba(255,255,255,0.14)] transition-all hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="h-44 bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] relative">
                      <div className="absolute top-3 left-3">
                        <span className="text-xs font-semibold bg-[rgba(255,59,48,0.15)] text-[#FF3B30] px-2.5 py-1 rounded-full">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h2 className="text-base font-semibold text-white mb-2 line-clamp-2 group-hover:text-[#FF3B30] transition-colors" style={{ fontFamily: "var(--font-space)" }}>
                        {post.title}
                      </h2>
                      <p className="text-sm text-[#6E6E73] line-clamp-2 mb-4">{post.description}</p>
                      <div className="flex items-center gap-4 text-xs text-[#3A3A3C]">
                        <span className="flex items-center gap-1.5"><Calendar size={11} />{new Date(post.date).toLocaleDateString("pt-BR")}</span>
                        <span className="flex items-center gap-1.5"><Clock size={11} />{post.readingTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </Container>
        </Section>
      </main>

      <footer className="bg-[#0A0A0A] border-t border-[#2C2C2E] py-8">
        <Container>
          <div className="flex items-center justify-between">
            <p className="text-xs text-[#3A3A3C]">© {new Date().getFullYear()} Select Led LTDA</p>
            <Link href="/sobre" className="text-xs text-[#3A3A3C] hover:text-[#6E6E73] transition-colors">Sobre</Link>
          </div>
        </Container>
      </footer>
    </>
  );
}
