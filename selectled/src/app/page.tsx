"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CityGrid } from "@/components/splash/CityGrid";
import { CitySearch } from "@/components/splash/CitySearch";
import { GeoBanner } from "@/components/splash/GeoBanner";
import { MapPin } from "lucide-react";
import { cities } from "@/data/cities";

function haversine(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

function nearestCity(lat: number, lng: number) {
  return cities.reduce(
    (best, city) => {
      const d = haversine(lat, lng, city.lat, city.lng);
      return d < best.dist ? { city, dist: d } : best;
    },
    { city: cities[0], dist: Infinity }
  ).city;
}

export default function SplashPage() {
  const [geo, setGeo] = useState<{ suggested: string; name: string; detected: boolean } | null>(null);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [preferredCity, setPreferredCity] = useState<string | null>(null);
  const [showCities, setShowCities] = useState(false);

  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find((c) => c.startsWith("preferred-city="))
      ?.split("=")[1];
    if (cookie) setPreferredCity(cookie);

    const fallbackToIP = () =>
      fetch("/api/geo")
        .then((r) => r.json())
        .then((data) => setGeo(data))
        .catch(() => {});

    if (!navigator.geolocation) {
      fallbackToIP();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const city = nearestCity(pos.coords.latitude, pos.coords.longitude);
        setGeo({ suggested: city.slug, name: city.name, detected: true });
      },
      () => fallbackToIP(),
      { timeout: 6000, maximumAge: 300_000 }
    );
  }, []);

  const showBanner = geo?.detected && !bannerDismissed && geo.suggested !== preferredCity;

  return (
    <main className="relative min-h-screen flex flex-col overflow-hidden bg-[#0A0A0A]">

      {/* ── Background vídeo ── */}
      <div className="absolute inset-0">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/splash-bg-base.webm"
          autoPlay
          loop
          muted
          playsInline
        />
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          src="/videos/splash-bg.webm"
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Camadas de overlay */}
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#0A0A0A]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/40 via-transparent to-[#0A0A0A]/40" />
        {/* Acento vermelho no topo */}
        <div className="absolute top-0 left-0 right-0 h-px bg-[#FF0000]/60" />
      </div>

      {/* Geo Banner */}
      {showBanner && geo && (
        <div className="relative z-30">
          <GeoBanner
            cityName={geo.name}
            citySlug={geo.suggested}
            onDismiss={() => setBannerDismissed(true)}
          />
        </div>
      )}

      {/* ── Header ── */}
      <header className="relative z-20 flex items-center justify-between px-6 md:px-10 pt-6 pb-4">
        <div className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/sl-icon.png" alt="SL" style={{ width: 32, height: 32, borderRadius: 9, objectFit: "contain" }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/selectled-logo.png" alt="Select LED" style={{ height: 18, objectFit: "contain" }} />
        </div>

        {preferredCity && (
          <Link
            href={`/${preferredCity}`}
            className="flex items-center gap-1.5 text-xs text-[#A1A1A6] hover:text-white transition-colors border border-[#2C2C2E] hover:border-[#3A3A3C] rounded-full px-3 py-1.5 backdrop-blur-sm bg-white/5"
          >
            <MapPin size={11} className="text-[#FF0000]" />
            {preferredCity.replace(/-/g, " ")}
          </Link>
        )}
      </header>

      {/* ── Hero ── */}
      <section className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center pb-52">
        <div className="w-full flex flex-col items-center">

          {/* Badge — fade in após o zoom */}
          <div className="flex justify-center mb-3" style={{ opacity: 0, animation: "fadeIn 0.6s ease 1s forwards" }}>
            <span className="inline-flex items-center gap-1.5 bg-[rgba(255,0,0,0.12)] border border-[rgba(255,0,0,0.3)] text-white text-xs font-semibold px-3.5 py-1.5 rounded-full tracking-wide uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000] animate-pulse" />
              +10 anos · +5.000 eventos
            </span>
          </div>

          {/* Boas-vindas — fade in */}
          <p
            className="text-base text-white/70 font-normal mb-1 tracking-wide"
            style={{ fontFamily: "var(--font-body)", opacity: 0, animation: "fadeIn 0.6s ease 1.1s forwards" }}
          >
            Seja bem-vindo à
          </p>

          {/* Headline — zoom in principal */}
          <h1
            className="text-[14vw] sm:text-8xl md:text-9xl font-black leading-none tracking-tight mb-4"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em", opacity: 0, animation: "zoomInSettle 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s forwards" }}
          >
            <span style={{
              color: "white",
              WebkitTextStroke: "1.5px rgba(160,160,160,0.35)",
            }}>SELECT</span>
            <span style={{ color: "#FF2020", animation: "ledR 3.2s ease-in-out 1.2s infinite", WebkitTextStroke: "0px" }}>L</span>
            <span style={{ color: "#00FF87", animation: "ledG 2.7s ease-in-out 1.4s infinite", WebkitTextStroke: "0px" }}>E</span>
            <span style={{ color: "#4FC3F7", animation: "ledB 3.8s ease-in-out 1.6s infinite", WebkitTextStroke: "0px" }}>D</span>
          </h1>

          {/* Slogan — fade in */}
          <p
            className="text-sm sm:text-base text-[#6E6E73] max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-body)", marginBottom: "86px", opacity: 0, animation: "fadeIn 0.6s ease 1.2s forwards" }}
          >
            Uma HUB completa: Produção de Eventos, Painel de LED, audiovisual e luz,{" "}
            profissionais de elite — locação e venda.
          </p>

          {/* Subtítulo — fade in */}
          <p
            className="text-sm sm:text-base text-[#A1A1A6] mb-5 sm:whitespace-nowrap"
            style={{ fontFamily: "var(--font-body)", opacity: 0, animation: "fadeIn 0.6s ease 1.4s forwards" }}
          >
            Selecione sua cidade para falar com o representante local
          </p>

          {/* Search — fade in */}
          <div className="w-full max-w-xl mx-auto" style={{ opacity: 0, animation: "fadeIn 0.6s ease 1.5s forwards" }}>
            <CitySearch onFocus={() => setShowCities(true)} />
          </div>
        </div>

        {/* City Grid — visível após clicar no search */}
        {showCities && (
          <div className="w-full max-w-2xl mx-auto mt-3">
            <CityGrid />
          </div>
        )}
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-[#1C1C1E]/60 px-6 md:px-10 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#3A3A3C]">
            Atendemos toda a Grande SP e interior · Parte do{" "}
            <span className="text-[#6E6E73]">Select Hub</span>
          </p>
          <div className="flex gap-5">
            <Link href="/sobre" className="text-xs text-[#3A3A3C] hover:text-[#6E6E73] transition-colors">Sobre</Link>
            <Link href="/blog" className="text-xs text-[#3A3A3C] hover:text-[#6E6E73] transition-colors">Blog</Link>
            <a
              href="https://wa.me/5511971945576?text=Olá, vim pelo site da Select LED"
              target="_blank" rel="noopener noreferrer"
              className="text-xs text-[#3A3A3C] hover:text-[#25D366] transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
