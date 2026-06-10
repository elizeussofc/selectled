import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getCityBySlug, getAllCitySlugs } from "@/data/cities";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WAFloat } from "@/components/layout/WAFloat";
import { FinancingSimulator } from "@/components/sections/FinancingSimulator";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { ChevronRight, MessageCircle } from "lucide-react";

interface Props { params: Promise<{ cidade: string }> }

export async function generateStaticParams() { return getAllCitySlugs(); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cidade } = await params;
  const city = getCityBySlug(cidade);
  if (!city) return {};
  return {
    title: `Financiamento de Painel LED em ${city.name} | Até 48x | Select LED`,
    description: `Financie seu painel de LED em ${city.name} em até 48 parcelas. Aprovação rápida, entrada flexível e assessoria completa da Select LED.`,
  };
}

export default async function Page({ params }: Props) {
  const { cidade } = await params;
  const city = getCityBySlug(cidade);
  if (!city) notFound();

  return (
    <>
      <Header citySlug={cidade} variant="sales" />
      <main className="bg-[#0A0A0A]">
        <section className="pt-28 pb-16 border-b border-[#1C1C1E]">
          <Container>
            <div className="flex items-center gap-1.5 text-xs text-[#6E6E73] mb-6">
              <Link href="/" className="hover:text-[#A1A1A6] transition-colors">Select LED</Link>
              <ChevronRight size={10} />
              <Link href={`/${cidade}`} className="hover:text-[#A1A1A6] transition-colors">{city.name}</Link>
              <ChevronRight size={10} />
              <Link href={`/${cidade}/vendas`} className="hover:text-[#A1A1A6] transition-colors">Vendas</Link>
              <ChevronRight size={10} />
              <span className="text-[#A1A1A6]">Financiamento</span>
            </div>
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#FF3B30] mb-3">Financiamento</p>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}>
                Financie seu painel em até 48 parcelas
              </h1>
              <p className="text-lg text-[#A1A1A6] mb-8 leading-relaxed">
                Não deixe o orçamento segurar seu projeto. Trabalhamos com condições flexíveis de financiamento para igrejas, empresas e projetos de médio e grande porte em {city.name}.
              </p>
              <a href={`https://wa.me/${city.rep.whatsapp}?text=${encodeURIComponent(`Olá, quero financiar um painel LED em ${city.name}.`)}`} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="whatsapp"><MessageCircle size={16} /> Falar com consultor</Button>
              </a>
            </div>
          </Container>
        </section>

        <Section>
          <Container>
            <FinancingSimulator citySlug={cidade} repWhatsapp={city.rep.whatsapp} />
          </Container>
        </Section>

        <Section className="bg-[#0D0D0D]">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-3xl mx-auto">
              {[
                { title: "Entrada flexível", desc: "A partir de 10% do valor total do projeto" },
                { title: "Prazo estendido", desc: "Parcele em até 48x com taxas competitivas" },
                { title: "Aprovação ágil", desc: "Análise em até 48h úteis para PJ" },
              ].map((b) => (
                <div key={b.title} className="text-center p-6 bg-[#141414] border border-[#2C2C2E] rounded-2xl">
                  <h3 className="font-semibold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>{b.title}</h3>
                  <p className="text-sm text-[#6E6E73]">{b.desc}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      </main>
      <Footer citySlug={cidade} />
      <WAFloat city={city} />
    </>
  );
}
