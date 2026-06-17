"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled 
            ? "py-4 bg-background/80 backdrop-blur-xl border-b border-border shadow-sm shadow-background/50" 
            : "py-8"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-50 group">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="BuildBlock Dev Studio"
                width={40}
                height={40}
                className="w-8 h-8 md:w-10 md:h-10 group-hover:opacity-80 transition-opacity"
              />
              <span className="text-technical text-[14px] font-bold text-foreground hidden sm:block">
                BuildBlock
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-12">
            {navItems.slice(0, 4).map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-technical text-[10px] md:text-[11px] text-muted-foreground hover:text-primary transition-colors duration-500"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="#contact"
              className="group relative overflow-hidden inline-flex items-center gap-2 px-8 py-3.5 text-technical text-[10px] md:text-[11px] font-medium text-background bg-foreground hover:bg-primary transition-colors duration-500"
            >
              <span className="relative z-10">Start a Project</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle - Text Based */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative z-50 flex items-center gap-3 px-4 py-2 bg-card/80 backdrop-blur-sm border border-border rounded-full"
            aria-label="Toggle menu"
          >
            <span className="text-technical text-[9px] font-medium text-foreground">
              {isMobileMenuOpen ? "Close" : "Menu"}
            </span>
            <div className="flex flex-col gap-1 w-4">
              <motion.span
                animate={isMobileMenuOpen ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
                className="w-full h-[1px] bg-foreground"
              />
              <motion.span
                animate={isMobileMenuOpen ? { rotate: -45, y: -2 } : { rotate: 0, y: 0 }}
                className="w-full h-[1px] bg-foreground"
              />
            </div>
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu - Fullscreen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-40 bg-background noise-overlay flex flex-col items-center justify-center"
          >
            <motion.nav
              className="flex flex-col items-center gap-8"
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.1 + index * 0.1,
                    duration: 0.8,
                    ease: [0.19, 1, 0.22, 1]
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-display text-[clamp(3rem,12vw,5rem)] text-foreground hover:text-primary transition-colors lowercase"
                  >
                    <span className="text-technical text-[10px] text-muted-foreground mr-6 italic opacity-50">
                      0{index + 1}
                    </span>
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-16"
              >
                <Link
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-12 py-6 text-technical text-[12px] font-medium text-background bg-primary hover:bg-foreground transition-colors duration-500"
                >
                  Start a Project
                </Link>
              </motion.div>
            </motion.nav>

            {/* Bottom info in mobile menu */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-12 left-0 right-0 text-center px-6"
            >
              <p className="text-technical text-[10px] text-muted-foreground">
                Jodhpur, Rajasthan · Cinematic Web Experiences
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
