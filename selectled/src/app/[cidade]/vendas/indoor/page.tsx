import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCityBySlug, getAllCitySlugs } from "@/data/cities";
import { products } from "@/data/products";
import { ProductPage } from "@/components/templates/ProductPage";

interface Props { params: Promise<{ cidade: string }> }

export async function generateStaticParams() { return getAllCitySlugs(); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cidade } = await params;
  const city = getCityBySlug(cidade);
  if (!city) return {};
  return {
    title: `Painel LED Indoor em ${city.name} | Compra e Instalação | Select LED`,
    description: `Compra de painéis de LED indoor em ${city.name}. P1.5, P2, P2.5, P3. Alta resolução, instalação inclusa, garantia 2 anos.`,
  };
}

export default async function Page({ params }: Props) {
  const { cidade } = await params;
  const city = getCityBySlug(cidade);
  if (!city) notFound();
  const indoorProducts = products.filter((p) => p.category === "indoor" || p.category === "both");
  return (
    <ProductPage
      city={city}
      products={indoorProducts}
      title={`Painéis LED Indoor para Compra em ${city.name}`}
      description={`Linha completa de painéis indoor para igrejas, auditórios, showrooms e eventos em ${city.name}. Alta resolução, instalação certificada, garantia 2 anos.`}
      category="indoor"
      breadcrumbLabel="Indoor"
      breadcrumbHref={`/${cidade}/vendas/indoor`}
    />
  );
}
