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
  const title = `Aluguel de Painel de LED em ${city.name} | Locação Diária | Select LED`;
  const description = `Locação de painéis de LED em ${city.name}. P2, P2.5, P3 e outdoor. Entrega + montagem + operador. Orçamento em 2h.`;
  return {
    title,
    description,
    alternates: { canonical: `https://selectledpro.com.br/${cidade}/paineis-led` },
    openGraph: { title, description, images: [`/api/og?title=${encodeURIComponent(title)}&city=${encodeURIComponent(city.name)}&type=city`] },
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
      { "@type": "Question", name: `Quanto custa alugar painel de LED em ${city.name}?`, acceptedAnswer: { "@type": "Answer", text: `O valor varia conforme o modelo do painel, a metragem e o tempo de locação. Entre em contato para receber uma proposta personalizada.` } },
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
