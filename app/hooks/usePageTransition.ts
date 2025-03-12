"use client"

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export type TransitionType = 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale'

export const usePageTransition = (defaultType: TransitionType = 'fade', defaultDuration: number = 0.5) => {
  const pathname = usePathname()
  const router = useRouter()
  const [transitionType, setTransitionType] = useState<TransitionType>(defaultType)
  const [transitionDuration, setTransitionDuration] = useState<number>(defaultDuration)
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false)

  // Handle navigation with transition
  const navigateTo = (href: string, type?: TransitionType, duration?: number) => {
    if (type) setTransitionType(type)
    if (duration) setTransitionDuration(duration)
    
    setIsTransitioning(true)
    
    // Delay navigation to allow exit animation to complete
    setTimeout(() => {
      router.push(href)
      
      // Reset transition state after navigation
      setTimeout(() => {
        setIsTransitioning(false)
      }, (duration || transitionDuration) * 1000)
    }, 50) // Small delay to ensure animation starts
  }

  // Reset transition state on path change
  useEffect(() => {
    setIsTransitioning(false)
  }, [pathname])

  return {
    transitionType,
    transitionDuration,
    isTransitioning,
    navigateTo,
    setTransitionType,
    setTransitionDuration,
    currentPath: pathname
  }
} 