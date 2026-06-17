"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

const projects = [
  {
    id: 1,
    title: "Sacred Vows",
    category: "Wedding Registry & Showcase",
    year: "2024",
    result: "A cinematic digital registry and photography showcase, optimized to load high-resolution imagery instantly.",
    image: "/projects/sacredvows.png",
    video: "/projects/sacredvows.webp",
    liveUrl: "https://www.sacredvows63.com/",
    aspect: "aspect-[16/9]"
  },
  {
    id: 2,
    title: "Shree Maa Chamunda Jyotish",
    category: "Astro-Consultancy Portal",
    year: "2026",
    result: "Cosmic clarity for a premier astrology consultancy, driving seamless online consultations and local bookings.",
    image: "/projects/smcj.png",
    video: "/projects/smcj.webp",
    liveUrl: "https://shrimaachamundajyotish.in/",
    aspect: "aspect-[16/9]"
  }
]

export default function PortfolioSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
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
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`group flex flex-col ${index % 2 !== 0 ? 'md:items-end' : 'md:items-start'}`}
            >
              {/* Image with hover effect */}
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative ${project.aspect} w-full md:w-[75%] overflow-hidden bg-card cursor-pointer block border border-border/30`}
              >
                {/* Static cover image */}
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-102"
                  sizes="(max-width: 768px) 100vw, 75vw"
                />

                {/* Scrolling preview video (WebP animation) */}
                <div
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    hoveredId === project.id ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  <Image
                    key={hoveredId === project.id ? `${project.id}-hover` : `${project.id}-idle`}
                    src={hoveredId === project.id ? project.video : "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"}
                    alt={`${project.title} scroll preview`}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 75vw"
                  />
                </div>
                
                {/* Darker overlay that reveals on hover */}
                <div className="absolute inset-0 bg-background/30 group-hover:bg-transparent transition-colors duration-1000" />
                
                {/* Project Number (Large Serif overlay) */}
                <div className="absolute top-6 left-6 md:top-10 md:left-10 mix-blend-difference pointer-events-none">
                  <span className="text-display text-[clamp(4rem,10vw,8rem)] text-foreground opacity-50 italic">
                    0{project.id}
                  </span>
                </div>

                {/* Custom hover label */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="px-8 py-4 bg-foreground text-background text-technical text-[10px] transform scale-95 group-hover:scale-100 transition-transform duration-700">
                    Visit Live Site
                  </div>
                </div>
              </a>

              {/* Info Block */}
              <div className={`mt-12 w-full md:w-[75%] flex flex-col md:flex-row justify-between items-start gap-8 ${index % 2 !== 0 ? 'md:flex-row-reverse md:text-right' : ''}`}>
                <div>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <h3 className="text-display text-[clamp(2.5rem,5vw,4rem)] text-foreground mb-4 transition-colors duration-500 group-hover:text-primary">
                      {project.title}
                    </h3>
                  </a>
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
