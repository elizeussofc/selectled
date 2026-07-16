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
    title: `Som e Iluminação para Eventos em ${city.name} | Select LED`,
    description: `Locação de sistema de som e iluminação em ${city.name}. Mesa digital, line array, moving heads. Operador incluso. Orçamento em 2h.`,
    alternates: { canonical: `https://selectledpro.com.br/${cidade}/som-iluminacao` },
  };
}

export default async function Page({ params }: Props) {
  const { cidade } = await params;
  const city = getCityBySlug(cidade);
  const service = getServiceBySlug("som-iluminacao");
  if (!city || !service) notFound();
  return <ServicePage city={city} service={service} />;
}
