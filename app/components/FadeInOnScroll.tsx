"use client"

import { useRef, useEffect, useState, ReactNode } from 'react'

type AnimationType = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'none'

interface FadeInOnScrollProps {
  children: ReactNode
  threshold?: number
  delay?: number
  className?: string
  animation?: AnimationType
  duration?: number
  once?: boolean
}

export default function FadeInOnScroll({ 
  children, 
  threshold = 0.1, 
  delay = 0, 
  className = "",
  animation = 'fade-up',
  duration = 1000,
  once = true
}: FadeInOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Usar requestIdleCallback para mejorar el rendimiento
    const scheduleObserver = () => {
      if ('requestIdleCallback' in window) {
        return window.requestIdleCallback(() => {
          setupObserver();
        }, { timeout: 1000 });
      } else {
        return setTimeout(setupObserver, 1);
      }
    };

    const setupObserver = () => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            // Usar requestAnimationFrame para las animaciones
            requestAnimationFrame(() => {
              setTimeout(() => {
                setIsVisible(true)
              }, delay * 1000)
            });
            
            if (once) {
              observer.unobserve(entry.target)
            }
          } else if (!once) {
            setIsVisible(false)
          }
        },
        {
          threshold,
          rootMargin: '0px 0px -100px 0px'
        }
      )

      const currentRef = ref.current
      if (currentRef) {
        observer.observe(currentRef)
      }

      return () => {
        if (currentRef) {
          observer.unobserve(currentRef)
        }
      }
    };

    const idleCallbackId = scheduleObserver();

    return () => {
      if ('requestIdleCallback' in window && typeof idleCallbackId === 'number') {
        window.cancelIdleCallback(idleCallbackId);
      } else if (typeof idleCallbackId === 'number') {
        clearTimeout(idleCallbackId);
      }
    };
  }, [threshold, delay, once])

  // Memoizar las clases de animación para evitar cálculos innecesarios
  const animationClasses = (() => {
    if (animation === 'none') return ''
    
    const baseClasses = `transition-all ease-out`
    const durationClass = `duration-${duration}`
    
    if (!isVisible) {
      switch (animation) {
        case 'fade-up':
          return `${baseClasses} ${durationClass} opacity-0 translate-y-8`
        case 'fade-down':
          return `${baseClasses} ${durationClass} opacity-0 -translate-y-8`
        case 'fade-left':
          return `${baseClasses} ${durationClass} opacity-0 translate-x-8`
        case 'fade-right':
          return `${baseClasses} ${durationClass} opacity-0 -translate-x-8`
        case 'zoom-in':
          return `${baseClasses} ${durationClass} opacity-0 scale-95`
        default:
          return `${baseClasses} ${durationClass} opacity-0`
      }
    } else {
      return `${baseClasses} ${durationClass} opacity-100 translate-y-0 translate-x-0 scale-100`
    }
  })()

  return (
    <div
      ref={ref}
      className={`${animationClasses} ${className}`}
      style={{ 
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay * 1000}ms`,
        willChange: isVisible ? 'opacity, transform' : 'auto' // Optimización para el navegador
      }}
    >
      {children}
    </div>
  )
} 