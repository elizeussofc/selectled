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
    title: `Credenciamento de Eventos em ${city.name} | Staff e QR Code | Select LED`,
    description: `Sistema de credenciamento digital para eventos em ${city.name}. QR Code, RFID, impressão de crachás, totem e staff. Orçamento em 2h.`,
    alternates: { canonical: `https://selectledpro.com.br/${cidade}/credenciamento` },
  };
}

export default async function Page({ params }: Props) {
  const { cidade } = await params;
  const city = getCityBySlug(cidade);
  const service = getServiceBySlug("credenciamento");
  if (!city || !service) notFound();
  return <ServicePage city={city} service={service} />;
}
