"use client";

import { useState, useRef, useEffect } from "react";
import { Search, MapPin } from "lucide-react";
import { cities } from "@/data/cities";
import { useCityTransition } from "@/contexts/city-transition-context";

interface CitySearchProps {
  onFocus?: () => void;
}

export function CitySearch({ onFocus }: CitySearchProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { startTransition } = useCityTransition();

  const results = query.length > 0
    ? cities.filter((c) =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.region.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(slug: string) {
    startTransition(slug);
  }

  return (
    <div ref={ref} className="relative w-full max-w-xl mx-auto">
      <div className="flex items-center gap-3 bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.12)] rounded-full px-5 py-4 focus-within:border-[rgba(255,0,0,0.5)] focus-within:bg-[rgba(255,0,0,0.04)] focus-within:shadow-[0_0_0_4px_rgba(255,0,0,0.08)] transition-all duration-200">
        <Search size={18} className="text-[#4A4A4F] shrink-0 transition-colors" style={{}} />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => { setOpen(true); onFocus?.(); }}
          placeholder="Buscar sua cidade..."
          className="flex-1 bg-transparent text-base text-[#F5F5F7] placeholder:text-[#4A4A4F] outline-none"
        />
      </div>

      {open && results.length > 0 && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-[#111] border border-[#2C2C2E] rounded-2xl shadow-2xl shadow-black/60 overflow-hidden z-50">
          {results.map((city) => (
            <button
              key={city.slug}
              onClick={() => handleSelect(city.slug)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[rgba(255,0,0,0.06)] transition-colors text-left border-b border-[#1C1C1E] last:border-0"
            >
              <MapPin size={13} className="text-[#FF0000] shrink-0" />
              <div>
                <p className="text-sm font-medium text-[#F5F5F7]">{city.name}</p>
                <p className="text-xs text-[#4A4A4F]">{city.region} · {city.state}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
