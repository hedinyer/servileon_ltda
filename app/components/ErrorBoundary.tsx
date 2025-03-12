"use client"

import { useEffect, useState } from 'react'

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

/**
 * Componente para manejar errores en la aplicación
 * Captura errores de JavaScript y muestra un fallback
 */
export default function ErrorBoundary({ 
  children, 
  fallback = <div className="p-4 text-center">Algo salió mal. Por favor, recarga la página.</div> 
}: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    // Función para manejar errores no capturados
    const handleError = (event: ErrorEvent) => {
      console.error('Error capturado por ErrorBoundary:', event.error)
      setHasError(true)
      // Prevenir que el error se propague
      event.preventDefault()
    }

    // Función para manejar rechazos de promesas no capturados
    const handleRejection = (event: PromiseRejectionEvent) => {
      console.error('Promesa rechazada capturada por ErrorBoundary:', event.reason)
      setHasError(true)
      // Prevenir que el rechazo se propague
      event.preventDefault()
    }

    // Registrar los manejadores de eventos
    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleRejection)

    // Limpiar los manejadores de eventos al desmontar
    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleRejection)
    }
  }, [])

  // Si hay un error, mostrar el fallback
  if (hasError) {
    return <>{fallback}</>
  }

  // Si no hay error, mostrar los children
  return <>{children}</>
} 