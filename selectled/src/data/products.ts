export type Product = {
  slug: string;
  name: string;
  shortName: string;
  pitch: string;
  resolution: string;
  brightness: string;
  viewAngle: string;
  minDistance: string;
  warranty: string;
  category: "indoor" | "outdoor" | "both";
  tag?: "mais-vendido" | "premium" | "custo-beneficio";
  priceFrom: number;
  image: string;
  description: string;
};

export const products: Product[] = [
  {
    slug: "p1-5-indoor-premium",
    name: "Painel LED P1.5 Indoor Premium",
    shortName: "P1.5 Indoor",
    pitch: "1.5mm",
    resolution: "416 × 312 px/módulo",
    brightness: "800 nits",
    viewAngle: "160°",
    minDistance: "1.5m",
    warranty: "2 anos",
    category: "indoor",
    tag: "premium",
    priceFrom: 1800,
    image: "/products/p1-5.webp",
    description: "Máxima resolução para estúdios, broadcasting e auditórios VIP com público próximo.",
  },
  {
    slug: "p2-indoor",
    name: "Painel LED P2 Indoor",
    shortName: "P2 Indoor",
    pitch: "2mm",
    resolution: "320 × 160 px/módulo",
    brightness: "1000 nits",
    viewAngle: "160°",
    minDistance: "2m",
    warranty: "2 anos",
    category: "indoor",
    tag: "mais-vendido",
    priceFrom: 1200,
    image: "/products/p2.webp",
    description: "O padrão de ouro para eventos corporativos, feiras e igrejas modernas.",
  },
  {
    slug: "p2-5-indoor",
    name: "Painel LED P2.5 Indoor",
    shortName: "P2.5 Indoor",
    pitch: "2.5mm",
    resolution: "256 × 128 px/módulo",
    brightness: "1200 nits",
    viewAngle: "160°",
    minDistance: "3m",
    warranty: "2 anos",
    category: "indoor",
    tag: "custo-beneficio",
    priceFrom: 900,
    image: "/products/p2-5.webp",
    description: "Excelente relação custo-benefício para auditórios médios e grandes.",
  },
  {
    slug: "p3-indoor",
    name: "Painel LED P3 Indoor",
    shortName: "P3 Indoor",
    pitch: "3mm",
    resolution: "128 × 128 px/módulo",
    brightness: "1500 nits",
    viewAngle: "140°",
    minDistance: "5m",
    warranty: "2 anos",
    category: "indoor",
    priceFrom: 650,
    image: "/products/p3.webp",
    description: "Versátil e robusto para igrejas, centros de eventos e shows indoor.",
  },
  {
    slug: "p3-9-outdoor",
    name: "Painel LED P3.9 Outdoor",
    shortName: "P3.9 Outdoor",
    pitch: "3.9mm",
    resolution: "128 × 128 px/módulo",
    brightness: "4000 nits",
    viewAngle: "140°",
    minDistance: "8m",
    warranty: "2 anos",
    category: "outdoor",
    tag: "mais-vendido",
    priceFrom: 750,
    image: "/products/p3-9-outdoor.webp",
    description: "IP65, alto brilho para uso externo. Perfeito para fachadas e eventos ao ar livre.",
  },
  {
    slug: "p4-outdoor",
    name: "Painel LED P4 Outdoor",
    shortName: "P4 Outdoor",
    pitch: "4mm",
    resolution: "128 × 64 px/módulo",
    brightness: "5000 nits",
    viewAngle: "120°",
    minDistance: "10m",
    warranty: "2 anos",
    category: "outdoor",
    priceFrom: 550,
    image: "/products/p4-outdoor.webp",
    description: "Máximo brilho para ambientes externos intensamente iluminados e grandes distâncias.",
  },
];

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);
