"use client";

import Link from "next/link";
import {
  Monitor, Volume2, Camera, Wifi, BadgeCheck,
  ChevronRight, Star, MessageCircle, ArrowRight
} from "lucide-react";
import type { City } from "@/data/cities";
import { services } from "@/data/services";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WAFloat } from "@/components/layout/WAFloat";
import { RepCard } from "@/components/sections/RepCard";
import { AnimatedStats } from "@/components/sections/AnimatedStats";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { useT } from "@/contexts/language-context";
import { tpl } from "@/data/translations";

const LED_COLS = 16;
const LED_ROWS = 11;
const LED_DOTS = Array.from({ length: LED_ROWS * LED_COLS }, (_, i) => {
  const r = Math.floor(i / LED_COLS);
  const c = i % LED_COLS;
  const dx = c - (LED_COLS - 1) / 2;
  const dy = r - (LED_ROWS - 1) / 2;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const colorIdx = (r * 7 + c * 11) % 3;
  const COLORS = ["#FF0000", "#25D366", "#4FC3F7"] as const;
  const glow = dist < 2.4;
  const mid = dist >= 2.4 && dist < 5;
  return {
    color: glow ? COLORS[colorIdx] : mid ? "#2C2C2E" : "#161616",
    opacity: glow ? 0.95 : mid ? 0.5 : 0.18,
    glow,
    animDuration: `${2.4 + ((r * LED_COLS + c) % 14) * 0.18}s`,
    animDelay: `${((r * LED_COLS + c) % 20) * 0.09}s`,
  };
});

const serviceIcons = {
  "paineis-led": Monitor,
  "som-iluminacao": Volume2,
  "foto-filmagem": Camera,
  "internet-eventos": Wifi,
  "credenciamento": BadgeCheck,
};

interface Case {
  id: string;
  title: string;
  category: string;
  client: string;
  location: string;
  thumbnail?: string;
}

interface Props {
  city: City;
  cases: Case[];
  cidade: string;
}

