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
import MapTrail from '@/components/MapTrail'

export default function Home() {
  return (
    <>
      <Topbar />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <MapTrail from="#0d1f2d" to="#F2EDE3" variant={1} />
        <Services />
        <MapTrail from="#F2EDE3" to="#021A29" variant={2} />
        <Diferenciais />
        <MapTrail from="#021A29" to="#F6F0E4" variant={3} />
        <ComoFunciona />
        <MapTrail from="#F6F0E4" to="#ffffff" variant={4} />
        <Depoimentos />
        <MapTrail from="#ffffff" to="#F5F0E8" variant={5} />
        <Equipe />
        <MapTrail from="#F5F0E8" to="#FAFAF7" variant={6} />
        <Dicas />
        <MapTrail from="#FAFAF7" to="#F6F0E4" variant={7} />
        <FAQ />
        <MapTrail from="#F6F0E4" to="#F6F0E4" variant={8} />
        <BlogSection />
        <MapTrail from="#F6F0E4" to="#EDF2F7" variant={9} />
        <Localizacao />
        <MapTrail from="#EDF2F7" to="#0B1E2D" variant={10} />
        <ClosingStatement />
        <CTAFinal />
      </main>
      <Footer />
      <WAFloat />
      <RevealWrapper />
    </>
  )
}
