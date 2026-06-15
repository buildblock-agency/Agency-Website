"use client"

import Navigation from "@/components/navigation"
import HeroSection from "@/components/sections/hero-section"
import ServicesSection from "@/components/sections/services-section"
import PortfolioSection from "@/components/sections/portfolio-section"
import ProcessSection from "@/components/sections/process-section"
import AboutSection from "@/components/sections/about-section"
import ContactSection from "@/components/sections/contact-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <ServicesSection />
        <PortfolioSection />
        <ProcessSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
