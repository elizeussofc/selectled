import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCityBySlug, getAllCitySlugs } from "@/data/cities";
import { getCasesByCity } from "@/data/cases";
import { CityPageContent } from "@/components/sections/CityPageContent";

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
    alternates: { canonical: `https://selectledpro.com.br/${cidade}` },
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
    url: `https://selectledpro.com.br/${cidade}`,
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
    image: `https://selectledpro.com.br/api/og?city=${cidade}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CityPageContent city={city} cases={cases} cidade={cidade} />
    </>
  );
}
