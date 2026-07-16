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
  const title = `Painel LED Outdoor em ${city.name} | Compra e Instalação IP65 | Select LED`;
  const description = `Compra de painéis de LED outdoor IP65 em ${city.name}. P3.9 e P4 com alto brilho. Suporta chuva, sol e vento. Garantia 2 anos.`;
  return {
    title,
    description,
    alternates: { canonical: `https://selectledpro.com.br/${cidade}/vendas/outdoor` },
    openGraph: { title, description, images: [`/api/og?title=${encodeURIComponent(title)}&city=${encodeURIComponent(city.name)}&type=city`] },
  };
}

export default async function Page({ params }: Props) {
  const { cidade } = await params;
  const city = getCityBySlug(cidade);
  if (!city) notFound();
  const outdoorProducts = products.filter((p) => p.category === "outdoor" || p.category === "both");
  return (
    <ProductPage
      city={city}
      products={outdoorProducts}
      title={`Painéis LED Outdoor para Compra em ${city.name}`}
      description={`Painéis outdoor com proteção IP65, alto brilho (até 5.000 nits) e estrutura robusta. Ideal para fachadas, eventos externos e estádios em ${city.name}.`}
      category="outdoor"
      breadcrumbLabel="Outdoor"
      breadcrumbHref={`/${cidade}/vendas/outdoor`}
    />
  );
}
