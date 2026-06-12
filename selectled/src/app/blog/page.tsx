import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { Container, Section } from "@/components/ui/Container";
import { Calendar, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | Select LED — Tudo sobre Painéis de LED para Eventos",
  description: "Artigos, guias e dicas sobre painéis de LED para eventos. Aprenda sobre modelos, preços, instalação e tendências do mercado.",
  alternates: { canonical: "https://selectled.com.br/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-[rgba(10,10,10,0.9)] backdrop-blur-xl border-b border-[#2C2C2E]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/sl-icon.png" alt="SL" style={{ width: 28, height: 28, borderRadius: 8, objectFit: "contain" }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/selectled-logo.png" alt="Select LED" style={{ height: 16, objectFit: "contain" }} />
          </Link>
          <Link href="/sao-paulo" className="text-sm text-[#A1A1A6] hover:text-white transition-colors">
            ← Ir para São Paulo
          </Link>
        </div>
      </header>

      <main className="bg-[#0A0A0A] pt-16">
        <section className="py-20 border-b border-[#1C1C1E]">
          <Container>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#FF0000] mb-3">Blog</p>
            <h1 className="text-5xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}>
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
                {posts.map((post, idx) => {
                  const glowPositions = ["top-right", "bottom-left", "top-left", "bottom-right", "center-right", "center-left", "top-right"];
                  const glowPos = glowPositions[idx % glowPositions.length];
                  return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group bg-[#111] border border-[#1C1C1E] rounded-2xl overflow-hidden hover:border-[rgba(255,0,0,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/60"
                  >
                    <div className="h-44 relative overflow-hidden bg-[#0D0D0D]">
                      {/* Grid pattern */}
                      <div
                        className="absolute inset-0 opacity-[0.04]"
                        style={{
                          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                          backgroundSize: "36px 36px",
                        }}
                      />
                      {/* Red glow accent */}
                      <div
                        className={`absolute w-40 h-40 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300 ${
                          glowPos === "top-right" ? "-top-10 -right-10" :
                          glowPos === "bottom-left" ? "-bottom-10 -left-10" :
                          glowPos === "top-left" ? "-top-10 -left-10" :
                          glowPos === "bottom-right" ? "-bottom-10 -right-10" :
                          glowPos === "center-right" ? "top-2 -right-8" :
                          "top-2 -left-8"
                        }`}
                        style={{ background: "radial-gradient(circle, #FF0000 0%, transparent 70%)" }}
                      />
                      {/* Post number */}
                      <div className="absolute bottom-3 right-4 text-[64px] font-black leading-none text-white/[0.04] select-none" style={{ fontFamily: "var(--font-display)" }}>
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                      {/* Category badge */}
                      <div className="absolute top-3 left-3">
                        <span className="text-xs font-semibold bg-[rgba(255,0,0,0.15)] border border-[rgba(255,0,0,0.2)] text-[#FF0000] px-2.5 py-1 rounded-full">
                          {post.category}
                        </span>
                      </div>
                      {/* Bottom fade */}
                      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#111] to-transparent" />
                    </div>
                    <div className="p-5">
                      <h2 className="text-base font-semibold text-white mb-2 line-clamp-2 group-hover:text-[#FF0000] transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                        {post.title}
                      </h2>
                      <p className="text-sm text-[#6E6E73] line-clamp-2 mb-4">{post.description}</p>
                      <div className="flex items-center gap-4 text-xs text-[#3A3A3C]">
                        <span className="flex items-center gap-1.5"><Calendar size={11} />{new Date(post.date).toLocaleDateString("pt-BR")}</span>
                        <span className="flex items-center gap-1.5"><Clock size={11} />{post.readingTime}</span>
                      </div>
                    </div>
                  </Link>
                  );
                })}
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
