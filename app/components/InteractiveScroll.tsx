"use client"

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface InteractiveScrollProps {
  className?: string
  text?: string
  color?: string
  onClick?: () => void
}

export default function InteractiveScroll({ 
  className = '', 
  text = 'Scroll', 
  color = '#D4AF37',
  onClick
}: InteractiveScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  
  // Valores de movimiento
  const y = useMotionValue(0)
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 })
  
  // Controlar visibilidad basada en el scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Animación de rebote
  useEffect(() => {
    let interval: NodeJS.Timeout
    
    if (isVisible) {
      interval = setInterval(() => {
        y.set(0)
        setTimeout(() => {
          y.set(10)
        }, 100)
      }, 2000)
    }
    
    return () => clearInterval(interval)
  }, [y, isVisible])
  
  // Manejar clic
  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      // Scroll suave hacia abajo por defecto
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      })
    }
  }
  
  return (
    <motion.div
      ref={ref}
      className={`fixed bottom-10 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center cursor-pointer ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 20
      }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      style={{ y: ySpring }}
    >
      <motion.span 
        className="text-sm mb-2 font-medium"
        style={{ color }}
        animate={{ 
          scale: isHovered ? 1.1 : 1,
          opacity: isHovered ? 1 : 0.8
        }}
      >
        {text}
      </motion.span>
      
      <motion.div
        className="relative flex items-center justify-center"
        animate={{ 
          scale: isHovered ? 1.2 : 1
        }}
      >
        {/* Círculo exterior */}
        <motion.div 
          className="absolute rounded-full"
          style={{ 
            backgroundColor: color,
            width: '40px',
            height: '40px',
            opacity: 0.2
          }}
          animate={{ 
            scale: isHovered ? 1.2 : 1,
          }}
        />
        
        {/* Círculo interior */}
        <motion.div 
          className="rounded-full flex items-center justify-center"
          style={{ 
            backgroundColor: color,
            width: '30px',
            height: '30px',
          }}
          animate={{ 
            scale: isHovered ? 1.1 : 1,
          }}
        >
          <ChevronDown className="h-5 w-5 text-white" />
        </motion.div>
      </motion.div>
    </motion.div>
  )
} 