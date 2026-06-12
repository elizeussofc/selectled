"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageCircle, CheckCircle, ChevronRight, ArrowRight } from "lucide-react";
import type { City } from "@/data/cities";
import type { Service } from "@/data/services";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WAFloat } from "@/components/layout/WAFloat";
import { RepCard } from "@/components/sections/RepCard";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { useT } from "@/contexts/language-context";
import { tpl } from "@/data/translations";

interface ServicePageProps {
  city: City;
  service: Service;
}

export function ServicePage({ city, service }: ServicePageProps) {
  const t = useT();
  const sp = t.servicePage;
  const serviceName = t.serviceNames[service.slug] ?? service.name;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header citySlug={city.slug} />

      <main className="bg-[#0A0A0A]">
        {/* Hero */}
        <section className="pt-28 pb-16 border-b border-[#1C1C1E]">
          <Container>
            <div className="flex items-center gap-1.5 text-xs text-[#6E6E73] mb-6">
              <Link href="/" className="hover:text-[#A1A1A6] transition-colors">Select LED</Link>
              <ChevronRight size={10} />
              <Link href={`/${city.slug}`} className="hover:text-[#A1A1A6] transition-colors">{city.name}</Link>
              <ChevronRight size={10} />
              <span className="text-[#A1A1A6]">{service.name}</span>
            </div>

            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#FF3B30] mb-3">
                {serviceName}
              </p>
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
              >
                {serviceName} {t.hero.h1Line2} {city.name}
              </h1>
              {service.heroImage && (
                <div className="relative w-full rounded-2xl overflow-hidden mb-8" style={{ maxHeight: 480 }}>
                  <Image
                    src={service.heroImage}
                    alt={service.name}
                    width={1200}
                    height={480}
                    className="w-full object-cover"
                    style={{ maxHeight: 480, objectPosition: "center 30%" }}
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/20 via-transparent to-[#0A0A0A]/20" />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-white/5" />
                </div>
              )}
              <p className="text-lg text-[#A1A1A6] mb-8 leading-relaxed max-w-2xl">
                {service.intro}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href={`/${city.slug}/orcamento`}>
                  <Button size="lg" className="animate-cta-pulse">{sp.ctaPrimary}</Button>
                </Link>
                <a
                  href={`https://wa.me/${city.rep.whatsapp}?text=${encodeURIComponent(`Olá, ${city.rep.name}! Tenho interesse em ${service.name} para um evento em ${city.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" variant="whatsapp">
                    <MessageCircle size={16} />
                    WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </Container>
        </section>

        {/* O que entregamos */}
        <Section>
          <Container>
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2
                  className="text-3xl font-bold text-white mb-8"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {sp.whatYouGet}
                </h2>
                <ul className="space-y-4">
                  {service.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-3">
                      <CheckCircle size={16} className="text-[#30D158] mt-0.5 shrink-0" />
                      <span className="text-[#A1A1A6]">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Equipamentos */}
              <div>
                <h2
                  className="text-3xl font-bold text-white mb-8"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {sp.equipment}
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {service.equipment.map((eq) => (
                    <div key={eq.name} className="bg-[#141414] border border-[#2C2C2E] rounded-xl overflow-hidden group hover:border-[rgba(255,59,48,0.3)] transition-colors">
                      <div className="relative h-36 bg-[#1C1C1E] overflow-hidden">
                        {eq.image && !eq.image.includes("/equip/") ? (
                          <Image
                            src={eq.image}
                            alt={eq.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 50vw, 200px"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs text-[#3A3A3C]">Foto</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      </div>
                      <div className="px-3 py-2.5">
                        <p className="text-xs font-medium text-[#A1A1A6]">{eq.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Como funciona */}
        <Section className="bg-[#0D0D0D]">
          <Container>
            <h2
              className="text-3xl font-bold text-white mb-10 text-center"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {sp.howItWorks}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {sp.steps.map((step, i) => (
                <div key={i}>
                  <div className="text-5xl font-black text-[#1C1C1E] mb-3" style={{ fontFamily: "var(--font-display)" }}>
                    {step.n}
                  </div>
                  <div className="w-8 h-1 bg-[#FF3B30] mb-4 rounded-full" />
                  <h3 className="font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-[#6E6E73] leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Rep Card */}
        <Section>
          <Container>
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <RepCard city={city} variant="compact" />
              <div>
                <h2
                  className="text-2xl font-bold text-white mb-4"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {tpl(sp.otherServices, { city: city.name })}
                </h2>
                <div className="space-y-3">
                  <Link
                    href={`/${city.slug}/paineis-led`}
                    className="flex items-center justify-between p-4 bg-[#141414] border border-[#2C2C2E] rounded-xl hover:border-[rgba(255,59,48,0.3)] transition-colors"
                  >
                    <span className="text-sm text-[#A1A1A6]">{sp.needPanelToo}</span>
                    <span className="text-xs text-[#FF3B30] flex items-center gap-1">
                      {sp.viewPanels} <ArrowRight size={11} />
                    </span>
                  </Link>
                  <Link
                    href={`/${city.slug}/vendas`}
                    className="flex items-center justify-between p-4 bg-[#141414] border border-[#2C2C2E] rounded-xl hover:border-[rgba(255,59,48,0.3)] transition-colors"
                  >
                    <span className="text-sm text-[#A1A1A6]">{sp.wantToBuy}</span>
                    <span className="text-xs text-[#FF3B30] flex items-center gap-1">
                      {sp.viewSales} <ArrowRight size={11} />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* FAQ */}
        <Section className="bg-[#0D0D0D]">
          <Container>
            <div className="max-w-2xl mx-auto">
              <h2
                className="text-3xl font-bold text-white mb-8 text-center"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {tpl(sp.faqTitle, { service: service.shortName })}
              </h2>
              <div className="space-y-3">
                {service.faq.map((faq, i) => (
                  <details key={i} className="group bg-[#141414] border border-[#2C2C2E] rounded-xl overflow-hidden">
                    <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-sm font-medium text-[#F5F5F7] list-none">
                      {faq.q}
                      <ChevronRight size={15} className="text-[#6E6E73] group-open:rotate-90 transition-transform shrink-0 ml-4" />
                    </summary>
                    <div className="px-5 pb-4 text-sm text-[#A1A1A6] leading-relaxed border-t border-[#2C2C2E] pt-3">
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* CTA */}
        <section className="py-20 border-t border-[#2C2C2E]">
          <Container>
            <div className="text-center max-w-xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
                {tpl(sp.ctaTitle, { service: service.shortName, city: city.name })}
              </h2>
              <p className="text-[#A1A1A6] mb-8">
                {tpl(sp.ctaDesc, { rep: city.rep.name })}
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href={`/${city.slug}/orcamento`}>
                  <Button size="lg" className="animate-cta-pulse">{sp.ctaPrimary}</Button>
                </Link>
                <a
                  href={`https://wa.me/${city.rep.whatsapp}?text=${encodeURIComponent(`Olá, quero contratar ${service.name} para um evento em ${city.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" variant="whatsapp">
                    <MessageCircle size={16} />
                    {sp.ctaWhatsapp}
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
