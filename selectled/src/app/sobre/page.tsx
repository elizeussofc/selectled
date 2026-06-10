import type { Metadata } from "next";
import Link from "next/link";
import { cities } from "@/data/cities";
import { CitySearch } from "@/components/splash/CitySearch";
import { Container, Section } from "@/components/ui/Container";
import { MapPin, Calendar, Users, Award, Target, Handshake, Clock, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre a Select LED | +10 anos em Painéis de LED no Brasil",
  description: "Conheça a Select LED, parte do Select Hub. +10 anos de mercado, +5.000 eventos, 3 sedes e atendimento em 16 cidades do estado de SP.",
  alternates: { canonical: "https://selectled.com.br/sobre" },
};

const team = [
  { name: "Eduardo Heenry", role: "Diretor Comercial", specialty: "Estratégia comercial e desenvolvimento de negócios", photo: "/team/eduardo.jpg" },
  { name: "Cleusa Chapadense", role: "Pós-evento e Monitoramento", specialty: "Qualidade, feedback e fidelização de clientes", photo: "/team/cleusa.jpg" },
  { name: "Emerson Soares", role: "Produção e Cenografia", specialty: "Design de palco, estrutura e produção executiva", photo: "/team/emerson.jpg" },
  { name: "Samuel Camargo", role: "Foto, Filmagem e Streaming", specialty: "Captação audiovisual e transmissão ao vivo", photo: "/team/samuel.jpg" },
  { name: "Elizzeu Santos", role: "Head de Mídia, IA e Conteúdo Digital", specialty: "Estratégia digital, inteligência artificial e marketing de conteúdo", photo: "/team/elizzeu.jpg" },
];

const timeline = [
  { year: "2014", event: "Fundação da Select LED em São Paulo" },
  { year: "2017", event: "Abertura da primeira sede na Berrini — SP" },
  { year: "2020", event: "Expansão para Alphaville com novo escritório" },
  { year: "2023", event: "Criação do Select Hub com 5 empresas parceiras" },
  { year: "2025", event: "Atendimento em 16 cidades do estado de SP" },
];

const values = [
  { icon: Award, title: "Excelência técnica", desc: "Utilizamos equipamentos de última geração e equipe certificada para garantir a melhor performance em cada evento." },
  { icon: Handshake, title: "Atendimento próximo", desc: "Representantes locais em cada cidade para oferecer suporte personalizado e resposta rápida às suas necessidades." },
  { icon: Clock, title: "Compromisso com prazo", desc: "Pontualidade é inegociável. Montagem no horário combinado, sem exceções." },
  { icon: TrendingUp, title: "Inovação constante", desc: "Sempre atualizados com as mais recentes tecnologias em LED, streaming e soluções para eventos." },
];

const hubPartners = [
  { name: "Option LED", desc: "Distribuição e importação de painéis de LED" },
  { name: "DS7", desc: "Soluções de áudio profissional" },
  { name: "Teckwork", desc: "Infraestrutura de redes e conectividade" },
  { name: "SPM Partners", desc: "Gestão e produção de eventos corporativos" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Select LED",
  url: "https://selectled.com.br",
  logo: "https://selectled.com.br/logo.svg",
  description: "Locação e venda de painéis de LED para eventos em toda a Grande SP e interior.",
  foundingDate: "2014",
  numberOfEmployees: { "@type": "QuantitativeValue", value: 20 },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Eng. Luís Carlos Berrini, 1681, 11º andar",
    addressLocality: "São Paulo",
    addressRegion: "SP",
    postalCode: "04571-011",
    addressCountry: "BR",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+5511971945576",
    contactType: "sales",
    areaServed: "BR-SP",
    availableLanguage: "Portuguese",
  },
  sameAs: ["https://instagram.com/selectled"],
};

