"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { MessageCircle } from "lucide-react";

interface FinancingSimulatorProps {
  citySlug: string;
  repWhatsapp: string;
}

const MONTHLY_RATE = 0.0199;

function calcInstallment(pv: number, n: number): number {
  const r = MONTHLY_RATE;
  return (pv * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

const TERMS = [12, 24, 36, 48];

export function FinancingSimulator({ repWhatsapp }: FinancingSimulatorProps) {
  const [total, setTotal] = useState(30000);
  const [entry, setEntry] = useState(6000);

  const financed = Math.max(total - entry, 0);
  const entryPct = total > 0 ? Math.round((entry / total) * 100) : 0;

  const waMsg = `Olá! Gostaria de simular o financiamento de um painel LED no valor de R$ ${total.toLocaleString("pt-BR")} com entrada de R$ ${entry.toLocaleString("pt-BR")}.`;

  return (
    <div className="bg-[#141414] border border-[#2C2C2E] rounded-2xl p-6 lg:p-8">
      <h3 className="text-xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-display)" }}>
        Simulador de financiamento
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="text-xs text-[#A1A1A6] mb-2 block">Valor total do painel</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#6E6E73]">R$</span>
            <input
              type="number"
              value={total}
              onChange={(e) => setTotal(Math.max(0, Number(e.target.value)))}
              className="w-full bg-[#1C1C1E] border border-[#2C2C2E] rounded-lg pl-8 pr-4 py-3 text-sm text-white outline-none focus:border-[#FF3B30] transition-colors"
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-xs text-[#A1A1A6]">Entrada ({entryPct}%)</label>
            <span className="text-xs font-semibold text-white">R$ {entry.toLocaleString("pt-BR")}</span>
          </div>
          <input
            type="range"
            min={0}
            max={total}
            step={500}
            value={entry}
            onChange={(e) => setEntry(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none bg-[#2C2C2E] accent-[#FF3B30] cursor-pointer"
          />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-[#3A3A3C]">R$ 0</span>
            <span className="text-xs text-[#3A3A3C]">R$ {total.toLocaleString("pt-BR")}</span>
          </div>
        </div>
      </div>

      {/* Tabela de parcelas */}
      <div className="bg-[#1C1C1E] rounded-xl overflow-hidden mb-6">
        <div className="grid grid-cols-3 text-xs text-[#6E6E73] uppercase tracking-wide px-5 py-3 border-b border-[#2C2C2E]">
          <span>Parcelas</span>
          <span>Valor/mês</span>
          <span>Total pago</span>
        </div>
        {TERMS.map((n) => {
          const installment = calcInstallment(financed, n);
          const totalPaid = entry + installment * n;
          return (
            <div key={n} className="grid grid-cols-3 px-5 py-3.5 border-b border-[#2C2C2E] last:border-0 hover:bg-[#252525] transition-colors">
              <span className="text-sm font-semibold text-white">{n}x</span>
              <span className="text-sm text-[#A1A1A6]">
                R$ {installment.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className="text-sm text-[#6E6E73]">
                R$ {totalPaid.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-[#3A3A3C] mb-5">
        * Simulação com taxa referencial de 1,99% a.m. Valores sujeitos a análise de crédito.
      </p>

      <a
        href={`https://wa.me/${repWhatsapp}?text=${encodeURIComponent(waMsg)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button variant="whatsapp">
          <MessageCircle size={16} />
          Falar com consultor sobre esse financiamento
        </Button>
      </a>
    </div>
  );
}
