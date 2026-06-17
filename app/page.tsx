"use client"

import { useState, useEffect, useCallback } from "react"
import Navigation from "@/components/navigation"
import HeroSection from "@/components/sections/hero-section"
import ServicesSection from "@/components/sections/services-section"
import PortfolioSection from "@/components/sections/portfolio-section"
import ProcessSection from "@/components/sections/process-section"
import AboutSection from "@/components/sections/about-section"
import ContactSection from "@/components/sections/contact-section"
import Footer from "@/components/footer"
import Preloader from "@/components/preloader"

import { motion } from "framer-motion"

export default function Home() {
  const [isPreloaderFinished, setIsPreloaderFinished] = useState(false)

  const handlePreloaderComplete = useCallback(() => {
    setIsPreloaderFinished(true)
  }, [])

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
      <Preloader onComplete={handlePreloaderComplete} />
      
      {/* 
        We render everything immediately for SEO. 
        The Preloader is a fixed overlay that hides this content initially.
        Now using a staggered, granular reveal for maximum cinematic impact.
      */}
      <div className={!isPreloaderFinished ? "pointer-events-none" : ""}>
        {/* 1. Navigation Entry */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isPreloaderFinished ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
        >
          <Navigation />
        </motion.div>
        
        <main>
          {/* 2. Hero Section Entry - Soft & Atmospheric */}
          <motion.div
            initial={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
            animate={isPreloaderFinished ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
            transition={{ duration: 2.5, delay: 0.7, ease: [0.19, 1, 0.22, 1] }}
          >
            <HeroSection isVisible={isPreloaderFinished} />
          </motion.div>
          
          {/* 3. Main Content Entry - Staggered Upward Slide */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isPreloaderFinished ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 2, delay: 1.2, ease: [0.19, 1, 0.22, 1] }}
          >
            <ServicesSection />
            <PortfolioSection />
            <ProcessSection />
            <AboutSection />
            <ContactSection />
          </motion.div>
        </main>
        
        {/* 4. Footer Entry */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isPreloaderFinished ? { opacity: 1 } : {}}
          transition={{ duration: 1.5, delay: 1.8 }}
        >
          <Footer />
        </motion.div>
      </div>
    </>
  )
}
