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
  const title = `Painel LED P1.5, P2 e P2.5 em ${city.name} | Alta Resolução | Select LED`;
  const description = `Compra de painéis LED de alta resolução (P1.5, P2, P2.5) em ${city.name}. Pixel pitch ultra-fino para estúdios, igrejas e auditórios VIP. Garantia 2 anos.`;
  return {
    title,
    description,
    alternates: { canonical: `https://selectledpro.com.br/${cidade}/vendas/p1-5-p2-p2-5` },
    openGraph: { title, description, images: [`/api/og?title=${encodeURIComponent(title)}&city=${encodeURIComponent(city.name)}&type=city`] },
  };
}

export default async function Page({ params }: Props) {
  const { cidade } = await params;
  const city = getCityBySlug(cidade);
  if (!city) notFound();
  const highResProducts = products.filter((p) =>
    ["p1-5-indoor-premium", "p2-indoor", "p2-5-indoor"].includes(p.slug)
  );
  return (
    <ProductPage
      city={city}
      products={highResProducts}
      title={`Painéis LED P1.5, P2 e P2.5 — Alta Densidade em ${city.name}`}
      description={`Os modelos de pixel pitch mais fino da Select LED. Imagem nítida mesmo com público próximo. Ideais para igrejas, estúdios e eventos VIP em ${city.name}.`}
      category="indoor"
      breadcrumbLabel="P1.5 / P2 / P2.5"
      breadcrumbHref={`/${cidade}/vendas/p1-5-p2-p2-5`}
    />
  );
}
