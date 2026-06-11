export type ServiceEquipment = { name: string; image: string };
export type ServiceFAQ = { q: string; a: string };

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  hero: string;
  heroImage?: string;
  icon: string;
  tagline: string;
  intro: string;
  deliverables: string[];
  equipment: ServiceEquipment[];
  faq: ServiceFAQ[];
  caseFilter: string;
};

export const services: Service[] = [
  {
    slug: "som-iluminacao",
    name: "Som e Iluminação",
    shortName: "Som & Luz",
    hero: "/services/som-iluminacao-hero.webp",
    heroImage: "/images/sound-and-lighting.jpg",
    icon: "volume-2",
    tagline: "Áudio e luz que elevam cada cena do seu evento",
    intro:
      "Sistema completo de PA, monitores, mesas digitais e iluminação cênica com moving heads. Projeto sonoro dimensionado para o tamanho do seu público, com operadores técnicos presentes durante todo o evento.",
    deliverables: [
      "Sistema de PA dimensionado para o público",
      "Mesa de som digital Yamaha ou Allen & Heath",
      "Microfones sem fio Shure UHF",
      "Iluminação cênica com moving heads LED",
      "Operador técnico durante todo o evento",
      "Montagem e desmontagem inclusos",
      "Suporte técnico em tempo real",
    ],
    equipment: [
      { name: "Mesa Yamaha QL5", image: "/images/equip-yamaha-ql5.jpg" },
      { name: "Line Array L-Acoustics", image: "/images/equip-line-array.jpg" },
      { name: "Moving Head Robe", image: "/images/equip-moving-head.jpg" },
      { name: "Microfone Shure UR4D", image: "/images/equip-shure-ur4d.jpg" },
    ],
    faq: [
      { q: "Vocês atendem eventos de pequeno porte?", a: "Sim, atendemos desde pequenos eventos corporativos com 50 pessoas até grandes shows e congressos com mais de 5.000 presentes." },
      { q: "O operador fica presente no evento?", a: "Sim, todos os nossos pacotes incluem operador técnico de som e luz treinado, que permanece durante toda a duração do evento." },
      { q: "Qual o prazo mínimo para fechar o contrato?", a: "Recomendamos pelo menos 7 dias de antecedência, mas trabalhamos com cases urgentes." },
      { q: "Posso usar meu próprio DJ com o equipamento de vocês?", a: "Sim, disponibilizamos o rider técnico completo para que qualquer DJ possa operar." },
      { q: "Vocês fazem vistoria do local antes?", a: "Sim, realizamos visita técnica prévia para todos os eventos acima de 200 pessoas." },
    ],
    caseFilter: "som-iluminacao",
  },
  {
    slug: "foto-filmagem",
    name: "Foto e Filmagem",
    shortName: "Foto & Filme",
    hero: "/services/foto-filmagem-hero.webp",
    icon: "camera",
    tagline: "Memórias que duram décadas, entregas que encantam",
    intro:
      "Cobertura fotográfica e videográfica profissional para eventos corporativos, shows, casamentos e produções institucionais. Streaming ao vivo com alta estabilidade e edição com entrega rápida.",
    deliverables: [
      "Fotografia profissional com câmeras full frame",
      "Filmagem em 4K com estabilizador",
      "Edição e entrega em até 7 dias úteis",
      "Transmissão ao vivo (streaming) inclusa sob demanda",
      "Cobertura aérea com drone (quando permitido)",
      "Fotografia de produto e institucional",
      "Relatório fotográfico para redes sociais",
    ],
    equipment: [
      { name: "Sony A7 IV (câmera principal)", image: "/images/equip-sony-a7.jpg" },
      { name: "DJI RS3 Pro (estabilizador)", image: "/images/equip-dji-rs3.jpg" },
      { name: "DJI Mavic 3 (drone)", image: "/images/equip-mavic3.jpg" },
      { name: "Luzes Godox (iluminação)", image: "/images/equip-godox.jpg" },
    ],
    faq: [
      { q: "Em quantos dias recebo as fotos editadas?", a: "As fotos são entregues em até 7 dias úteis após o evento. Para demandas urgentes, negociamos prazo expresso." },
      { q: "O streaming é estável para eventos grandes?", a: "Sim, utilizamos encoders dedicados e redundância de link para garantir transmissão estável." },
      { q: "Podem cobrir mais de um ambiente simultaneamente?", a: "Sim, montamos equipes múltiplas conforme a necessidade do evento." },
      { q: "Vocês entregam o material em raw (bruto)?", a: "Entregamos material editado e tratado. Arquivos brutos estão disponíveis mediante negociação adicional." },
      { q: "Quais formatos de entrega?", a: "Entregamos via link de download em alta resolução (JPEG/MP4) e em galeria online por 90 dias." },
    ],
    caseFilter: "foto-filmagem",
  },
  {
    slug: "internet-eventos",
    name: "Internet para Eventos",
    shortName: "Internet",
    hero: "/services/internet-eventos-hero.webp",
    icon: "wifi",
    tagline: "Conectividade que não cai no momento crítico",
    intro:
      "Infraestrutura de rede Wi-Fi e cabeada para eventos corporativos, feiras, congressos e transmissões ao vivo. Projeto personalizado por ambiente com garantia de banda e suporte técnico no local.",
    deliverables: [
      "Wi-Fi gerenciado com controle de banda por usuário",
      "Link dedicado com garantia de SLA",
      "Cabeamento estruturado para palco e backstage",
      "Rede segregada para streaming / imprensa",
      "Técnico de rede presente durante o evento",
      "Monitoramento em tempo real do link",
      "Plano de contingência com link de backup 4G",
    ],
    equipment: [
      { name: "Access Points Ubiquiti UniFi", image: "/images/equip-unifi.jpg" },
      { name: "Switch PoE gerenciável", image: "/images/equip-switch.jpg" },
      { name: "Roteador pfSense dedicado", image: "/images/equip-pfsense.jpg" },
      { name: "Modem link dedicado", image: "/images/equip-modem.jpg" },
    ],
    faq: [
      { q: "Quantos usuários simultâneos a rede suporta?", a: "Dependendo do projeto, nossas redes comportam de 100 a mais de 2.000 usuários simultâneos." },
      { q: "É possível ter rede separada para a equipe e para o público?", a: "Sim, segmentamos a rede em VLANs dedicadas para equipe, imprensa, streaming e público geral." },
      { q: "E se o link principal cair?", a: "Todo projeto inclui failover automático para link 4G de backup, garantindo continuidade do evento." },
      { q: "Atendem eventos em locais sem infraestrutura (locais externos)?", a: "Sim, trabalhamos com link via rádio, 4G/5G dedicado e redes mesh para locais sem cabeamento." },
      { q: "Qual o prazo mínimo para contratar?", a: "Recomendamos 5 dias úteis de antecedência para eventos de maior porte." },
    ],
    caseFilter: "internet-eventos",
  },
  {
    slug: "credenciamento",
    name: "Credenciamento e Staff",
    shortName: "Credenciamento",
    hero: "/services/credenciamento-hero.webp",
    icon: "badge-check",
    tagline: "Entrada organizada, experiência impecável desde o início",
    intro:
      "Sistema completo de credenciamento digital com impressão de crachás, controle de acesso por QR Code ou pulseira RFID, e equipe de staff treinada para recepcionar, orientar e apoiar logisticamente seu evento.",
    deliverables: [
      "Software de credenciamento online com importação de lista",
      "Impressoras de crachás térmicas (on-site)",
      "Controle de acesso por QR Code ou RFID",
      "Totem de auto-credenciamento",
      "Staff de recepção e apoio operacional",
      "Relatório em tempo real de check-ins",
      "Integração com plataformas de inscrição (Sympla, Eventbrite)",
    ],
    equipment: [
      { name: "Software Credenciamento Web", image: "/images/equip-cred-soft.jpg" },
      { name: "Impressora Zebra ZD620", image: "/images/equip-zebra.jpg" },
      { name: "Leitor RFID/QR Code", image: "/images/equip-rfid.jpg" },
      { name: "Totem Auto-Credenciamento", image: "/images/equip-totem.jpg" },
    ],
    faq: [
      { q: "Quanto tempo leva para credenciar 500 pessoas?", a: "Com múltiplos pontos de credenciamento, 500 pessoas são atendidas em menos de 30 minutos." },
      { q: "Integra com plataformas de inscrição?", a: "Sim, integramos com Sympla, Eventbrite, Ticket360 e sistemas próprios via planilha ou API." },
      { q: "A equipe de staff inclui recepcionistas?", a: "Sim, nossa equipe de staff é treinada para recepcionar, orientar e apoiar logisticamente durante todo o evento." },
      { q: "É possível controlar acesso por área (VIP, palco, backstage)?", a: "Sim, configuramos perfis de acesso por área com leitores individuais em cada ponto." },
      { q: "Emitem crachás personalizados com logo?", a: "Sim, os crachás são personalizados com logo do evento, nome, cargo e empresa do participante." },
    ],
    caseFilter: "credenciamento",
  },
];

export const getServiceBySlug = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug);
