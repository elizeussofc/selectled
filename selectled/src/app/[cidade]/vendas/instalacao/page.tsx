import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getCityBySlug, getAllCitySlugs } from "@/data/cities";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WAFloat } from "@/components/layout/WAFloat";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { CheckCircle, ChevronRight, MessageCircle } from "lucide-react";

interface Props { params: Promise<{ cidade: string }> }

export async function generateStaticParams() { return getAllCitySlugs(); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cidade } = await params;
  const city = getCityBySlug(cidade);
  if (!city) return {};
  return {
    title: `Instalação de Painel LED em ${city.name} | Equipe Certificada | Select LED`,
    description: `Instalação profissional de painéis de LED em ${city.name}. Equipe técnica certificada, projeto de estrutura, cabeamento e comissionamento incluso.`,
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
              <span className="text-[#A1A1A6]">Instalação</span>
            </div>
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#FF0000] mb-3">Serviço técnico</p>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}>
                Instalação de Painel LED em {city.name}
              </h1>
              <p className="text-lg text-[#A1A1A6] mb-8 leading-relaxed">
                Equipe técnica certificada que cuida de todo o processo: projeto de estrutura, cabeamento, fixação, cabeamento de sinal e comissionamento completo do sistema.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href={`/${cidade}/orcamento?tipo=instalacao`}><Button size="lg">Solicitar visita técnica</Button></Link>
                <a href={`https://wa.me/${city.rep.whatsapp}?text=${encodeURIComponent(`Olá, preciso de instalação de painel LED em ${city.name}.`)}`} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="whatsapp"><MessageCircle size={16} /> WhatsApp</Button>
                </a>
              </div>
            </div>
          </Container>
        </section>

        <Section>
          <Container>
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-display)" }}>O que está incluído</h2>
                <ul className="space-y-3">
                  {[
                    "Visita técnica prévia para levantamento do local",
                    "Projeto de estrutura de suporte (treliça, parede ou teto)",
                    "Fornecimento e instalação de estrutura metálica certificada",
                    "Cabeamento de alimentação e sinal (HDMI/DVI/fiber)",
                    "Configuração do processador de vídeo",
                    "Calibração de brilho, contraste e uniformidade",
                    "Treinamento de operação para equipe local (2h)",
                    "ART (Anotação de Responsabilidade Técnica) inclusa",
                    "Garantia de instalação: 12 meses",
                  ].map((d) => (
                    <li key={d} className="flex items-start gap-3 text-sm text-[#A1A1A6]">
                      <CheckCircle size={15} className="text-[#30D158] mt-0.5 shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-display)" }}>Etapas da instalação</h2>
                <div className="space-y-4">
                  {[
                    { n: "01", t: "Visita técnica", d: "Medição do espaço, análise estrutural e definição do projeto" },
                    { n: "02", t: "Projeto executivo", d: "Elaboração do projeto com ART e lista de materiais" },
                    { n: "03", t: "Instalação da estrutura", d: "Fixação da estrutura de suporte com equipe certificada" },
                    { n: "04", t: "Montagem do painel", d: "Encaixe dos módulos, cabeamento e configuração" },
                    { n: "05", t: "Comissionamento", d: "Testes, calibração e treinamento da equipe local" },
                  ].map((s) => (
                    <div key={s.n} className="flex gap-4 p-4 bg-[#141414] border border-[#2C2C2E] rounded-xl">
                      <span className="text-2xl font-black text-[#2C2C2E] shrink-0" style={{ fontFamily: "var(--font-display)" }}>{s.n}</span>
                      <div>
                        <p className="text-sm font-semibold text-white">{s.t}</p>
                        <p className="text-xs text-[#6E6E73] mt-0.5">{s.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer citySlug={cidade} />
      <WAFloat city={city} />
    </>
  );
}
