import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCityBySlug, getAllCitySlugs } from "@/data/cities";
import { getServiceBySlug } from "@/data/services";
import { ServicePage } from "@/components/templates/ServicePage";

interface Props { params: Promise<{ cidade: string }> }

export async function generateStaticParams() { return getAllCitySlugs(); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cidade } = await params;
  const city = getCityBySlug(cidade);
  if (!city) return {};
  return {
    title: `Foto e Filmagem para Eventos em ${city.name} | Select LED`,
    description: `Cobertura fotográfica e videográfica para eventos em ${city.name}. 4K, streaming ao vivo, drone. Entrega em 7 dias. Orçamento em 2h.`,
    alternates: { canonical: `https://selectledpro.com.br/${cidade}/foto-filmagem` },
  };
}

export default async function Page({ params }: Props) {
  const { cidade } = await params;
  const city = getCityBySlug(cidade);
  const service = getServiceBySlug("foto-filmagem");
  if (!city || !service) notFound();
  return <ServicePage city={city} service={service} />;
}
