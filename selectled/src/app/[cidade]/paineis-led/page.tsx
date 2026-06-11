import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getCityBySlug, getAllCitySlugs } from "@/data/cities";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WAFloat } from "@/components/layout/WAFloat";
import { RepCard } from "@/components/sections/RepCard";
import { PanelCalculator } from "@/components/sections/PanelCalculator";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import {
  ChevronRight, CheckCircle, MessageCircle, Users, Building2,
  Music, Church, LayoutGrid, Megaphone, Mic2, Trophy
} from "lucide-react";

interface Props {
  params: Promise<{ cidade: string }>;
  searchParams?: Promise<{ width?: string; height?: string; distance?: string; panel?: string }>;
}

export async function generateStaticParams() {
  return getAllCitySlugs();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cidade } = await params;
  const city = getCityBySlug(cidade);
  if (!city) return {};
  return {
    title: `Aluguel de Painel de LED em ${city.name} | Locação Diária | Select LED`,
    description: `Locação de painéis de LED em ${city.name} a partir de R$ 450/m². P2, P2.5, P3 e outdoor. Entrega + montagem + operador. Orçamento em 2h.`,
    alternates: { canonical: `https://selectled.com.br/${cidade}/paineis-led` },
  };
}

const panelTypes = [
  { model: "P2", pitch: "2mm", minDist: "2m", indicado: "Produção de TV, estúdio", ambiente: "Indoor" },
  { model: "P2.5", pitch: "2.5mm", minDist: "3m", indicado: "Palco próximo, casamento", ambiente: "Indoor" },
  { model: "P3", pitch: "3mm", minDist: "5m", indicado: "Conferências, shows", ambiente: "Indoor" },
  { model: "P3.9", pitch: "3.9mm", minDist: "8m", indicado: "Feiras, exposições", ambiente: "Indoor/Outdoor" },
  { model: "P4", pitch: "4mm", minDist: "10m", indicado: "Eventos outdoor, fachadas", ambiente: "Outdoor IP65" },
];

const eventTypes = [
  { icon: Building2, label: "Congresso" },
  { icon: Users, label: "Casamento" },
  { icon: Music, label: "Show" },
  { icon: Church, label: "Igreja" },
  { icon: LayoutGrid, label: "Feira" },
  { icon: Megaphone, label: "Lançamento" },
  { icon: Mic2, label: "Palestra" },
  { icon: Trophy, label: "Esporte" },
];

const deliverables = [
  "Entrega, montagem e desmontagem inclusos",
  "Operador técnico presente durante todo o evento",
  "Suporte técnico em tempo real",
  "Estrutura de suporte (treliça ou flight case)",
  "Cabos e processador de vídeo inclusos",
  "Teste e calibração no local antes do evento",
  "Seguro de equipamento incluso",
];

