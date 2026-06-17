"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

const industries = [
  "Restaurants",
  "Hotels",
  "Photographers",
  "D2C Brands",
  "Clinics",
  "Architects",
  "Boutique Stays",
]

const footerLinks = {
  services: [
    { label: "Cinematic Landing Pages", href: "#services" },
    { label: "Brand Websites", href: "#services" },
    { label: "Motion Design", href: "#services" },
    { label: "White-Label", href: "#services" },
  ],
  company: [
    { label: "Work", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  social: [
    { label: "Instagram", href: "https://instagram.com" },
  ],
}

export default function Footer() {
  return (
    <footer className="relative bg-background pt-32 overflow-hidden border-t border-border">
      {/* Industry Marquee */}
      <div className="relative flex overflow-x-hidden border-y border-border py-10 bg-card">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap gap-20 items-center"
        >
          {[...industries, ...industries].map((industry, i) => (
            <span 
              key={i} 
              className="text-display text-[clamp(2rem,5vw,4rem)] text-muted uppercase tracking-tighter italic"
            >
              {industry} <span className="text-primary ml-20">·</span>
            </span>
          ))}
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Main footer */}
        <div className="py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-20">
          {/* Brand */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-4 mb-10">
              <Image
                src="/logo.png"
                alt="BuildBlock Dev Studio"
                width={40}
                height={40}
                className=""
              />
              <span className="text-technical text-[14px] font-bold text-foreground">
                BuildBlock
              </span>
            </Link>
            <p className="text-[18px] text-muted-foreground mb-12 max-w-sm leading-relaxed italic font-serif">
              Cinematic web experiences for brands that refuse to blend in. Based in Jodhpur, building for India.
            </p>
            <Link
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 text-[12px] uppercase tracking-[0.2em] font-bold text-primary-foreground bg-primary hover:bg-foreground hover:text-background transition-colors duration-500"
            >
              Start a Project
            </Link>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h4 className="text-technical text-[10px] text-muted-foreground mb-8">
              Expertise
            </h4>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h4 className="text-technical text-[10px] text-muted-foreground mb-8">
              Studio
            </h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="lg:col-span-3">
            <h4 className="text-technical text-[10px] text-muted-foreground mb-8">
              Connect
            </h4>
            <ul className="space-y-4">
              {footerLinks.social.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14px] text-muted-foreground hover:text-foreground transition-colors duration-300 inline-flex items-center gap-3 group font-serif italic"
                  >
                    {link.label}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                    >
                      <path d="M7 7h10v10" />
                      <path d="M7 17 17 7" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-12 border-t border-border flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-technical text-[10px] text-muted-foreground">
            © {new Date().getFullYear()} BuildBlock Dev Studio. Hand-crafted with excessive caffeine.
          </p>
          <div className="flex items-center gap-10">
            <Link
              href="#"
              className="text-technical text-[10px] text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-technical text-[10px] text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
