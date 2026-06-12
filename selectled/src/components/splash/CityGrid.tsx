"use client";

import { useRouter } from "next/navigation";
import { MapPin } from "lucide-react";
import { cities } from "@/data/cities";

const groups = [
  { label: "Capital",          regions: ["Capital"] },
  { label: "Grande SP",        regions: ["Grande SP"] },
  { label: "ABC Paulista",     regions: ["ABC Paulista"] },
  { label: "Interior SP",      regions: ["Interior SP"] },
  { label: "Baixada Santista", regions: ["Baixada Santista"] },
  { label: "Vale do Paraíba",  regions: ["Vale do Paraíba"] },
];

export function CityGrid() {
  const router = useRouter();

  function handleCity(slug: string) {
    document.cookie = `preferred-city=${slug}; max-age=${60 * 60 * 24 * 30}; path=/`;
    router.push(`/${slug}`);
  }

  return (
    <div className="w-full max-w-2xl mx-auto rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[rgba(0,0,0,0.45)] backdrop-blur-md overflow-hidden">
      {groups.map((group, gi) => {
        const items = cities.filter((c) => group.regions.includes(c.region));
        if (!items.length) return null;
        return (
          <div key={group.label} className={gi > 0 ? "border-t border-[rgba(255,255,255,0.05)]" : ""}>
            {/* Region header */}
            <div className="px-5 pt-3 pb-1">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3A3A3C]">
                {group.label}
              </span>
            </div>
            {/* City buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-px px-5 pb-3">
              {items.map((city) => (
                <button
                  key={city.slug}
                  onClick={() => handleCity(city.slug)}
                  className="group flex items-center gap-2 py-2.5 px-2 rounded-lg hover:bg-[rgba(239,68,68,0.08)] transition-all duration-150 text-left cursor-pointer"
                >
                  <MapPin size={11} className="text-[#3A3A3C] group-hover:text-[#EF4444] transition-colors shrink-0" />
                  <span className="text-sm text-[#8A8A8E] group-hover:text-white transition-colors">
                    {city.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
