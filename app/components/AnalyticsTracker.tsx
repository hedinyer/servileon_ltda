"use client"

import { Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAnalytics } from '../hooks/useAnalytics'
import ClientOnly from './ClientOnly'

interface AnalyticsTrackerProps {
  children: React.ReactNode
}

// Componente cliente que usa useSearchParams
function ClientAnalyticsTracker({ children }: AnalyticsTrackerProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { trackEvent } = useAnalytics()
  const [isInitialized, setIsInitialized] = useState(false)
  
  // Track page views
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    try {
      // Asegurarse de que solo se ejecute una vez después del montaje
      if (!isInitialized) {
        setIsInitialized(true)
        
        // Track page view on initial load and route changes
        trackEvent('page_view', pathname, {
          url: window.location.href,
          referrer: document.referrer || 'direct',
          query: searchParams ? Object.fromEntries(searchParams.entries()) : {}
        })
      }
      
      // Track user engagement metrics
      const startTime = Date.now()
      let scrollDepth = 0
      
      const handleScroll = () => {
        try {
          const newScrollDepth = Math.max(
            scrollDepth,
            Math.round(
              (window.scrollY + window.innerHeight) / 
              document.documentElement.scrollHeight * 100
            )
          )
          
          if (newScrollDepth > scrollDepth && newScrollDepth % 25 === 0) {
            // Track when user scrolls to 25%, 50%, 75%, 100%
            trackEvent('scroll_depth', pathname, { depth: newScrollDepth })
          }
          
          scrollDepth = newScrollDepth
        } catch (error) {
          console.error('Error in scroll tracking:', error)
        }
      }
      
      // Track time spent on page when leaving
      const trackTimeSpent = () => {
        try {
          const timeSpent = Math.round((Date.now() - startTime) / 1000)
          trackEvent('time_spent', pathname, { seconds: timeSpent })
        } catch (error) {
          console.error('Error tracking time spent:', error)
        }
      }
      
      window.addEventListener('scroll', handleScroll, { passive: true })
      window.addEventListener('beforeunload', trackTimeSpent)
      
      return () => {
        window.removeEventListener('scroll', handleScroll)
        window.removeEventListener('beforeunload', trackTimeSpent)
        trackTimeSpent() // Track time spent when component unmounts (route change)
      }
    } catch (error) {
      console.error('Error in analytics tracking:', error)
      return () => {}
    }
  }, [pathname, searchParams, trackEvent, isInitialized])
  
  return <>{children}</>
}

// Componente principal que envuelve ClientAnalyticsTracker en un Suspense
export default function AnalyticsTracker({ children }: AnalyticsTrackerProps) {
  return (
    <Suspense fallback={<>{children}</>}>
      <ClientOnly fallback={children}>
        <ClientAnalyticsTracker>{children}</ClientAnalyticsTracker>
      </ClientOnly>
    </Suspense>
  )
} 