export default async function PaineisLEDPage({ params }: Props) {
  const { cidade } = await params;
  const city = getCityBySlug(cidade);
  if (!city) notFound();

  const faqs = [
    { q: `Quanto custa alugar painel de LED em ${city.name}?`, a: `Os preços variam de R$ 450/m²/dia (P4 outdoor) a R$ 800/m²/dia (P2.5 indoor). O valor final depende do tamanho, modelo e duração. Solicite uma proposta personalizada.` },
    { q: `Vocês fazem montagem em ${city.name}?`, a: "Sim! Realizamos toda a montagem, calibração e desmontagem. Você não precisa se preocupar com nada operacional." },
    { q: "Posso alugar por apenas um dia?", a: "Sim, trabalhamos com locações por evento — diárias ou multi-diárias." },
    { q: "Funciona em ambiente externo?", a: "Sim! Nossos painéis P4 e P3.9 outdoor possuem proteção IP65, funcionando mesmo sob sol intenso ou chuva." },
    { q: "Como escolher o tamanho ideal?", a: "Usamos nossa calculadora de painel para recomendar o modelo ideal com base na distância do público e tamanho do espaço." },
    { q: "Vocês têm operador técnico?", a: "Todos os pacotes incluem operador técnico treinado que permanece durante todo o evento." },
    { q: "Qual o prazo mínimo de antecedência?", a: "Recomendamos pelo menos 3 dias úteis. Para eventos grandes, 7 dias para garantir disponibilidade." },
    { q: "Quais formas de pagamento aceitam?", a: "Aceitamos PIX, transferência, boleto e cartão de crédito em até 12x." },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Header citySlug={cidade} />

      <main className="bg-[#0A0A0A]">
        {/* Hero compacto */}
        <section className="pt-28 pb-16 bg-[#0A0A0A] border-b border-[#1C1C1E]">
          <Container>
            <div className="flex items-center gap-1.5 text-xs text-[#6E6E73] mb-6">
              <Link href="/" className="hover:text-[#A1A1A6] transition-colors">Select LED</Link>
              <ChevronRight size={10} />
              <Link href={`/${cidade}`} className="hover:text-[#A1A1A6] transition-colors">{city.name}</Link>
              <ChevronRight size={10} />
              <span className="text-[#A1A1A6]">Painéis de LED</span>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#FF3B30] mb-3">
                  Locação de LED
                </p>
                <h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
                  style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
                >
                  Locação de Painel de LED em {city.name}
                </h1>

                {/* Imagem hero */}
                <div className="relative w-full rounded-2xl overflow-hidden mb-6" style={{ height: 260 }}>
                  <Image
                    src="/images/technicians-led-panel.jpg"
                    alt="Técnicos instalando painel de LED"
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
                  Indoor, outdoor, alta resolução. Entrega, montagem e operador inclusos em{" "}
                  {city.name} e região.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href={`/${cidade}/orcamento`}>
                    <Button size="lg">Solicitar orçamento</Button>
                  </Link>
                  <a
                    href={`https://wa.me/${city.rep.whatsapp}?text=${encodeURIComponent(`Olá, quero alugar painel LED em ${city.name}`)}`}
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

              {/* Deliverables */}
              <div className="bg-[#141414] border border-[#2C2C2E] rounded-2xl p-6">
                <p className="text-sm font-semibold text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
                  O que está incluso
                </p>
                <ul className="space-y-3">
                  {deliverables.map((d) => (
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
                Tipos de painel disponíveis
              </h2>
              <p className="text-[#A1A1A6] mt-3">Clique para ver ficha técnica completa</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#2C2C2E]">
                    {["Modelo", "Pixel Pitch", "Dist. visual mín.", "Indicação", "Ambiente"].map((h) => (
                      <th key={h} className="text-left py-3 px-4 text-xs uppercase tracking-wide text-[#6E6E73] font-medium">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {panelTypes.map((p, i) => (
                    <tr
                      key={p.model}
                      className={`border-b border-[#1C1C1E] hover:bg-[#141414] transition-colors cursor-pointer ${i % 2 === 0 ? "" : "bg-[rgba(255,255,255,0.01)]"}`}
                    >
                      <td className="py-4 px-4 font-semibold text-[#FF3B30]">{p.model}</td>
                      <td className="py-4 px-4 text-[#F5F5F7]">{p.pitch}</td>
                      <td className="py-4 px-4 text-[#A1A1A6]">{p.minDist}</td>
                      <td className="py-4 px-4 text-[#A1A1A6]">{p.indicado}</td>
                      <td className="py-4 px-4">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                          p.ambiente.includes("Outdoor")
                            ? "bg-[rgba(48,209,88,0.1)] text-[#30D158]"
                            : "bg-[rgba(255,255,255,0.06)] text-[#A1A1A6]"
                        }`}>
                          {p.ambiente}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Container>
        </Section>

        {/* Para qual evento? */}
        <Section className="bg-[#0D0D0D]">
          <Container>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                Para qual evento serve?
              </h2>
            </div>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
              {eventTypes.map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2 p-4 bg-[#141414] border border-[#2C2C2E] rounded-xl hover:border-[rgba(255,59,48,0.3)] transition-colors cursor-default">
                  <Icon size={24} className="text-[#A1A1A6]" />
                  <span className="text-xs text-[#6E6E73] text-center">{label}</span>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Calculadora */}
        <Section>
          <Container>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                Qual painel é ideal para o meu evento?
              </h2>
              <p className="text-[#A1A1A6] mt-3">Ajuste os controles abaixo e descubra em segundos</p>
            </div>
            <PanelCalculator citySlug={cidade} cityName={city.name} />
          </Container>
        </Section>

        {/* Como funciona */}
        <Section className="bg-[#0D0D0D]">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                Como funciona em {city.name}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              {[
                { n: "01", title: "Briefing", desc: `Você nos conta tudo sobre o evento em ${city.name}` },
                { n: "02", title: "Proposta em 2h", desc: "Enviamos orçamento detalhado em até 2 horas úteis" },
                { n: "03", title: "Montagem", desc: "Nossa equipe chega no horário combinado e monta tudo" },
                { n: "04", title: "Operação", desc: "Operador técnico presente do início ao fim do evento" },
              ].map((step, i) => (
                <div key={i} className="relative">
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
            <RepCard city={city} variant="compact" />
          </Container>
        </Section>

        {/* FAQ */}
        <Section className="bg-[#0D0D0D]">
          <Container>
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                  Dúvidas frequentes
                </h2>
              </div>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
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

        {/* CTA final */}
        <section className="py-20 border-t border-[#2C2C2E]">
          <Container>
            <div className="text-center max-w-xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
                Pronto para iluminar seu evento?
              </h2>
              <p className="text-[#A1A1A6] mb-8">Fale com {city.rep.name} agora.</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href={`/${cidade}/orcamento`}>
                  <Button size="lg">Solicitar orçamento gratuito</Button>
                </Link>
                <a
                  href={`https://wa.me/${city.rep.whatsapp}?text=${encodeURIComponent(`Olá, quero alugar painel LED em ${city.name}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" variant="whatsapp">
                    <MessageCircle size={16} />
                    WhatsApp direto
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
