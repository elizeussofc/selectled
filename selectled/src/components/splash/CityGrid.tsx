"use client";

import { useRouter } from "next/navigation";
import { MapPin } from "lucide-react";
import { cities } from "@/data/cities";
import { cn } from "@/lib/utils";

export function CityGrid() {
  const router = useRouter();

  function handleCity(slug: string) {
    document.cookie = `preferred-city=${slug}; max-age=${60 * 60 * 24 * 30}; path=/`;
    router.push(`/${slug}`);
  }

  const groupedCities = [
    { label: "Capital", items: cities.filter((c) => c.region === "Capital") },
    { label: "Grande SP", items: cities.filter((c) => c.region === "Grande SP") },
    { label: "ABC Paulista", items: cities.filter((c) => c.region === "ABC Paulista") },
    { label: "Interior SP", items: cities.filter((c) => c.region === "Interior SP") },
    { label: "Baixada Santista", items: cities.filter((c) => c.region === "Baixada Santista") },
    { label: "Vale do Paraíba", items: cities.filter((c) => c.region === "Vale do Paraíba") },
  ].filter((g) => g.items.length > 0);

  return (
    <div className="w-full max-w-3xl mx-auto">
      {groupedCities.map((group) => (
        <div key={group.label} className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#6E6E73] mb-3 px-1">
            {group.label}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {group.items.map((city) => (
              <button
                key={city.slug}
                onClick={() => handleCity(city.slug)}
                className={cn(
                  "group relative flex flex-col items-start p-3.5 rounded-xl",
                  "bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.07)]",
                  "hover:bg-[rgba(255,59,48,0.08)] hover:border-[rgba(255,59,48,0.35)]",
                  "transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]",
                  "text-left cursor-pointer"
                )}
              >
                <MapPin
                  size={13}
                  className="text-[#3A3A3C] group-hover:text-[#FF3B30] transition-colors mb-1.5"
                />
                <span className="text-sm font-semibold text-[#F5F5F7] leading-tight">
                  {city.name}
                </span>
                <span className="text-xs text-[#6E6E73] mt-0.5">{city.state}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
