'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const WHATSAPP = 'https://api.whatsapp.com/send?phone=5561984214485&text=Olá,%20gostaria%20de%20uma%20proposta%20para%20meu%20condomínio!'

const links = [
  { href: '/#servicos',     label: 'Serviços',   id: 'servicos' },
  { href: '/#diferenciais', label: 'Quem Somos', id: 'diferenciais' },
  { href: '/#depoimentos',  label: 'Clientes',   id: 'depoimentos' },
  { href: '/noticias',      label: 'Notícias',   id: '' },
  { href: '/#faq',          label: 'FAQ',        id: 'faq' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section tracking
  useEffect(() => {
    const ids = links.map(l => l.id).filter(Boolean)
    const observers = ids.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { threshold: 0.25, rootMargin: '-80px 0px -40% 0px' }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  return (
    <nav
      className="sticky top-0 z-50 transition-all duration-300"
      style={
        scrolled
          ? { background: 'rgba(250,250,247,.94)', backdropFilter: 'blur(12px)', boxShadow: '0 2px 20px rgba(2,26,41,.10)' }
          : { background: '#FAFAF7', borderBottom: '1px solid #E6D5B3' }
      }
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16 md:h-24">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-nova.png"
            alt="Guia Gestão Condominial"
            width={240}
            height={80}
            className="h-10 md:h-16 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8 list-none">
          {links.map(l => {
            const isActive = l.id && active === l.id
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm md:text-[15px] font-medium transition-colors relative group"
                  style={{ color: isActive ? '#B78828' : '#304350' }}
                >
                  {l.label}
                  <span
                    className="absolute -bottom-1 left-0 h-0.5 transition-all duration-300"
                    style={{
                      width: isActive ? '100%' : '0%',
                      background: '#B78828',
                    }}
                  />
                  {!isActive && (
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-gold group-hover:w-full transition-all duration-300" />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* CTA */}
        <a
          href={WHATSAPP}
          target="_blank" rel="noopener"
          className="hidden md:flex items-center gap-2 text-sm md:text-[15px] font-bold px-6 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
          style={{ background: '#B78828', color: '#021A29', boxShadow: '0 2px 12px rgba(183,136,40,.25)' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#D0B273' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#B78828' }}
        >
          <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Falar com Especialista
        </a>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 p-1"
          aria-label="Menu"
        >
          <span className={`w-6 h-0.5 rounded transition-all duration-200`} style={{ background: '#1A303D', transform: open ? 'rotate(45deg) translateY(8px)' : 'none' }} />
          <span className={`w-6 h-0.5 rounded transition-all duration-200`} style={{ background: '#1A303D', opacity: open ? 0 : 1 }} />
          <span className={`w-6 h-0.5 rounded transition-all duration-200`} style={{ background: '#1A303D', transform: open ? 'rotate(-45deg) translateY(-8px)' : 'none' }} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="menu-slide md:hidden bg-white px-6 py-4 flex flex-col gap-4" style={{ borderTop: '1px solid #E6D5B3' }}>
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-medium py-2 text-sm transition-colors"
              style={{ color: active === l.id && l.id ? '#B78828' : '#304350', borderBottom: '1px solid #F6F0E4' }}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={WHATSAPP}
            target="_blank" rel="noopener"
            className="text-center font-bold py-3 rounded-xl mt-1 text-sm"
            style={{ background: '#B78828', color: '#021A29' }}
          >
            Solicitar Proposta Gratuita →
          </a>
        </div>
      )}
    </nav>
  )
}
