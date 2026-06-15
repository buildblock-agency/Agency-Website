"use client"

import { useEffect, useState } from "react"
import { motion, useSpring, useMotionValue } from "framer-motion"

export default function Cursor() {
  const [isHovered, setIsHovered] = useState(false)
  const [isHidden, setIsHidden] = useState(true)
  const [hoverRect, setHoverRect] = useState<{ width: number; height: number; left: number; top: number } | null>(null)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring config for the physical, heavy feel
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 }
  
  // Base cursor positions
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (isHidden) setIsHidden(false)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interactable = target.closest("a, button, [role='button'], input, textarea") as HTMLElement
      
      if (interactable) {
        setIsHovered(true)
        const rect = interactable.getBoundingClientRect()
        setHoverRect({
          width: rect.width,
          height: rect.height,
          left: rect.left,
          top: rect.top
        })
      } else {
        setIsHovered(false)
        setHoverRect(null)
      }
    }

    const handleMouseLeave = () => setIsHidden(true)
    const handleMouseEnter = () => setIsHidden(false)

    window.addEventListener("mousemove", moveMouse)
    window.addEventListener("mouseover", handleMouseOver)
    // Need to handle scroll as well so the rect updates or detaches
    window.addEventListener("scroll", () => {
      setIsHovered(false)
      setHoverRect(null)
    })
    
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", moveMouse)
      window.removeEventListener("mouseover", handleMouseOver)
      window.removeEventListener("scroll", () => {})
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [isHidden, mouseX, mouseY])

  if (isHidden) return null

  // Determine final animated properties based on state
  // If hovered, we snap to the center of the bounding rect and morph the shape
  const finalX = isHovered && hoverRect ? hoverRect.left + hoverRect.width / 2 : cursorX
  const finalY = isHovered && hoverRect ? hoverRect.top + hoverRect.height / 2 : cursorY
  
  const width = isHovered && hoverRect ? hoverRect.width + 16 : 8
  const height = isHovered && hoverRect ? hoverRect.height + 16 : 8
  const borderRadius = isHovered ? "8px" : "50%"

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      style={{
        x: finalX,
        y: finalY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <motion.div
        animate={{
          width,
          height,
          borderRadius,
          backgroundColor: isHovered ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 1)",
          border: isHovered ? "1px solid rgba(255,255,255,0.5)" : "0px solid rgba(255,255,255,0)"
        }}
        transition={{ 
          type: "spring", 
          damping: 25, 
          stiffness: 200,
          mass: 0.5
        }}
        className="flex items-center justify-center"
      />
    </motion.div>
  )
}
