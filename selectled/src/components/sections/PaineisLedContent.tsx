"use client";

import Link from "next/link";
import Image from "next/image";
import {
  MessageCircle, CheckCircle, ChevronRight,
  Building2, Users, Music, Church, LayoutGrid, Megaphone, Mic2, Trophy,
} from "lucide-react";
import type { City } from "@/data/cities";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WAFloat } from "@/components/layout/WAFloat";
import { RepCard } from "@/components/sections/RepCard";
import { PanelCalculator } from "@/components/sections/PanelCalculator";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { useT } from "@/contexts/language-context";
import { tpl } from "@/data/translations";

const EVENT_ICONS = [Building2, Users, Music, Church, LayoutGrid, Megaphone, Mic2, Trophy];

interface Props { city: City }

export function PaineisLedContent({ city }: Props) {
  const t = useT();
  const pl = t.paineisLed;

  return (
    <>
      <Header citySlug={city.slug} />

      <main className="bg-[#0A0A0A]">
        {/* Hero */}
        <section className="pt-28 pb-16 bg-[#0A0A0A] border-b border-[#1C1C1E]">
          <Container>
            <div className="flex items-center gap-1.5 text-xs text-[#6E6E73] mb-6">
              <Link href="/" className="hover:text-[#A1A1A6] transition-colors">Select LED</Link>
              <ChevronRight size={10} />
              <Link href={`/${city.slug}`} className="hover:text-[#A1A1A6] transition-colors">{city.name}</Link>
              <ChevronRight size={10} />
              <span className="text-[#A1A1A6]">{t.nav.paineis}</span>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#FF3B30] mb-3">
                  {pl.badge}
                </p>
                <h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
                  style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
                >
                  {tpl(pl.h1, { city: city.name })}
                </h1>

                <div className="relative w-full rounded-2xl overflow-hidden mb-6" style={{ height: 260 }}>
                  <Image
                    src="/images/technicians-led-panel.jpg"
                    alt={pl.badge}
                    fill
                    className="object-cover"
                    style={{ objectPosition: "center 40%" }}
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/50 via-transparent to-transparent" />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-white/5" />
                </div>

                <p className="text-lg text-[#A1A1A6] mb-8 leading-relaxed">
                  {tpl(pl.intro, { city: city.name })}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href={`/${city.slug}/orcamento`}>
                    <Button size="lg" className="animate-cta-pulse">{pl.ctaOrcamento}</Button>
                  </Link>
                  <a
                    href={`https://wa.me/${city.rep.whatsapp}?text=${encodeURIComponent(tpl(pl.intro, { city: city.name }))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="lg" variant="whatsapp">
                      <MessageCircle size={16} />
                      {pl.ctaWhatsapp}
                    </Button>
                  </a>
                </div>
              </div>

              {/* Incluídos */}
              <div className="bg-[#141414] border border-[#2C2C2E] rounded-2xl p-6">
                <p className="text-sm font-semibold text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
                  {pl.includedTitle}
                </p>
                <ul className="space-y-3">
                  {pl.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-3 text-sm text-[#A1A1A6]">
                      <CheckCircle size={15} className="text-[#30D158] mt-0.5 shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>

        {/* Tipos de painel */}
        <Section>
          <Container>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                {pl.panelModelsTitle}
              </h2>
              <p className="text-[#A1A1A6] mt-3">{pl.panelModelsSubtitle}</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#2C2C2E]">
                    {[pl.colModel, pl.colPitch, pl.colMinDist, pl.colIdealFor, pl.colEnv].map((h) => (
                      <th key={h} className="text-left py-3 px-4 text-xs uppercase tracking-wide text-[#6E6E73] font-medium">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pl.panelTypes.map((p, i) => (
                    <tr
                      key={p.model}
                      className={`border-b border-[#1C1C1E] hover:bg-[#141414] transition-colors ${i % 2 !== 0 ? "bg-[rgba(255,255,255,0.01)]" : ""}`}
                    >
                      <td className="py-4 px-4 font-semibold text-[#FF3B30]">{p.model}</td>
                      <td className="py-4 px-4 text-[#F5F5F7]">{p.pitch}</td>
                      <td className="py-4 px-4 text-[#A1A1A6]">{p.minDist}</td>
                      <td className="py-4 px-4 text-[#A1A1A6]">{p.idealFor}</td>
                      <td className="py-4 px-4">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                          p.env.includes("Outdoor")
                            ? "bg-[rgba(48,209,88,0.1)] text-[#30D158]"
                            : "bg-[rgba(255,255,255,0.06)] text-[#A1A1A6]"
                        }`}>
                          {p.env}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Container>
        </Section>

        {/* Tipos de evento */}
        <Section className="bg-[#0D0D0D]">
          <Container>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                {pl.eventTypesTitle}
              </h2>
            </div>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
              {pl.eventTypes.map((label, i) => {
                const Icon = EVENT_ICONS[i];
                return (
                  <div key={label} className="flex flex-col items-center gap-2 p-4 bg-[#141414] border border-[#2C2C2E] rounded-xl hover:border-[rgba(255,59,48,0.3)] transition-colors cursor-default">
                    <Icon size={24} className="text-[#A1A1A6]" />
                    <span className="text-xs text-[#6E6E73] text-center">{label}</span>
                  </div>
                );
              })}
            </div>
          </Container>
        </Section>

        {/* Calculadora */}
        <Section>
          <Container>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                {pl.calcTitle}
              </h2>
              <p className="text-[#A1A1A6] mt-3">{pl.calcSubtitle}</p>
            </div>
            <PanelCalculator citySlug={city.slug} cityName={city.name} />
          </Container>
        </Section>

        {/* Como funciona */}
        <Section className="bg-[#0D0D0D]">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                {tpl(pl.howItWorksTitle, { city: city.name })}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              {pl.steps.map((step, i) => (
                <div key={i} className="relative">
                  <div className="text-5xl font-black text-[#1C1C1E] mb-3" style={{ fontFamily: "var(--font-display)" }}>
                    {step.n}
                  </div>
                  <div className="w-8 h-1 bg-[#FF3B30] mb-4 rounded-full" />
                  <h3 className="font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-[#6E6E73] leading-relaxed">{tpl(step.desc, { city: city.name })}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Rep Card */}
        <Section>
          <Container>
            <RepCard city={city} variant="compact" />
          </Container>
        </Section>

        {/* FAQ */}
        <Section className="bg-[#0D0D0D]">
          <Container>
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                  {pl.faqTitle}
                </h2>
              </div>
              <div className="space-y-3">
                {pl.faqs.map((faq, i) => (
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
        <section className="py-20 border-t border-[#2C2C2E]">
          <Container>
            <div className="text-center max-w-xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
                {pl.ctaFinalTitle}
              </h2>
              <p className="text-[#A1A1A6] mb-8">{tpl(pl.ctaFinalDesc, { rep: city.rep.name })}</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href={`/${city.slug}/orcamento`}>
                  <Button size="lg" className="animate-cta-pulse">{pl.ctaFinalOrcamento}</Button>
                </Link>
                <a
                  href={`https://wa.me/${city.rep.whatsapp}?text=${encodeURIComponent(tpl(pl.intro, { city: city.name }))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" variant="whatsapp">
                    <MessageCircle size={16} />
                    {pl.ctaFinalWhatsapp}
                  </Button>
                </a>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer citySlug={city.slug} />
      <WAFloat city={city} />
    </>
  );
}
