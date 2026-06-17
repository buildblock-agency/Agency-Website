"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import HeroSection from "@/components/sections/hero-section"
import ServicesSection from "@/components/sections/services-section"
import PortfolioSection from "@/components/sections/portfolio-section"
import ProcessSection from "@/components/sections/process-section"
import AboutSection from "@/components/sections/about-section"
import ContactSection from "@/components/sections/contact-section"
import Footer from "@/components/footer"
import Preloader from "@/components/preloader"

export default function Home() {
  const [isPreloaderFinished, setIsPreloaderFinished] = useState(false)

  // Ensure body scroll is managed correctly if preloader is active
  useEffect(() => {
    if (!isPreloaderFinished) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [isPreloaderFinished])

  return (
    <>
      <Preloader onComplete={() => setIsPreloaderFinished(true)} />
      
      {/* 
        We render everything immediately for SEO. 
        The Preloader is a fixed overlay that hides this content initially.
        We use opacity and pointer-events to manage the transition smoothly.
      */}
      <div 
        className={`transition-opacity duration-1000 ${
          isPreloaderFinished ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
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
      </div>
    </>
  )
}
