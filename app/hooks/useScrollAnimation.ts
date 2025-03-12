"use client"

import { useState, useEffect, useCallback } from 'react'

export const useScrollAnimation = () => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)
  
  // Handle scroll event
  const handleScroll = useCallback(() => {
    // Calculate scroll progress (0 to 1)
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight
    const progress = Math.min(window.scrollY / totalHeight, 1)
    setScrollProgress(progress)
    
    // Show scroll to top button after scrolling down 300px
    setShowScrollTop(window.scrollY > 300)
  }, [])
  
  // Scroll to top function
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [])
  
  // Scroll to element function
  const scrollToElement = useCallback((elementId: string) => {
    const element = document.getElementById(elementId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }, [])
  
  // Add scroll event listener
  useEffect(() => {
    // Use throttle to improve performance
    let ticking = false
    
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }
    
    window.addEventListener('scroll', onScroll)
    
    // Initial call
    handleScroll()
    
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [handleScroll])
  
  return {
    scrollProgress,
    showScrollTop,
    scrollToTop,
    scrollToElement
  }
} 