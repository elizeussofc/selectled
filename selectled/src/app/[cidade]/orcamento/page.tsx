"use client";

import { useState, use, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { getCityBySlug } from "@/data/cities";
import { notFound } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ChevronRight, CheckCircle, MessageCircle, ArrowLeft } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/utils";

const step1Schema = z.object({
  eventType: z.string().min(1, "Selecione o tipo de evento"),
  eventDate: z.string().min(1, "Informe a data do evento"),
  location: z.enum(["indoor", "outdoor", "hibrido"]),
  audience: z.number().min(1),
});

const step2Schema = z.object({
  services: z.array(z.string()).min(1, "Selecione pelo menos um serviço"),
  panelWidth: z.string().optional(),
  panelHeight: z.string().optional(),
  details: z.string().optional(),
});

const step3Schema = z.object({
  name: z.string().min(2, "Nome obrigatório"),
  company: z.string().optional(),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(10, "WhatsApp inválido"),
  acceptWhatsApp: z.boolean().optional(),
});

type FormData = z.infer<typeof step1Schema> & z.infer<typeof step2Schema> & z.infer<typeof step3Schema>;

const EVENT_TYPES = ["Corporativo", "Show / Festival", "Casamento", "Igreja / Culto", "Feira / Exposição", "Lançamento de produto", "Palestra / Congresso", "Esporte", "Outro"];
const SERVICE_OPTIONS = [
  { value: "paineis-led", label: "Painel LED" },
  { value: "som-iluminacao", label: "Som e Iluminação" },
  { value: "foto-filmagem", label: "Foto e Filmagem" },
  { value: "internet-eventos", label: "Internet para Eventos" },
  { value: "credenciamento", label: "Credenciamento / Staff" },
];

interface Props { params: Promise<{ cidade: string }> }

