'use client'

const testimonials = [
  { rating: 5.0, initial: 'A', name: 'Adriana', cond: 'Síndica — Residencial Alameda Bandeirante', years: '5 anos', text: 'Desde o primeiro contato gostamos do perfil da Guia. A empresa tem sido uma grande parceira — sempre que precisamos eles estão à disposição para nos orientar e ajudar com o que for preciso.' },
  { rating: 4.8, initial: 'B', name: 'Bernardo', cond: 'Síndico — Residencial Belo Recanto', years: '2 anos', text: 'O departamento de cobrança foi muito eficaz. Hoje nossa inadimplência está baixa. A empresa pediu um prazo e resolveu tudo amigavelmente. Um ótimo atendimento e envolvimento com o cliente.' },
  { rating: 5.0, initial: 'M', name: 'Marcelo Faria', cond: 'Síndico — Residencial Pôr do Sol e Atlantis', years: 'Cliente Guia', text: 'A Guia nos ofereceu o melhor custo-benefício: excelência na prestação dos serviços e preço justo. Hoje são 90 unidades prontamente atendidas, com balancetes entregues rigorosamente nos dias agendados.' },
  { rating: 4.9, initial: 'N', name: 'Noilman Gervásio', cond: 'Síndica — Residencial Parque das Águas', years: '6 anos', text: 'O que eu gosto da empresa é que eles atendem todos do condomínio muito bem — e não apenas eu por ser síndica. Contato telefônico, segunda via de boleto, tudo com muita agilidade.' },
  { rating: 4.7, initial: 'B', name: 'Bruno Douglas', cond: 'Síndico — Residencial Atriun', years: '4 anos', text: 'Nossa inadimplência está dentro do planejado — quase 3%. Já estou no meu segundo mandato e tenho a Guia como grande parceiro. Indico a todos os síndicos que precisam de uma empresa séria e transparente.' },
  { rating: 5.0, initial: 'M', name: 'Marcondes Morais', cond: 'Síndico — Residencial Bela Vista · Riacho Fundo I', years: '4 anos', text: '"Tranquilidade para o Síndico. Transparência para todos." Todo serviço prestado atende ao mais alto padrão de qualidade — balancetes mensais, relatórios, conciliação bancária. Recomendo com convicção.' },
]

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating)
  const partial = rating - full
  const empty = 5 - Math.ceil(rating)

  return (
    <div className="flex items-center gap-1.5 mb-4">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: full }).map((_, i) => (
          <svg key={`f${i}`} className="w-4 h-4" viewBox="0 0 20 20" fill="#B78828">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        {partial > 0 && (
          <svg key="partial" className="w-4 h-4" viewBox="0 0 20 20">
            <defs>
              <linearGradient id={`g-${rating}`}>
                <stop offset={`${partial * 100}%`} stopColor="#B78828" />
                <stop offset={`${partial * 100}%`} stopColor="#D4C4A0" />
              </linearGradient>
            </defs>
            <path fill={`url(#g-${rating})`} d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        )}
        {Array.from({ length: empty }).map((_, i) => (
          <svg key={`e${i}`} className="w-4 h-4" viewBox="0 0 20 20" fill="#D4C4A0">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-[12.5px] font-bold" style={{ color: '#B78828' }}>{rating.toFixed(1)}</span>
    </div>
  )
}

export default function Depoimentos() {
  return (
    <section id="depoimentos" className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-14 reveal">
          <span className="text-[11px] font-bold tracking-[2px] uppercase" style={{ color: '#B78828' }}>Nossos clientes falam</span>
          <h2 className="font-display text-[clamp(28px,3.5vw,42px)] font-bold leading-tight mt-3 mb-4" style={{ color: '#021A29' }}>
            Síndicos que confiam<br />na Guia Condominial
          </h2>
          <p className="text-base max-w-lg mx-auto" style={{ color: '#304350' }}>
            Atendemos cada cliente como se fosse único. Tire a prova real com nossos clientes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`reveal reveal-d${(i % 3) + 1} rounded-xl p-6 md:p-8 transition-all duration-200 hover:-translate-y-1`}
              style={{
                background: '#F6F0E4',
                border: '1px solid #E6D5B3',
                boxShadow: '0 2px 12px rgba(2,26,41,.05)',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(2,26,41,.10)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(2,26,41,.05)' }}
            >
              <Stars rating={t.rating} />
              <p className="text-[14.5px] italic leading-relaxed mb-6" style={{ color: '#304350' }}>{t.text}</p>
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center font-display text-base font-bold flex-shrink-0"
                  style={{ background: '#1A303D', color: '#D0B273' }}
                >
                  {t.initial}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold" style={{ color: '#021A29' }}>{t.name}</div>
                  <div className="text-xs truncate" style={{ color: '#5A7080' }}>{t.cond}</div>
                </div>
                <span
                  className="text-[11px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0"
                  style={{ background: '#E6D5B3', color: '#1A303D' }}
                >
                  {t.years}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
