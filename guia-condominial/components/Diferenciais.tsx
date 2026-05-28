import Image from 'next/image'

const items = [
  { icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7', title: 'Planejamento estratégico personalizado', desc: 'Analisamos os problemas do seu condomínio e criamos soluções específicas para a sua realidade.' },
  { icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', title: 'Atendimento humanizado e próximo', desc: 'Relação de parceria com clientes. Trabalhamos com um número controlado de condomínios para garantir qualidade.' },
  { icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v3M15 11V5a2 2 0 00-2-2H9a2 2 0 00-2 2v6', title: 'Tecnologia e prestação de contas digital', desc: 'Portal online com acesso individual, relatórios em tempo real e documentos na nuvem para síndicos e condôminos.' },
  { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'Credibilidade comprovada em Brasília', desc: 'Mais de 15 anos atuando no DF com foco em resultados reais, credibilidade e satisfação dos condôminos.' },
]

export default function Diferenciais() {
  return (
    <section id="diferenciais" className="py-16 md:py-24" style={{ background: '#021A29' }}>
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* ── Coluna esquerda: foto oficial ── */}
        <div className="reveal flex justify-center lg:justify-start">
          <div className="relative" style={{ maxWidth: 500 }}>
            {/* Accent badge top-left */}
            <div
              className="absolute z-10 flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-xs font-semibold"
              style={{
                top: -14, left: -14,
                background: 'rgba(183,136,40,.12)',
                border: '1px solid rgba(183,136,40,.30)',
                backdropFilter: 'blur(8px)',
                color: '#D0B273',
              }}
            >
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="#B78828" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
              Gestão de confiança
            </div>

            {/* Photo — fundo transparente */}
            <Image
              src="/guia-oficial.png"
              alt="Diretor da Guia Gestão Condominial — Brasília-DF"
              width={500}
              height={600}
              className="w-full object-contain drop-shadow-2xl"
              style={{ filter: 'drop-shadow(0 24px 48px rgba(2,26,41,.6))' }}
              priority
            />

            {/* Badge bottom-right: 15 anos */}
            <div
              className="absolute z-10 rounded-2xl px-5 py-4"
              style={{
                bottom: 10, right: -10,
                background: 'linear-gradient(135deg, #B78828 0%, #D0B273 100%)',
                boxShadow: '0 10px 32px rgba(183,136,40,.45)',
                minWidth: 148,
              }}
            >
              <span
                className="block font-display font-bold leading-none"
                style={{ fontSize: 40, color: '#021A29' }}
              >
                15+
              </span>
              <span
                className="block text-xs font-semibold leading-snug mt-1"
                style={{ color: 'rgba(2,26,41,.72)' }}
              >
                anos de experiência<br />em Brasília
              </span>
            </div>
          </div>
        </div>

        {/* ── Coluna direita: conteúdo ── */}
        <div className="reveal reveal-d2">
          <span className="text-[11px] font-bold tracking-[2px] uppercase" style={{ color: '#D0B273' }}>Por que a Guia Condominial?</span>
          <h2 className="font-display text-[clamp(28px,3.5vw,42px)] font-bold text-white leading-tight mt-3 mb-4">
            Gestão que vai além<br />da contabilidade
          </h2>
          <p className="text-base leading-relaxed mb-9" style={{ color: 'rgba(255,255,255,.6)' }}>
            Transparência financeira, suporte próximo e uma gestão eficiente para o seu condomínio.
          </p>

          <div className="flex flex-col gap-6">
            {items.map(item => (
              <div key={item.title} className="flex gap-4 items-start">
                <div
                  className="w-9 h-9 min-w-[36px] rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(183,136,40,.15)', border: '1px solid rgba(183,136,40,.30)' }}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#B78828" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d={item.icon} />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,.6)' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
