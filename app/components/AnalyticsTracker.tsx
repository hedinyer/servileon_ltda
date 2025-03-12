"use client"

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useAnalytics } from '../hooks/useAnalytics'

interface AnalyticsTrackerProps {
  children: React.ReactNode
}

export default function AnalyticsTracker({ children }: AnalyticsTrackerProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { trackEvent } = useAnalytics()
  
  // Track page views
  useEffect(() => {
    // Track page view on initial load and route changes
    trackEvent('page_view', pathname, {
      url: window.location.href,
      referrer: document.referrer || 'direct',
      query: Object.fromEntries(searchParams.entries())
    })
    
    // Track user engagement metrics
    const startTime = Date.now()
    let scrollDepth = 0
    
    const handleScroll = () => {
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
    }
    
    // Track time spent on page when leaving
    const trackTimeSpent = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000)
      trackEvent('time_spent', pathname, { seconds: timeSpent })
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('beforeunload', trackTimeSpent)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('beforeunload', trackTimeSpent)
      trackTimeSpent() // Track time spent when component unmounts (route change)
    }
  }, [pathname, searchParams, trackEvent])
  
  return <>{children}</>
} 