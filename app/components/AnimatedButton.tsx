"use client"

import { useState, ReactNode, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePageTransition, TransitionType } from '../hooks/usePageTransition'

interface AnimatedButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  disabled?: boolean
  fullWidth?: boolean
  animate?: boolean
  glowColor?: string
  transitionType?: TransitionType
  transitionDuration?: number
  trackingId?: string
}

export default function AnimatedButton({
  children,
  href,
  onClick,
  className = '',
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  disabled = false,
  fullWidth = false,
  animate = true,
  glowColor = 'rgba(212, 175, 55, 0.6)',
  transitionType,
  transitionDuration,
  trackingId
}: AnimatedButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const pageTransition = usePageTransition()
  
  // Configuración de variantes
  const variantStyles = {
    primary: {
      bg: 'bg-gold',
      text: 'text-white',
      border: 'border-transparent',
      hover: 'hover:bg-gold-dark',
      shadow: 'shadow-lg shadow-gold/20'
    },
    secondary: {
      bg: 'bg-servileon-black',
      text: 'text-white',
      border: 'border-transparent',
      hover: 'hover:bg-gray-800',
      shadow: 'shadow-lg shadow-black/20'
    },
    outline: {
      bg: 'bg-transparent',
      text: 'text-gold',
      border: 'border-gold',
      hover: 'hover:bg-gold/10',
      shadow: 'shadow-md shadow-gold/10'
    },
    ghost: {
      bg: 'bg-white/10 backdrop-blur-sm',
      text: 'text-white',
      border: 'border-white/20',
      hover: 'hover:bg-white/20',
      shadow: 'shadow-lg shadow-black/10'
    }
  }
  
  // Configuración de tamaños
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  // Track button click for analytics
  const trackButtonClick = () => {
    if (trackingId && typeof window !== 'undefined') {
      // Simple analytics tracking
      const event = {
        type: 'button_click',
        id: trackingId,
        path: window.location.pathname,
        timestamp: new Date().toISOString()
      }
      
      // Store in localStorage for demo purposes
      // In a real app, you would send this to your analytics service
      const events = JSON.parse(localStorage.getItem('servileon_events') || '[]')
      events.push(event)
      localStorage.setItem('servileon_events', JSON.stringify(events))
      
      console.log(`Button clicked: ${trackingId}`)
    }
  }
  
  // Componente interno del botón
  const ButtonContent = () => (
    <motion.span 
      className="flex items-center justify-center gap-2"
      animate={{ 
        scale: isPressed ? 0.95 : 1
      }}
      transition={{ duration: 0.1 }}
    >
      {icon && iconPosition === 'left' && (
        <motion.span
          animate={{ 
            x: isHovered && animate ? -3 : 0,
            opacity: isHovered ? 1 : 0.9
          }}
          transition={{ duration: 0.2 }}
        >
          {icon}
        </motion.span>
      )}
      
      <span>{children}</span>
      
      {icon && iconPosition === 'right' && (
        <motion.span
          animate={{ 
            x: isHovered && animate ? 3 : 0,
            opacity: isHovered ? 1 : 0.9
          }}
          transition={{ duration: 0.2 }}
        >
          {icon}
        </motion.span>
      )}
    </motion.span>
  )
  
  // Estilos comunes
  const commonStyles = `
    relative overflow-hidden
    font-medium rounded-md transition-all duration-300
    ${variantStyles[variant].bg}
    ${variantStyles[variant].text}
    ${variantStyles[variant].border}
    ${variantStyles[variant].hover}
    ${variantStyles[variant].shadow}
    ${sizeStyles[size]}
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `
  
  // Handle click with page transition
  const handleClick = (e: React.MouseEvent) => {
    if (disabled) return
    
    // Track the click
    trackButtonClick()
    
    // If we have an onClick handler, call it
    if (onClick) {
      onClick()
      return
    }
    
    // If we have an href and should use page transition
    if (href && (transitionType || transitionDuration)) {
      e.preventDefault()
      pageTransition.navigateTo(
        href, 
        transitionType || pageTransition.transitionType,
        transitionDuration || pageTransition.transitionDuration
      )
    }
  }
  
  // Eventos comunes
  const commonEvents = {
    onMouseEnter: () => !disabled && setIsHovered(true),
    onMouseLeave: () => {
      setIsHovered(false)
      setIsPressed(false)
    },
    onMouseDown: () => !disabled && setIsPressed(true),
    onMouseUp: () => !disabled && setIsPressed(false),
    onClick: handleClick
  }
  
  // Renderizar como Link o botón
  if (href && !disabled) {
    return (
      <Link href={href} className={commonStyles} {...commonEvents}>
        <ButtonContent />
        
        {/* Efecto de brillo */}
        {animate && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              opacity: isHovered ? 0.6 : 0,
              scale: isHovered ? 1.1 : 1
            }}
            transition={{ duration: 0.3 }}
            style={{
              background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
              mixBlendMode: 'overlay'
            }}
          />
        )}
      </Link>
    )
  }
  
  return (
    <motion.button
      className={commonStyles}
      disabled={disabled}
      {...commonEvents}
      whileTap={animate && !disabled ? { scale: 0.98 } : {}}
    >
      <ButtonContent />
      
      {/* Efecto de brillo */}
      {animate && !disabled && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            opacity: isHovered ? 0.6 : 0,
            scale: isHovered ? 1.1 : 1
          }}
          transition={{ duration: 0.3 }}
          style={{
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
            mixBlendMode: 'overlay'
          }}
        />
      )}
    </motion.button>
  )
} 