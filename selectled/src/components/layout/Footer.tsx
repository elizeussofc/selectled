import Link from "next/link";
import { MessageCircle, MapPin, Mail, Phone } from "lucide-react";

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}
import { cities, getCityBySlug } from "@/data/cities";
import { services } from "@/data/services";

interface FooterProps {
  citySlug: string;
}

export function Footer({ citySlug }: FooterProps) {
  const city = getCityBySlug(citySlug);

  return (
    <footer className="bg-[#080808] border-t border-[#1C1C1E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Coluna 1: Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/sl-icon.png" alt="SL" style={{ width: 36, height: 36, borderRadius: 10, objectFit: "contain" }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/selectled-logo.png"
                alt="Select LED"
                style={{ height: 20, objectFit: "contain" }}
              />
            </div>
            <p className="text-sm text-[#4A4A4F] leading-relaxed mb-6">
              Tecnologia LED que transforma eventos em experiências inesquecíveis. +10 anos, +5.000 eventos, 3 sedes próprias.
            </p>
            <div className="flex items-center gap-2">
              <a
                href="https://instagram.com/selectled"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#141414] border border-[#1C1C1E] text-[#6E6E73] hover:text-white hover:border-[#2C2C2E] transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon size={15} />
              </a>
              <a
                href={`https://wa.me/${city?.rep.whatsapp ?? "5511971945576"}?text=Olá, preciso de um orçamento`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#141414] border border-[#1C1C1E] text-[#6E6E73] hover:text-[#25D366] hover:border-[#25D366]/30 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={15} />
              </a>
            </div>
            <p className="text-[11px] text-[#2C2C2E] mt-6 leading-relaxed">
              CNPJ 35.554.822/0001-07<br />
              Select Led LTDA
            </p>
          </div>

          {/* Coluna 2: Serviços */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#3A3A3C] mb-4">Serviços</h3>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/${citySlug}/${s.slug}`}
                    className="text-sm text-[#6E6E73] hover:text-[#A1A1A6] transition-colors"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={`/${citySlug}/paineis-led`}
                  className="text-sm text-[#6E6E73] hover:text-[#A1A1A6] transition-colors"
                >
                  Painéis de LED
                </Link>
              </li>
              <li>
                <Link
                  href={`/${citySlug}/vendas`}
                  className="text-sm text-[#FF3B30] hover:text-[#FF6B60] transition-colors font-medium"
                >
                  Comprar Painel LED →
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Cidades */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#3A3A3C] mb-4">Cidades atendidas</h3>
            <ul className="space-y-2">
              {cities.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/${c.slug}`}
                    className={`text-sm transition-colors ${
                      c.slug === citySlug
                        ? "text-[#FF3B30]"
                        : "text-[#6E6E73] hover:text-[#A1A1A6]"
                    }`}
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 4: Contato local */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#3A3A3C] mb-4">
              {city ? `Sede em ${city.name}` : "Contato"}
            </h3>
            {city && (
              <div className="space-y-3">
                <div className="flex gap-2.5">
                  <MapPin size={14} className="text-[#FF3B30] mt-0.5 shrink-0" />
                  <p className="text-sm text-[#6E6E73]">
                    {city.address.street}
                    {city.address.complement && <>, {city.address.complement}</>}
                    <br />{city.address.district}, {city.state} — {city.address.cep}
                  </p>
                </div>
                <div className="flex gap-2.5">
                  <Mail size={14} className="text-[#FF3B30] mt-0.5 shrink-0" />
                  <a href={`mailto:${city.rep.email}`} className="text-sm text-[#6E6E73] hover:text-[#A1A1A6] transition-colors">
                    {city.rep.email}
                  </a>
                </div>
                <div className="flex gap-2.5">
                  <Phone size={14} className="text-[#FF3B30] mt-0.5 shrink-0" />
                  <a
                    href={`https://wa.me/${city.rep.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#6E6E73] hover:text-[#25D366] transition-colors"
                  >
                    WhatsApp direto
                  </a>
                </div>
              </div>
            )}
            <div className="mt-6 pt-4 border-t border-[#1C1C1E]">
              <p className="text-xs text-[#3A3A3C] mb-2">Parte do</p>
              <div className="text-xs font-semibold text-[#6E6E73]">
                Select Hub
              </div>
              <p className="text-xs text-[#3A3A3C] mt-1">
                Option LED · DS7 · Teckwork · SPM Partners
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[#141414] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-[#2C2C2E]">
            © {new Date().getFullYear()} Select Led LTDA. Todos os direitos reservados.
          </p>
          <div className="flex gap-4">
            <Link href="/sobre" className="text-xs text-[#3A3A3C] hover:text-[#6E6E73] transition-colors">
              Sobre
            </Link>
            <Link href="/blog" className="text-xs text-[#3A3A3C] hover:text-[#6E6E73] transition-colors">
              Blog
            </Link>
            <Link href={`/${citySlug}/contato`} className="text-xs text-[#3A3A3C] hover:text-[#6E6E73] transition-colors">
              Contato
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
