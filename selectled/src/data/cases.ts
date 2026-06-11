export type Case = {
  id: string;
  citySlug: string;
  client: string;
  title: string;
  category: "corporativo" | "show" | "casamento" | "igreja" | "feira" | "lancamento" | "palestra";
  date: string;
  location: string;
  audience: number;
  thumbnail: string;
  gallery: string[];
  equipment: string[];
  testimonial?: { text: string; author: string; role: string };
  services: string[];
};

export const cases: Case[] = [
  {
    id: "case-001",
    citySlug: "sao-paulo",
    client: "Banco Itaú",
    title: "Convenção Nacional de Gestores",
    category: "corporativo",
    date: "2024-03",
    location: "Transamerica Expo Center — São Paulo",
    audience: 1500,
    thumbnail: "/images/portfolio/1-corporativo.jpg",
    gallery: ["/images/portfolio/1-corporativo.jpg"],
    equipment: ["Painel LED P2.5 Indoor 8x4m", "Som Line Array", "Iluminação cênica"],
    testimonial: {
      text: "A Select LED entregou muito além do esperado. O painel LED transformou completamente a experiência dos nossos gestores.",
      author: "Maria Silva",
      role: "Gerente de Eventos — Itaú",
    },
    services: ["paineis-led", "som-iluminacao"],
  },
  {
    id: "case-002",
    citySlug: "sao-paulo",
    client: "Rock in Rio São Paulo",
    title: "Festival Rock in Rio",
    category: "show",
    date: "2024-09",
    location: "Cidade do Rock — São Paulo",
    audience: 20000,
    thumbnail: "/images/portfolio/2-show.jpg",
    gallery: ["/images/portfolio/2-show.jpg"],
    equipment: ["Painel LED P3.9 Outdoor 20x10m", "Internet dedicada"],
    services: ["paineis-led", "internet-eventos"],
  },
  {
    id: "case-003",
    citySlug: "alphaville",
    client: "Bradesco Seguros",
    title: "Lançamento de Produto B2B",
    category: "lancamento",
    date: "2024-05",
    location: "Espaço Alphaville — Barueri",
    audience: 300,
    thumbnail: "/cases/alpha-bradesco.webp",
    gallery: ["/cases/alpha-bradesco-1.webp"],
    equipment: ["Painel LED P2 Indoor 6x3m", "Credenciamento digital"],
    testimonial: {
      text: "Profissionalismo impecável. O painel LED elevou o nível da nossa apresentação.",
      author: "Carlos Mendes",
      role: "Diretor de Marketing — Bradesco Seguros",
    },
    services: ["paineis-led", "credenciamento"],
  },
  {
    id: "case-004",
    citySlug: "campinas",
    client: "ExpoAgro Campinas",
    title: "Feira de Agronegócio 2024",
    category: "feira",
    date: "2024-07",
    location: "Expotel Center — Campinas",
    audience: 5000,
    thumbnail: "/cases/campinas-expoagro.webp",
    gallery: ["/cases/campinas-expoagro-1.webp"],
    equipment: ["Painel LED P4 Outdoor 12x6m", "Internet para estandes"],
    services: ["paineis-led", "internet-eventos"],
  },
  {
    id: "case-005",
    citySlug: "sao-paulo",
    client: "Igreja Renascer em Cristo",
    title: "Congresso Internacional 2024",
    category: "igreja",
    date: "2024-11",
    location: "Anhembi — São Paulo",
    audience: 8000,
    thumbnail: "/images/portfolio/3-igreja.jpg",
    gallery: ["/images/portfolio/3-igreja.jpg"],
    equipment: ["Painel LED P2.5 Indoor 16x6m", "Som Line Array", "Iluminação"],
    services: ["paineis-led", "som-iluminacao"],
  },
  {
    id: "case-006",
    citySlug: "alphaville",
    client: "Toyota Brasil",
    title: "Lançamento RAV4 Híbrido",
    category: "lancamento",
    date: "2024-04",
    location: "Concessionária Toyota Alphaville",
    audience: 200,
    thumbnail: "/cases/alpha-toyota.webp",
    gallery: ["/cases/alpha-toyota-1.webp"],
    equipment: ["Painel LED P2 Indoor 5x3m", "Foto e filmagem 4K"],
    services: ["paineis-led", "foto-filmagem"],
  },
  {
    id: "case-007",
    citySlug: "santos",
    client: "Santos FC",
    title: "Festa de Campeões",
    category: "show",
    date: "2024-12",
    location: "Vila Belmiro — Santos",
    audience: 3000,
    thumbnail: "/cases/santos-sfc.webp",
    gallery: ["/cases/santos-sfc-1.webp"],
    equipment: ["Painel LED P3.9 Outdoor 10x5m"],
    services: ["paineis-led"],
  },
  {
    id: "case-008",
    citySlug: "sao-paulo",
    client: "Casamento Amanda & Rafael",
    title: "Casamento no Terraço Itália",
    category: "casamento",
    date: "2024-06",
    location: "Terraço Itália — São Paulo",
    audience: 250,
    thumbnail: "/images/portfolio/4-casamento.jpg",
    gallery: ["/images/portfolio/4-casamento.jpg"],
    equipment: ["Painel LED P2.5 Indoor 4x2.5m", "Iluminação cênica"],
    testimonial: {
      text: "O painel de LED no altar foi o elemento que todos comentaram. Lindo demais!",
      author: "Amanda Oliveira",
      role: "Noiva",
    },
    services: ["paineis-led", "som-iluminacao"],
  },
];

export const getCasesByCity = (citySlug: string): Case[] =>
  cases.filter((c) => c.citySlug === citySlug);

export const getCasesByCityAndCategory = (citySlug: string, category: string): Case[] =>
  cases.filter((c) => c.citySlug === citySlug && (category === "todos" || c.category === category));
