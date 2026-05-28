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
    title: `Painel LED P3 e P4 em ${city.name} | Média Densidade | Select LED`,
    description: `Compra de painéis LED P3 e P4 em ${city.name}. Versatilidade para shows, feiras e fachadas. Custo-benefício excelente e garantia 2 anos.`,
  };
}

export default async function Page({ params }: Props) {
  const { cidade } = await params;
  const city = getCityBySlug(cidade);
  if (!city) notFound();
  const medResProducts = products.filter((p) =>
    ["p3-indoor", "p3-9-outdoor", "p4-outdoor"].includes(p.slug)
  );
  return (
    <ProductPage
      city={city}
      products={medResProducts}
      title={`Painéis LED P3, P3.9 e P4 — Versáteis e Robustos em ${city.name}`}
      description={`Os modelos P3 e P4 oferecem excelente custo-benefício para grandes instalações, shows, feiras e uso externo em ${city.name}.`}
      category="mixed"
      breadcrumbLabel="P3 / P4"
      breadcrumbHref={`/${cidade}/vendas/p3-p4`}
    />
  );
}
