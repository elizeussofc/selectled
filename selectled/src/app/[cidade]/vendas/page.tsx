import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getCityBySlug, getAllCitySlugs } from "@/data/cities";
import { products } from "@/data/products";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WAFloat } from "@/components/layout/WAFloat";
import { FinancingSimulator } from "@/components/sections/FinancingSimulator";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import {
  Globe, Wrench, Shield, GraduationCap, MessageCircle,
  ChevronRight, ArrowDown, ExternalLink
} from "lucide-react";

interface Props { params: Promise<{ cidade: string }> }

export async function generateStaticParams() { return getAllCitySlugs(); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cidade } = await params;
  const city = getCityBySlug(cidade);
  if (!city) return {};
  return {
    title: `Comprar Painel de LED em ${city.name} | Indoor e Outdoor | Select LED`,
    description: `Venda de painéis de LED em ${city.name}. P1.5, P2, P3, outdoor. Instalação inclusa, garantia 2 anos e financiamento em até 48x.`,
    alternates: { canonical: `https://selectled.com.br/${cidade}/vendas` },
  };
}

const subPages = [
  { href: "indoor", label: "Indoor" },
  { href: "outdoor", label: "Outdoor" },
  { href: "p1-5-p2-p2-5", label: "P1.5 / P2 / P2.5" },
  { href: "p3-p4", label: "P3 / P4" },
  { href: "instalacao", label: "Instalação" },
  { href: "financiamento", label: "Financiamento" },
];

const tagLabels: Record<string, string> = {
  "mais-vendido": "Mais vendido",
  premium: "Premium",
  "custo-beneficio": "Custo-benefício",
};

