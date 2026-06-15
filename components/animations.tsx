"use client"

import { useRef, useEffect, useState, type ReactNode } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'

// Magnetic button that follows cursor
export function MagneticButton({ 
  children, 
  className = "",
  strength = 0.3
}: { 
  children: ReactNode
  className?: string
  strength?: number 
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const x = (e.clientX - centerX) * strength
    const y = (e.clientY - centerY) * strength
    setPosition({ x, y })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  const springConfig = { damping: 15, stiffness: 150 }
  const x = useSpring(position.x, springConfig)
  const y = useSpring(position.y, springConfig)

  useEffect(() => {
    x.set(position.x)
    y.set(position.y)
  }, [position, x, y])

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Text reveal animation - character by character
export function TextReveal({ 
  children, 
  className = "",
  delay = 0
}: { 
  children: string
  className?: string
  delay?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const words = children.split(' ')

  return (
    <span ref={ref} className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-[0.25em]">
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              className="inline-block"
              initial={{ y: 100, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
              transition={{
                duration: 0.5,
                delay: delay + (wordIndex * 0.1) + (charIndex * 0.03),
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  )
}

// Line reveal animation
export function LineReveal({ 
  children, 
  className = "",
  delay = 0
}: { 
  children: ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        className={className}
        initial={{ y: "100%" }}
        animate={isInView ? { y: 0 } : { y: "100%" }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

// Parallax section
export function ParallaxSection({ 
  children, 
  className = "",
  speed = 0.5
}: { 
  children: ReactNode
  className?: string
  speed?: number
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed])
  const smoothY = useSpring(y, { damping: 50, stiffness: 100 })

  return (
    <motion.div ref={ref} style={{ y: smoothY }} className={className}>
      {children}
    </motion.div>
  )
}

// Parallax image with scale
export function ParallaxImage({ 
  src, 
  alt,
  className = ""
}: { 
  src: string
  alt: string
  className?: string
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1])

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale }}
        className="w-full h-full object-cover"
      />
    </div>
  )
}

// Stagger children on scroll
export function StaggerReveal({ 
  children, 
  className = "",
  staggerDelay = 0.1
}: { 
  children: ReactNode
  className?: string
  staggerDelay?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ 
  children, 
  className = "" 
}: { 
  children: ReactNode
  className?: string 
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { y: 60, opacity: 0 },
        visible: { 
          y: 0, 
          opacity: 1,
          transition: {
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94]
          }
        }
      }}
    >
      {children}
    </motion.div>
  )
}

// Horizontal scroll section
export function HorizontalScroll({ 
  children,
  className = "" 
}: { 
  children: ReactNode
  className?: string 
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const [scrollWidth, setScrollWidth] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)

  useEffect(() => {
    if (scrollRef.current && containerRef.current) {
      setScrollWidth(scrollRef.current.scrollWidth)
      setContainerWidth(containerRef.current.offsetWidth)
    }
  }, [children])

  const x = useTransform(
    scrollYProgress, 
    [0, 1], 
    [0, -(scrollWidth - containerWidth)]
  )
  const smoothX = useSpring(x, { damping: 50, stiffness: 100 })

  return (
    <div ref={containerRef} className={`relative h-[300vh] ${className}`}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div ref={scrollRef} style={{ x: smoothX }} className="flex gap-8">
          {children}
        </motion.div>
      </div>
    </div>
  )
}

// Scale on scroll
export function ScaleOnScroll({ 
  children, 
  className = "" 
}: { 
  children: ReactNode
  className?: string 
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  })
  
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Counter animation
export function AnimatedCounter({ 
  value, 
  suffix = "",
  prefix = "",
  duration = 2
}: { 
  value: number
  suffix?: string
  prefix?: string
  duration?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (isInView) {
      let startTime: number
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
        const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
        setCount(Math.floor(eased * value))
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, value, duration])

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  )
}

// Fade mask on scroll
export function FadeMask({ 
  children, 
  className = "" 
}: { 
  children: ReactNode
  className?: string 
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  })
  
  const maskSize = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <motion.div
      ref={ref}
      style={{
        maskImage: `radial-gradient(circle, black ${maskSize}, transparent ${maskSize})`,
        WebkitMaskImage: `radial-gradient(circle, black ${maskSize}, transparent ${maskSize})`
      } as React.CSSProperties}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Marquee animation
export function Marquee({ 
  children, 
  speed = 20,
  className = "" 
}: { 
  children: ReactNode
  speed?: number
  className?: string 
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: [0, "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear"
          }
        }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  )
}
