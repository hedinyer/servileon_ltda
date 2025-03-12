"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface ReadingProgressBarProps {
  color?: string
  height?: number
  position?: 'top' | 'bottom'
  zIndex?: number
}

export default function ReadingProgressBar({
  color = '#D4AF37', // Color dorado por defecto
  height = 4,
  position = 'top',
  zIndex = 50
}: ReadingProgressBarProps) {
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    const handleScroll = () => {
      // Calcular el progreso de lectura
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const currentProgress = Math.min(window.scrollY / totalHeight, 1)
      setProgress(currentProgress * 100)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Comprobar posición inicial
    handleScroll()
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  
  return (
    <motion.div
      className={`fixed left-0 ${position === 'top' ? 'top-0' : 'bottom-0'}`}
      style={{
        height: `${height}px`,
        width: `${progress}%`,
        backgroundColor: color,
        zIndex: zIndex,
        transformOrigin: 'left',
      }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ ease: 'easeOut' }}
    />
  )
} 