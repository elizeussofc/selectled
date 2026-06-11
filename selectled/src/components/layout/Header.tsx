"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { CitySwitcher } from "./CitySwitcher";
import { cn } from "@/lib/utils";

interface HeaderProps {
  citySlug: string;
  variant?: "default" | "sales";
}

export function Header({ citySlug }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navItems = [
    { label: "Painéis LED", href: `/${citySlug}/paineis-led` },
    { label: "Som & Luz", href: `/${citySlug}/som-iluminacao` },
    { label: "Foto & Filme", href: `/${citySlug}/foto-filmagem` },
    { label: "Internet", href: `/${citySlug}/internet-eventos` },
    { label: "Credenciamento", href: `/${citySlug}/credenciamento` },
    { label: "Portfólio", href: `/${citySlug}/portfolio` },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[rgba(10,10,10,0.88)] backdrop-blur-2xl border-b border-[#1C1C1E] shadow-xl shadow-black/40"
          : "bg-transparent"
      )}
    >
      {!scrolled && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF3B30]/40 to-transparent" />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 md:h-16">

          {/* Logo */}
          <Link href={`/${citySlug}`} className="flex items-center gap-2.5 shrink-0 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/sl-icon.png"
              alt="SL"
              className="w-8 h-8 rounded-xl object-contain group-hover:scale-105 transition-transform duration-200"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/selectled-logo.png"
              alt="Select LED"
              className="hidden sm:block object-contain"
              style={{ height: 18, filter: "drop-shadow(0 0 6px rgba(255,255,255,0.45)) drop-shadow(0 0 2px rgba(255,255,255,0.3))" }}
            />
          </Link>

          {/* Nav desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3 py-1.5 text-[13px] font-medium transition-colors duration-150 rounded-md",
                    active
                      ? "text-white bg-white/8"
                      : "text-[#8E8E93] hover:text-white hover:bg-white/5"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href={`/${citySlug}/vendas`}
              className={cn(
                "px-3 py-1.5 text-[13px] font-semibold transition-colors duration-150 rounded-md ml-1",
                pathname.startsWith(`/${citySlug}/vendas`)
                  ? "text-[#FF3B30] bg-[rgba(255,59,48,0.1)]"
                  : "text-[#FF3B30] hover:bg-[rgba(255,59,48,0.08)]"
              )}
            >
              Venda
            </Link>
          </nav>

          {/* Right */}
          <div className="flex items-center gap-2">
            <CitySwitcher currentCity={citySlug} />
            <Link
              href={`/${citySlug}/orcamento`}
              className="hidden sm:inline-flex items-center h-8 px-4 rounded-lg bg-[#FF3B30] text-white text-xs font-semibold hover:bg-[#FF1A0E] transition-colors shadow-md shadow-red-900/30"
            >
              Orçamento
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-1.5 rounded-md text-[#8E8E93] hover:text-white hover:bg-white/8 transition-colors"
              aria-label="Menu"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#0D0D0D]/95 backdrop-blur-xl border-t border-[#1C1C1E] animate-slide-down">
          <nav className="px-4 py-3 flex flex-col gap-0.5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm text-[#A1A1A6] hover:text-white hover:bg-white/5 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={`/${citySlug}/vendas`}
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm font-semibold text-[#FF3B30] hover:bg-[rgba(255,59,48,0.08)] transition-colors"
            >
              Venda de painéis
            </Link>
            <div className="pt-2 pb-1 border-t border-[#1C1C1E] mt-1">
              <Link
                href={`/${citySlug}/orcamento`}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center h-10 rounded-lg bg-[#FF3B30] text-white text-sm font-semibold hover:bg-[#FF1A0E] transition-colors"
              >
                Solicitar orçamento
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
