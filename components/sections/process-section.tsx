"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    number: "01",
    title: "Discover",
    description: "Understanding your brand, audience, and the cinematic atmosphere we need to create.",
  },
  {
    number: "02",
    title: "Design Direction",
    description: "We share references, palette, and layout direction for approval before writing a single line of code. One round, then we build.",
  },
  {
    number: "03",
    title: "Build",
    description: "Pixel-perfect development with GSAP animations and high-performance code. No templates, ever.",
  },
  {
    number: "04",
    title: "Launch",
    description: "Final polish, SEO optimization, and handover. We ensure your site feels premium on every device.",
  },
]

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!wrapperRef.current || !scrollRef.current) return

    const sections = gsap.utils.toArray(".process-step")
    
    // The amount we need to scroll horizontally
    const scrollWidth = scrollRef.current.scrollWidth - window.innerWidth
    
    // Create the horizontal scroll tween
    const scrollTween = gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none", // Must be none for 1:1 scroll tracking
      scrollTrigger: {
        trigger: wrapperRef.current,
        pin: true,
        scrub: 1, // Add slight smoothing
        snap: 1 / (sections.length - 1), // Snap to each section
        // End after scrolling the width of the container
        end: () => `+=${scrollWidth}`,
        invalidateOnRefresh: true, // Recalculate on resize
      }
    })

    // Add a fade in effect for the text in each section based on the horizontal scroll
    sections.forEach((section: any, index) => {
      // Don't animate the first one, let it be visible immediately
      if (index === 0) return;
      
      const content = section.querySelector('.step-content')
      
      gsap.from(content, {
        opacity: 0,
        y: 50,
        scrollTrigger: {
          trigger: section,
          containerAnimation: scrollTween, // Link to the horizontal tween
          start: "left center", // Trigger when left of section hits center of viewport
          toggleActions: "play none none reverse",
        }
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, { scope: containerRef })

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative bg-background overflow-hidden"
    >
      {/* The pinned wrapper */}
      <div ref={wrapperRef} className="h-screen w-full flex items-center">
        
        {/* The scrolling container */}
        <div 
          ref={scrollRef} 
          className="flex h-full items-center w-[400vw] relative"
        >
          {/* Background Track Line */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-border -translate-y-1/2 z-0" />

          {steps.map((step, index) => (
            <div
              key={step.number}
              className="process-step w-screen h-full flex flex-col justify-center items-center px-6 md:px-12 relative z-10"
            >
              
              {/* Number indicator attached to the track */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-background border border-border rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(166,124,82,0.1)]">
                <span className="text-display text-[2.5rem] text-primary italic">
                  {step.number}
                </span>
              </div>

              {/* Content Box */}
              <div className={`step-content max-w-xl ${index % 2 === 0 ? 'mb-[40vh]' : 'mt-[40vh]'} text-center bg-card p-8 md:p-12 border border-border`}>
                <p className="text-technical text-[10px] text-primary mb-6 uppercase tracking-[0.3em]">
                  Phase {step.number}
                </p>
                <h3 className="text-display text-[clamp(2rem,4vw,3.5rem)] text-foreground mb-6">
                  {step.title}
                </h3>
                <p className="text-[16px] md:text-[18px] text-muted-foreground leading-relaxed font-serif italic">
                  "{step.description}"
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
