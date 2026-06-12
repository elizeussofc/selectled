import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCityBySlug, getAllCitySlugs } from "@/data/cities";
import { PaineisLedContent } from "@/components/sections/PaineisLedContent";

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
    title: `Aluguel de Painel de LED em ${city.name} | Locação Diária | Select LED`,
    description: `Locação de painéis de LED em ${city.name} a partir de R$ 450/m². P2, P2.5, P3 e outdoor. Entrega + montagem + operador. Orçamento em 2h.`,
    alternates: { canonical: `https://selectled.com.br/${cidade}/paineis-led` },
  };
}

export default async function PaineisLEDPage({ params }: Props) {
  const { cidade } = await params;
  const city = getCityBySlug(cidade);
  if (!city) notFound();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: `Quanto custa alugar painel de LED em ${city.name}?`, acceptedAnswer: { "@type": "Answer", text: `Os preços variam de R$ 450/m²/dia (P4 outdoor) a R$ 800/m²/dia (P2.5 indoor). Solicite uma proposta personalizada.` } },
      { "@type": "Question", name: `Vocês fazem montagem em ${city.name}?`, acceptedAnswer: { "@type": "Answer", text: "Sim! Realizamos toda a montagem, calibração e desmontagem." } },
      { "@type": "Question", name: "Posso alugar por apenas um dia?", acceptedAnswer: { "@type": "Answer", text: "Sim, trabalhamos com locações por evento — diárias ou multi-diárias." } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <PaineisLedContent city={city} />
    </>
  );
}
