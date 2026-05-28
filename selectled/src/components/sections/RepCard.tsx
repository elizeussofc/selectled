"use client";

import Image from "next/image";
import { MapPin, Mail, MessageCircle } from "lucide-react";
import type { City } from "@/data/cities";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppUrl } from "@/lib/utils";

interface RepCardProps {
  city: City;
  variant?: "compact" | "full";
}

export function RepCard({ city, variant = "full" }: RepCardProps) {
  const waMessage = `Olá, ${city.rep.name}! Preciso de um orçamento para um evento em ${city.name}.`;
  const waUrl = buildWhatsAppUrl(city.rep.whatsapp, waMessage);

  if (variant === "compact") {
    return (
      <div className="bg-[#141414] border border-[#2C2C2E] rounded-xl p-5">
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14 rounded-full overflow-hidden bg-[#1C1C1E] shrink-0">
            <Image
              src={city.rep.photo}
              alt={city.rep.name}
              fill
              className="object-cover"
              onError={() => {}}
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#F5F5F7]">{city.rep.name}</p>
            <p className="text-xs text-[#6E6E73]">{city.rep.role}</p>
            <p className="text-xs text-[#6E6E73] mt-0.5">{city.name}, {city.state}</p>
          </div>
        </div>
        <a href={waUrl} target="_blank" rel="noopener noreferrer" className="mt-4 block">
          <Button variant="whatsapp" size="sm" className="w-full">
            <MessageCircle size={14} />
            WhatsApp direto
          </Button>
        </a>
      </div>
    );
  }

  return (
    <div className="bg-[#141414] border border-[#2C2C2E] rounded-2xl overflow-hidden">
      <div className="p-8 lg:p-12">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Foto */}
          <div className="relative w-40 h-40 rounded-2xl overflow-hidden bg-[#1C1C1E] shrink-0 ring-2 ring-[rgba(255,59,48,0.2)]">
            <Image
              src={city.rep.photo}
              alt={city.rep.name}
              fill
              className="object-cover"
              sizes="160px"
            />
          </div>

          {/* Dados */}
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#FF3B30] mb-2">
              Representante em {city.name}
            </p>
            <h3
              className="text-3xl font-bold text-[#F5F5F7] mb-1"
              style={{ fontFamily: "var(--font-space)" }}
            >
              {city.rep.name}
            </h3>
            <p className="text-[#A1A1A6] mb-6">{city.rep.role}</p>

            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-3">
                <MapPin size={15} className="text-[#FF3B30] mt-0.5 shrink-0" />
                <span className="text-sm text-[#A1A1A6]">
                  {city.address.street}
                  {city.address.complement && `, ${city.address.complement}`}
                  {" — "}{city.address.district}, {city.state} · CEP {city.address.cep}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={15} className="text-[#FF3B30] shrink-0" />
                <a
                  href={`mailto:${city.rep.email}`}
                  className="text-sm text-[#A1A1A6] hover:text-white transition-colors"
                >
                  {city.rep.email}
                </a>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a href={waUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="whatsapp">
                  <MessageCircle size={16} />
                  WhatsApp — {city.rep.name}
                </Button>
              </a>
              <a href={`mailto:${city.rep.email}`}>
                <Button variant="outline">
                  <Mail size={16} />
                  Enviar e-mail
                </Button>
              </a>
            </div>

            <p className="mt-5 text-xs text-[#6E6E73] italic">
              &ldquo;Seu evento em {city.name} merece atendimento de quem está aqui.&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Mapa embed */}
      <div className="h-52 lg:h-64 border-t border-[#2C2C2E]">
        <iframe
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU3Lro&q=${encodeURIComponent(
            `${city.address.street}, ${city.address.district}, ${city.name}, ${city.state}`
          )}&zoom=15&maptype=roadmap`}
          width="100%"
          height="100%"
          style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Sede Select LED em ${city.name}`}
        />
      </div>
    </div>
  );
}
