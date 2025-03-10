"use client"

import { useState, useRef, ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface InteractiveCardProps {
  children: ReactNode
  className?: string
  glareColor?: string
  borderColor?: string
  borderWidth?: number
  borderRadius?: number
  perspective?: number
  rotationIntensity?: number
  glareIntensity?: number
  shadowColor?: string
}

export default function InteractiveCard({
  children,
  className = '',
  glareColor = 'rgba(212, 175, 55, 0.4)',
  borderColor = 'rgba(212, 175, 55, 0.2)',
  borderWidth = 1,
  borderRadius = 8,
  perspective = 800,
  rotationIntensity = 15,
  glareIntensity = 0.5,
  shadowColor = 'rgba(0, 0, 0, 0.2)'
}: InteractiveCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  
  // Valores de movimiento
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  // Aplicar spring para movimiento más suave
  const rotateX = useSpring(useTransform(y, [-100, 100], [rotationIntensity, -rotationIntensity]), {
    stiffness: 300,
    damping: 30
  })
  const rotateY = useSpring(useTransform(x, [-100, 100], [-rotationIntensity, rotationIntensity]), {
    stiffness: 300,
    damping: 30
  })
  
  // Valores para el efecto de brillo
  const glareX = useTransform(x, [-100, 100], ['0%', '100%'])
  const glareY = useTransform(y, [-100, 100], ['0%', '100%'])
  const glareOpacity = useTransform(
    [rotateX, rotateY],
    ([latestRotateX, latestRotateY]) => {
      const intensity = Math.max(Math.abs(latestRotateX as number), Math.abs(latestRotateY as number)) / rotationIntensity
      return isHovered ? intensity * glareIntensity : 0
    }
  )
  
  // Manejar movimiento del mouse
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }
  
  // Restablecer posición al salir
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }
  
  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective,
        borderRadius,
        border: `${borderWidth}px solid ${borderColor}`,
        boxShadow: isHovered ? `0 20px 40px ${shadowColor}` : `0 10px 20px ${shadowColor}`,
        transition: 'box-shadow 0.3s ease',
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
        willChange: 'transform'
      }}
    >
      {/* Contenido */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Efecto de brillo */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glareX} ${glareY}, ${glareColor}, transparent 70%)`,
          opacity: glareOpacity,
          mixBlendMode: 'overlay'
        }}
      />
    </motion.div>
  )
} 