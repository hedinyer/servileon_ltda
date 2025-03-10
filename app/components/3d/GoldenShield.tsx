"use client"

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface GoldenShieldProps {
  className?: string
  size?: number
  glowColor?: string
  glowIntensity?: number
  gridSize?: number
}

export default function GoldenShield({
  className = '',
  size = 300,
  glowColor = '#FFDF00',
  glowIntensity = 1,
  gridSize = 8
}: GoldenShieldProps) {
  const [isHovered, setIsHovered] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  // Crear el escudo en un canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Configurar tamaño del canvas
    canvas.width = size
    canvas.height = size
    
    // Limpiar canvas
    ctx.clearRect(0, 0, size, size)
    
    // Calcular dimensiones del escudo
    const shieldWidth = size * 0.8
    const shieldHeight = size * 0.9
    const x = (size - shieldWidth) / 2
    const y = (size - shieldHeight) / 2
    
    // Dibujar forma del escudo
    ctx.save()
    drawShieldPath(ctx, x, y, shieldWidth, shieldHeight)
    
    // Crear gradiente para el borde
    const borderGradient = ctx.createLinearGradient(0, 0, size, size)
    borderGradient.addColorStop(0, '#FFDF00')
    borderGradient.addColorStop(0.5, '#D4AF37')
    borderGradient.addColorStop(1, '#FFDF00')
    
    // Dibujar borde brillante
    ctx.strokeStyle = borderGradient
    ctx.lineWidth = size * 0.03
    ctx.stroke()
    
    // Crear gradiente para el fondo
    const fillGradient = ctx.createRadialGradient(
      size / 2, size / 2, 0,
      size / 2, size / 2, shieldHeight / 2
    )
    fillGradient.addColorStop(0, '#D4AF37')
    fillGradient.addColorStop(0.8, '#B8860B')
    fillGradient.addColorStop(1, '#8B6914')
    
    // Rellenar escudo
    ctx.fillStyle = fillGradient
    ctx.fill()
    ctx.restore()
    
    // Dibujar patrón de rejilla
    drawGrid(ctx, x, y, shieldWidth, shieldHeight, gridSize)
    
    // Dibujar brillo en las esquinas
    drawShineEffect(ctx, x, y, shieldWidth, shieldHeight)
    
  }, [size, gridSize])
  
  // Función para dibujar la forma del escudo
  const drawShieldPath = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number
  ) => {
    ctx.beginPath()
    
    // Parte superior
    ctx.moveTo(x, y)
    ctx.lineTo(x + width, y)
    
    // Lado derecho
    ctx.quadraticCurveTo(
      x + width + width * 0.1, y + height * 0.4,
      x + width / 2, y + height
    )
    
    // Lado izquierdo
    ctx.quadraticCurveTo(
      x - width * 0.1, y + height * 0.4,
      x, y
    )
    
    ctx.closePath()
  }
  
  // Función para dibujar el patrón de rejilla
  const drawGrid = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    gridSize: number
  ) => {
    ctx.save()
    
    // Crear path para recortar
    drawShieldPath(ctx, x, y, width, height)
    ctx.clip()
    
    // Dibujar líneas de la rejilla
    const cellSize = width / gridSize
    
    ctx.strokeStyle = 'rgba(139, 117, 0, 0.3)'
    ctx.lineWidth = 1
    
    // Líneas horizontales
    for (let i = 0; i <= gridSize; i++) {
      const yPos = y + i * cellSize
      ctx.beginPath()
      ctx.moveTo(x, yPos)
      ctx.lineTo(x + width, yPos)
      ctx.stroke()
    }
    
    // Líneas verticales
    for (let i = 0; i <= gridSize; i++) {
      const xPos = x + i * cellSize
      ctx.beginPath()
      ctx.moveTo(xPos, y)
      ctx.lineTo(xPos, y + height)
      ctx.stroke()
    }
    
    ctx.restore()
  }
  
  // Función para dibujar efectos de brillo
  const drawShineEffect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number
  ) => {
    ctx.save()
    
    // Crear path para recortar
    drawShieldPath(ctx, x, y, width, height)
    ctx.clip()
    
    // Brillo superior izquierdo
    const gradient1 = ctx.createRadialGradient(
      x + width * 0.2, y + height * 0.2, 0,
      x + width * 0.2, y + height * 0.2, width * 0.3
    )
    gradient1.addColorStop(0, 'rgba(255, 255, 255, 0.8)')
    gradient1.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)')
    gradient1.addColorStop(1, 'rgba(255, 255, 255, 0)')
    
    ctx.fillStyle = gradient1
    ctx.fillRect(x, y, width, height)
    
    // Brillo inferior derecho
    const gradient2 = ctx.createRadialGradient(
      x + width * 0.8, y + height * 0.6, 0,
      x + width * 0.8, y + height * 0.6, width * 0.2
    )
    gradient2.addColorStop(0, 'rgba(255, 255, 255, 0.4)')
    gradient2.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)')
    gradient2.addColorStop(1, 'rgba(255, 255, 255, 0)')
    
    ctx.fillStyle = gradient2
    ctx.fillRect(x, y, width, height)
    
    ctx.restore()
  }
  
  return (
    <div 
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Canvas para dibujar el escudo */}
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
      
      {/* Efecto de brillo exterior */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        animate={{
          boxShadow: isHovered
            ? `0 0 ${size * 0.1}px ${size * 0.05}px ${glowColor}`
            : `0 0 ${size * 0.05}px ${size * 0.02}px ${glowColor}`
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Área interactiva */}
      <div 
        className="absolute inset-0 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
    </div>
  )
} 