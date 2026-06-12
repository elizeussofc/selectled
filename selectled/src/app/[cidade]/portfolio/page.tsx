"use client";

import { useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { getCityBySlug } from "@/data/cities";
import { cases, getCasesByCity } from "@/data/cases";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WAFloat } from "@/components/layout/WAFloat";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { ChevronRight, Users, ImageIcon, X } from "lucide-react";
import { notFound } from "next/navigation";
import { useT } from "@/contexts/language-context";
import { tpl } from "@/data/translations";

const CATEGORY_KEYS = ["todos", "corporativo", "show", "casamento", "igreja", "feira", "lancamento", "palestra"] as const;

interface Props { params: Promise<{ cidade: string }> }

export default function PortfolioPage({ params }: Props) {
  const { cidade } = use(params);
  const city = getCityBySlug(cidade);
  if (!city) notFound();

  const t = useT();
  const tp = t.portfolio;

  const [activeCategory, setActiveCategory] = useState("todos");
  const [selectedCase, setSelectedCase] = useState<typeof cases[0] | null>(null);

  const cityCases = getCasesByCity(cidade);
  const allCases = cityCases.length > 0
    ? cityCases
    : cases.slice(0, 6);

  const filtered = activeCategory === "todos"
    ? allCases
    : allCases.filter((c) => c.category === activeCategory);

  const categories = CATEGORY_KEYS.map((key) => ({
    value: key,
    label: tp.categories[key],
  }));

  return (
    <>
      <Header citySlug={cidade} />
      <main className="bg-[#0A0A0A]">
        {/* Hero */}
        <section className="pt-28 pb-16 border-b border-[#1C1C1E]">
          <Container>
            <div className="flex items-center gap-1.5 text-xs text-[#6E6E73] mb-6">
              <Link href="/" className="hover:text-[#A1A1A6] transition-colors">Select LED</Link>
              <ChevronRight size={10} />
              <Link href={`/${cidade}`} className="hover:text-[#A1A1A6] transition-colors">{city.name}</Link>
              <ChevronRight size={10} />
              <span className="text-[#A1A1A6]">{tp.breadcrumb}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}>
              {tpl(tp.h1, { city: city.name })}
            </h1>
            <p className="text-lg text-[#A1A1A6] mb-8">
              {tp.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              {[
                { n: allCases.length, l: tp.statsLocal },
                { n: "500+", l: tp.statsClients },
                { n: "10+", l: tp.statsYears },
              ].map((s) => (
                <div key={s.l} className="bg-[#141414] border border-[#2C2C2E] rounded-xl px-5 py-3">
                  <span className="text-lg font-bold text-[#FF0000]">{s.n}</span>
                  <span className="text-sm text-[#6E6E73] ml-2">{s.l}</span>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <Section>
          <Container>
            {/* Filtros */}
            <div className="flex flex-wrap gap-2 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat.value
                      ? "bg-[#FF0000] text-white"
                      : "bg-[#141414] border border-[#2C2C2E] text-[#A1A1A6] hover:text-white hover:border-[rgba(255,255,255,0.14)]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCase(c)}
                    className="group text-left bg-[#141414] border border-[#2C2C2E] rounded-2xl overflow-hidden hover:border-[rgba(255,255,255,0.2)] transition-all hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative h-48 bg-[#111] overflow-hidden">
                      {c.thumbnail ? (
                        <Image
                          src={c.thumbnail}
                          alt={c.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] flex items-center justify-center">
                          <ImageIcon size={32} className="text-[#2C2C2E]" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-sm font-medium">{tp.viewDetails}</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <span className="text-xs font-semibold text-[#FF0000] uppercase tracking-wide">{c.category}</span>
                      <h3 className="text-sm font-semibold text-white mt-1 mb-1">{c.title}</h3>
                      <p className="text-xs text-[#6E6E73]">{c.client}</p>
                      <div className="flex items-center gap-1.5 mt-2 text-xs text-[#6E6E73]">
                        <Users size={11} />
                        {c.audience.toLocaleString()} {tp.people}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <ImageIcon size={40} className="text-[#2C2C2E] mx-auto mb-4" />
                <p className="text-[#6E6E73]">{tp.noResults}</p>
              </div>
            )}
          </Container>
        </Section>

        {/* CTA */}
        <section className="py-16 border-t border-[#2C2C2E]">
          <Container>
            <div className="text-center max-w-xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
                {tp.ctaTitle}
              </h2>
              <p className="text-[#A1A1A6] mb-8">{tpl(tp.ctaDesc, { city: city.name })}</p>
              <Link href={`/${cidade}/orcamento`}><Button size="lg" className="animate-cta-pulse">{tp.ctaBtn}</Button></Link>
            </div>
          </Container>
        </section>
      </main>

      {/* Modal de case */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelectedCase(null)}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <div className="relative w-full max-w-2xl bg-[#141414] border border-[#2C2C2E] rounded-2xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-[#2C2C2E]">
              <div>
                <span className="text-xs font-semibold text-[#FF0000] uppercase tracking-wide">{selectedCase.category}</span>
                <h2 className="text-lg font-bold text-white mt-0.5" style={{ fontFamily: "var(--font-display)" }}>{selectedCase.title}</h2>
              </div>
              <button onClick={() => setSelectedCase(null)} className="p-1.5 rounded-lg text-[#6E6E73] hover:text-white hover:bg-[#2C2C2E] transition-colors"><X size={16} /></button>
            </div>
            <div className="h-48 bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] flex items-center justify-center">
              <ImageIcon size={40} className="text-[#2C2C2E]" />
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><p className="text-xs text-[#6E6E73]">{tp.modalClient}</p><p className="text-white font-medium">{selectedCase.client}</p></div>
                <div><p className="text-xs text-[#6E6E73]">{tp.modalLocation}</p><p className="text-white font-medium">{selectedCase.location}</p></div>
                <div><p className="text-xs text-[#6E6E73]">{tp.modalAudience}</p><p className="text-white font-medium">{selectedCase.audience.toLocaleString()} {tp.people}</p></div>
                <div><p className="text-xs text-[#6E6E73]">{tp.modalDate}</p><p className="text-white font-medium">{selectedCase.date}</p></div>
              </div>
              <div>
                <p className="text-xs text-[#6E6E73] mb-2">{tp.modalEquipment}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedCase.equipment.map((e) => (
                    <span key={e} className="text-xs bg-[#1C1C1E] border border-[#2C2C2E] text-[#A1A1A6] rounded-full px-3 py-1">{e}</span>
                  ))}
                </div>
              </div>
              {selectedCase.testimonial && (
                <div className="bg-[#1C1C1E] rounded-xl p-4">
                  <p className="text-sm text-[#A1A1A6] italic mb-2">&ldquo;{selectedCase.testimonial.text}&rdquo;</p>
                  <p className="text-xs font-semibold text-white">{selectedCase.testimonial.author}</p>
                  <p className="text-xs text-[#6E6E73]">{selectedCase.testimonial.role}</p>
                </div>
              )}
              <Link href={`/${cidade}/orcamento`} onClick={() => setSelectedCase(null)}>
                <Button className="w-full justify-center">{tp.modalCta}</Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      <Footer citySlug={cidade} />
      <WAFloat city={city} />
    </>
  );
}