export function CityPageContent({ city, cases, cidade }: Props) {
  const t = useT();

  const testimonials = t.testimonials.map((t) => ({
    ...t,
    text: tpl(t.text, { city: city.name }),
  }));

  const faqs = t.cityFaq.map((f) => ({
    q: tpl(f.q, { city: city.name }),
    a: tpl(f.a, { city: city.name }),
  }));

  return (
    <>
      <Header citySlug={cidade} />

      <main className="bg-[#0A0A0A]">
        {/* Hero */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[#060606]" />
            <video
              className="absolute inset-0 w-full h-full object-cover opacity-60"
              src="/videos/cidade-hero-bg.webm"
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="absolute -top-20 right-0 w-[1000px] h-[1000px] rounded-full" style={{ background: "radial-gradient(circle at 80% 20%, rgba(255,0,0,0.1) 0%, transparent 55%)" }} />
            <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(255,0,0,0.04) 0%, transparent 60%)" }} />
            <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "72px 72px" }} />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF0000]/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
          </div>

          <Container className="relative z-10 pt-24 pb-20">
            <div className="grid lg:grid-cols-[1fr_440px] xl:grid-cols-[1fr_480px] gap-10 xl:gap-14 items-center">
              <div className="stagger">
                <div className="flex items-center gap-2 mb-8">
                  <Link href="/" className="text-sm text-[#A1A1A6] hover:text-white transition-colors font-medium">Select LED</Link>
                  <ChevronRight size={12} className="text-[#3A3A3C]" />
                  <span className="text-sm text-white font-semibold">{city.name}</span>
                </div>

                <div className="mb-6">
                  <span className="inline-flex items-center gap-1.5 bg-[rgba(255,0,0,0.1)] border border-[rgba(255,0,0,0.25)] text-[#FF0000] text-xs font-semibold px-3 py-1.5 rounded-full tracking-wide uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000] animate-pulse" />
                    {tpl(t.hero.badge, { city: city.name })}
                  </span>
                </div>

                <h1 className="font-black text-white mb-8 leading-[0.88] tracking-tight" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.04em", fontSize: "clamp(2.4rem, 5vw, 5rem)" }}>
                  {t.hero.h1Line1}<br />
                  {t.hero.h1Line2}{" "}
                  <span className="text-[#FF0000]" style={{ textShadow: "0 0 80px rgba(255,0,0,0.4), 0 0 160px rgba(255,0,0,0.15)" }}>
                    {city.name}
                  </span>
                </h1>

                <div className="mb-8" style={{ transformOrigin: "center bottom", animation: "float 4s ease-in-out infinite" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/foto-capa-1.png" alt="Painel de LED Select LED" style={{ width: "100%", maxWidth: 460, height: "auto", filter: "drop-shadow(0 18px 56px rgba(255,0,0,0.28)) drop-shadow(0 4px 16px rgba(0,0,0,0.6))" }} />
                </div>

                <p className="text-lg text-[#6E6E73] mb-10 max-w-md leading-relaxed">
                  {tpl(t.hero.desc, { rep: city.rep.name })}
                </p>

                <div className="flex flex-wrap gap-3 mb-12">
                  <Link href={`/${cidade}/orcamento`}>
                    <Button size="lg" className="animate-cta-pulse">{t.hero.ctaPrimary}</Button>
                  </Link>
                  <Link href={`/${cidade}/paineis-led`}>
                    <Button size="lg" variant="outline">{t.hero.ctaSecondary}</Button>
                  </Link>
                </div>

                <div className="flex flex-wrap gap-x-8 gap-y-3 pt-6 border-t border-[rgba(255,255,255,0.1)]">
                  {t.hero.seals.map((s) => (
                    <div key={s} className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FF0000] shadow-[0_0_6px_rgba(255,0,0,0.8)]" />
                      <span className="text-sm text-[#C0C0C5] font-medium">{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* LED panel visual */}
              <div className="hidden lg:flex items-center justify-center animate-fade-in" style={{ animationDelay: "0.35s" }}>
                <div className="relative w-full max-w-[480px]">
                  <div className="absolute inset-8 rounded-3xl blur-3xl" style={{ background: "radial-gradient(ellipse, rgba(255,0,0,0.18) 0%, transparent 70%)" }} />
                  <div className="relative bg-[#0D0D0D] border border-[#222] rounded-2xl overflow-hidden shadow-2xl">
                    <div className="flex items-center justify-between px-5 py-3 border-b border-[#1A1A1A]">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#FF0000] animate-pulse" />
                        <span className="text-xs text-[#555] font-medium tracking-wide">SELECT LED · {city.name.toUpperCase()}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                        <span className="text-[10px] text-[#25D366] font-semibold tracking-widest">LIVE</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-center px-6 py-7">
                      <div style={{ display: "grid", gridTemplateColumns: `repeat(${LED_COLS}, 1fr)`, gap: "7px" }}>
                        {LED_DOTS.map((dot, i) => (
                          <div key={i} style={{ width: "12px", height: "12px", borderRadius: "50%", background: dot.color, opacity: dot.opacity, boxShadow: dot.glow ? `0 0 6px ${dot.color}, 0 0 16px ${dot.color}60` : "none", animation: dot.glow ? `ledPulse ${dot.animDuration} ease-in-out infinite` : "none", animationDelay: dot.animDelay }} />
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 border-t border-[#1A1A1A]">
                      {[
                        { label: t.hero.specResolution, value: "P2–P4" },
                        { label: t.hero.specBrightness, value: "6.000 nits" },
                        { label: t.hero.specRate, value: "60 Hz" },
                      ].map((stat, idx) => (
                        <div key={stat.label} className="px-4 py-3 text-center" style={{ borderRight: idx < 2 ? "1px solid #1A1A1A" : "none" }}>
                          <p className="text-[10px] text-[#3A3A3C] font-medium uppercase tracking-wider mb-0.5">{stat.label}</p>
                          <p className="text-sm font-bold text-[#888]" style={{ fontFamily: "var(--font-display)" }}>{stat.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="absolute -top-3 -right-3 bg-[#161616] border border-[rgba(255,0,0,0.35)] rounded-xl px-3.5 py-2.5 shadow-xl">
                    <p className="text-sm font-black text-[#FF0000]" style={{ fontFamily: "var(--font-display)" }}>+5.000</p>
                    <p className="text-[10px] text-[#555] font-medium">{t.hero.eventsBadge}</p>
                  </div>
                  <div className="absolute -bottom-3 -left-3 bg-[#161616] border border-[#222] rounded-xl px-3.5 py-2.5 shadow-xl">
                    <p className="text-[10px] text-[#555] font-medium mb-0.5">{t.hero.attendBadge}</p>
                    <p className="text-xs font-bold text-[#A1A1A6]">{city.name}</p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Rep Card */}
        <Section>
          <Container>
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-widest text-[#FF0000] font-semibold mb-2">{t.sections.repBadge}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                {tpl(t.sections.repTitle, { city: city.name })}
              </h2>
            </div>
            <RepCard city={city} />
          </Container>
        </Section>

        {/* Serviços */}
        <Section className="bg-[#0D0D0D]">
          <Container>
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-widest text-[#FF0000] font-semibold mb-2">{t.sections.servicesBadge}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
                {t.sections.servicesTitle}
              </h2>
              <p className="text-[#A1A1A6] mx-auto text-sm md:whitespace-nowrap">
                {tpl(t.sections.servicesSubtitle, { city: city.name })}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href={`/${cidade}/paineis-led`} className="group md:col-span-2 relative bg-[#141414] border border-[#2C2C2E] rounded-2xl p-6 hover:border-[rgba(255,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-900/20">
                <div className="p-2.5 bg-[rgba(255,0,0,0.12)] rounded-xl w-fit mb-4">
                  <Monitor size={20} className="text-[#FF0000]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>{t.sections.panelCardTitle}</h3>
                <p className="text-sm text-[#6E6E73] mb-4 leading-relaxed">{t.sections.panelCardDesc}</p>
                <span className="text-xs font-semibold text-[#FF0000] flex items-center gap-1 group-hover:gap-2 transition-all">
                  {t.sections.panelCardCta} <ArrowRight size={13} />
                </span>
              </Link>
              {services.map((service) => {
                const Icon = serviceIcons[service.slug as keyof typeof serviceIcons] ?? Monitor;
                return (
                  <Link key={service.slug} href={`/${cidade}/${service.slug}`} className="group bg-[#141414] border border-[#2C2C2E] rounded-2xl p-6 hover:border-[rgba(255,255,255,0.14)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40">
                    <div className="p-2.5 bg-[rgba(255,255,255,0.04)] rounded-xl w-fit mb-4">
                      <Icon size={20} className="text-[#A1A1A6] group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-base font-semibold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>{service.name}</h3>
                    <p className="text-sm text-[#6E6E73] line-clamp-2 leading-relaxed">{service.tagline}</p>
                  </Link>
                );
              })}
            </div>
          </Container>
        </Section>

        {/* CTA Vendas */}
        <section className="bg-gradient-to-r from-[#0A0A0A] to-[#1A0A09] border-y border-[#2C2C2E] py-16">
          <Container>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#FF0000] mb-2">{t.sections.salesBadge}</p>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>
                  {t.sections.salesTitle}
                </h2>
                <p className="text-[#A1A1A6] leading-relaxed">{t.sections.salesDesc}</p>
              </div>
              <Link href={`/${cidade}/vendas`} className="shrink-0">
                <Button size="lg" variant="outline">{t.sections.salesCta} <ArrowRight size={16} /></Button>
              </Link>
            </div>
          </Container>
        </section>

        {/* Stats */}
        <Section>
          <Container>
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                {t.sections.statsTitle}
              </h2>
            </div>
            <AnimatedStats />
          </Container>
        </Section>

        {/* Cases */}
        {cases.length > 0 && (
          <Section className="bg-[#0D0D0D]">
            <Container>
              <div className="flex items-end justify-between mb-10">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#FF0000] font-semibold mb-2">{t.sections.portfolioBadge}</p>
                  <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                    {tpl(t.sections.portfolioTitle, { city: city.name })}
                  </h2>
                </div>
                <Link href={`/${cidade}/portfolio`} className="text-sm text-[#A1A1A6] hover:text-white transition-colors flex items-center gap-1.5">
                  {t.sections.portfolioViewAll} <ArrowRight size={13} />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {cases.map((c, idx) => (
                  <div key={c.id} className="group bg-[#111] border border-[#1C1C1E] rounded-2xl overflow-hidden hover:border-[rgba(255,0,0,0.3)] transition-all duration-300 hover:-translate-y-1">
                    <div className="relative h-48 bg-[#0D0D0D] overflow-hidden transition-transform duration-500 group-hover:scale-105" style={c.thumbnail ? { backgroundImage: `url(${c.thumbnail})`, backgroundSize: "cover", backgroundPosition: "center" } : {}}>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      <div className="absolute bottom-3 right-4 text-[56px] font-black leading-none select-none" style={{ fontFamily: "var(--font-display)", color: "rgba(255,255,255,0.12)" }}>{String(idx + 1).padStart(2, "0")}</div>
                    </div>
                    <div className="p-5">
                      <span className="text-xs font-semibold uppercase tracking-wide text-[#FF0000]">{c.category}</span>
                      <h3 className="text-base font-semibold text-white mt-1 mb-1">{c.title}</h3>
                      <p className="text-sm text-[#6E6E73]">{c.client} · {c.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </Section>
        )}

        {/* Depoimentos */}
        <Section>
          <Container>
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-widest text-[#FF0000] font-semibold mb-2">{t.sections.testimonialsBadge}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                {t.sections.testimonialsTitle}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {testimonials.map((tm, i) => (
                <div key={i} className="relative bg-[#141414] border border-[#2C2C2E] rounded-2xl p-6 overflow-hidden">
                  <div className="absolute -top-1 right-4 text-8xl font-black leading-none select-none pointer-events-none" style={{ color: "rgba(255,0,0,0.07)", fontFamily: "var(--font-display)" }}>&ldquo;</div>
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, si) => <Star key={si} size={13} className="fill-[#FF9F0A] text-[#FF9F0A]" />)}
                  </div>
                  <p className="text-sm text-[#A1A1A6] leading-relaxed mb-5 relative z-10">&ldquo;{tm.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[rgba(255,0,0,0.1)] border border-[rgba(255,0,0,0.15)] flex items-center justify-center text-xs font-bold text-[#FF0000] shrink-0" style={{ fontFamily: "var(--font-display)" }}>
                      {tm.author.split(" ").slice(0, 2).map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white leading-tight">{tm.author}</p>
                      <p className="text-xs text-[#6E6E73]">{tm.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* FAQ */}
        <Section className="bg-[#0D0D0D]">
          <Container>
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>{t.sections.faqTitle}</h2>
              </div>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <details key={i} className="group bg-[#141414] border border-[#2C2C2E] rounded-xl overflow-hidden">
                    <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-sm font-medium text-[#F5F5F7] list-none hover:text-white">
                      {faq.q}
                      <ChevronRight size={15} className="text-[#6E6E73] group-open:rotate-90 transition-transform shrink-0 ml-4" />
                    </summary>
                    <div className="px-5 pb-4 text-sm text-[#A1A1A6] leading-relaxed border-t border-[#2C2C2E] pt-3">{faq.a}</div>
                  </details>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* CTA Final */}
        <section className="py-24 bg-[#0A0A0A] border-t border-[#2C2C2E]">
          <Container>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-5" style={{ fontFamily: "var(--font-display)" }}>
                {tpl(t.sections.ctaFinalTitle, { city: city.name }).split(city.name).reduce<React.ReactNode[]>((acc, part, i, arr) => {
                  acc.push(part);
                  if (i < arr.length - 1) acc.push(<span key={i} className="text-[#FF0000]">{city.name}</span>);
                  return acc;
                }, [])}
              </h2>
              <p className="text-[#A1A1A6] text-lg mb-10">
                {tpl(t.sections.ctaFinalDesc, { rep: city.rep.name })}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href={`/${cidade}/orcamento`}>
                  <Button size="lg" className="animate-cta-pulse">{t.sections.ctaPrimary}</Button>
                </Link>
                <a href={`https://wa.me/${city.rep.whatsapp}?text=${encodeURIComponent(`Olá, ${city.rep.name}! Preciso de um orçamento para um evento em ${city.name}.`)}`} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="whatsapp">
                    <MessageCircle size={18} />
                    {t.sections.ctaWhatsapp}
                  </Button>
                </a>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer citySlug={cidade} />
      <WAFloat city={city} />
    </>
  );
}
