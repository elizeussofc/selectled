import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Select LED — Painéis de LED para Eventos no Brasil",
    template: "%s | Select LED",
  },
  description:
    "Locação e venda de painéis de LED para eventos em toda a Grande SP e interior. Atendimento local, +10 anos, +5.000 eventos. Orçamento em 2h.",
  metadataBase: new URL("https://selectled.com.br"),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://selectled.com.br",
    siteName: "Select LED",
    title: "Select LED — Painéis de LED para Eventos no Brasil",
    description:
      "Locação e venda de painéis de LED para eventos em toda a Grande SP e interior.",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Select LED — Painéis de LED para Eventos",
    description: "Locação e venda de painéis de LED. +10 anos, +5.000 eventos.",
  },
  themeColor: "#0A0A0A",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full`}
    >
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
