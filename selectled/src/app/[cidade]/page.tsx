import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getCityBySlug, getAllCitySlugs } from "@/data/cities";
import { services } from "@/data/services";
import { getCasesByCity } from "@/data/cases";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WAFloat } from "@/components/layout/WAFloat";
import { RepCard } from "@/components/sections/RepCard";
import { AnimatedStats } from "@/components/sections/AnimatedStats";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import {
  Monitor, Volume2, Camera, Wifi, BadgeCheck, Image as ImageIcon,
  ChevronRight, Star, MessageCircle, ArrowRight
} from "lucide-react";

const serviceIcons = {
  "paineis-led": Monitor,
  "som-iluminacao": Volume2,
  "foto-filmagem": Camera,
  "internet-eventos": Wifi,
  "credenciamento": BadgeCheck,
};

interface Props {
  params: Promise<{ cidade: string }>;
}

export async function generateStaticParams() {
  return getAllCitySlugs();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cidade } = await params;
  const city = getCityBySlug(cidade);
  if (!city) return {};

  return {
    title: `Painéis de LED em ${city.name} | Locação para Eventos | Select LED`,
    description: `Aluguel de painel de LED em ${city.name}. Atendimento local com ${city.rep.name}. +10 anos, +5mil eventos. Orçamento em 2h.`,
    openGraph: {
      title: `Painéis de LED em ${city.name} | Select LED`,
      description: `Aluguel de painel de LED em ${city.name} com ${city.rep.name}. Orçamento em 2h.`,
      images: [`/api/og?city=${cidade}`],
    },
    alternates: {
      canonical: `https://selectled.com.br/${cidade}`,
    },
    other: {
      "geo.region": `BR-${city.state}`,
      "geo.placename": city.name,
      "geo.position": `${city.lat};${city.lng}`,
    },
  };
}

