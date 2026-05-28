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
    title: `Internet para Eventos em ${city.name} | Wi-Fi Gerenciado | Select LED`,
    description: `Infraestrutura de internet para eventos em ${city.name}. Wi-Fi gerenciado, link dedicado, backup 4G. Técnico presente. Orçamento em 2h.`,
    alternates: { canonical: `https://selectled.com.br/${cidade}/internet-eventos` },
  };
}

export default async function Page({ params }: Props) {
  const { cidade } = await params;
  const city = getCityBySlug(cidade);
  const service = getServiceBySlug("internet-eventos");
  if (!city || !service) notFound();
  return <ServicePage city={city} service={service} />;
}
