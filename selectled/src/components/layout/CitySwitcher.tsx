"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ChevronDown, MapPin, X, Search } from "lucide-react";
import { cities } from "@/data/cities";
import { cn } from "@/lib/utils";

interface CitySwitcherProps {
  currentCity: string;
}

export function CitySwitcher({ currentCity }: CitySwitcherProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const city = cities.find((c) => c.slug === currentCity);
  const filtered = cities.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  function switchCity(slug: string) {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0) {
      segments[0] = slug;
      router.push("/" + segments.join("/"));
    } else {
      router.push(`/${slug}`);
    }
    setOpen(false);
    setQuery("");
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-full",
          "border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)]",
          "text-sm font-medium text-[#F5F5F7]",
          "hover:bg-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.2)]",
          "transition-all duration-200"
        )}
        aria-label="Trocar cidade"
      >
        <MapPin size={13} className="text-[#EF4444]" />
        <span>{city?.name ?? currentCity}</span>
        <ChevronDown size={12} className="text-[#6E6E73]" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-lg bg-[#141414] rounded-2xl border border-[#2C2C2E] shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b border-[#2C2C2E]">
              <div>
                <h2 className="text-base font-semibold text-[#F5F5F7]" style={{ fontFamily: "var(--font-display)" }}>
                  Selecione sua cidade
                </h2>
                <p className="text-xs text-[#6E6E73] mt-0.5">Iremos manter a página atual</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg text-[#6E6E73] hover:text-[#F5F5F7] hover:bg-[#2C2C2E] transition-colors"
                aria-label="Fechar"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-4 border-b border-[#2C2C2E]">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6E6E73]" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar cidade..."
                  className="w-full bg-[#1C1C1E] border border-[#2C2C2E] rounded-lg pl-8 pr-3 py-2 text-sm text-[#F5F5F7] placeholder:text-[#6E6E73] outline-none focus:border-[#EF4444] transition-colors"
                  autoFocus
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-1 p-3 max-h-72 overflow-y-auto">
              {filtered.map((c) => (
                <button
                  key={c.slug}
                  onClick={() => switchCity(c.slug)}
                  className={cn(
                    "flex flex-col items-start px-3 py-2.5 rounded-lg text-left transition-all duration-150",
                    c.slug === currentCity
                      ? "bg-[rgba(239,68,68,0.12)] border border-[rgba(239,68,68,0.3)] text-[#EF4444]"
                      : "hover:bg-[#1C1C1E] text-[#A1A1A6] hover:text-[#F5F5F7]"
                  )}
                >
                  <span className="text-sm font-medium">{c.name}</span>
                  <span className="text-xs text-[#6E6E73]">{c.region}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
