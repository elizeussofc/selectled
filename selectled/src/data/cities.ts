export type City = {
  slug: string;
  name: string;
  state: string;
  region: string;
  lat: number;
  lng: number;
  rep: {
    name: string;
    role: string;
    photo: string;
    whatsapp: string;
    email: string;
  };
  address: {
    street: string;
    complement?: string;
    district: string;
    cep: string;
  };
  coverage: string[];
  heroBg: string;
};

export const cities: City[] = [
  {
    slug: "sao-paulo",
    name: "São Paulo",
    state: "SP",
    region: "Capital",
    lat: -23.5505,
    lng: -46.6333,
    rep: {
      name: "Eduardo Heenry",
      role: "Diretor Comercial",
      photo: "/team/eduardo.jpg",
      whatsapp: "5511971945576",
      email: "contato@selectled.com.br",
    },
    address: {
      street: "Av. Eng. Luís Carlos Berrini, 1681",
      complement: "11º andar",
      district: "Cidade Monções",
      cep: "04571-011",
    },
    coverage: ["Zona Sul", "Zona Oeste", "Centro"],
    heroBg: "/heroes/sao-paulo.webp",
  },
  {
    slug: "alphaville",
    name: "Alphaville",
    state: "SP",
    region: "Grande SP",
    lat: -23.4937,
    lng: -46.8527,
    rep: {
      name: "Eduardo Heenry",
      role: "Diretor Comercial",
      photo: "/team/eduardo.jpg",
      whatsapp: "5511971945576",
      email: "contato@selectled.com.br",
    },
    address: {
      street: "Av. Andrômeda, 885",
      complement: "7º andar, sala 716 — Brascan Alphaville",
      district: "Alphaville Empresarial",
      cep: "06473-000",
    },
    coverage: ["Barueri", "Santana de Parnaíba", "Carapicuíba"],
    heroBg: "/heroes/alphaville.webp",
  },
  {
    slug: "guarulhos",
    name: "Guarulhos",
    state: "SP",
    region: "Grande SP",
    lat: -23.4538,
    lng: -46.5333,
    rep: {
      name: "Elizzeu Santos",
      role: "Representante Comercial",
      photo: "/team/elizzeu.jpg",
      whatsapp: "5511958691438",
      email: "contato@selectled.com.br",
    },
    address: {
      street: "A confirmar",
      district: "Centro",
      cep: "07000-000",
    },
    coverage: ["Centro", "Cumbica", "Bonsucesso"],
    heroBg: "/heroes/guarulhos.webp",
  },
  {
    slug: "santo-andre",
    name: "Santo André",
    state: "SP",
    region: "ABC Paulista",
    lat: -23.6639,
    lng: -46.5383,
    rep: {
      name: "Elizzeu Santos",
      role: "Representante Comercial",
      photo: "/team/elizzeu.jpg",
      whatsapp: "5511958691438",
      email: "contato@selectled.com.br",
    },
    address: {
      street: "A confirmar",
      district: "Centro",
      cep: "09000-000",
    },
    coverage: ["Centro", "Vila Luzita", "Campestre"],
    heroBg: "/heroes/santo-andre.webp",
  },
  {
    slug: "sao-bernardo-do-campo",
    name: "São Bernardo do Campo",
    state: "SP",
    region: "ABC Paulista",
    lat: -23.6914,
    lng: -46.5646,
    rep: {
      name: "Elizzeu Santos",
      role: "Representante Comercial",
      photo: "/team/elizzeu.jpg",
      whatsapp: "5511958691438",
      email: "contato@selectled.com.br",
    },
    address: {
      street: "A confirmar",
      district: "Centro",
      cep: "09700-000",
    },
    coverage: ["Centro", "Rudge Ramos", "Nova Petrópolis"],
    heroBg: "/heroes/sao-bernardo-do-campo.webp",
  },
  {
    slug: "sao-caetano-do-sul",
    name: "São Caetano do Sul",
    state: "SP",
    region: "ABC Paulista",
    lat: -23.6218,
    lng: -46.5651,
    rep: {
      name: "Elizzeu Santos",
      role: "Representante Comercial",
      photo: "/team/elizzeu.jpg",
      whatsapp: "5511958691438",
      email: "contato@selectled.com.br",
    },
    address: {
      street: "A confirmar",
      district: "Centro",
      cep: "09500-000",
    },
    coverage: ["Centro", "Santa Maria", "Barcelona"],
    heroBg: "/heroes/sao-caetano-do-sul.webp",
  },
  {
    slug: "diadema",
    name: "Diadema",
    state: "SP",
    region: "Grande SP",
    lat: -23.6861,
    lng: -46.6229,
    rep: {
      name: "Elizzeu Santos",
      role: "Representante Comercial",
      photo: "/team/elizzeu.jpg",
      whatsapp: "5511958691438",
      email: "contato@selectled.com.br",
    },
    address: {
      street: "A confirmar",
      district: "Centro",
      cep: "09900-000",
    },
    coverage: ["Centro", "Piraporinha", "Serraria"],
    heroBg: "/heroes/diadema.webp",
  },
  {
    slug: "osasco",
    name: "Osasco",
    state: "SP",
    region: "Grande SP",
    lat: -23.5329,
    lng: -46.7919,
    rep: {
      name: "Elizzeu Santos",
      role: "Representante Comercial",
      photo: "/team/elizzeu.jpg",
      whatsapp: "5511958691438",
      email: "contato@selectled.com.br",
    },
    address: {
      street: "A confirmar",
      district: "Centro",
      cep: "06000-000",
    },
    coverage: ["Centro", "Presidente Altino", "Jardim Rochdale"],
    heroBg: "/heroes/osasco.webp",
  },
  {
    slug: "barueri",
    name: "Barueri",
    state: "SP",
    region: "Grande SP",
    lat: -23.5043,
    lng: -46.8769,
    rep: {
      name: "Elizzeu Santos",
      role: "Representante Comercial",
      photo: "/team/elizzeu.jpg",
      whatsapp: "5511958691438",
      email: "contato@selectled.com.br",
    },
    address: {
      street: "A confirmar",
      district: "Centro",
      cep: "06401-000",
    },
    coverage: ["Centro", "Jardim Silveira", "Jardim Barueri"],
    heroBg: "/heroes/barueri.webp",
  },
  {
    slug: "campinas",
    name: "Campinas",
    state: "SP",
    region: "Interior SP",
    lat: -22.9056,
    lng: -47.0608,
    rep: {
      name: "Elizzeu Santos",
      role: "Representante Comercial",
      photo: "/team/elizzeu.jpg",
      whatsapp: "5511958691438",
      email: "contato@selectled.com.br",
    },
    address: {
      street: "A confirmar",
      district: "Centro",
      cep: "13000-000",
    },
    coverage: ["Centro", "Cambuí", "Taquaral", "Barão Geraldo"],
    heroBg: "/heroes/campinas.webp",
  },
  {
    slug: "atibaia",
    name: "Atibaia",
    state: "SP",
    region: "Interior SP",
    lat: -23.1175,
    lng: -46.5502,
    rep: {
      name: "Elizzeu Santos",
      role: "Representante Comercial",
      photo: "/team/elizzeu.jpg",
      whatsapp: "5511958691438",
      email: "contato@selectled.com.br",
    },
    address: {
      street: "A confirmar",
      district: "Centro",
      cep: "12940-000",
    },
    coverage: ["Centro", "Jardim Maristela", "Bairro Itapetinga"],
    heroBg: "/heroes/atibaia.webp",
  },
  {
    slug: "jundiai",
    name: "Jundiaí",
    state: "SP",
    region: "Interior SP",
    lat: -23.1864,
    lng: -46.8839,
    rep: {
      name: "Elizzeu Santos",
      role: "Representante Comercial",
      photo: "/team/elizzeu.jpg",
      whatsapp: "5511958691438",
      email: "contato@selectled.com.br",
    },
    address: {
      street: "A confirmar",
      district: "Centro",
      cep: "13200-000",
    },
    coverage: ["Centro", "Vila Arens", "Anhangabaú"],
    heroBg: "/heroes/jundiai.webp",
  },
  {
    slug: "sorocaba",
    name: "Sorocaba",
    state: "SP",
    region: "Interior SP",
    lat: -23.5015,
    lng: -47.4526,
    rep: {
      name: "Elizzeu Santos",
      role: "Representante Comercial",
      photo: "/team/elizzeu.jpg",
      whatsapp: "5511958691438",
      email: "contato@selectled.com.br",
    },
    address: {
      street: "A confirmar",
      district: "Centro",
      cep: "18000-000",
    },
    coverage: ["Centro", "Jardim Simus", "Além Ponte"],
    heroBg: "/heroes/sorocaba.webp",
  },
  {
    slug: "santos",
    name: "Santos",
    state: "SP",
    region: "Baixada Santista",
    lat: -23.9608,
    lng: -46.3336,
    rep: {
      name: "Elizzeu Santos",
      role: "Representante Comercial",
      photo: "/team/elizzeu.jpg",
      whatsapp: "5511958691438",
      email: "contato@selectled.com.br",
    },
    address: {
      street: "A confirmar",
      district: "Centro",
      cep: "11000-000",
    },
    coverage: ["Centro", "Gonzaga", "Boqueirão"],
    heroBg: "/heroes/santos.webp",
  },
  {
    slug: "sao-jose-dos-campos",
    name: "São José dos Campos",
    state: "SP",
    region: "Vale do Paraíba",
    lat: -23.1896,
    lng: -45.8841,
    rep: {
      name: "Elizzeu Santos",
      role: "Representante Comercial",
      photo: "/team/elizzeu.jpg",
      whatsapp: "5511958691438",
      email: "contato@selectled.com.br",
    },
    address: {
      street: "A confirmar",
      district: "Centro",
      cep: "12200-000",
    },
    coverage: ["Centro", "Jardim Aquarius", "Vila Adyana"],
    heroBg: "/heroes/sao-jose-dos-campos.webp",
  },
  {
    slug: "ribeirao-preto",
    name: "Ribeirão Preto",
    state: "SP",
    region: "Interior SP",
    lat: -21.1775,
    lng: -47.8103,
    rep: {
      name: "Elizzeu Santos",
      role: "Representante Comercial",
      photo: "/team/elizzeu.jpg",
      whatsapp: "5511958691438",
      email: "contato@selectled.com.br",
    },
    address: {
      street: "A confirmar",
      district: "Centro",
      cep: "14000-000",
    },
    coverage: ["Centro", "Jardim Irajá", "Higienópolis"],
    heroBg: "/heroes/ribeirao-preto.webp",
  },
];

export const getCityBySlug = (slug: string): City | undefined =>
  cities.find((c) => c.slug === slug);

export const getAllCitySlugs = () =>
  cities.map((c) => ({ cidade: c.slug }));
