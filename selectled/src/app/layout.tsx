import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import { LanguageProvider } from "@/contexts/language-context";
import { CityTransitionProvider } from "@/contexts/city-transition-context";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Select LED — Painéis de LED para Eventos no Brasil",
    template: "%s | Select LED",
  },
  description:
    "Locação e venda de painéis de LED para eventos em toda a Grande SP e interior. Atendimento local, +10 anos, +5.000 eventos. Orçamento em 2h.",
  metadataBase: new URL("https://selectledpro.com.br"),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://selectledpro.com.br",
    siteName: "Select LED",
    title: "Select LED — Painéis de LED para Eventos no Brasil",
    description: "Locação e venda de painéis de LED para eventos em toda a Grande SP e interior.",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Select LED — Painéis de LED para Eventos",
    description: "Locação e venda de painéis de LED. +10 anos, +5.000 eventos.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${spaceGrotesk.variable} ${dmSans.variable} h-full`}>
      <body className="min-h-full flex flex-col" style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}>
        <LanguageProvider>
          <CityTransitionProvider>{children}</CityTransitionProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
