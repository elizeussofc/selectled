'use client'

import { useState } from 'react'
import Image from 'next/image'

const WHATSAPP = 'https://api.whatsapp.com/send?phone=5561984214485&text=Olá,%20gostaria%20de%20uma%20proposta%20para%20meu%20condomínio!'

export default function Hero() {
  const [compassState, setCompassState] = useState<'idle' | 'spin'>('idle')

  function handleMouseEnter() {
    setCompassState('spin')
  }

  function handleAnimationEnd() {
    if (compassState === 'spin') setCompassState('idle')
  }

  return (
    <section className="relative overflow-hidden min-h-[100svh] md:min-h-[92vh] flex items-center"
      style={{ background: 'linear-gradient(135deg, #021A29 0%, #0d2538 60%, #021A29 100%)' }}
    >
      {/* Background radial glows */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(183,136,40,.10) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-15%] left-[-5%] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(183,136,40,.06) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-14 md:py-20 grid grid-cols-1 md:grid-cols-[55%_45%] gap-10 md:gap-6 items-center">

        {/* ── Coluna esquerda: copy ─────────────────────── */}
        <div>
          {/* Pré-título */}
          <div className="hero-in inline-flex items-center gap-2.5 mb-7" style={{ animationDelay: '0ms' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold flex-shrink-0 pulse-dot" />
            <span className="text-brand-gold text-[11px] font-bold tracking-[2.5px] uppercase">
              Há mais de 15 anos cuidando do seu condomínio
            </span>
          </div>

          {/* Headline principal */}
          <h1
            className="hero-in font-display font-bold leading-[1.2] text-white mb-4"
            style={{ animationDelay: '120ms' }}
          >
            <span className="block md:hidden" style={{ fontSize: '26px' }}>
              Transparência financeira,<br />
              atendimento próximo<br />
              e <span className="text-brand-gold-2">decisões mais seguras.</span>
            </span>
            <span className="hidden md:block text-[clamp(28px,3.4vw,48px)] leading-[1.15]">
              Transparência financeira,<br />
              atendimento próximo e<br />
              <span className="text-brand-gold-2">decisões mais seguras.</span>
            </span>
          </h1>

          {/* Bússola mobile — visível apenas em mobile, entre o H1 e o subtítulo */}
          <div
            className="hero-in flex md:hidden justify-center my-6"
            style={{ animationDelay: '200ms' }}
          >
            <div
              className="relative cursor-pointer select-none"
              onClick={() => setCompassState('spin')}
            >
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  inset: '-12px',
                  background: 'radial-gradient(circle, rgba(183,136,40,.18) 0%, transparent 70%)',
                  animation: 'compass-glow-pulse 3s ease-in-out infinite',
                }}
              />
              <div
                className="absolute rounded-full pointer-events-none"
                style={{ inset: '-6px', border: '1px solid rgba(183,136,40,.22)' }}
              />
              <div
                className={`relative rounded-full overflow-hidden shadow-2xl ${compassState === 'spin' ? 'compass-spin' : 'compass-idle'}`}
                style={{ width: 180, height: 180 }}
                onAnimationEnd={handleAnimationEnd}
              >
                <Image
                  src="/logo-icon.png"
                  alt="Guia Gestão Condominial — bússola"
                  fill
                  className="object-contain p-5"
                  priority
                  draggable={false}
                />
              </div>
            </div>

            {/* Logo completa estática abaixo da bússola mobile */}
            <div className="flex justify-center mt-5">
              <div className="relative" style={{ width: 280, height: 100 }}>
                <Image
                  src="/logo-nova.png"
                  alt="Guia Gestão Condominial"
                  fill
                  className="object-contain"
                  draggable={false}
                  unoptimized
                />
              </div>
            </div>
          </div>

          {/* Subtítulo de apoio */}
          <p
            className="hero-in text-white/55 text-base leading-relaxed mb-10 max-w-[440px]"
            style={{ animationDelay: '240ms' }}
          >
            Tudo o que o seu condomínio precisa — e mais do que você imagina.
          </p>

          {/* CTAs */}
          <div
            className="hero-in flex gap-4 flex-wrap mb-10"
            style={{ animationDelay: '360ms' }}
          >
            <a
              href={WHATSAPP}
              target="_blank" rel="noopener noreferrer"
              className="relative overflow-hidden btn-shimmer inline-flex items-center gap-2.5 font-bold text-base px-7 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: '#B78828', color: '#021A29', boxShadow: '0 4px 20px rgba(183,136,40,.3)' }}
            >
              {/* WhatsApp icon */}
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Fale com a Guia agora
            </a>

            <a
              href="/#servicos"
              className="inline-flex items-center gap-2 font-semibold text-base px-7 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
              style={{ border: '2px solid rgba(255,255,255,.25)', color: 'white' }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.borderColor = '#B78828'
                el.style.color = '#D0B273'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.borderColor = 'rgba(255,255,255,.25)'
                el.style.color = 'white'
              }}
            >
              Conheça nossos serviços
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Selos de prova social */}
          <div
            className="hero-in flex flex-wrap gap-5"
            style={{ animationDelay: '480ms' }}
          >
            {['+15 anos de mercado', 'Atendimento humanizado', 'Prestação de contas clara'].map(t => (
              <div key={t} className="flex items-center gap-1.5 text-white/50 text-sm">
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#B78828" strokeWidth="1.5"/>
                  <path d="M8 12l2.5 2.5L16 9" stroke="#B78828" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* ── Coluna direita: bússola animada + logo ───── */}
        <div
          className="hero-in hidden md:flex flex-col items-center justify-center gap-8"
          style={{ animationDelay: '300ms' }}
        >
          <div
            className="relative cursor-pointer select-none"
            onMouseEnter={handleMouseEnter}
          >
            {/* Anel de glow dourado pulsante */}
            <div
              className="absolute inset-[-16px] rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(183,136,40,.18) 0%, transparent 70%)',
                animation: 'compass-glow-pulse 3s ease-in-out infinite',
              }}
            />

            {/* Anel externo decorativo */}
            <div
              className="absolute inset-[-8px] rounded-full pointer-events-none"
              style={{ border: '1px solid rgba(183,136,40,.22)' }}
            />

            {/* Ícone da bússola */}
            <div
              className={`relative rounded-full overflow-hidden shadow-2xl ${compassState === 'spin' ? 'compass-spin' : 'compass-idle'}`}
              style={{ width: 300, height: 300 }}
              onAnimationEnd={handleAnimationEnd}
            >
              <Image
                src="/logo-icon.png"
                alt="Guia Gestão Condominial — bússola"
                fill
                className="object-contain p-6"
                priority
                draggable={false}
              />
            </div>
          </div>

          {/* Logo completa estática abaixo da bússola */}
          <div className="relative" style={{ width: 280, height: 84 }}>
            <Image
              src="/logo-nova.png"
              alt="Guia Gestão Condominial"
              fill
              className="object-contain"
              draggable={false}
            />
          </div>
        </div>

      </div>

      {/* Divider wave bottom */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 48" fill="none" preserveAspectRatio="none" className="w-full h-10 md:h-12">
          <path d="M0 48 C360 0 1080 0 1440 48 L1440 48 L0 48 Z" fill="#0d1f2d"/>
        </svg>
      </div>
    </section>
  )
}
