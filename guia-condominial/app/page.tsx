export const revalidate = 3600

import Topbar from '@/components/Topbar'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import Services from '@/components/Services'
import Diferenciais from '@/components/Diferenciais'
import ComoFunciona from '@/components/ComoFunciona'
import Depoimentos from '@/components/Depoimentos'
import Equipe from '@/components/Equipe'
import Dicas from '@/components/Dicas'
import FAQ from '@/components/FAQ'
import BlogSection from '@/components/BlogSection'
import Localizacao from '@/components/Localizacao'
import ClosingStatement from '@/components/ClosingStatement'
import CTAFinal from '@/components/CTAFinal'
import Footer from '@/components/Footer'
import WAFloat from '@/components/WAFloat'
import RevealWrapper from '@/components/RevealWrapper'

export default function Home() {
  return (
    <>
      <Topbar />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Services />
        <Diferenciais />
        <ComoFunciona />
        <Depoimentos />
        <Equipe />
        <Dicas />
        <FAQ />
        <BlogSection />
        <Localizacao />
        <ClosingStatement />
        <CTAFinal />
      </main>
      <Footer />
      <WAFloat />
      <RevealWrapper />
    </>
  )
}
