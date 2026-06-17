"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion"
import Image from "next/image"

export default function HeroSection({ isVisible = true }: { isVisible?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Slower, more deliberate parallax
  const y = useTransform(scrollYProgress, [0, 1], [0, 400])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  
  // Mouse tracking for fluid light
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // State for window dimensions to avoid SSR errors
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  // Very smooth, viscous spring for the light follower
  const springConfig = { damping: 40, stiffness: 40, mass: 1 }
  const lightX = useSpring(useTransform(mouseX, [0, windowSize.width || 1000], [-200, windowSize.width || 1000]), springConfig)
  const lightY = useSpring(useTransform(mouseY, [0, windowSize.height || 1000], [-200, windowSize.height || 1000]), springConfig)

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [mouseX, mouseY])

  // Elegant masking reveal
  const maskVariants = {
    hidden: { y: "110%", opacity: 0 },
    visible: (i: number) => ({
      y: "0%",
      opacity: 1,
      transition: {
        duration: 1.4,
        delay: 1.2 + (i * 0.15), // Added delay to work with the staggered page reveal
        ease: [0.19, 1, 0.22, 1] // Apple-like smooth ease
      }
    })
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20"
    >
      {/* Interactive Atmospheric Light */}
      {isMounted && (
        <motion.div 
          className="fixed w-[60vw] h-[60vw] rounded-full light-spot pointer-events-none z-0"
          style={{ 
            x: lightX, 
            y: lightY,
            translateX: "-50%",
            translateY: "-50%"
          }}
        />
      )}

      {/* Main Content Container - Asymmetrical */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-start"
      >
        {/* Eyebrow */}
        <div className="overflow-hidden mb-8 md:mb-12 ml-1 md:ml-4">
          <motion.div
            custom={0}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={maskVariants}
            className="flex items-center gap-4"
          >
            <span className="w-8 h-[1px] bg-primary" />
            <span className="text-technical text-[10px] md:text-[12px] text-muted-foreground tracking-[0.3em]">
              Creative Development Studio
            </span>
          </motion.div>
        </div>

        {/* Massive Editorial Headline */}
        <h1 className="flex flex-col gap-0 md:gap-2 mb-16 md:mb-24 w-full">
          <div className="overflow-hidden">
            <motion.span
              custom={1}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={maskVariants}
              className="text-display text-[clamp(4rem,12vw,10rem)] text-foreground tracking-tighter block"
            >
              We build
            </motion.span>
          </div>
          
          <div className="overflow-hidden pl-[10vw] md:pl-[15vw]">
            <motion.span
              custom={2}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={maskVariants}
              className="text-display text-[clamp(4rem,12vw,10rem)] text-foreground tracking-tighter flex items-center gap-4 md:gap-8"
            >
              <span className="font-serif italic text-primary">websites</span>
              <span>that</span>
            </motion.span>
          </div>
          
          <div className="overflow-hidden pl-[5vw] md:pl-[5vw] mt-2 md:mt-0">
            <motion.span
              custom={3}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={maskVariants}
              className="text-display text-[clamp(4rem,12vw,10rem)] text-foreground tracking-tighter block"
            >
              make people stop.
            </motion.span>
          </div>
        </h1>

        {/* Bottom Metadata & CTA - Flex layout */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-12 border-t border-border pt-8 md:pt-12">
          
          <div className="overflow-hidden max-w-sm">
            <motion.p
              custom={4}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={maskVariants}
              className="text-[14px] md:text-[16px] text-muted-foreground leading-relaxed font-serif italic"
            >
              A two-person studio in Jodhpur building cinematic web experiences
              for brands that know what they're worth.
            </motion.p>
          </div>

          <motion.div
            custom={5}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={maskVariants}
            className="flex flex-col sm:flex-row gap-6 items-center"
          >
            <a
              href="#contact"
              className="group relative overflow-hidden inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background font-medium text-[13px] uppercase tracking-[0.1em] transition-transform duration-500 hover:scale-105"
            >
              <span className="relative z-10">Start Project</span>
              <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
            </a>
            
            <a
              href="#work"
              className="group inline-flex items-center gap-3 text-[13px] uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              <span>View Archive</span>
              <span className="w-0 h-[1px] bg-foreground group-hover:w-8 transition-all duration-500" />
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
