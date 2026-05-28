"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin } from "lucide-react";
import { cities } from "@/data/cities";

export function CitySearch() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

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
    document.cookie = `preferred-city=${slug}; max-age=${60 * 60 * 24 * 30}; path=/`;
    router.push(`/${slug}`);
  }

  return (
    <div ref={ref} className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6E6E73]" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Buscar cidade..."
          className="w-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.12)] rounded-xl pl-10 pr-4 py-3.5 text-sm text-[#F5F5F7] placeholder:text-[#6E6E73] outline-none focus:border-[#FF3B30] focus:bg-[rgba(255,59,48,0.04)] transition-all"
        />
      </div>

      {open && results.length > 0 && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-[#141414] border border-[#2C2C2E] rounded-xl shadow-2xl overflow-hidden z-50">
          {results.map((city) => (
            <button
              key={city.slug}
              onClick={() => handleSelect(city.slug)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#1C1C1E] transition-colors text-left"
            >
              <MapPin size={14} className="text-[#FF3B30] shrink-0" />
              <div>
                <p className="text-sm font-medium text-[#F5F5F7]">{city.name}</p>
                <p className="text-xs text-[#6E6E73]">{city.region}, {city.state}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
