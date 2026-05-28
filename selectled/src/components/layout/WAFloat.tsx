"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import type { City } from "@/data/cities";
import { buildWhatsAppUrl } from "@/lib/utils";

interface WAFloatProps {
  city: City;
}

export function WAFloat({ city }: WAFloatProps) {
  const [open, setOpen] = useState(false);
  const message = `Olá, ${city.rep.name}! Vi o site da Select LED e quero saber mais sobre eventos em ${city.name}.`;
  const waUrl = buildWhatsAppUrl(city.rep.whatsapp, message);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="bg-[#141414] border border-[#2C2C2E] rounded-2xl p-4 shadow-2xl w-64 animate-slide-down">
          <p className="text-xs text-[#6E6E73] mb-1">Fale com</p>
          <p className="text-sm font-semibold text-[#F5F5F7]">{city.rep.name}</p>
          <p className="text-xs text-[#A1A1A6] mb-3">{city.rep.role} — {city.name}</p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 w-full bg-[#25D366] hover:bg-[#1FAD54] text-white text-sm font-semibold rounded-xl px-4 py-2.5 transition-colors justify-center"
          >
            <MessageCircle size={15} />
            Abrir WhatsApp
          </a>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 bg-[#25D366] hover:bg-[#1FAD54] text-white rounded-full shadow-xl shadow-green-900/40 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
        aria-label="Abrir WhatsApp"
      >
        {open ? <X size={22} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}
