import type { MetadataRoute } from "next";
import { getAllCitySlugs } from "@/data/cities";
import { getAllPostSlugs } from "@/lib/blog";

const BASE_URL = "https://selectled.com.br";

const CITY_SUBPAGES = [
  "",
  "/paineis-led",
  "/som-iluminacao",
  "/foto-filmagem",
  "/internet-eventos",
  "/credenciamento",
  "/vendas",
  "/vendas/indoor",
  "/vendas/outdoor",
  "/vendas/p1-5-p2-p2-5",
  "/vendas/p3-p4",
  "/vendas/instalacao",
  "/vendas/financiamento",
  "/portfolio",
  "/orcamento",
  "/contato",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const citySlugs = getAllCitySlugs().map((c) => c.cidade);
  const postSlugs = getAllPostSlugs();

  const cityUrls: MetadataRoute.Sitemap = citySlugs.flatMap((slug) =>
    CITY_SUBPAGES.map((sub) => ({
      url: `${BASE_URL}/${slug}${sub}`,
      lastModified: new Date(),
      changeFrequency: sub === "" ? ("weekly" as const) : ("monthly" as const),
      priority: sub === "" ? 0.9 : sub === "/paineis-led" ? 0.8 : sub === "/orcamento" ? 0.8 : 0.6,
    }))
  );

  const blogUrls: MetadataRoute.Sitemap = postSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/sobre`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    ...cityUrls,
    ...blogUrls,
  ];
}
