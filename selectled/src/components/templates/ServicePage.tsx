import Link from "next/link";
import { MessageCircle, CheckCircle, ChevronRight, ArrowRight } from "lucide-react";
import type { City } from "@/data/cities";
import type { Service } from "@/data/services";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WAFloat } from "@/components/layout/WAFloat";
import { RepCard } from "@/components/sections/RepCard";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";

interface ServicePageProps {
  city: City;
  service: Service;
}

export function ServicePage({ city, service }: ServicePageProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header citySlug={city.slug} />

      <main className="bg-[#0A0A0A]">
        {/* Hero */}
        <section className="pt-28 pb-16 border-b border-[#1C1C1E]">
          <Container>
            <div className="flex items-center gap-1.5 text-xs text-[#6E6E73] mb-6">
              <Link href="/" className="hover:text-[#A1A1A6] transition-colors">Select LED</Link>
              <ChevronRight size={10} />
              <Link href={`/${city.slug}`} className="hover:text-[#A1A1A6] transition-colors">{city.name}</Link>
              <ChevronRight size={10} />
              <span className="text-[#A1A1A6]">{service.name}</span>
            </div>

            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#FF3B30] mb-3">
                {service.name}
              </p>
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
              >
                {service.name} em {city.name}
              </h1>
              <p className="text-lg text-[#A1A1A6] mb-8 leading-relaxed max-w-2xl">
                {service.intro}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href={`/${city.slug}/orcamento`}>
                  <Button size="lg">Solicitar orçamento</Button>
                </Link>
                <a
                  href={`https://wa.me/${city.rep.whatsapp}?text=${encodeURIComponent(`Olá, ${city.rep.name}! Tenho interesse em ${service.name} para um evento em ${city.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" variant="whatsapp">
                    <MessageCircle size={16} />
                    WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </Container>
        </section>

        {/* O que entregamos */}
        <Section>
          <Container>
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2
                  className="text-3xl font-bold text-white mb-8"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  O que você recebe
                </h2>
                <ul className="space-y-4">
                  {service.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-3">
                      <CheckCircle size={16} className="text-[#30D158] mt-0.5 shrink-0" />
                      <span className="text-[#A1A1A6]">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Equipamentos */}
              <div>
                <h2
                  className="text-3xl font-bold text-white mb-8"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Equipamentos
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {service.equipment.map((eq) => (
                    <div key={eq.name} className="bg-[#141414] border border-[#2C2C2E] rounded-xl p-4">
                      <div className="h-24 bg-[#1C1C1E] rounded-lg mb-3 flex items-center justify-center">
                        <span className="text-xs text-[#3A3A3C]">Foto</span>
                      </div>
                      <p className="text-xs font-medium text-[#A1A1A6]">{eq.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Como funciona */}
        <Section className="bg-[#0D0D0D]">
          <Container>
            <h2
              className="text-3xl font-bold text-white mb-10 text-center"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Como funciona
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { n: "01", title: "Briefing", desc: "Envie as informações do seu evento" },
                { n: "02", title: "Proposta", desc: "Receba orçamento em até 2h úteis" },
                { n: "03", title: "Confirmação", desc: "Contrato e pagamento simples" },
                { n: "04", title: "Execução", desc: "Nossa equipe cuida de tudo no dia" },
              ].map((step, i) => (
                <div key={i}>
                  <div className="text-5xl font-black text-[#1C1C1E] mb-3" style={{ fontFamily: "var(--font-display)" }}>
                    {step.n}
                  </div>
                  <div className="w-8 h-1 bg-[#FF3B30] mb-4 rounded-full" />
                  <h3 className="font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-[#6E6E73] leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Rep Card */}
        <Section>
          <Container>
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <RepCard city={city} variant="compact" />
              <div>
                <h2
                  className="text-2xl font-bold text-white mb-4"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Outros serviços em {city.name}
                </h2>
                <div className="space-y-3">
                  <Link
                    href={`/${city.slug}/paineis-led`}
                    className="flex items-center justify-between p-4 bg-[#141414] border border-[#2C2C2E] rounded-xl hover:border-[rgba(255,59,48,0.3)] transition-colors"
                  >
                    <span className="text-sm text-[#A1A1A6]">Precisa de painel LED também?</span>
                    <span className="text-xs text-[#FF3B30] flex items-center gap-1">
                      Ver painéis <ArrowRight size={11} />
                    </span>
                  </Link>
                  <Link
                    href={`/${city.slug}/vendas`}
                    className="flex items-center justify-between p-4 bg-[#141414] border border-[#2C2C2E] rounded-xl hover:border-[rgba(255,59,48,0.3)] transition-colors"
                  >
                    <span className="text-sm text-[#A1A1A6]">Quer comprar ao invés de alugar?</span>
                    <span className="text-xs text-[#FF3B30] flex items-center gap-1">
                      Ver linha de venda <ArrowRight size={11} />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* FAQ */}
        <Section className="bg-[#0D0D0D]">
          <Container>
            <div className="max-w-2xl mx-auto">
              <h2
                className="text-3xl font-bold text-white mb-8 text-center"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Dúvidas sobre {service.shortName}
              </h2>
              <div className="space-y-3">
                {service.faq.map((faq, i) => (
                  <details key={i} className="group bg-[#141414] border border-[#2C2C2E] rounded-xl overflow-hidden">
                    <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-sm font-medium text-[#F5F5F7] list-none">
                      {faq.q}
                      <ChevronRight size={15} className="text-[#6E6E73] group-open:rotate-90 transition-transform shrink-0 ml-4" />
                    </summary>
                    <div className="px-5 pb-4 text-sm text-[#A1A1A6] leading-relaxed border-t border-[#2C2C2E] pt-3">
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* CTA */}
        <section className="py-20 border-t border-[#2C2C2E]">
          <Container>
            <div className="text-center max-w-xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
                Pronto para contratar {service.shortName} em {city.name}?
              </h2>
              <p className="text-[#A1A1A6] mb-8">
                Fale com {city.rep.name} e receba sua proposta em até 2h úteis.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href={`/${city.slug}/orcamento`}>
                  <Button size="lg">Solicitar orçamento</Button>
                </Link>
                <a
                  href={`https://wa.me/${city.rep.whatsapp}?text=${encodeURIComponent(`Olá, quero contratar ${service.name} para um evento em ${city.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" variant="whatsapp">
                    <MessageCircle size={16} />
                    WhatsApp agora
                  </Button>
                </a>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer citySlug={city.slug} />
      <WAFloat city={city} />
    </>
  );
}
