import Image from 'next/image'

const cards = [
  {
    src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80',
    alt: 'Equipe Guia Condominial em atendimento',
    title: 'Equipe de Atendimento',
    desc: 'Preparada para resolver as demandas do seu condomínio com agilidade.',
  },
  {
    src: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&q=80',
    alt: 'Reunião e assembleia condominial',
    title: 'Assembleias e Reuniões',
    desc: 'Conduzimos AGOs e AGEs com segurança jurídica e organização profissional.',
  },
  {
    src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
    alt: 'Escritório Guia Gestão Condominial',
    title: 'Nosso Escritório',
    desc: 'Shopping Riacho Mall, Sala 312/313 — Riacho Fundo I, Brasília-DF.',
  },
]

export default function Equipe() {
  return (
    <section id="equipe" className="py-16 md:py-24" style={{ background: '#F5F0E8' }}>
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-12 reveal">
          <span className="text-[11px] font-bold tracking-[2px] uppercase" style={{ color: '#B78828' }}>Conheça a Guia</span>
          <h2 className="font-display text-[clamp(26px,3.5vw,40px)] font-bold leading-tight mt-3 mb-4" style={{ color: '#021A29' }}>
            Pessoas reais cuidando<br className="hidden md:block" /> do seu condomínio
          </h2>
          <p className="text-base max-w-xl mx-auto leading-relaxed" style={{ color: '#304350' }}>
            Equipe especializada, atendimento próximo e compromisso com cada síndico que confia na Guia Gestão Condominial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 reveal reveal-d2">
          {cards.map((c, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl"
              style={{ background: 'white', border: '1px solid #E6D5B3', boxShadow: '0 4px 20px rgba(2,26,41,.07)' }}
            >
              <div className="relative w-full" style={{ height: 220 }}>
                <Image
                  src={c.src}
                  alt={c.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="px-6 py-5">
                <div className="font-bold text-[15px] mb-1" style={{ color: '#021A29' }}>{c.title}</div>
                <div className="text-[13px] leading-relaxed" style={{ color: '#4A5C6C' }}>{c.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-[13px] mt-6" style={{ color: '#7A919E' }}>
          * Fotos ilustrativas. Imagens reais da equipe e do escritório em breve.
        </p>

      </div>
    </section>
  )
}
