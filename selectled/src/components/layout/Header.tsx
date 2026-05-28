"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { CitySwitcher } from "./CitySwitcher";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface HeaderProps {
  citySlug: string;
  variant?: "default" | "sales";
}

export function Header({ citySlug, variant = "default" }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
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
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-[rgba(10,10,10,0.9)] backdrop-blur-xl border-b border-[#2C2C2E] shadow-2xl"
          : "bg-transparent",
        variant === "sales" && scrolled && "bg-[rgba(14,14,14,0.95)]"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href={`/${citySlug}`} className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1.5">
              <div className="w-7 h-7 bg-[#FF3B30] rounded-md flex items-center justify-center">
                <span className="text-white text-xs font-black leading-none">SL</span>
              </div>
              <span
                className="text-white font-bold text-lg tracking-tight hidden sm:block"
                style={{ fontFamily: "var(--font-space)" }}
              >
                Select LED
              </span>
            </div>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-150",
                  pathname === item.href
                    ? "text-white bg-[rgba(255,255,255,0.08)]"
                    : "text-[#A1A1A6] hover:text-white hover:bg-[rgba(255,255,255,0.05)]"
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={`/${citySlug}/vendas`}
              className={cn(
                "px-3 py-1.5 rounded-md text-sm font-semibold transition-colors duration-150 ml-1",
                pathname.startsWith(`/${citySlug}/vendas`)
                  ? "text-[#FF3B30] bg-[rgba(255,59,48,0.12)]"
                  : "text-[#FF3B30] hover:bg-[rgba(255,59,48,0.08)]"
              )}
            >
              VENDAS
            </Link>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <CitySwitcher currentCity={citySlug} />
            <Link href={`/${citySlug}/orcamento`} className="hidden sm:block">
              <Button size="sm">Orçamento</Button>
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-md text-[#A1A1A6] hover:text-white hover:bg-[#1C1C1E] transition-colors"
              aria-label="Menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#0A0A0A] border-t border-[#2C2C2E]">
          <nav className="px-4 py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="px-3 py-2.5 rounded-md text-sm font-medium text-[#A1A1A6] hover:text-white hover:bg-[#1C1C1E] transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={`/${citySlug}/vendas`}
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2.5 rounded-md text-sm font-semibold text-[#FF3B30] hover:bg-[rgba(255,59,48,0.08)] transition-colors"
            >
              VENDAS
            </Link>
            <div className="pt-2 border-t border-[#2C2C2E] mt-1">
              <Link href={`/${citySlug}/orcamento`} onClick={() => setMenuOpen(false)}>
                <Button className="w-full justify-center">Solicitar orçamento</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
