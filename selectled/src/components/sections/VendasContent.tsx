"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageCircle, ChevronRight, ArrowDown, ExternalLink, Globe, Wrench, Shield, GraduationCap } from "lucide-react";
import type { City } from "@/data/cities";
import { products } from "@/data/products";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WAFloat } from "@/components/layout/WAFloat";
import { FinancingSimulator } from "@/components/sections/FinancingSimulator";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { useT } from "@/contexts/language-context";
import { tpl } from "@/data/translations";

const BENEFIT_ICONS = [Globe, Wrench, Shield, GraduationCap];

const SALES_CASES = [
  { type: "Igreja / Church", client: "Igreja Comunidade da Graça", model: "P2 Indoor" },
  { type: "Showroom", client: "MNZ Construtora", model: "P1.5 Indoor Premium" },
  { type: "Auditório / Auditorium", client: "SENAI Regional SP", model: "P3 Indoor" },
];

const subPageHrefs = ["indoor", "outdoor", "p1-5-p2-p2-5", "p3-p4", "instalacao", "financiamento"];

interface Props { city: City; citySlug: string }

export function VendasContent({ city, citySlug }: Props) {
  const t = useT();
  const v = t.vendas;

  return (
    <>
      <Header citySlug={citySlug} variant="sales" />

      <main className="bg-[#0A0A0A]">
        {/* Hero */}
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[#0A0A0A]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(255,0,0,0.08)_0%,transparent_70%)]" />
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: "linear-gradient(rgba(255,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,0,0.5) 1px, transparent 1px)",
                backgroundSize: "80px 80px",
              }}
            />
          </div>

          <Container className="relative z-10 py-40">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#FF0000] mb-6">
              {tpl(v.badge, { city: city.name })}
            </p>
            <h1
              className="text-6xl sm:text-7xl md:text-8xl font-bold text-white mb-6 leading-none"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.04em" }}
            >
              {v.h1Part1}<br />
              <span className="text-[#FF0000]">{v.h1Part2}</span>
            </h1>
            <p className="text-xl text-[#A1A1A6] mb-12 max-w-lg mx-auto leading-relaxed">
              {tpl(v.desc, { city: city.name })}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="#catalogo">
                <Button size="lg">
                  {v.ctaCatalog} <ArrowDown size={16} />
                </Button>
              </a>
              <a
                href={`https://wa.me/${city.rep.whatsapp}?text=${encodeURIComponent(`Olá, ${city.rep.name}! Quero comprar um painel de LED em ${city.name}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="outline">
                  <MessageCircle size={16} />
                  {v.ctaConsultor}
                </Button>
              </a>
            </div>
          </Container>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#3A3A3C]">
            <ArrowDown size={18} className="animate-bounce" />
          </div>
        </section>

        {/* Nav interna sticky */}
        <div className="sticky top-16 z-30 bg-[#0A0A0A]/95 backdrop-blur-sm border-b border-[#2C2C2E]">
          <Container>
            <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
              {v.subPages.map((label, i) => (
                <Link
                  key={subPageHrefs[i]}
                  href={`/${citySlug}/vendas/${subPageHrefs[i]}`}
                  className="flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium text-[#6E6E73] hover:text-white hover:bg-[#1C1C1E] transition-colors whitespace-nowrap"
                >
                  {label}
                </Link>
              ))}
              <a href="#financiamento" className="flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium text-[#FF0000] hover:bg-[rgba(255,0,0,0.08)] transition-colors whitespace-nowrap">
                {v.simulateFinancing}
              </a>
            </div>
          </Container>
        </div>

        {/* Por que comprar */}
        <Section>
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                {v.whyBuyTitle}
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {v.benefits.map((b, i) => {
                const Icon = BENEFIT_ICONS[i];
                return (
                  <div key={b.title} className="flex flex-col items-center text-center p-6 bg-[#141414] border border-[#2C2C2E] rounded-2xl">
                    <div className="p-3 bg-[rgba(255,0,0,0.10)] rounded-2xl mb-4">
                      <Icon size={22} className="text-[#FF0000]" />
                    </div>
                    <h3 className="font-semibold text-white text-sm mb-1">{b.title}</h3>
                    <p className="text-xs text-[#6E6E73]">{b.desc}</p>
                  </div>
                );
              })}
            </div>
          </Container>
        </Section>

        {/* Catálogo */}
        <Section id="catalogo" className="bg-[#0D0D0D]">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                {v.catalogTitle}
              </h2>
              <p className="text-[#A1A1A6] mt-3">{tpl(v.catalogSubtitle, { city: city.name })}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {products.map((product) => (
                <div
                  key={product.slug}
                  className="group bg-[#141414] border border-[#2C2C2E] rounded-2xl overflow-hidden hover:border-[rgba(255,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-900/20"
                >
                  <div className="relative h-48 bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                    {product.tag && (
                      <div className="absolute top-3 right-3">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          product.tag === "mais-vendido"
                            ? "bg-[rgba(255,0,0,0.15)] text-[#FF0000]"
                            : product.tag === "premium"
                            ? "bg-[rgba(255,215,0,0.1)] text-[#FFD700]"
                            : "bg-[rgba(48,209,88,0.1)] text-[#30D158]"
                        }`}>
                          {v.tagLabels[product.tag] ?? product.tag}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-white text-sm leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                        {product.name}
                      </h3>
                    </div>
                    <p className="text-xs text-[#6E6E73] mb-4">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-[#6E6E73]">{v.from}</p>
                        <p className="text-lg font-bold text-white">
                          R$ {product.priceFrom.toLocaleString("pt-BR")}
                          <span className="text-xs text-[#6E6E73] font-normal">/m²</span>
                        </p>
                      </div>
                      <a
                        href={`https://wa.me/${city.rep.whatsapp}?text=${encodeURIComponent(`Olá, tenho interesse no ${product.name} para ${city.name}.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-[#FF0000] flex items-center gap-1 hover:gap-2 transition-all"
                      >
                        {v.viewDetails} <ExternalLink size={11} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Cases de venda */}
        <Section>
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                {v.salesCasesTitle}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {SALES_CASES.map((c) => (
                <div key={c.client} className="bg-[#141414] border border-[#2C2C2E] rounded-2xl p-6">
                  <span className="text-xs font-semibold text-[#FF0000] uppercase tracking-wide">{c.type}</span>
                  <h3 className="text-base font-semibold text-white mt-2 mb-1">{c.client}</h3>
                  <p className="text-xs text-[#A1A1A6]">{c.model}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Financiamento */}
        <Section id="financiamento" className="bg-[#0D0D0D]">
          <Container>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                {v.financingTitle}
              </h2>
              <p className="text-[#A1A1A6] mt-3">{v.financingSubtitle}</p>
            </div>
            <div className="max-w-2xl mx-auto">
              <FinancingSimulator citySlug={citySlug} repWhatsapp={city.rep.whatsapp} />
            </div>
          </Container>
        </Section>

        {/* FAQ */}
        <Section>
          <Container>
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8 text-center" style={{ fontFamily: "var(--font-display)" }}>
                {v.faqTitle}
              </h2>
              <div className="space-y-3">
                {v.faqs.map((faq, i) => (
                  <details key={i} className="group bg-[#141414] border border-[#2C2C2E] rounded-xl overflow-hidden">
                    <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-sm font-medium text-[#F5F5F7] list-none">
                      {tpl(faq.q, { city: city.name })}
                      <ChevronRight size={15} className="text-[#6E6E73] group-open:rotate-90 transition-transform shrink-0 ml-4" />
                    </summary>
                    <div className="px-5 pb-4 text-sm text-[#A1A1A6] leading-relaxed border-t border-[#2C2C2E] pt-3">
                      {tpl(faq.a, { city: city.name })}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* CTA final */}
        <section className="py-24 bg-[#0D0D0D] border-t border-[#2C2C2E]">
          <Container>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
                {tpl(v.ctaFinalTitle, { city: city.name })}
              </h2>
              <p className="text-[#A1A1A6] mb-10">{v.ctaFinalDesc}</p>
              <Link href={`/${citySlug}/orcamento?tipo=venda`}>
                <Button size="lg" className="w-full sm:w-auto">{v.ctaFinalBtn}</Button>
              </Link>
            </div>
          </Container>
        </section>
      </main>

      <Footer citySlug={citySlug} />
      <WAFloat city={city} />
    </>
  );
}
