'use client'

import Image from 'next/image'

const services = [
  { img: '/servicos/prestacao-de-contas.jpg',      title: 'Prestação de Contas',       desc: 'Balancetes claros, organização e controle completo das contas do condomínio.' },
  { img: '/servicos/departamento-pessoal.jpg',     title: 'Departamento Pessoal',      desc: 'Gestão dos colaboradores com segurança, organização e conformidade trabalhista.' },
  { img: '/servicos/apoio-administrativo.jpg',     title: 'Apoio Administrativo',      desc: 'Atas, editais, comunicados e atualização junto à Receita Federal.' },
  { img: '/servicos/coleta-de-documentos.jpg',     title: 'Coleta de Documentos',      desc: 'Malote com retirada e entrega de documentos diretamente no condomínio.' },
  { img: '/servicos/cobranca-amigavel.jpg',        title: 'Cobrança Amigável',         desc: 'Acompanhamento da inadimplência com notificação e negociação antes de medidas judiciais.' },
  { img: '/servicos/condominioOnline.jpg',         title: 'Condomínio On-line',        desc: '2ª via de boleto, balancetes, atas e documentos com acesso individual por senha.' },
  { img: '/servicos/balancete-digitalizado.jpg',   title: 'Balancete Digitalizado',    desc: 'Relatórios financeiros mensais online, acessíveis a síndicos e condôminos a qualquer momento.' },
  { img: '/servicos/planejamento-condominial.jpg', title: 'Planejamento Condominial',  desc: 'Diagnóstico e planejamento estratégico de finanças e manutenções do condomínio.' },
  { img: '/servicos/aplicativo-on-line.jpg',       title: 'Aplicativo On-line',        desc: 'Portal individualizado para boletos, comunicados e acompanhamento financeiro.' },
  { img: '/servicos/diagnostico-financeiro.jpg',   title: 'Diagnóstico Financeiro',    desc: 'Análise da situação financeira identificando riscos, oportunidades e ações prioritárias.' },
]

export default function Services() {
  return (
    <section id="servicos" className="py-16 md:py-24" style={{ background: '#F2EDE3' }}>
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-14 reveal">
          <span className="text-[11px] font-bold tracking-[2px] uppercase" style={{ color: '#B78828' }}>O que fazemos</span>
          <h2 className="font-display text-[clamp(28px,3.5vw,42px)] font-bold leading-tight mt-3 mb-4" style={{ color: '#021A29' }}>
            <span className="block md:hidden">Serviços completos<br />para o seu condomínio</span>
            <span className="hidden md:block">Serviços completos para<br />o seu condomínio</span>
          </h2>
          <p className="text-base max-w-xl mx-auto leading-relaxed" style={{ color: '#304350' }}>
            Uma linha completa de serviços que atende todas as demandas do condomínio, com foco total em síndicos e condôminos.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`reveal reveal-d${(i % 5) + 1} group rounded-2xl overflow-hidden flex flex-col`}
              style={{
                background: 'white',
                boxShadow: '0 2px 16px rgba(2,26,41,.08)',
                transition: 'transform .25s ease, box-shadow .25s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = '0 16px 48px rgba(2,26,41,.14)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = '0 2px 16px rgba(2,26,41,.08)'
              }}
            >
              {/* foto */}
              <div className="relative overflow-hidden" style={{ height: 140 }}>
                <Image
                  src={s.img}
                  alt={s.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* overlay sutil */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(2,26,41,.18) 0%, transparent 60%)' }}
                />
              </div>

              {/* texto */}
              <div className="flex flex-col flex-1 px-4 py-4">
                <div
                  className="w-8 h-0.5 mb-3 rounded-full"
                  style={{ background: '#B78828' }}
                />
                <h3 className="text-[13.5px] font-bold leading-snug mb-1.5" style={{ color: '#021A29' }}>
                  {s.title}
                </h3>
                <p className="text-[12px] leading-relaxed" style={{ color: '#4A5C6C' }}>
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
