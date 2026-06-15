"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

const projects = [
  {
    id: 1,
    title: "Peepal Cafe",
    category: "Restaurant & Lifestyle",
    year: "2024",
    result: "Cinematic experience for a heritage property.",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1600&h=1000&fit=crop",
    aspect: "aspect-[4/3]" // Portrait style
  },
  {
    id: 2,
    title: "Sacred Vows",
    category: "Wedding Photography",
    year: "2024",
    result: "Capturing memories in high fidelity.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1600&h=1000&fit=crop",
    aspect: "aspect-[16/9]" // Landscape style
  },
]

export default function PortfolioSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative py-32 overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          className="mb-32 flex flex-col md:flex-row md:items-end md:justify-between gap-12"
        >
          <div className="max-w-3xl">
            <p className="text-technical text-[10px] md:text-[12px] text-primary mb-8">
              Selected Archive
            </p>
            <h2 className="text-display text-[clamp(3rem,8vw,6rem)] text-foreground leading-[0.95]">
              Brands that refuse
              <br />
              <span className="italic text-primary">to blend in.</span>
            </h2>
          </div>
        </motion.div>

        {/* Projects - Raw Editorial Layout */}
        <div className="flex flex-col gap-32 md:gap-48">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
              className={`group flex flex-col ${index % 2 !== 0 ? 'md:items-end' : 'md:items-start'}`}
            >
              {/* Image with hover effect */}
              <div className={`relative ${project.aspect} w-full md:w-[75%] overflow-hidden bg-card cursor-pointer`}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
                />
                {/* Darker overlay that reveals on hover */}
                <div className="absolute inset-0 bg-background/40 group-hover:bg-transparent transition-colors duration-1000" />
                
                {/* Project Number (Large Serif overlay) */}
                <div className="absolute top-6 left-6 md:top-10 md:left-10 mix-blend-difference pointer-events-none">
                  <span className="text-display text-[clamp(4rem,10vw,8rem)] text-foreground opacity-50 italic">
                    0{project.id}
                  </span>
                </div>

                {/* Custom hover label */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="px-8 py-4 bg-foreground text-background text-technical text-[10px] transform scale-95 group-hover:scale-100 transition-transform duration-700">
                    Explore
                  </div>
                </div>
              </div>

              {/* Info Block */}
              <div className={`mt-12 w-full md:w-[75%] flex flex-col md:flex-row justify-between items-start gap-8 ${index % 2 !== 0 ? 'md:flex-row-reverse md:text-right' : ''}`}>
                <div>
                  <h3 className="text-display text-[clamp(2.5rem,5vw,4rem)] text-foreground mb-4 transition-colors duration-500 group-hover:text-primary">
                    {project.title}
                  </h3>
                  <div className={`flex items-center gap-4 ${index % 2 !== 0 ? 'md:justify-end' : 'justify-start'}`}>
                    <span className="text-technical text-[10px] text-primary">
                      {project.category}
                    </span>
                    <span className="w-12 h-[1px] bg-border" />
                    <span className="font-mono text-[12px] text-muted-foreground">
                      {project.year}
                    </span>
                  </div>
                </div>
                
                <p className="text-[18px] md:text-[22px] text-muted-foreground leading-relaxed italic font-serif max-w-sm">
                  "{project.result}"
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View more link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-48 text-center"
        >
          <a
            href="#contact"
            className="group inline-flex flex-col items-center gap-6"
          >
            <span className="text-technical text-[12px] text-muted-foreground group-hover:text-foreground transition-colors duration-500">
              Initiate Project
            </span>
            <div className="w-16 h-16 rounded-full border border-border flex items-center justify-center group-hover:border-primary transition-all duration-700">
              <span className="block w-px h-8 bg-muted-foreground group-hover:bg-primary group-hover:h-4 transition-all duration-500" />
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
