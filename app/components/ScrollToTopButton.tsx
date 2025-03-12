"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp } from 'lucide-react'

interface ScrollToTopButtonProps {
  showAtHeight?: number
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center'
  color?: 'gold' | 'black' | 'white'
}

export default function ScrollToTopButton({
  showAtHeight = 300,
  position = 'bottom-right',
  color = 'gold'
}: ScrollToTopButtonProps) {
  const [isVisible, setIsVisible] = useState(false)
  
  // Posición del botón
  const positionClasses = {
    'bottom-right': 'bottom-8 right-8',
    'bottom-left': 'bottom-8 left-8',
    'bottom-center': 'bottom-8 left-1/2 transform -translate-x-1/2'
  }
  
  // Colores del botón
  const colorClasses = {
    'gold': 'bg-gold hover:bg-gold-dark text-white',
    'black': 'bg-servileon-black hover:bg-gray-800 text-white',
    'white': 'bg-white hover:bg-gray-100 text-servileon-black border border-gray-200'
  }
  
  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > showAtHeight)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Comprobar posición inicial
    handleScroll()
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [showAtHeight])
  
  // Función para volver arriba
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className={`fixed ${positionClasses[position]} ${colorClasses[color]} p-3 rounded-full shadow-lg z-50`}
          onClick={scrollToTop}
          aria-label="Volver arriba"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <ChevronUp className="h-6 w-6" />
        </motion.button>
      )}
    </AnimatePresence>
  )
} 