"use client";

import Link from "next/link";
import { MessageCircle, Mail, MapPin, Clock, ChevronRight } from "lucide-react";
import type { City } from "@/data/cities";
import { cities } from "@/data/cities";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WAFloat } from "@/components/layout/WAFloat";
import { RepCard } from "@/components/sections/RepCard";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { useT } from "@/contexts/language-context";
import { tpl } from "@/data/translations";

interface Props { city: City; citySlug: string }

export function ContatoContent({ city, citySlug }: Props) {
  const t = useT();
  const ct = t.contato;

  const otherCities = cities.filter((c) => c.slug !== citySlug).slice(0, 12);

  return (
    <>
      <Header citySlug={citySlug} />
      <main className="bg-[#0A0A0A]">
        {/* Hero */}
        <section className="pt-28 pb-12 border-b border-[#1C1C1E]">
          <Container>
            <div className="flex items-center gap-1.5 text-xs text-[#6E6E73] mb-6">
              <Link href="/" className="hover:text-[#A1A1A6] transition-colors">Select LED</Link>
              <ChevronRight size={10} />
              <Link href={`/${citySlug}`} className="hover:text-[#A1A1A6] transition-colors">{city.name}</Link>
              <ChevronRight size={10} />
              <span className="text-[#A1A1A6]">{ct.breadcrumb}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}>
              {tpl(ct.h1, { city: city.name })}
            </h1>
            <p className="text-lg text-[#A1A1A6]">
              {tpl(ct.subtitle, { rep: city.rep.name })}
            </p>
          </Container>
        </section>

        <Section>
          <Container>
            <div className="grid lg:grid-cols-2 gap-10">
              <RepCard city={city} />

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
                      <MessageCircle size={15} /> {ct.openWhatsapp}
                    </Button>
                  </a>
                </div>

                <div className="bg-[#141414] border border-[#2C2C2E] rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-[rgba(255,0,0,0.1)] rounded-lg">
                      <Mail size={18} className="text-[#FF0000]" />
                    </div>
                    <h3 className="font-semibold text-white">E-mail</h3>
                  </div>
                  <a href={`mailto:${city.rep.email}`} className="text-sm text-[#A1A1A6] hover:text-white transition-colors">
                    {city.rep.email}
                  </a>
                </div>

                <div className="bg-[#141414] border border-[#2C2C2E] rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-[rgba(255,0,0,0.1)] rounded-lg">
                      <MapPin size={18} className="text-[#FF0000]" />
                    </div>
                    <h3 className="font-semibold text-white">{ct.cardAddress}</h3>
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
                    <h3 className="font-semibold text-white">{ct.cardHours}</h3>
                  </div>
                  <div className="space-y-1 text-sm text-[#A1A1A6]">
                    <p>{ct.hoursWeekdays} <span className="text-white">{ct.hoursWeekdaysValue}</span></p>
                    <p>{ct.hoursSaturday} <span className="text-white">{ct.hoursSaturdayValue}</span></p>
                    <p className="text-xs text-[#6E6E73] mt-2">{ct.hoursNote}</p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Outras cidades */}
        <Section className="bg-[#0D0D0D]">
          <Container>
            <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-display)" }}>
              {ct.otherCities}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {otherCities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/${c.slug}/contato`}
                  className="flex items-center gap-2 p-3 bg-[#141414] border border-[#2C2C2E] rounded-xl text-sm text-[#A1A1A6] hover:text-white hover:border-[rgba(255,255,255,0.14)] transition-all"
                >
                  <MapPin size={12} className="text-[#FF0000] shrink-0" />
                  {c.name}
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      </main>
      <Footer citySlug={citySlug} />
      <WAFloat city={city} />
    </>
  );
}
