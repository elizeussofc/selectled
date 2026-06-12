"use client";

import { useRouter } from "next/navigation";
import { MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface GeoBannerProps {
  cityName: string;
  citySlug: string;
  onDismiss: () => void;
}

export function GeoBanner({ cityName, citySlug, onDismiss }: GeoBannerProps) {
  const router = useRouter();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 animate-slide-down">
      <div className="bg-[#141414] border-b border-[#2C2C2E] shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-[rgba(239,68,68,0.12)] rounded-lg">
                <MapPin size={14} className="text-[#EF4444]" />
              </div>
              <p className="text-sm text-[#F5F5F7]">
                Detectamos que você está em{" "}
                <span className="font-semibold text-white">{cityName}</span>
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button
                size="sm"
                onClick={() => router.push(`/${citySlug}`)}
              >
                Continuar em {cityName}
              </Button>
              <button
                onClick={onDismiss}
                className="p-1.5 rounded-lg text-[#6E6E73] hover:text-white hover:bg-[#2C2C2E] transition-colors text-xs"
              >
                Escolher outra
              </button>
              <button
                onClick={onDismiss}
                className="p-1 rounded-md text-[#3A3A3C] hover:text-[#6E6E73] transition-colors"
                aria-label="Fechar"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
