import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: '#021A29' }}>

      {/* ── Logo centralizada ────────────────────────────── */}
      <div className="w-full flex justify-center" style={{ background: '#FAFAF7', padding: '32px 0' }}>
        <div className="w-full md:w-auto px-0 md:px-6">
          <Image
            src="/logo-nova.png"
            alt="Guia Gestão Condominial"
            width={560}
            height={188}
            className="w-full md:w-[420px] lg:w-[520px] h-auto object-contain block"
            priority={false}
          />
        </div>
      </div>

      {/* ── Conteúdo do rodapé ───────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 pt-14 pb-0 text-white/55">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-10 lg:mb-12">

          {/* Brand */}
          <div>
            <p className="text-[11px] text-white/35 tracking-wider uppercase mb-4">Tudo que precisa. Mais do que imagina.</p>
            <p className="text-[13.5px] leading-relaxed max-w-[260px] mb-5">
              Administradora condominial em Brasília-DF. Mais de 15 anos de experiência, com foco em transparência, tecnologia e atendimento humanizado.
            </p>
            <div className="flex gap-2.5">
              {[
                { href: 'https://web.facebook.com/guia.gestaocondominial', label: 'Facebook', icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /> },
                {
                  href: 'https://www.instagram.com/guiagestaodecondominio?igsh=MXMycjNwejBqdWVveg%3D%3D', label: 'Instagram', icon: (
                    <><rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="white" strokeWidth="2" /><circle cx="12" cy="12" r="4" fill="none" stroke="white" strokeWidth="2" /><circle cx="17.5" cy="6.5" r="1" fill="white" /></>
                  )
                },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener" aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center hover:bg-brand-gold hover:border-brand-gold transition-all">
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">{s.icon}</svg>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[12px] font-bold tracking-[1px] uppercase text-white/75 mb-5">Serviços</h4>
            <ul className="flex flex-col gap-2.5">
              {['Gestão Administrativa', 'Prestação de Contas', 'Departamento Pessoal', 'Assessoria Jurídica', 'Condomínio Online', 'Síndico Profissional'].map(s => (
                <li key={s}>
                  <Link href="/#servicos" className="text-sm hover:text-brand-gold-2 transition-colors">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[12px] font-bold tracking-[1px] uppercase text-white/75 mb-5">Links Úteis</h4>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: '2ª Via — Condomínio 21', href: 'https://www.condominio21.com.br' },
                { label: 'CEB', href: 'https://www.ceb.com.br' },
                { label: 'CAESB', href: 'https://www.caesb.df.gov.br' },
                { label: 'Receita Federal', href: 'https://www.receita.fazenda.gov.br' },
                { label: 'TJDFT', href: 'https://www.tjdft.jus.br' },
              ].map(l => (
                <li key={l.label}>
                  <a href={l.href} target="_blank" rel="noopener" className="text-sm hover:text-brand-gold-2 transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[12px] font-bold tracking-[1px] uppercase text-white/75 mb-5">Contato</h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li><a href="tel:6133991518" className="hover:text-brand-gold-2 transition-colors">(61) 3399-1518</a></li>
              <li><a href="tel:6133995757" className="hover:text-brand-gold-2 transition-colors">(61) 3399-5757</a></li>
              <li><a href="https://api.whatsapp.com/send?phone=5561984214485" target="_blank" rel="noopener" className="hover:text-brand-gold-2 transition-colors">(61) 98421-4485 (WhatsApp)</a></li>
              <li><a href="mailto:atendimento@guiacondominial.com.br" className="hover:text-brand-gold-2 transition-colors break-all">atendimento@guiacondominial.com.br</a></li>
              <li className="text-white/45 leading-snug">Shopping Riacho Mall<br />Sala 312/313 · Riacho Fundo I<br />Brasília, DF</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,.06)' }}>
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-[13px] text-white/40">
          <span>© {new Date().getFullYear()} Guia Gestão Condominial. Todos os direitos reservados.</span>
          <span>Desenvolvido por Elizzeu SSCorp</span>
        </div>
      </div>
    </footer>
  )
}
