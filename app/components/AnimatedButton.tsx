"use client"

import { useState, ReactNode } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

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
  glowColor = 'rgba(212, 175, 55, 0.6)'
}: AnimatedButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  
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
  
  // Eventos comunes
  const commonEvents = {
    onMouseEnter: () => !disabled && setIsHovered(true),
    onMouseLeave: () => {
      setIsHovered(false)
      setIsPressed(false)
    },
    onMouseDown: () => !disabled && setIsPressed(true),
    onMouseUp: () => !disabled && setIsPressed(false),
    onClick: !disabled && onClick ? onClick : undefined
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