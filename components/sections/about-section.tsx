"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"

const stats = [
  { value: 12, suffix: "+", label: "Premium Brands" },
  { value: 14, suffix: " Days", label: "Avg. Delivery" },
  { value: 100, suffix: "%", label: "Satisfaction" },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-32 overflow-hidden bg-background"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          {/* Left - Visual (Placeholder for real workspace photo) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-card border border-border grayscale hover:grayscale-0 transition-all duration-[2s]">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 opacity-80" />
              <img 
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&h=1000&fit=crop" 
                alt="BuildBlock Workspace" 
                className="object-cover w-full h-full opacity-50 mix-blend-luminosity"
              />
            </div>
            {/* Location badge */}
            <div className="absolute -bottom-6 -right-6 md:-right-10 bg-primary p-8 hidden md:flex items-center justify-center border border-border">
              <p className="text-technical text-[10px] font-medium text-primary-foreground rotate-90 origin-center whitespace-nowrap">
                Jodhpur, RJ
              </p>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
            className="lg:col-span-7"
          >
            <p className="text-technical text-[10px] md:text-[12px] text-primary mb-8">
              The Studio
            </p>
            <h2 className="text-display text-[clamp(2.5rem,6vw,4.5rem)] text-foreground mb-12 leading-[1.05]">
              Cinematic web experiences for brands that 
              <br />
              <span className="italic text-primary">refuse to blend in.</span>
            </h2>
            
            <div className="space-y-8 text-[16px] md:text-[18px] text-muted-foreground leading-relaxed italic font-serif max-w-2xl">
              <p>
                BuildBlock is a creative studio based in Jodhpur, Rajasthan. We believe the web should be cinematic, not static. 
              </p>
              <p>
                Driven by the ambition of our clients, we build digital experiences that capture attention within seconds. 0 templates. 0 shortcuts. Just pure, intentional craft.
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 mt-20 pt-16 border-t border-border">
              {stats.map((stat, index) => (
                <div key={stat.label}>
                  <div className="text-display text-[clamp(2.5rem,5vw,4rem)] text-foreground leading-none mb-4 italic">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-technical text-[10px] text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
