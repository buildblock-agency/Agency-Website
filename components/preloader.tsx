"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

const logsList = [
  "LOADING CANVAS...",
  "CALIBRATING MOTION...",
  "SETTING THE STAGE...",
  "REFINING DETAILS...",
  "CHECKING EVERY PIXEL...",
  "ALMOST THERE...",
  "READY."
]

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0)
  const [logIndex, setLogIndex] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [showContent, setShowContent] = useState(true)
  const [timeString, setTimeString] = useState("")
  const hasStarted = useRef(false)

  useEffect(() => {
    setTimeString(new Date().toLocaleTimeString())
  }, [])

  // Block scroll on mount
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  // Fast counter progress
  useEffect(() => {
    if (hasStarted.current) return
    hasStarted.current = true

    let current = 0
    const interval = setInterval(() => {
      // Glitchy increments
      const increment = Math.floor(Math.random() * 8) + 2 // 2 to 9
      current = Math.min(current + increment, 100)
      setCount(current)

      // Fast-forward logs based on count percentage
      const targetLogIndex = Math.min(
        Math.floor((current / 100) * (logsList.length - 2)),
        logsList.length - 3
      )
      setLogIndex(targetLogIndex)

      if (current === 100) {
        clearInterval(interval)
        // Set completion status logs
        setLogIndex(logsList.length - 2) // "COMPILATION COMPLETE"
        
        setTimeout(() => {
          setLogIndex(logsList.length - 1) // "SYSTEM OPERATIONAL"
        }, 300)

        // Delay slightly for dramatic effect, then trigger completion
        setTimeout(() => {
          setIsFinished(true)
          onComplete() // Mount parent content behind overlay
          
          // Fade out the content, then slide away the shutter panels
          setTimeout(() => {
            setShowContent(false)
          }, 200)
        }, 800)
      }
    }, 45 + Math.random() * 30) // Rapid ticks (around 1 - 1.5s total time)

    return () => clearInterval(interval)
  }, [onComplete])

  // Custom styling for the glitch text layers
  const glitchStyles = `
    @keyframes preloader-glitch-1 {
      0% { clip-path: inset(20% 0 50% 0); transform: skew(0.3deg); }
      10% { clip-path: inset(80% 0 10% 0); transform: skew(-1deg); }
      20% { clip-path: inset(40% 0 30% 0); transform: skew(0.8deg); }
      30% { clip-path: inset(10% 0 85% 0); transform: skew(-0.5deg); }
      40% { clip-path: inset(90% 0 2% 0); transform: skew(1.5deg); }
      50% { clip-path: inset(30% 0 60% 0); transform: skew(-0.2deg); }
      60% { clip-path: inset(70% 0 20% 0); transform: skew(0.5deg); }
      70% { clip-path: inset(15% 0 75% 0); transform: skew(-1.2deg); }
      80% { clip-path: inset(85% 0 5% 0); transform: skew(0.8deg); }
      90% { clip-path: inset(5% 0 90% 0); transform: skew(-0.3deg); }
      100% { clip-path: inset(20% 0 50% 0); transform: skew(0deg); }
    }
    @keyframes preloader-glitch-2 {
      0% { clip-path: inset(50% 0 20% 0); transform: skew(-0.5deg); }
      10% { clip-path: inset(15% 0 70% 0); transform: skew(1deg); }
      20% { clip-path: inset(85% 0 5% 0); transform: skew(-0.8deg); }
      30% { clip-path: inset(30% 0 60% 0); transform: skew(0.4deg); }
      40% { clip-path: inset(5% 0 90% 0); transform: skew(-1.5deg); }
      50% { clip-path: inset(75% 0 15% 0); transform: skew(0.2deg); }
      60% { clip-path: inset(20% 0 50% 0); transform: skew(-0.5deg); }
      70% { clip-path: inset(90% 0 5% 0); transform: skew(1.2deg); }
      80% { clip-path: inset(40% 0 45% 0); transform: skew(-0.8deg); }
      90% { clip-path: inset(60% 0 25% 0); transform: skew(0.3deg); }
      100% { clip-path: inset(50% 0 20% 0); transform: skew(0deg); }
    }
    .glitch-layer-1 {
      animation: preloader-glitch-1 1s infinite linear alternate-reverse;
      text-shadow: none;
    }
    .glitch-layer-2 {
      animation: preloader-glitch-2 0.85s infinite linear alternate-reverse;
      text-shadow: none;
    }
  `

  return (
    <>
      <style>{glitchStyles}</style>
      <AnimatePresence mode="wait">
        {(!isFinished || showContent) && (
          <div className="fixed inset-0 z-[9999] pointer-events-none select-none">
            {/* Shutter panels (5 vertical columns) */}
            <div className="absolute inset-0 flex pointer-events-auto">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  initial={{ y: 0 }}
                  animate={isFinished ? { y: "-100%" } : { y: 0 }}
                  transition={{
                    duration: 1.6,
                    delay: i * 0.1,
                    ease: [0.85, 0, 0.15, 1] // Viscous, premium ease
                  }}
                  className="h-full bg-background border-r border-border/10 last:border-r-0"
                  style={{ width: "20vw" }}
                />
              ))}
            </div>

            {/* Glowing noise overlay inside preloader */}
            <div className="absolute inset-0 noise-overlay opacity-[0.03] z-[1]" />

            {/* Foreground Content */}
            <AnimatePresence>
              {showContent && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                  className="absolute inset-0 z-[2] flex flex-col justify-between p-8 md:p-16 text-foreground font-mono pointer-events-none"
                >
                  {/* Top Bar */}
                  <div className="flex justify-between items-center text-technical text-[9px] md:text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                    <div>BUILDBLOCK // DEV STUDIO</div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full animate-ping" />
                      <span>SYS.INIT.OK</span>
                    </div>
                  </div>

                  {/* Center Counter */}
                  <div className="relative flex flex-col items-center justify-center py-20">
                    <div className="relative leading-none">
                      {/* Sub-layers for red/cyan chromatic aberration glitch */}
                      <span className="absolute top-0 left-0 text-[12vw] md:text-[8vw] font-black tracking-tighter text-transparent opacity-75 glitch-layer-1">
                        {count.toString().padStart(3, "0")}
                      </span>
                      <span className="absolute top-0 left-0 text-[12vw] md:text-[8vw] font-black tracking-tighter text-transparent opacity-75 glitch-layer-2">
                        {count.toString().padStart(3, "0")}
                      </span>
                      {/* Main white counter */}
                      <span className="relative text-[12vw] md:text-[8vw] font-black tracking-tighter text-foreground block drop-shadow-[0_0_20px_rgba(255,255,255,0.08)]">
                        {count.toString().padStart(3, "0")}
                      </span>
                    </div>

                    {/* Minimal status bar */}
                    <div className="w-[80vw] max-w-lg h-[2px] bg-card/60 relative overflow-hidden mt-8 rounded-full border border-border/10">
                      <motion.div
                        className="h-full bg-primary"
                        style={{ width: `${count}%` }}
                      />
                    </div>
                  </div>

                  {/* Bottom Bar */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-technical text-[9px] md:text-[11px] tracking-[0.15em] text-muted-foreground">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3">
                        <span className="text-primary">&gt;</span>
                        <span className="text-foreground transition-all duration-150">
                          {logsList[logIndex]}
                        </span>
                      </div>
                      <div className="opacity-40">LOC: JODHPUR // TIME: {timeString || "00:00:00 AM"}</div>
                    </div>
                    <div className="text-right text-[8px] md:text-[10px] opacity-40 font-mono">
                      LOAD_FACTOR: {(count * 1.83).toFixed(2)} FLOPS // THR_ID: 0x7b1c
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
