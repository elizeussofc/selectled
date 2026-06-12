import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCityBySlug, getAllCitySlugs } from "@/data/cities";
import { VendasContent } from "@/components/sections/VendasContent";

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
      <VendasContent city={city} citySlug={cidade} />
    </>
  );
}
