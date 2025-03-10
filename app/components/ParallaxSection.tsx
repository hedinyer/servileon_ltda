"use client"

import { useRef, ReactNode, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ParallaxSectionProps {
  children: ReactNode
  className?: string
  speed?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  overflow?: boolean
  zIndex?: number
  opacity?: [number, number]
  scale?: [number, number]
}

export default function ParallaxSection({
  children,
  className = '',
  speed = 0.5,
  direction = 'up',
  overflow = false,
  zIndex = 0,
  opacity = [1, 1],
  scale = [1, 1]
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [elementTop, setElementTop] = useState(0)
  const [clientHeight, setClientHeight] = useState(0)
  
  // Actualizar posición y altura cuando cambia el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        setElementTop(rect.top + window.scrollY)
        setClientHeight(window.innerHeight)
      }
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  
  // Calcular el rango de scroll para la animación
  const { scrollY } = useScroll()
  const start = elementTop - clientHeight
  const end = elementTop + (ref.current?.offsetHeight || 0)
  
  // Configurar transformaciones según la dirección
  let transformValue
  switch (direction) {
    case 'up':
      transformValue = useTransform(scrollY, [start, end], ['0%', `${-speed * 100}%`])
      break
    case 'down':
      transformValue = useTransform(scrollY, [start, end], ['0%', `${speed * 100}%`])
      break
    case 'left':
      transformValue = useTransform(scrollY, [start, end], ['0%', `${-speed * 100}%`])
      break
    case 'right':
      transformValue = useTransform(scrollY, [start, end], ['0%', `${speed * 100}%`])
      break
    default:
      transformValue = useTransform(scrollY, [start, end], ['0%', `${-speed * 100}%`])
  }
  
  // Configurar opacidad y escala
  const opacityValue = useTransform(scrollY, [start, end], opacity)
  const scaleValue = useTransform(scrollY, [start, end], scale)
  
  // Determinar la propiedad de transformación según la dirección
  const isHorizontal = direction === 'left' || direction === 'right'
  const motionStyle = {
    y: !isHorizontal ? transformValue : 0,
    x: isHorizontal ? transformValue : 0,
    opacity: opacityValue,
    scale: scaleValue,
    zIndex
  }
  
  return (
    <div 
      ref={ref} 
      className={`${overflow ? 'overflow-hidden' : ''} ${className}`}
    >
      <motion.div
        style={motionStyle}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  )
} 