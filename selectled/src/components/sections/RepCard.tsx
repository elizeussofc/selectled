"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Mail, MessageCircle, Building2 } from "lucide-react";
import type { City } from "@/data/cities";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppUrl } from "@/lib/utils";
import { useT } from "@/contexts/language-context";
import { tpl } from "@/data/translations";

interface RepCardProps {
  city: City;
  variant?: "compact" | "full";
}

function Avatar({ name, photo, size = "lg" }: { name: string; photo: string; size?: "sm" | "lg" }) {
  const [imgError, setImgError] = useState(false);
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const noPhoto = imgError || !photo || photo.includes("confirmar") || photo === "";

  if (noPhoto) {
    return (
      <div
        className={
          size === "lg"
            ? "w-32 h-32 rounded-2xl bg-gradient-to-br from-[rgba(255,0,0,0.15)] to-[rgba(255,0,0,0.04)] border border-[rgba(255,0,0,0.2)] flex items-center justify-center text-3xl font-black text-[#FF0000] shrink-0"
            : "w-12 h-12 rounded-full bg-gradient-to-br from-[rgba(255,0,0,0.15)] to-[rgba(255,0,0,0.04)] border border-[rgba(255,0,0,0.2)] flex items-center justify-center text-base font-black text-[#FF0000] shrink-0"
        }
        style={{ fontFamily: "var(--font-display)" }}
      >
        {initials || "SL"}
      </div>
    );
  }

  return (
    <div
      className={
        size === "lg"
          ? "relative w-40 h-48 rounded-2xl overflow-hidden bg-[#1C1C1E] ring-2 ring-[rgba(255,0,0,0.15)] shrink-0"
          : "relative w-12 h-12 rounded-full overflow-hidden bg-[#1C1C1E] shrink-0"
      }
    >
      <Image
        src={photo}
        alt={name}
        fill
        className="object-cover object-top"
        sizes={size === "lg" ? "160px" : "48px"}
        onError={() => setImgError(true)}
      />
    </div>
  );
}

export function RepCard({ city, variant = "full" }: RepCardProps) {
  const t = useT().repCard;
  const waMessage = `Olá, ${city.rep.name}! Preciso de um orçamento para um evento em ${city.name}.`;
  const waUrl = buildWhatsAppUrl(city.rep.whatsapp, waMessage);

  if (variant === "compact") {
    return (
      <div className="bg-[#141414] border border-[#2C2C2E] rounded-xl p-5">
        <div className="flex items-center gap-4">
          <Avatar name={city.rep.name} photo={city.rep.photo} size="sm" />
          <div>
            <p className="text-sm font-semibold text-[#F5F5F7]">{city.rep.name}</p>
            <p className="text-xs text-[#6E6E73]">{city.rep.role}</p>
            <p className="text-xs text-[#6E6E73] mt-0.5">
              {city.name}, {city.state}
            </p>
          </div>
        </div>
        <a href={waUrl} target="_blank" rel="noopener noreferrer" className="mt-4 block">
          <Button variant="whatsapp" size="sm" className="w-full">
            <MessageCircle size={14} />
            {t.whatsappDirect}
          </Button>
        </a>
      </div>
    );
  }

  return (
    <div className="bg-[#141414] border border-[#2C2C2E] rounded-2xl overflow-hidden">
      {/* Rep info */}
      <div className="p-8 lg:p-10">
        <div className="flex flex-col sm:flex-row gap-7 items-start">
          <Avatar name={city.rep.name} photo={city.rep.photo} size="lg" />

          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#FF0000] mb-2">
              {tpl(t.repBadge, { city: city.name })}
            </p>
            <h3
              className="text-2xl lg:text-3xl font-bold text-[#F5F5F7] mb-1 leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {city.rep.name}
            </h3>
            <p className="text-[#A1A1A6] text-sm mb-6">{city.rep.role}</p>

            <div className="space-y-2.5 mb-7">
              <div className="flex items-start gap-3">
                <MapPin size={14} className="text-[#FF0000] mt-0.5 shrink-0" />
                <span className="text-sm text-[#A1A1A6] leading-snug">
                  {city.address.street}
                  {city.address.complement && `, ${city.address.complement}`}
                  {" — "}
                  {city.address.district}, {city.state} · CEP {city.address.cep}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={14} className="text-[#FF0000] shrink-0" />
                <a
                  href={`mailto:${city.rep.email}`}
                  className="text-sm text-[#A1A1A6] hover:text-white transition-colors truncate"
                >
                  {city.rep.email}
                </a>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a href={waUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="whatsapp">
                  <MessageCircle size={15} />
                  WhatsApp — {city.rep.name.split(" ")[0]}
                </Button>
              </a>
              <a href={`mailto:${city.rep.email}`}>
                <Button variant="outline">
                  <Mail size={15} />
                  {t.sendEmail}
                </Button>
              </a>
            </div>

            <p className="mt-5 text-xs text-[#3A3A3C] italic">
              &ldquo;{tpl(t.quote, { city: city.name })}&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Location block — replace broken Google Maps */}
      <div className="border-t border-[#1C1C1E] bg-[#0F0F0F] px-8 lg:px-10 py-5">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[rgba(255,0,0,0.08)] border border-[rgba(255,0,0,0.15)] flex items-center justify-center shrink-0">
            <Building2 size={17} className="text-[#FF0000]" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[#6E6E73] uppercase tracking-wider mb-0.5">
              {tpl(t.officeIn, { city: city.name })}
            </p>
            <p className="text-sm text-[#A1A1A6]">
              {city.address.street}
              {city.address.complement && `, ${city.address.complement}`}
              {" · "}
              {city.address.district}, {city.state}
            </p>
          </div>
          <div className="ml-auto shrink-0">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${city.address.street}, ${city.address.district}, ${city.name}, ${city.state}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#6E6E73] hover:text-[#A1A1A6] transition-colors flex items-center gap-1"
            >
              {t.viewOnMap}
              <MapPin size={11} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