export default function SobrePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Header simples */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[rgba(10,10,10,0.9)] backdrop-blur-xl border-b border-[#2C2C2E]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#FF3B30] rounded-md flex items-center justify-center">
              <span className="text-white text-xs font-black">SL</span>
            </div>
            <span className="text-white font-bold" style={{ fontFamily: "var(--font-display)" }}>Select LED</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm text-[#A1A1A6]">
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <Link href="/sao-paulo/orcamento" className="px-4 py-1.5 bg-[#FF3B30] text-white rounded-lg text-sm font-semibold hover:bg-[#FF1A0E] transition-colors">
              Orçamento
            </Link>
          </nav>
        </div>
      </header>

      <main className="bg-[#0A0A0A] pt-16">
        {/* Hero */}
        <section className="py-24 border-b border-[#1C1C1E]">
          <Container>
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#FF3B30] mb-4">Sobre nós</p>
              <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}>
                Sobre a Select LED
              </h1>
              <p className="text-xl text-[#A1A1A6] leading-relaxed mb-6">
                Somos especialistas em tecnologia LED para eventos. Em mais de 10 anos, transformamos
                mais de 5.000 eventos em experiências visuais inesquecíveis.
              </p>
              <p className="text-[#A1A1A6] leading-relaxed">
                Fundada em 2014 em São Paulo, a Select LED nasceu com o propósito de democratizar
                o acesso a painéis de LED de alta qualidade para eventos de todos os portes.
                Hoje somos parte do <strong className="text-white">Select Hub</strong>, um ecossistema de 5 empresas
                parceiras que oferecem soluções completas para produção de eventos.
              </p>
            </div>
          </Container>
        </section>

        {/* Valores */}
        <Section>
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>Nossos valores</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {values.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="p-6 bg-[#141414] border border-[#2C2C2E] rounded-2xl">
                  <div className="p-2.5 bg-[rgba(255,59,48,0.1)] rounded-xl w-fit mb-4">
                    <Icon size={20} className="text-[#FF3B30]" />
                  </div>
                  <h3 className="font-semibold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>{title}</h3>
                  <p className="text-sm text-[#6E6E73] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Timeline */}
        <Section className="bg-[#0D0D0D]">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>Nossa história</h2>
            </div>
            <div className="max-w-2xl mx-auto">
              {timeline.map((t, i) => (
                <div key={t.year} className="flex gap-6 pb-8 relative">
                  {i < timeline.length - 1 && (
                    <div className="absolute left-[19px] top-10 w-0.5 h-full bg-[#2C2C2E]" />
                  )}
                  <div className="w-10 h-10 rounded-full bg-[#1C1C1E] border-2 border-[#FF3B30] flex items-center justify-center shrink-0 z-10">
                    <Calendar size={14} className="text-[#FF3B30]" />
                  </div>
                  <div className="pt-1.5">
                    <span className="text-sm font-bold text-[#FF3B30]">{t.year}</span>
                    <p className="text-[#A1A1A6] mt-0.5">{t.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Equipe */}
        <Section>
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>Nossa equipe</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
              {team.map((member) => (
                <div key={member.name} className="bg-[#141414] border border-[#2C2C2E] rounded-2xl p-5 text-center">
                  <div className="w-20 h-20 rounded-full bg-[#1C1C1E] mx-auto mb-4 border-2 border-[rgba(255,59,48,0.2)]" />
                  <h3 className="text-sm font-semibold text-white mb-1">{member.name}</h3>
                  <p className="text-xs text-[#FF3B30] font-medium mb-2">{member.role}</p>
                  <p className="text-xs text-[#6E6E73] leading-relaxed">{member.specialty}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Mapa de cidades */}
        <Section className="bg-[#0D0D0D]">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>
                Presença em 16 cidades
              </h2>
              <p className="text-[#A1A1A6]">Encontre o representante Select LED mais próximo de você</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/${city.slug}`}
                  className="flex items-center gap-2.5 p-3.5 bg-[#141414] border border-[#2C2C2E] rounded-xl hover:border-[rgba(255,59,48,0.3)] hover:bg-[rgba(255,59,48,0.04)] transition-all group"
                >
                  <MapPin size={13} className="text-[#3A3A3C] group-hover:text-[#FF3B30] transition-colors shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-[#F5F5F7]">{city.name}</p>
                    <p className="text-xs text-[#6E6E73]">{city.region}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="max-w-md mx-auto">
              <p className="text-sm text-[#6E6E73] text-center mb-4">Ou busque sua cidade:</p>
              <CitySearch />
            </div>
          </Container>
        </Section>

        {/* Select Hub */}
        <Section>
          <Container>
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#FF3B30] mb-2">Ecossistema</p>
                <h2 className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>Somos parte do Select Hub</h2>
                <p className="text-[#A1A1A6] mt-3">Um ecossistema de empresas parceiras que oferecem soluções completas para produção de eventos.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {hubPartners.map((p) => (
                  <div key={p.name} className="bg-[#141414] border border-[#2C2C2E] rounded-xl p-5">
                    <h3 className="font-semibold text-white mb-1">{p.name}</h3>
                    <p className="text-sm text-[#6E6E73]">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* Sedes */}
        <Section className="bg-[#0D0D0D]">
          <Container>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>Nossas sedes</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
              {cities.slice(0, 3).map((city) => (
                <div key={city.slug} className="bg-[#141414] border border-[#2C2C2E] rounded-2xl overflow-hidden">
                  <div className="p-5">
                    <h3 className="font-semibold text-white mb-1">{city.name}</h3>
                    <p className="text-xs text-[#A1A1A6] mb-3">
                      {city.address.street}{city.address.complement && `, ${city.address.complement}`}
                      <br />{city.address.district} — CEP {city.address.cep}
                    </p>
                    <p className="text-xs text-[#6E6E73]">{city.rep.name} · {city.rep.role}</p>
                  </div>
                  <div className="h-32 border-t border-[#2C2C2E]">
                    <iframe
                      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU3Lro&q=${encodeURIComponent(`${city.address.street}, ${city.name}`)}&zoom=14`}
                      width="100%" height="100%"
                      style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                      loading="lazy"
                      title={`Sede em ${city.name}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      </main>

      <footer className="bg-[#0A0A0A] border-t border-[#2C2C2E] py-8">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#3A3A3C]">© {new Date().getFullYear()} Select Led LTDA · CNPJ 35.554.822/0001-07</p>
            <div className="flex gap-4">
              <Link href="/blog" className="text-xs text-[#3A3A3C] hover:text-[#6E6E73] transition-colors">Blog</Link>
              <Link href="/sao-paulo/contato" className="text-xs text-[#3A3A3C] hover:text-[#6E6E73] transition-colors">Contato</Link>
            </div>
          </div>
        </Container>
      </footer>
    </>
  );
}
