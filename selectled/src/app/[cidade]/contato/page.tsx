import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCityBySlug, getAllCitySlugs } from "@/data/cities";
import { ContatoContent } from "@/components/sections/ContatoContent";

interface Props { params: Promise<{ cidade: string }> }

export async function generateStaticParams() { return getAllCitySlugs(); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cidade } = await params;
  const city = getCityBySlug(cidade);
  if (!city) return {};
  const title = `Contato Select LED em ${city.name} | Fale com ${city.rep.name}`;
  const description = `Entre em contato com a Select LED em ${city.name}. WhatsApp direto com ${city.rep.name}. Endereço: ${city.address.street}.`;
  return {
    title,
    description,
    alternates: { canonical: `https://selectledpro.com.br/${cidade}/contato` },
    openGraph: { title, description, images: [`/api/og?title=${encodeURIComponent(title)}&city=${encodeURIComponent(city.name)}&type=city`] },
  };
}

export default async function ContatoPage({ params }: Props) {
  const { cidade } = await params;
  const city = getCityBySlug(cidade);
  if (!city) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contato Select LED ${city.name}`,
    url: `https://selectledpro.com.br/${cidade}/contato`,
    mainEntity: {
      "@type": "LocalBusiness",
      name: `Select LED ${city.name}`,
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
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ContatoContent city={city} citySlug={cidade} />
    </>
  );
}