export default function OrcamentoPage({ params }: Props) {
  const { cidade } = use(params);
  const city = getCityBySlug(cidade);
  if (!city) notFound();
  const safeCity = city!;

  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<FormData>>({
    location: "indoor",
    audience: 200,
    services: [],
    acceptWhatsApp: true,
  });

  // Pre-fill from query string (calculator)
  useEffect(() => {
    const panel = searchParams?.get("panel");
    const width = searchParams?.get("width");
    const height = searchParams?.get("height");
    if (panel || width) {
      setFormData((prev) => ({
        ...prev,
        services: ["paineis-led"],
        panelWidth: width ?? "",
        panelHeight: height ?? "",
      }));
    }
    // Pre-select sale type
    const tipo = searchParams?.get("tipo");
    if (tipo === "venda") {
      setFormData((prev) => ({ ...prev, eventType: "Compra de painel" }));
    }
  }, [searchParams]);

  // Persist between reloads
  useEffect(() => {
    const saved = localStorage.getItem(`orcamento-${cidade}`);
    if (saved) {
      try { setFormData((p) => ({ ...p, ...JSON.parse(saved) })); } catch { /* ignore */ }
    }
  }, [cidade]);

  function save(data: Partial<FormData>) {
    const merged = { ...formData, ...data };
    setFormData(merged);
    localStorage.setItem(`orcamento-${cidade}`, JSON.stringify(merged));
    return merged;
  }

  async function handleFinalSubmit(step3Data: z.infer<typeof step3Schema>) {
    setLoading(true);
    const full = save(step3Data) as FormData;
    try {
      const res = await fetch("/api/orcamento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...full, cidade, cityName: safeCity.name, repEmail: safeCity.rep.email, repName: safeCity.rep.name }),
      });
      if (res.ok) {
        localStorage.removeItem(`orcamento-${cidade}`);
        setSubmitted(true);
      } else {
        alert("Erro ao enviar. Tente pelo WhatsApp abaixo.");
      }
    } catch {
      alert("Erro ao enviar. Tente pelo WhatsApp abaixo.");
    } finally {
      setLoading(false);
    }
  }

  const progress = ((step - 1) / 3) * 100;
  const waFallback = buildWhatsAppUrl(
    city.rep.whatsapp,
    `Olá, ${city.rep.name}! Quero um orçamento para um evento em ${city.name}.`
  );

  if (submitted) {
    return (
      <>
        <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
          <div className="text-center max-w-lg">
            <div className="w-16 h-16 bg-[rgba(48,209,88,0.1)] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={32} className="text-[#30D158]" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>
              Orçamento enviado!
            </h1>
            <p className="text-[#A1A1A6] mb-4">
              Sua proposta chegará pelo <strong className="text-white">{city.rep.name}</strong> em até 2h úteis.
            </p>
            <a href={waFallback} target="_blank" rel="noopener noreferrer" className="block mb-6">
              <Button size="lg" variant="whatsapp" className="w-full justify-center">
                <MessageCircle size={18} /> Quer falar agora? WhatsApp
              </Button>
            </a>
            <Link href={`/${cidade}`} className="text-sm text-[#6E6E73] hover:text-white transition-colors">
              ← Voltar para {city.name}
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Header reduzido */}
      <div className="border-b border-[#1C1C1E] px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href={`/${cidade}`} className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/sl-icon.png" alt="SL" style={{ width: 28, height: 28, borderRadius: 8, objectFit: "contain" }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/selectled-logo.png" alt="Select LED" style={{ height: 16, objectFit: "contain" }} />
          </Link>
          <span className="text-xs text-[#6E6E73]">Orçamento — {city.name}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-0.5 bg-[#1C1C1E]">
        <div
          className="h-full bg-[#FF3B30] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar com rep */}
          <div className="hidden lg:block">
            <div className="sticky top-6 bg-[#141414] border border-[#2C2C2E] rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#1C1C1E] rounded-full" />
                <div>
                  <p className="text-sm font-semibold text-white">{city.rep.name}</p>
                  <p className="text-xs text-[#6E6E73]">{city.rep.role}</p>
                </div>
              </div>
              <p className="text-xs text-[#6E6E73] mb-2">
                Sua proposta será enviada diretamente por {city.rep.name}, representante em {city.name}.
              </p>
              <div className="flex items-center gap-1.5 text-xs text-[#30D158]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#30D158]" />
                Resposta em até 2h úteis
              </div>
              <a href={waFallback} target="_blank" rel="noopener noreferrer" className="mt-4 block">
                <Button variant="whatsapp" size="sm" className="w-full justify-center">
                  <MessageCircle size={13} /> WhatsApp direto
                </Button>
              </a>
            </div>
          </div>

          {/* Formulário */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    step > n ? "bg-[#30D158] text-white" : step === n ? "bg-[#FF3B30] text-white" : "bg-[#1C1C1E] text-[#6E6E73]"
                  }`}>
                    {step > n ? <CheckCircle size={14} /> : n}
                  </div>
                  <span className={`text-xs font-medium hidden sm:block ${step === n ? "text-white" : "text-[#6E6E73]"}`}>
                    {n === 1 ? "Evento" : n === 2 ? "Serviços" : "Contato"}
                  </span>
                  {n < 3 && <ChevronRight size={12} className="text-[#3A3A3C]" />}
                </div>
              ))}
            </div>

            {step === 1 && <Step1 initial={formData} onNext={(d) => { save(d); setStep(2); }} />}
            {step === 2 && <Step2 initial={formData} onNext={(d) => { save(d); setStep(3); }} onBack={() => setStep(1)} />}
            {step === 3 && <Step3 initial={formData} onSubmit={handleFinalSubmit} onBack={() => setStep(2)} loading={loading} cityName={city.name} />}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Step 1 ── */
function Step1({ initial, onNext }: { initial: Partial<FormData>; onNext: (d: z.infer<typeof step1Schema>) => void }) {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<z.infer<typeof step1Schema>>({
    resolver: zodResolver(step1Schema),
    defaultValues: { eventType: initial.eventType ?? "", eventDate: initial.eventDate ?? "", location: initial.location ?? "indoor", audience: initial.audience ?? 200 },
  });
  const audience = watch("audience", 200);
  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-display)" }}>Sobre o evento</h2>
        <p className="text-sm text-[#6E6E73]">Etapa 1 de 3</p>
      </div>
      <div>
        <label className="text-xs text-[#A1A1A6] mb-2 block">Tipo de evento *</label>
        <select {...register("eventType")} className="w-full bg-[#141414] border border-[#2C2C2E] rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#FF3B30] transition-colors">
          <option value="">Selecione...</option>
          {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        {errors.eventType && <p className="text-xs text-[#FF453A] mt-1">{errors.eventType.message}</p>}
      </div>
      <div>
        <label className="text-xs text-[#A1A1A6] mb-2 block">Data do evento *</label>
        <input type="date" {...register("eventDate")} className="w-full bg-[#141414] border border-[#2C2C2E] rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#FF3B30] transition-colors" />
        {errors.eventDate && <p className="text-xs text-[#FF453A] mt-1">{errors.eventDate.message}</p>}
      </div>
      <div>
        <label className="text-xs text-[#A1A1A6] mb-2 block">Ambiente</label>
        <div className="grid grid-cols-3 gap-2">
          {(["indoor", "outdoor", "hibrido"] as const).map((loc) => (
            <label key={loc} className="cursor-pointer">
              <input type="radio" {...register("location")} value={loc} className="sr-only" />
              <div className={`text-center py-2.5 rounded-xl border text-sm font-medium transition-all ${
                watch("location") === loc ? "border-[#FF3B30] bg-[rgba(255,59,48,0.08)] text-[#FF3B30]" : "border-[#2C2C2E] text-[#6E6E73] hover:border-[rgba(255,255,255,0.14)]"
              }`}>
                {loc === "indoor" ? "Indoor" : loc === "outdoor" ? "Outdoor" : "Híbrido"}
              </div>
            </label>
          ))}
        </div>
      </div>
      <div>
        <div className="flex justify-between mb-2">
          <label className="text-xs text-[#A1A1A6]">Público estimado</label>
          <span className="text-sm font-semibold text-white">{audience.toLocaleString("pt-BR")} pessoas</span>
        </div>
        <input type="range" min={50} max={10000} step={50} {...register("audience", { valueAsNumber: true })} className="w-full h-1.5 rounded-full appearance-none bg-[#2C2C2E] accent-[#FF3B30] cursor-pointer" />
      </div>
      <Button type="submit" size="lg" className="w-full justify-center">Próximo →</Button>
    </form>
  );
}

/* ── Step 2 ── */
function Step2({ initial, onNext, onBack }: { initial: Partial<FormData>; onNext: (d: z.infer<typeof step2Schema>) => void; onBack: () => void }) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<z.infer<typeof step2Schema>>({
    resolver: zodResolver(step2Schema),
    defaultValues: { services: initial.services ?? [], panelWidth: initial.panelWidth ?? "", panelHeight: initial.panelHeight ?? "", details: initial.details ?? "" },
  });
  const selectedServices = watch("services");
  const hasPanel = selectedServices?.includes("paineis-led");
  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-display)" }}>O que você precisa?</h2>
        <p className="text-sm text-[#6E6E73]">Etapa 2 de 3</p>
      </div>
      <div>
        <label className="text-xs text-[#A1A1A6] mb-3 block">Serviços desejados *</label>
        <div className="space-y-2">
          {SERVICE_OPTIONS.map((s) => (
            <label key={s.value} className="flex items-center gap-3 p-3.5 rounded-xl border border-[#2C2C2E] bg-[#141414] cursor-pointer hover:border-[rgba(255,255,255,0.14)] transition-colors">
              <input type="checkbox" value={s.value} {...register("services")} className="accent-[#FF3B30] w-4 h-4" />
              <span className="text-sm text-[#F5F5F7]">{s.label}</span>
            </label>
          ))}
        </div>
        {errors.services && <p className="text-xs text-[#FF453A] mt-1">{errors.services.message}</p>}
      </div>
      {hasPanel && (
        <div className="grid grid-cols-2 gap-3 p-4 bg-[rgba(255,59,48,0.04)] border border-[rgba(255,59,48,0.15)] rounded-xl">
          <div>
            <label className="text-xs text-[#A1A1A6] mb-2 block">Largura do painel (m)</label>
            <input type="number" step="0.5" {...register("panelWidth")} placeholder="Ex: 4" className="w-full bg-[#141414] border border-[#2C2C2E] rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-[#FF3B30] transition-colors" />
          </div>
          <div>
            <label className="text-xs text-[#A1A1A6] mb-2 block">Altura do painel (m)</label>
            <input type="number" step="0.5" {...register("panelHeight")} placeholder="Ex: 2.5" className="w-full bg-[#141414] border border-[#2C2C2E] rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-[#FF3B30] transition-colors" />
          </div>
        </div>
      )}
      <div>
        <label className="text-xs text-[#A1A1A6] mb-2 block">Detalhes do projeto (opcional)</label>
        <textarea {...register("details")} rows={3} placeholder="Descreva o evento, local, necessidades específicas..." className="w-full bg-[#141414] border border-[#2C2C2E] rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#6E6E73] outline-none focus:border-[#FF3B30] transition-colors resize-none" />
      </div>
      <div className="flex gap-3">
        <button type="button" onClick={onBack} className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#A1A1A6] hover:text-white transition-colors">
          <ArrowLeft size={14} /> Anterior
        </button>
        <Button type="submit" size="lg" className="flex-1 justify-center">Próximo →</Button>
      </div>
    </form>
  );
}

/* ── Step 3 ── */
function Step3({ initial, onSubmit, onBack, loading, cityName }: {
  initial: Partial<FormData>;
  onSubmit: (d: z.infer<typeof step3Schema>) => void;
  onBack: () => void;
  loading: boolean;
  cityName: string;
}) {
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof step3Schema>>({
    resolver: zodResolver(step3Schema),
    defaultValues: { name: initial.name ?? "", company: initial.company ?? "", email: initial.email ?? "", phone: initial.phone ?? "", acceptWhatsApp: initial.acceptWhatsApp ?? true },
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-display)" }}>Seus dados de contato</h2>
        <p className="text-sm text-[#6E6E73]">Etapa 3 de 3 — Vamos enviar sua proposta!</p>
      </div>
      {[
        { name: "name" as const, label: "Nome completo *", placeholder: "Seu nome" },
        { name: "company" as const, label: "Empresa (opcional)", placeholder: "Razão social ou nome fantasia" },
        { name: "email" as const, label: "E-mail *", placeholder: "seu@email.com" },
        { name: "phone" as const, label: "WhatsApp *", placeholder: "(11) 99999-9999" },
      ].map((f) => (
        <div key={f.name}>
          <label className="text-xs text-[#A1A1A6] mb-2 block">{f.label}</label>
          <input {...register(f.name)} placeholder={f.placeholder} className="w-full bg-[#141414] border border-[#2C2C2E] rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#6E6E73] outline-none focus:border-[#FF3B30] transition-colors" />
          {errors[f.name] && <p className="text-xs text-[#FF453A] mt-1">{errors[f.name]?.message}</p>}
        </div>
      ))}
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" {...register("acceptWhatsApp")} defaultChecked className="accent-[#FF3B30] w-4 h-4" />
        <span className="text-sm text-[#A1A1A6]">Aceito receber a proposta pelo WhatsApp</span>
      </label>
      <div className="flex gap-3">
        <button type="button" onClick={onBack} className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#A1A1A6] hover:text-white transition-colors">
          <ArrowLeft size={14} /> Anterior
        </button>
        <Button type="submit" size="lg" className="flex-1 justify-center" disabled={loading}>
          {loading ? "Enviando..." : `Enviar e receber proposta em até 2h`}
        </Button>
      </div>
    </form>
  );
}
