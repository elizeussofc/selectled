"use client";

import { useLanguage, type Lang } from "@/contexts/language-context";

const languages: { code: Lang; flag: string; label: string }[] = [
  { code: "pt", flag: "🇧🇷", label: "PT" },
  { code: "en", flag: "🇺🇸", label: "EN" },
  { code: "es", flag: "🇪🇸", label: "ES" },
  { code: "zh", flag: "🇨🇳", label: "中文" },
];

export function LanguageSwitcher({ mobile = false }: { mobile?: boolean }) {
  const { lang, setLang } = useLanguage();

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
    <div className="hidden lg:flex items-center gap-0.5 border border-white/10 rounded-lg p-0.5">
      {languages.map(({ code, flag, label }) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          aria-label={`Switch to ${label}`}
          className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-semibold transition-all duration-200 ${
            lang === code
              ? "bg-[#FF3B30] text-white"
              : "text-[#6E6E73] hover:text-white hover:bg-white/8"
          }`}
        >
          <span>{flag}</span>
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
