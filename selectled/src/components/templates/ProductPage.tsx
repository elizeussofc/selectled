import Link from "next/link";
import { MessageCircle, CheckCircle, ChevronRight } from "lucide-react";
import type { City } from "@/data/cities";
import type { Product } from "@/data/products";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WAFloat } from "@/components/layout/WAFloat";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { PanelCalculator } from "@/components/sections/PanelCalculator";

interface ProductPageProps {
  city: City;
  products: Product[];
  title: string;
  description: string;
  category: "indoor" | "outdoor" | "mixed";
  breadcrumbLabel: string;
  breadcrumbHref: string;
}

export function ProductPage({
  city, products, title, description, category, breadcrumbLabel, breadcrumbHref,
}: ProductPageProps) {
  const specs = [
    { label: "Pixel Pitch", key: "pitch" },
    { label: "Resolução/módulo", key: "resolution" },
    { label: "Brilho", key: "brightness" },
    { label: "Ângulo de visão", key: "viewAngle" },
    { label: "Distância mín.", key: "minDistance" },
    { label: "Garantia", key: "warranty" },
  ] as const;

  return (
    <>
      <Header citySlug={city.slug} variant="sales" />

      <main className="bg-[#0A0A0A]">
        {/* Hero */}
        <section className="pt-28 pb-16 border-b border-[#1C1C1E]">
          <Container>
            <div className="flex items-center gap-1.5 text-xs text-[#6E6E73] mb-6">
              <Link href="/" className="hover:text-[#A1A1A6] transition-colors">Select LED</Link>
              <ChevronRight size={10} />
              <Link href={`/${city.slug}`} className="hover:text-[#A1A1A6] transition-colors">{city.name}</Link>
              <ChevronRight size={10} />
              <Link href={`/${city.slug}/vendas`} className="hover:text-[#A1A1A6] transition-colors">Vendas</Link>
              <ChevronRight size={10} />
              <span className="text-[#A1A1A6]">{breadcrumbLabel}</span>
            </div>

            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#FF0000] mb-3">
                Painéis para Compra — {city.name}
              </p>
              <h1
                className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
              >
                {title}
              </h1>
              <p className="text-lg text-[#A1A1A6] mb-8 leading-relaxed">{description}</p>
              <div className="flex flex-wrap gap-3">
                <Link href={`/${city.slug}/orcamento?tipo=venda`}>
                  <Button size="lg">Solicitar proposta</Button>
                </Link>
                <a
                  href={`https://wa.me/${city.rep.whatsapp}?text=${encodeURIComponent(`Olá, ${city.rep.name}! Tenho interesse em comprar painel de LED em ${city.name}.`)}`}
                  target="_blank" rel="noopener noreferrer"
                >
                  <Button size="lg" variant="whatsapp">
                    <MessageCircle size={16} /> WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </Container>
        </section>

        {/* Tabela comparativa de specs */}
        <Section>
          <Container>
            <h2 className="text-2xl font-bold text-white mb-8" style={{ fontFamily: "var(--font-display)" }}>
              Especificações técnicas
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-[#2C2C2E] rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-[#141414]">
                    <th className="text-left py-3 px-5 text-xs uppercase tracking-wide text-[#6E6E73] font-medium border-b border-[#2C2C2E]">
                      Especificação
                    </th>
                    {products.map((p) => (
                      <th key={p.slug} className="text-left py-3 px-5 text-xs uppercase tracking-wide font-medium border-b border-[#2C2C2E]">
                        <span className="text-[#FF0000]">{p.shortName}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {specs.map((spec) => (
                    <tr key={spec.label} className="border-b border-[#1C1C1E] last:border-0 hover:bg-[#141414] transition-colors">
                      <td className="py-3.5 px-5 text-[#6E6E73] font-medium">{spec.label}</td>
                      {products.map((p) => (
                        <td key={p.slug} className="py-3.5 px-5 text-[#F5F5F7]">
                          {p[spec.key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr className="border-b border-[#1C1C1E] bg-[rgba(255,0,0,0.03)]">
                    <td className="py-3.5 px-5 text-[#6E6E73] font-medium">A partir de</td>
                    {products.map((p) => (
                      <td key={p.slug} className="py-3.5 px-5">
                        <span className="font-bold text-white">R$ {p.priceFrom.toLocaleString("pt-BR")}/m²</span>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </Container>
        </Section>

        {/* Aplicações ideais */}
        <Section className="bg-[#0D0D0D]">
          <Container>
            <h2 className="text-2xl font-bold text-white mb-8 text-center" style={{ fontFamily: "var(--font-display)" }}>
              Aplicações ideais
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {(category === "indoor" ? [
                { title: "Igrejas e templos", desc: "Altar, telão de apoio, fundo de palco" },
                { title: "Auditórios corporativos", desc: "Apresentações, conferências, treinamentos" },
                { title: "Showrooms permanentes", desc: "Exposição de produtos e serviços" },
                { title: "Estúdios e broadcasting", desc: "Cenários virtuais e transmissões ao vivo" },
                { title: "Centros de eventos", desc: "Feiras, exposições, formaturas" },
                { title: "Hotéis e convenções", desc: "Salas de convenção e áreas comuns" },
              ] : [
                { title: "Fachadas digitais", desc: "Mídia OOH e identidade visual" },
                { title: "Eventos ao ar livre", desc: "Shows, festivais e feiras externas" },
                { title: "Estádios e arenas", desc: "Placar eletrônico e telão lateral" },
                { title: "Autódromos e parques", desc: "Sinalização e entretenimento" },
                { title: "Shopping centers", desc: "Fachadas e espaços de circulação" },
                { title: "Lançamentos externos", desc: "Drive-in, open air e eventos híbridos" },
              ]).map((app) => (
                <div key={app.title} className="flex items-start gap-3 p-4 bg-[#141414] border border-[#2C2C2E] rounded-xl">
                  <CheckCircle size={15} className="text-[#30D158] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-white">{app.title}</p>
                    <p className="text-xs text-[#6E6E73] mt-0.5">{app.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Calculadora */}
        <Section>
          <Container>
            <h2 className="text-2xl font-bold text-white mb-8 text-center" style={{ fontFamily: "var(--font-display)" }}>
              Calcule o tamanho ideal
            </h2>
            <PanelCalculator citySlug={city.slug} cityName={city.name} />
          </Container>
        </Section>

        {/* CTA */}
        <section className="py-20 border-t border-[#2C2C2E]">
          <Container>
            <div className="text-center max-w-xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
                Solicite uma proposta para {city.name}
              </h2>
              <p className="text-[#A1A1A6] mb-8">
                Projeto personalizado com instalação, treinamento e garantia de 2 anos.
              </p>
              <Link href={`/${city.slug}/orcamento?tipo=venda`}>
                <Button size="lg">Quero minha proposta</Button>
              </Link>
            </div>
          </Container>
        </section>
      </main>

      <Footer citySlug={city.slug} />
      <WAFloat city={city} />
    </>
  );
}
