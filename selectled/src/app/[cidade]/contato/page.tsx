import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getCityBySlug, getAllCitySlugs, cities } from "@/data/cities";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WAFloat } from "@/components/layout/WAFloat";
import { RepCard } from "@/components/sections/RepCard";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { ChevronRight, MessageCircle, Mail, MapPin, Clock } from "lucide-react";

interface Props { params: Promise<{ cidade: string }> }

export async function generateStaticParams() { return getAllCitySlugs(); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cidade } = await params;
  const city = getCityBySlug(cidade);
  if (!city) return {};
  return {
    title: `Contato Select LED em ${city.name} | Fale com ${city.rep.name}`,
    description: `Entre em contato com a Select LED em ${city.name}. WhatsApp direto com ${city.rep.name}. Endereço: ${city.address.street}.`,
    alternates: { canonical: `https://selectled.com.br/${cidade}/contato` },
  };
}

export default async function ContatoPage({ params }: Props) {
  const { cidade } = await params;
  const city = getCityBySlug(cidade);
  if (!city) notFound();

  const otherCities = cities.filter((c) => c.slug !== cidade).slice(0, 12);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contato Select LED ${city.name}`,
    url: `https://selectled.com.br/${cidade}/contato`,
    mainEntity: {
      "@type": "LocalBusiness",
      name: `Select LED ${city.name}`,
      telephone: `+${city.rep.whatsapp}`,
      email: city.rep.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: city.address.street,
        addressLocality: city.name,
        addressRegion: city.state,
        postalCode: city.address.cep,
        addressCountry: "BR",
      },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header citySlug={cidade} />
      <main className="bg-[#0A0A0A]">
        {/* Hero */}
        <section className="pt-28 pb-12 border-b border-[#1C1C1E]">
          <Container>
            <div className="flex items-center gap-1.5 text-xs text-[#6E6E73] mb-6">
              <Link href="/" className="hover:text-[#A1A1A6] transition-colors">Select LED</Link>
              <ChevronRight size={10} />
              <Link href={`/${cidade}`} className="hover:text-[#A1A1A6] transition-colors">{city.name}</Link>
              <ChevronRight size={10} />
              <span className="text-[#A1A1A6]">Contato</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-space)", letterSpacing: "-0.03em" }}>
              Fale com a Select LED em {city.name}
            </h1>
            <p className="text-lg text-[#A1A1A6]">
              Entre em contato diretamente com {city.rep.name}, nosso representante local.
            </p>
          </Container>
        </section>

        <Section>
          <Container>
            <div className="grid lg:grid-cols-2 gap-10">
              {/* Rep Card */}
              <RepCard city={city} />

              {/* Info cards */}
              <div className="space-y-4">
                <div className="bg-[#141414] border border-[#2C2C2E] rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-[rgba(37,211,102,0.1)] rounded-lg">
                      <MessageCircle size={18} className="text-[#25D366]" />
                    </div>
                    <h3 className="font-semibold text-white">WhatsApp</h3>
                  </div>
                  <a
                    href={`https://wa.me/${city.rep.whatsapp}?text=${encodeURIComponent(`Olá, ${city.rep.name}! Vim pelo site e gostaria de falar sobre eventos em ${city.name}.`)}`}
                    target="_blank" rel="noopener noreferrer"
                  >
                    <Button variant="whatsapp" className="w-full justify-center">
                      <MessageCircle size={15} /> Abrir WhatsApp
                    </Button>
                  </a>
                </div>

                <div className="bg-[#141414] border border-[#2C2C2E] rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-[rgba(255,59,48,0.1)] rounded-lg">
                      <Mail size={18} className="text-[#FF3B30]" />
                    </div>
                    <h3 className="font-semibold text-white">E-mail</h3>
                  </div>
                  <a href={`mailto:${city.rep.email}`} className="text-sm text-[#A1A1A6] hover:text-white transition-colors">
                    {city.rep.email}
                  </a>
                </div>

                <div className="bg-[#141414] border border-[#2C2C2E] rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-[rgba(255,59,48,0.1)] rounded-lg">
                      <MapPin size={18} className="text-[#FF3B30]" />
                    </div>
                    <h3 className="font-semibold text-white">Endereço</h3>
                  </div>
                  <p className="text-sm text-[#A1A1A6] leading-relaxed">
                    {city.address.street}
                    {city.address.complement && <>, {city.address.complement}</>}
                    <br />{city.address.district} — {city.name}, {city.state}
                    <br />CEP {city.address.cep}
                  </p>
                </div>

                <div className="bg-[#141414] border border-[#2C2C2E] rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-[rgba(255,159,10,0.1)] rounded-lg">
                      <Clock size={18} className="text-[#FF9F0A]" />
                    </div>
                    <h3 className="font-semibold text-white">Horário de atendimento</h3>
                  </div>
                  <div className="space-y-1 text-sm text-[#A1A1A6]">
                    <p>Segunda a Sexta: <span className="text-white">9h – 18h</span></p>
                    <p>Sábado: <span className="text-white">sob demanda</span></p>
                    <p className="text-xs text-[#6E6E73] mt-2">* Resposta ao WhatsApp em até 2h úteis</p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Outras cidades */}
        <Section className="bg-[#0D0D0D]">
          <Container>
            <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-space)" }}>
              Outras cidades atendidas
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {otherCities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/${c.slug}/contato`}
                  className="flex items-center gap-2 p-3 bg-[#141414] border border-[#2C2C2E] rounded-xl text-sm text-[#A1A1A6] hover:text-white hover:border-[rgba(255,255,255,0.14)] transition-all"
                >
                  <MapPin size={12} className="text-[#FF3B30] shrink-0" />
                  {c.name}
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      </main>
      <Footer citySlug={cidade} />
      <WAFloat city={city} />
    </>
  );
}
