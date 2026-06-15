"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    title: "Cinematic Landing Pages",
    description: "Pages that convert visitors into enquiries. Animated, fast, built to make your best offer undeniable.",
  },
  {
    title: "Brand Websites",
    description: "Full digital presence for businesses ready to charge premium. Design + development + deployment in 14 days.",
  },
  {
    title: "Motion & Interaction",
    description: "GSAP-powered scroll experiences, entrance animations, and micro-interactions that make your site feel alive.",
  },
  {
    title: "White-Label Development",
    description: "Development partner for agencies that design but don't build. Your client. Your timeline. Our execution.",
  },
]

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  useGSAP(() => {
    // Violent color inversion on scroll
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 50%",
      end: "bottom 50%",
      onEnter: () => {
        gsap.to("body", { 
          backgroundColor: "#F0EAD6", // Cream
          color: "#080805", // Espresso
          duration: 0.5, 
          ease: "power2.out" 
        })
        gsap.to(containerRef.current, {
          "--tw-border-opacity": "0.1",
          borderColor: "#080805"
        })
      },
      onLeaveBack: () => {
        gsap.to("body", { 
          backgroundColor: "#080805", // Espresso
          color: "#F0EAD6", // Cream
          duration: 0.5, 
          ease: "power2.out" 
        })
      },
      onLeave: () => {
        gsap.to("body", { 
          backgroundColor: "#080805", // Espresso
          color: "#F0EAD6", // Cream
          duration: 0.5, 
          ease: "power2.out" 
        })
      },
      onEnterBack: () => {
         gsap.to("body", { 
          backgroundColor: "#F0EAD6", // Cream
          color: "#080805", // Espresso
          duration: 0.5, 
          ease: "power2.out" 
        })
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
      // Reset on unmount
      gsap.set("body", { backgroundColor: "#080805", color: "#F0EAD6" })
    }
  }, { scope: containerRef })

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative py-32 transition-colors duration-500"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="mb-32">
          <p className="text-technical text-[10px] md:text-[12px] text-primary mb-8 uppercase tracking-[0.3em]">
            Expertise
          </p>
          <h2 className="text-display text-[clamp(2.5rem,6vw,4.5rem)] max-w-4xl leading-[1.05]">
            Cinematic web experiences for brands that <span className="italic font-serif text-primary">refuse to blend in.</span>
          </h2>
        </div>

        {/* Services list - Raw Luxury focus */}
        <div className="space-y-0">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group py-16 border-t border-current hover:bg-current/5 transition-colors duration-700 cursor-pointer px-4 -mx-4 rounded-xl"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 md:gap-16">
                
                {/* Title & Number */}
                <div className="flex items-start gap-8 md:w-1/2">
                  <span className="text-[14px] font-serif italic pt-2 opacity-50">
                    0{index + 1}
                  </span>
                  <h3 className="text-display text-[clamp(2rem,4vw,3rem)] group-hover:text-primary transition-colors duration-500">
                    {service.title}
                  </h3>
                </div>
                
                {/* Description & Icon */}
                <div className="flex items-start gap-12 md:w-1/2">
                  <p className="text-[16px] md:text-[18px] leading-relaxed font-serif italic max-w-md pt-2 opacity-70">
                    "{service.description}"
                  </p>
                  <div className="hidden md:flex flex-shrink-0 items-center justify-center w-14 h-14 rounded-full border border-current group-hover:border-primary transition-all duration-700 ml-auto">
                    <span className="block w-2 h-2 rounded-full bg-current group-hover:bg-primary group-hover:scale-150 transition-all duration-500" />
                  </div>
                </div>
                
              </div>
            </div>
          ))}
          {/* Bottom border */}
          <div className="border-t border-current mt-4" />
        </div>
      </div>
    </section>
  )
}
