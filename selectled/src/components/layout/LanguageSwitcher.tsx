"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage, type Lang } from "@/contexts/language-context";

const languages: { code: Lang; flag: string; label: string; name: string }[] = [
  { code: "pt", flag: "🇧🇷", label: "PT", name: "Português" },
  { code: "en", flag: "🇺🇸", label: "EN", name: "English" },
  { code: "es", flag: "🇪🇸", label: "ES", name: "Español" },
  { code: "zh", flag: "🇨🇳", label: "ZH", name: "中文" },
];

export function LanguageSwitcher({ mobile = false }: { mobile?: boolean }) {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = languages.find((l) => l.code === lang) ?? languages[0];

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);

  if (mobile) {
    return (
      <div className="flex items-center gap-1.5 pb-3 border-b border-[#1C1C1E]">
        {languages.map(({ code, flag, label }) => (
          <button
            key={code}
            onClick={() => setLang(code)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              lang === code
                ? "bg-[#FF3B30] text-white"
                : "text-[#6E6E73] hover:text-white bg-white/5"
            }`}
          >
            <span>{flag}</span>
            <span>{label}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative hidden lg:block">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 h-8 px-2.5 rounded-lg border border-white/10 text-[#8E8E93] hover:text-white hover:border-white/20 transition-colors text-[12px] font-semibold"
        aria-label="Selecionar idioma"
      >
        <span className="text-sm leading-none">{current.flag}</span>
        <span>{current.label}</span>
        <ChevronDown
          size={11}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 w-36 bg-[#141414] border border-[#2C2C2E] rounded-xl shadow-2xl shadow-black/70 overflow-hidden z-[60]">
          {languages.map(({ code, flag, name }) => (
            <button
              key={code}
              onClick={() => { setLang(code); setOpen(false); }}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm transition-colors ${
                lang === code
                  ? "text-white bg-[rgba(255,59,48,0.12)]"
                  : "text-[#8E8E93] hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="text-base leading-none">{flag}</span>
              <span className="font-medium">{name}</span>
              {lang === code && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#FF3B30] shrink-0" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
