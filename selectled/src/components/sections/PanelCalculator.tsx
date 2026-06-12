"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Calculator } from "lucide-react";

interface PanelCalculatorProps {
  citySlug: string;
  cityName: string;
}

const PANEL_CONFIG = {
  "P2.5": { minDist: 0, maxDist: 5, price: 800, label: "Alta resolução — ideal para até 5m" },
  "P3":   { minDist: 5, maxDist: 10, price: 600, label: "Padrão profissional — 5 a 10m" },
  "P3.9": { minDist: 10, maxDist: 20, price: 500, label: "Meio-campo — 10 a 20m" },
  "P4":   { minDist: 20, maxDist: 999, price: 450, label: "Long throw — acima de 20m" },
};

export function PanelCalculator({ citySlug, cityName }: PanelCalculatorProps) {
  const [width, setWidth] = useState(4);
  const [height, setHeight] = useState(2.5);
  const [distance, setDistance] = useState(8);

  const panel =
    Object.entries(PANEL_CONFIG).find(([, c]) => distance >= c.minDist && distance < c.maxDist)?.[0] ?? "P3.9";
  const config = PANEL_CONFIG[panel as keyof typeof PANEL_CONFIG];
  const area = parseFloat((width * height).toFixed(1));
  const estimatedPrice = Math.round(area * config.price);

  const quoteUrl = `/${citySlug}/orcamento?width=${width}&height=${height}&distance=${distance}&panel=${panel}`;

  return (
    <div className="bg-[#141414] border border-[#2C2C2E] rounded-2xl p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 bg-[rgba(255,0,0,0.12)] rounded-xl">
          <Calculator size={20} className="text-[#FF0000]" />
        </div>
        <div>
          <h3 className="font-semibold text-white" style={{ fontFamily: "var(--font-display)" }}>
            Calculadora de painel
          </h3>
          <p className="text-xs text-[#6E6E73]">Descubra o modelo ideal para seu evento</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <SliderField
          label="Largura do painel"
          value={width}
          min={2}
          max={20}
          step={0.5}
          unit="m"
          onChange={setWidth}
        />
        <SliderField
          label="Altura do painel"
          value={height}
          min={1}
          max={8}
          step={0.5}
          unit="m"
          onChange={setHeight}
        />
        <SliderField
          label="Distância do público"
          value={distance}
          min={3}
          max={50}
          step={1}
          unit="m"
          onChange={setDistance}
        />
      </div>

      {/* Resultado */}
      <div className="bg-[rgba(255,0,0,0.06)] border border-[rgba(255,0,0,0.2)] rounded-xl p-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          <div>
            <p className="text-xs text-[#6E6E73] mb-1">Modelo recomendado</p>
            <p className="text-2xl font-bold text-[#FF0000]" style={{ fontFamily: "var(--font-display)" }}>
              {panel}
            </p>
            <p className="text-xs text-[#6E6E73] mt-0.5">{config.label}</p>
          </div>
          <div>
            <p className="text-xs text-[#6E6E73] mb-1">Área total</p>
            <p className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
              {area} m²
            </p>
            <p className="text-xs text-[#6E6E73] mt-0.5">{width}m × {height}m</p>
          </div>
          <div>
            <p className="text-xs text-[#6E6E73] mb-1">Estimativa a partir de</p>
            <p className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
              R$ {estimatedPrice.toLocaleString("pt-BR")}
            </p>
            <p className="text-xs text-[#6E6E73] mt-0.5">por diária · referência</p>
          </div>
        </div>
        <Link href={quoteUrl}>
          <Button className="w-full sm:w-auto">
            Quero esse orçamento exato em {cityName}
          </Button>
        </Link>
      </div>
    </div>
  );
}

function SliderField({
  label, value, min, max, step, unit, onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs text-[#A1A1A6]">{label}</label>
        <span className="text-sm font-semibold text-white">
          {value} {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none bg-[#2C2C2E] accent-[#FF0000] cursor-pointer"
      />
      <div className="flex justify-between mt-1">
        <span className="text-xs text-[#3A3A3C]">{min}{unit}</span>
        <span className="text-xs text-[#3A3A3C]">{max}{unit}</span>
      </div>
    </div>
  );
}
