"use client"

// Componente temporalmente deshabilitado debido a problemas de compatibilidad 
// con React 19 y HMR de @react-three/fiber
// Se puede reactivar cuando @react-three/fiber tenga mejor soporte para React 19

export default function FloatingLogos({ 
  className = '', 
  count = 10, 
  minSize = 1, 
  maxSize = 3,
  minOpacity = 0.05,
  maxOpacity = 0.2
}: {
  className?: string,
  count?: number,
  minSize?: number,
  maxSize?: number,
  minOpacity?: number,
  maxOpacity?: number
}) {
  // Componente deshabilitado temporalmente
  return null
}

