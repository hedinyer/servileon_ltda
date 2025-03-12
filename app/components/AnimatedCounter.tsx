"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'

interface AnimatedCounterProps {
  end: number
  duration?: number
  delay?: number
  prefix?: string
  suffix?: string
  className?: string
  textClassName?: string
  decimalPlaces?: number
}

export default function AnimatedCounter({
  end,
  duration = 2,
  delay = 0,
  prefix = '',
  suffix = '',
  className = '',
  textClassName = '',
  decimalPlaces = 0
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const controls = useAnimation()
  const hasAnimated = useRef(false)
  const isMounted = useRef(false)
  
  // Función para formatear el número
  const formatNumber = (num: number) => {
    if (decimalPlaces === 0) {
      return Math.round(num).toLocaleString()
    }
    return num.toFixed(decimalPlaces).toLocaleString()
  }
  
  // Marcar el componente como montado
  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])
  
  // Iniciar la animación cuando el componente se monta
  useEffect(() => {
    if (!hasAnimated.current && isMounted.current) {
      hasAnimated.current = true
      
      // Función de easing
      const easeOutQuad = (t: number) => 1 - Math.pow(1 - t, 2)
      
      // Iniciar la animación después del delay
      const timer = setTimeout(() => {
        if (!isMounted.current) return
        
        let startTime: number | null = null
        
        const animateCount = (timestamp: number) => {
          if (!startTime) startTime = timestamp
          const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
          const easedProgress = easeOutQuad(progress)
          
          setCount(easedProgress * end)
          
          if (progress < 1 && isMounted.current) {
            requestAnimationFrame(animateCount)
          }
        }
        
        requestAnimationFrame(animateCount)
        
        // Solo iniciar la animación si el componente sigue montado
        if (isMounted.current) {
          controls.start({ opacity: 1, y: 0 })
        }
      }, delay * 1000)
      
      return () => clearTimeout(timer)
    }
  }, [end, duration, delay, controls])
  
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      transition={{ duration: 0.5 }}
    >
      <span className={textClassName}>
        {prefix}{formatNumber(count)}{suffix}
      </span>
    </motion.div>
  )
} 