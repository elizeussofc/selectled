"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CityGrid } from "@/components/splash/CityGrid";
import { CitySearch } from "@/components/splash/CitySearch";
import { GeoBanner } from "@/components/splash/GeoBanner";

export default function SplashPage() {
  const [geo, setGeo] = useState<{ suggested: string; name: string; detected: boolean } | null>(null);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [preferredCity, setPreferredCity] = useState<string | null>(null);

  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find((c) => c.startsWith("preferred-city="))
      ?.split("=")[1];
    if (cookie) setPreferredCity(cookie);

    fetch("/api/geo")
      .then((r) => r.json())
      .then((data) => setGeo(data))
      .catch(() => {});
  }, []);

  const showBanner =
    geo?.detected && !bannerDismissed && geo.suggested !== preferredCity;

  return (
    <main className="min-h-screen bg-[#0A0A0A] flex flex-col relative overflow-hidden">
      {/* ── Geo Banner ── */}
      {showBanner && geo && (
        <GeoBanner
          cityName={geo.name}
          citySlug={geo.suggested}
          onDismiss={() => setBannerDismissed(true)}
        />
      )}

      {/* ── Background — foto real ── */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/hero-splash.jpg"
          alt="LED wall concert hall"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Escurecimento para legibilidade do texto */}
        <div className="absolute inset-0 bg-black/65" />
        {/* Vignette nas bordas */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_50%,transparent_40%,rgba(0,0,0,0.6)_100%)]" />
        {/* Tom vermelho sutil no centro */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(255,59,48,0.08)_0%,transparent_70%)]" />
      </div>

      {/* ── Conteúdo ── */}
      <div className={`relative z-10 flex flex-col min-h-screen ${showBanner ? "pt-14" : ""}`}>
        {/* Header mínimo */}
        <div className="flex items-center justify-between px-6 py-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#FF3B30] rounded-md flex items-center justify-center">
              <span className="text-white text-xs font-black">SL</span>
            </div>
            <span
              className="text-white font-bold text-lg"
              style={{ fontFamily: "var(--font-space)" }}
            >
              Select LED
            </span>
          </div>

          {preferredCity && (
            <Link
              href={`/${preferredCity}`}
              className="text-sm text-[#A1A1A6] hover:text-white transition-colors flex items-center gap-1.5 border border-[#2C2C2E] rounded-full px-3 py-1.5"
            >
              ← Voltar para {preferredCity.replace(/-/g, " ")}
            </Link>
          )}
        </div>

        {/* Hero central */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-16 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[rgba(255,59,48,0.1)] border border-[rgba(255,59,48,0.25)] rounded-full px-4 py-1.5 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF3B30] animate-pulse" />
            <span className="text-xs font-semibold text-[#FF3B30] tracking-wide">
              Locação e Venda de Painéis LED — Brasil
            </span>
          </div>

          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-4 leading-tight"
            style={{ fontFamily: "var(--font-space)", letterSpacing: "-0.03em" }}
          >
            Onde você está?
          </h1>
          <p className="text-lg text-[#A1A1A6] mb-12 max-w-lg leading-relaxed">
            Selecione sua cidade para conhecer o representante Select LED mais próximo e receber
            atendimento local.
          </p>

          {/* Busca */}
          <div className="w-full max-w-md mb-12">
            <CitySearch />
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 w-full max-w-3xl mb-8">
            <div className="flex-1 h-px bg-[#2C2C2E]" />
            <span className="text-xs text-[#3A3A3C] uppercase tracking-widest">ou escolha na lista</span>
            <div className="flex-1 h-px bg-[#2C2C2E]" />
          </div>

          {/* Grid de cidades */}
          <CityGrid />
        </div>

        {/* Footer mínimo */}
        <div className="border-t border-[#1C1C1E] px-6 py-5">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-[#3A3A3C] text-center sm:text-left">
              Atendemos toda a Grande SP e interior · Parte do Select Hub
            </p>
            <div className="flex gap-4">
              <Link href="/sobre" className="text-xs text-[#3A3A3C] hover:text-[#6E6E73] transition-colors">
                Sobre
              </Link>
              <Link href="/blog" className="text-xs text-[#3A3A3C] hover:text-[#6E6E73] transition-colors">
                Blog
              </Link>
              <a
                href="https://wa.me/5511971945576?text=Olá, vim pelo site da Select LED"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#3A3A3C] hover:text-[#25D366] transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
