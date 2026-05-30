'use client'

export default function Topbar() {
  return (
    <div className="hidden sm:block" style={{ background: '#021A29' }}>
      <div className="max-w-6xl mx-auto px-6 py-2 flex justify-between items-center text-[13px]" style={{ color: 'rgba(255,255,255,.55)' }}>
        <div className="flex gap-5 items-center">
          <a href="/#faq" className="hover:text-white transition-colors hidden md:inline">FAQ</a>
          <span className="hidden md:inline" style={{ color: 'rgba(255,255,255,.18)' }}>|</span>
          <a href="https://www.condominio21.com.br" target="_blank" rel="noopener" className="hover:text-white transition-colors">2ª Via — Condomínio 21</a>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden lg:inline">Conecte-se</span>
          <a
            href="https://web.facebook.com/guia.gestaocondominial"
            target="_blank" rel="noopener"
            aria-label="Facebook"
            className="w-7 h-7 flex items-center justify-center rounded-full border transition-all"
            style={{ borderColor: 'rgba(255,255,255,.20)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#B78828'; (e.currentTarget as HTMLElement).style.borderColor = '#B78828' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,.20)' }}
          >
            <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a
            href="https://www.instagram.com/guiagestaodecondominio?igsh=MXMycjNwejBqdWVveg%3D%3D"
            target="_blank" rel="noopener"
            aria-label="Instagram"
            className="w-7 h-7 flex items-center justify-center rounded-full border transition-all"
            style={{ borderColor: 'rgba(255,255,255,.20)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#B78828'; (e.currentTarget as HTMLElement).style.borderColor = '#B78828' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,.20)' }}
          >
            <svg className="w-3.5 h-3.5 fill-none stroke-white" strokeWidth="1.5" viewBox="0 0 24 24">
              <rect x="2" y="2" width="20" height="20" rx="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r=".5" fill="white" stroke="none"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