export default async function CityHomePage({ params }: Props) {
  const { cidade } = await params;
  const city = getCityBySlug(cidade);
  if (!city) notFound();

  const cases = getCasesByCity(cidade).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `Select LED ${city.name}`,
    description: `Locação e venda de painéis de LED para eventos em ${city.name}.`,
    url: `https://selectled.com.br/${cidade}`,
    telephone: `+${city.rep.whatsapp}`,
    email: city.rep.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: city.address.street,
      addressLocality: city.name,
      addressRegion: city.state,
      postalCode: city.address.cep,
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: city.lat,
      longitude: city.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    image: `https://selectled.com.br/api/og?city=${cidade}`,
  };

  const testimonials = [
    {
      text: `A Select LED foi fundamental para o sucesso do nosso evento em ${city.name}. Profissionalismo impecável do começo ao fim.`,
      author: "Ricardo Martins",
      role: "Gerente de Eventos — Empresa XYZ",
      stars: 5,
    },
    {
      text: "Painel de LED de altíssima qualidade. O público adorou e nós também. Com certeza voltaremos.",
      author: "Ana Paula Costa",
      role: "Produtora de Eventos",
      stars: 5,
    },
    {
      text: `Atendimento rápido, montagem pontual e suporte técnico durante todo o evento. Recomendo muito!`,
      author: "Marcos Oliveira",
      role: "Diretor de Marketing",
      stars: 5,
    },
  ];

  const faqs = [
    {
      q: `Qual o valor para alugar painel de LED em ${city.name}?`,
      a: `O preço varia conforme o tamanho do painel, modelo (P2.5, P3, P4) e duração do evento. Entre em contato para receber uma proposta personalizada.`,
    },
    {
      q: `A Select LED faz montagem em ${city.name}?`,
      a: `Sim! Realizamos toda a montagem, desmontagem e operação técnica durante o evento em ${city.name} e toda a região.`,
    },
    {
      q: "Posso alugar por apenas um dia?",
      a: "Sim, trabalhamos com locações por evento (diária ou multi-diária) conforme a sua necessidade.",
    },
    {
      q: "O painel funciona em ambiente externo?",
      a: "Sim, temos painéis outdoor com proteção IP65 para eventos ao ar livre, mesmo sob sol intenso ou chuva.",
    },
    {
      q: "Vocês têm operador técnico?",
      a: "Todos os nossos pacotes incluem operador técnico treinado presente durante todo o evento.",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header citySlug={cidade} />

      <main className="bg-[#0A0A0A]">
        {/* ── Hero ── */}
        <section className="relative h-screen min-h-[600px] flex items-end pb-20">
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute inset-0 bg-[#1A1A1A] animate-ken-burns"
              style={{
                backgroundImage: `url(${city.heroBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[rgba(10,10,10,0.5)] to-[rgba(10,10,10,0.2)]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[rgba(10,10,10,0.6)] to-transparent" />
          </div>

          <Container className="relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-xs text-[#6E6E73] mb-6">
              <Link href="/" className="hover:text-[#A1A1A6] transition-colors">Select LED</Link>
              <ChevronRight size={10} />
              <span className="text-[#A1A1A6]">{city.name}</span>
            </div>

            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 max-w-3xl leading-tight"
              style={{ fontFamily: "var(--font-space)", letterSpacing: "-0.03em" }}
            >
              Painéis de LED em{" "}
              <span className="text-[#FF3B30]">{city.name}</span>{" "}
              para Eventos que Marcam
            </h1>
            <p className="text-lg text-[#A1A1A6] mb-10 max-w-xl leading-relaxed">
              Locação, instalação e operação com o representante local {city.rep.name}.
              Atendimento em até 2h.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href={`/${cidade}/orcamento`}>
                <Button size="lg">Solicitar orçamento</Button>
              </Link>
              <Link href={`/${cidade}/paineis-led`}>
                <Button size="lg" variant="outline">Ver painéis disponíveis</Button>
              </Link>
            </div>

            {/* Selos */}
            <div className="flex flex-wrap gap-5 mt-12 pt-8 border-t border-[rgba(255,255,255,0.06)]">
              {["+10 anos", "+5.000 eventos", "3 sedes próprias"].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF3B30]" />
                  <span className="text-sm text-[#A1A1A6]">{s}</span>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ── Rep Card ── */}
        <Section>
          <Container>
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-widest text-[#FF3B30] font-semibold mb-2">
                Atendimento local
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold text-white"
                style={{ fontFamily: "var(--font-space)" }}
              >
                Seu representante em {city.name}
              </h2>
            </div>
            <RepCard city={city} />
          </Container>
        </Section>

        {/* ── Serviços ── */}
        <Section className="bg-[#0D0D0D]">
          <Container>
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-widest text-[#FF3B30] font-semibold mb-2">
                O que fazemos
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold text-white mb-4"
                style={{ fontFamily: "var(--font-space)" }}
              >
                Soluções completas para seu evento
              </h2>
              <p className="text-[#A1A1A6] max-w-lg mx-auto">
                De painéis LED à transmissão ao vivo — tudo que você precisa em {city.name}.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Card destaque: Painéis LED */}
              <Link
                href={`/${cidade}/paineis-led`}
                className="group sm:col-span-2 lg:col-span-1 relative bg-[#141414] border border-[#2C2C2E] rounded-2xl p-6 hover:border-[rgba(255,59,48,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-900/20"
              >
                <div className="p-2.5 bg-[rgba(255,59,48,0.12)] rounded-xl w-fit mb-4">
                  <Monitor size={20} className="text-[#FF3B30]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2" style={{ fontFamily: "var(--font-space)" }}>
                  Painéis de LED
                </h3>
                <p className="text-sm text-[#6E6E73] mb-4 leading-relaxed">
                  Indoor, outdoor, alta resolução. P2 a P4. Entrega, montagem e operador inclusos.
                </p>
                <span className="text-xs font-semibold text-[#FF3B30] flex items-center gap-1 group-hover:gap-2 transition-all">
                  Ver painéis <ArrowRight size={13} />
                </span>
              </Link>

              {services.map((service) => {
                const Icon = serviceIcons[service.slug as keyof typeof serviceIcons] ?? Monitor;
                return (
                  <Link
                    key={service.slug}
                    href={`/${cidade}/${service.slug}`}
                    className="group bg-[#141414] border border-[#2C2C2E] rounded-2xl p-6 hover:border-[rgba(255,255,255,0.14)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40"
                  >
                    <div className="p-2.5 bg-[rgba(255,255,255,0.04)] rounded-xl w-fit mb-4">
                      <Icon size={20} className="text-[#A1A1A6] group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-base font-semibold text-white mb-2" style={{ fontFamily: "var(--font-space)" }}>
                      {service.name}
                    </h3>
                    <p className="text-sm text-[#6E6E73] line-clamp-2 leading-relaxed">
                      {service.tagline}
                    </p>
                  </Link>
                );
              })}
            </div>
          </Container>
        </Section>

        {/* ── CTA Vendas ── */}
        <section className="bg-gradient-to-r from-[#0A0A0A] to-[#1A0A09] border-y border-[#2C2C2E] py-16">
          <Container>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#FF3B30] mb-2">
                  Compra
                </p>
                <h2
                  className="text-3xl md:text-4xl font-bold text-white mb-3"
                  style={{ fontFamily: "var(--font-space)" }}
                >
                  Vai vender o painel ao invés de alugar?
                </h2>
                <p className="text-[#A1A1A6] max-w-lg">
                  Linha completa de painéis para compra com instalação, garantia 2 anos e
                  financiamento em até 48x.
                </p>
              </div>
              <Link href={`/${cidade}/vendas`} className="shrink-0">
                <Button size="lg" variant="outline">
                  Conhecer linha de venda <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </Container>
        </section>

        {/* ── Números ── */}
        <Section>
          <Container>
            <div className="text-center mb-10">
              <h2
                className="text-3xl md:text-4xl font-bold text-white"
                style={{ fontFamily: "var(--font-space)" }}
              >
                Números que comprovam
              </h2>
            </div>
            <AnimatedStats />
          </Container>
        </Section>

        {/* ── Cases ── */}
        {cases.length > 0 && (
          <Section className="bg-[#0D0D0D]">
            <Container>
              <div className="flex items-end justify-between mb-10">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#FF3B30] font-semibold mb-2">
                    Portfólio
                  </p>
                  <h2
                    className="text-3xl md:text-4xl font-bold text-white"
                    style={{ fontFamily: "var(--font-space)" }}
                  >
                    Cases em {city.name}
                  </h2>
                </div>
                <Link
                  href={`/${cidade}/portfolio`}
                  className="text-sm text-[#A1A1A6] hover:text-white transition-colors flex items-center gap-1.5"
                >
                  Ver todos <ArrowRight size={13} />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {cases.map((c) => (
                  <div key={c.id} className="group bg-[#141414] border border-[#2C2C2E] rounded-2xl overflow-hidden hover:border-[rgba(255,255,255,0.14)] transition-all duration-300">
                    <div className="relative h-48 bg-[#1C1C1E] overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] flex items-center justify-center">
                        <ImageIcon size={32} className="text-[#2C2C2E]" />
                      </div>
                    </div>
                    <div className="p-5">
                      <span className="text-xs font-semibold uppercase tracking-wide text-[#FF3B30]">
                        {c.category}
                      </span>
                      <h3 className="text-base font-semibold text-white mt-1 mb-1">{c.title}</h3>
                      <p className="text-sm text-[#6E6E73]">{c.client} · {c.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </Section>
        )}

        {/* ── Depoimentos ── */}
        <Section>
          <Container>
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-widest text-[#FF3B30] font-semibold mb-2">
                Depoimentos
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold text-white"
                style={{ fontFamily: "var(--font-space)" }}
              >
                O que nossos clientes dizem
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {testimonials.map((t, i) => (
                <div key={i} className="bg-[#141414] border border-[#2C2C2E] rounded-2xl p-6">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.stars }).map((_, si) => (
                      <Star key={si} size={14} className="fill-[#FF9F0A] text-[#FF9F0A]" />
                    ))}
                  </div>
                  <p className="text-sm text-[#A1A1A6] leading-relaxed mb-5 italic">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.author}</p>
                    <p className="text-xs text-[#6E6E73]">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* ── FAQ ── */}
        <Section className="bg-[#0D0D0D]">
          <Container>
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-10">
                <h2
                  className="text-3xl font-bold text-white"
                  style={{ fontFamily: "var(--font-space)" }}
                >
                  Perguntas frequentes
                </h2>
              </div>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <details
                    key={i}
                    className="group bg-[#141414] border border-[#2C2C2E] rounded-xl overflow-hidden"
                  >
                    <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-sm font-medium text-[#F5F5F7] list-none hover:text-white">
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

        {/* ── CTA Final ── */}
        <section className="py-24 bg-[#0A0A0A] border-t border-[#2C2C2E]">
          <Container>
            <div className="text-center max-w-2xl mx-auto">
              <h2
                className="text-4xl md:text-5xl font-bold text-white mb-5"
                style={{ fontFamily: "var(--font-space)" }}
              >
                Seu próximo evento em{" "}
                <span className="text-[#FF3B30]">{city.name}</span>{" "}
                começa aqui
              </h2>
              <p className="text-[#A1A1A6] text-lg mb-10">
                Fale com {city.rep.name} e receba seu orçamento em até 2 horas úteis.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href={`/${cidade}/orcamento`}>
                  <Button size="lg">Solicitar orçamento</Button>
                </Link>
                <a
                  href={`https://wa.me/${city.rep.whatsapp}?text=${encodeURIComponent(`Olá, ${city.rep.name}! Preciso de um orçamento para um evento em ${city.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" variant="whatsapp">
                    <MessageCircle size={18} />
                    WhatsApp agora
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