export default async function VendasPage({ params }: Props) {
  const { cidade } = await params;
  const city = getCityBySlug(cidade);
  if (!city) notFound();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "Qual o prazo de entrega do painel?", acceptedAnswer: { "@type": "Answer", text: "O prazo médio é de 30 a 45 dias corridos após confirmação do pedido." } },
      { "@type": "Question", name: "Quanto tempo dura a garantia?", acceptedAnswer: { "@type": "Answer", text: "Todos os painéis da Select LED têm garantia de 2 anos contra defeitos de fabricação." } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Header citySlug={cidade} variant="sales" />

      <main className="bg-[#0A0A0A]">
        {/* Hero imersivo */}
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
          {/* Fundo */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[#0A0A0A]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(255,59,48,0.08)_0%,transparent_70%)]" />
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: "linear-gradient(rgba(255,59,48,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,59,48,0.5) 1px, transparent 1px)",
                backgroundSize: "80px 80px",
              }}
            />
          </div>

          <Container className="relative z-10 py-40">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#FF3B30] mb-6">
              Linha de Venda — {city.name}
            </p>
            <h1
              className="text-6xl sm:text-7xl md:text-8xl font-bold text-white mb-6 leading-none"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.04em" }}
            >
              Compre o seu<br />
              <span className="text-[#FF3B30]">painel de LED</span>
            </h1>
            <p className="text-xl text-[#A1A1A6] mb-12 max-w-lg mx-auto leading-relaxed">
              Linha completa para venda em {city.name}. Instalação, treinamento e garantia.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="#catalogo">
                <Button size="lg">
                  Ver catálogo <ArrowDown size={16} />
                </Button>
              </a>
              <a
                href={`https://wa.me/${city.rep.whatsapp}?text=${encodeURIComponent(`Olá, ${city.rep.name}! Quero comprar um painel de LED em ${city.name}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="outline">
                  <MessageCircle size={16} />
                  Falar com consultor
                </Button>
              </a>
            </div>
          </Container>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#3A3A3C]">
            <ArrowDown size={18} className="animate-bounce" />
          </div>
        </section>

        {/* Nav interna sticky */}
        <div className="sticky top-16 z-30 bg-[#0A0A0A]/95 backdrop-blur-sm border-b border-[#2C2C2E]">
          <Container>
            <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
              {subPages.map((p) => (
                <Link
                  key={p.href}
                  href={`/${cidade}/vendas/${p.href}`}
                  className="flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium text-[#6E6E73] hover:text-white hover:bg-[#1C1C1E] transition-colors whitespace-nowrap"
                >
                  {p.label}
                </Link>
              ))}
              <a href="#financiamento" className="flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium text-[#FF3B30] hover:bg-[rgba(255,59,48,0.08)] transition-colors whitespace-nowrap">
                Simular financiamento
              </a>
            </div>
          </Container>
        </div>

        {/* Por que comprar */}
        <Section>
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                Por que comprar com a Select LED?
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {[
                { Icon: Globe, title: "Importação direta", desc: "Preço melhor, sem intermediários" },
                { Icon: Wrench, title: "Instalação inclusa", desc: "Nossa equipe faz tudo por você" },
                { Icon: Shield, title: "Garantia 2 anos", desc: "Suporte técnico pós-venda" },
                { Icon: GraduationCap, title: "Treinamento da equipe", desc: "Capacitamos quem vai operar" },
              ].map(({ Icon, title, desc }) => (
                <div key={title} className="flex flex-col items-center text-center p-6 bg-[#141414] border border-[#2C2C2E] rounded-2xl">
                  <div className="p-3 bg-[rgba(255,59,48,0.10)] rounded-2xl mb-4">
                    <Icon size={22} className="text-[#FF3B30]" />
                  </div>
                  <h3 className="font-semibold text-white text-sm mb-1">{title}</h3>
                  <p className="text-xs text-[#6E6E73]">{desc}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Catálogo */}
        <Section id="catalogo" className="bg-[#0D0D0D]">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                Catálogo de produtos
              </h2>
              <p className="text-[#A1A1A6] mt-3">Todos os modelos disponíveis para compra em {city.name}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {products.map((product) => (
                <div
                  key={product.slug}
                  className="group bg-[#141414] border border-[#2C2C2E] rounded-2xl overflow-hidden hover:border-[rgba(255,59,48,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-900/20"
                >
                  {/* Imagem placeholder */}
                  <div className="relative h-48 bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-black text-[rgba(255,59,48,0.15)] mb-1" style={{ fontFamily: "var(--font-display)" }}>
                        {product.shortName}
                      </div>
                      <div className="text-xs text-[#3A3A3C]">{product.pitch} pitch</div>
                    </div>
                    {product.tag && (
                      <div className="absolute top-3 right-3">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          product.tag === "mais-vendido"
                            ? "bg-[rgba(255,59,48,0.15)] text-[#FF3B30]"
                            : product.tag === "premium"
                            ? "bg-[rgba(255,215,0,0.1)] text-[#FFD700]"
                            : "bg-[rgba(48,209,88,0.1)] text-[#30D158]"
                        }`}>
                          {tagLabels[product.tag]}
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
                        <p className="text-xs text-[#6E6E73]">A partir de</p>
                        <p className="text-lg font-bold text-white">
                          R$ {product.priceFrom.toLocaleString("pt-BR")}
                          <span className="text-xs text-[#6E6E73] font-normal">/m²</span>
                        </p>
                      </div>
                      <a
                        href={`https://wa.me/${city.rep.whatsapp}?text=${encodeURIComponent(`Olá, tenho interesse no ${product.name} para ${city.name}.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-[#FF3B30] flex items-center gap-1 hover:gap-2 transition-all"
                      >
                        Ver detalhes <ExternalLink size={11} />
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
                Clientes que compraram
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { type: "Igreja", desc: "Painel P2 Indoor 12x5m instalado no altar principal.", client: "Igreja Comunidade da Graça", model: "P2 Indoor" },
                { type: "Showroom", desc: "Painel P1.5 Indoor para sala de reuniões e apresentações.", client: "MNZ Construtora", model: "P1.5 Indoor Premium" },
                { type: "Auditório", desc: "Painel P3 Indoor para auditório corporativo de 800 lugares.", client: "SENAI Regional SP", model: "P3 Indoor" },
              ].map((c) => (
                <div key={c.client} className="bg-[#141414] border border-[#2C2C2E] rounded-2xl p-6">
                  <span className="text-xs font-semibold text-[#FF3B30] uppercase tracking-wide">{c.type}</span>
                  <h3 className="text-base font-semibold text-white mt-2 mb-1">{c.client}</h3>
                  <p className="text-sm text-[#6E6E73] mb-3">{c.desc}</p>
                  <p className="text-xs text-[#A1A1A6]">Modelo: <span className="text-white">{c.model}</span></p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Simulador financiamento */}
        <Section id="financiamento" className="bg-[#0D0D0D]">
          <Container>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                Simule seu financiamento
              </h2>
              <p className="text-[#A1A1A6] mt-3">Financiamento em até 48 parcelas</p>
            </div>
            <div className="max-w-2xl mx-auto">
              <FinancingSimulator citySlug={cidade} repWhatsapp={city.rep.whatsapp} />
            </div>
          </Container>
        </Section>

        {/* FAQ */}
        <Section>
          <Container>
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8 text-center" style={{ fontFamily: "var(--font-display)" }}>
                Dúvidas sobre compra
              </h2>
              <div className="space-y-3">
                {[
                  { q: "Qual o prazo de entrega do painel?", a: "O prazo médio é de 30 a 45 dias corridos após confirmação do pedido e pagamento." },
                  { q: "Quanto tempo dura a garantia?", a: "Todos os painéis da Select LED têm garantia de 2 anos contra defeitos de fabricação." },
                  { q: "Vocês fazem o suporte técnico depois?", a: "Sim, oferecemos suporte técnico pós-venda por telefone, WhatsApp e visita técnica quando necessário." },
                  { q: `Está incluso treinamento da equipe?`, a: "Sim, realizamos treinamento básico de operação para a equipe que vai usar o equipamento." },
                  { q: `Vocês fazem a instalação em ${city.name}?`, a: `Sim! Realizamos a instalação completa em ${city.name} e toda a região com nossa equipe técnica certificada.` },
                  { q: "Quais formas de pagamento aceitam?", a: "PIX, transferência, boleto e cartão de crédito em até 12x. Para financiamento, trabalhamos com parceiros financeiros." },
                ].map((faq, i) => (
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
        <section className="py-24 bg-[#0D0D0D] border-t border-[#2C2C2E]">
          <Container>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
                Pronto para ter seu próprio painel em {city.name}?
              </h2>
              <p className="text-[#A1A1A6] mb-10">
                Receba uma proposta personalizada em até 24h. Sem compromisso.
              </p>
              <Link href={`/${cidade}/orcamento?tipo=venda`}>
                <Button size="lg" className="w-full sm:w-auto">
                  Solicitar proposta de compra
                </Button>
              </Link>
            </div>
          </Container>
        </section>
      </main>

      <Footer citySlug={cidade} />
      <WAFloat city={city} />
    </>
  );
}
