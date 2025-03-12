"use client"

import { useEffect, useCallback, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

interface AnalyticsEvent {
  type: string
  id?: string
  path: string
  timestamp: string
  data?: Record<string, any>
}

export const useAnalytics = () => {
  const pathname = usePathname()
  // Usar useRef para evitar problemas de dependencias circulares
  const trackEventRef = useRef<(type: string, id?: string, data?: Record<string, any>) => void>()

  // Track events - definir primero la función básica
  const trackEvent = useCallback((type: string, id?: string, data?: Record<string, any>) => {
    if (typeof window === 'undefined') return

    try {
      const event: AnalyticsEvent = {
        type,
        id,
        path: pathname || '',
        timestamp: new Date().toISOString(),
        data
      }

      // Store in localStorage for demo purposes
      // In a real app, you would send this to your analytics service
      const events = JSON.parse(localStorage.getItem('servileon_events') || '[]')
      events.push(event)
      localStorage.setItem('servileon_events', JSON.stringify(events))

      console.log(`Analytics event: ${type}`, event)
    } catch (error) {
      console.error('Error tracking event:', error)
    }
  }, [pathname])

  // Guardar la referencia para usarla en efectos
  useEffect(() => {
    trackEventRef.current = trackEvent
  }, [trackEvent])

  // Track page views
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        // Usar un setTimeout para asegurar que el componente esté montado
        const timer = setTimeout(() => {
          const searchParams = useSearchParams()
          if (trackEventRef.current) {
            trackEventRef.current('page_view', undefined, {
              url: window.location.href,
              referrer: document.referrer || 'direct',
              query: searchParams ? Object.fromEntries(searchParams.entries()) : {}
            })
          }
        }, 0)
        
        return () => clearTimeout(timer)
      } catch (error) {
        console.error('Error in page view tracking:', error)
      }
    }
  }, [pathname])

  // Track button clicks
  const trackButtonClick = useCallback((id: string, data?: Record<string, any>) => {
    trackEvent('button_click', id, data)
  }, [trackEvent])

  // Track form submissions
  const trackFormSubmission = useCallback((id: string, data?: Record<string, any>) => {
    trackEvent('form_submission', id, data)
  }, [trackEvent])

  // Track service views
  const trackServiceView = useCallback((serviceId: string) => {
    trackEvent('service_view', serviceId)
  }, [trackEvent])

  // Get analytics data
  const getAnalyticsData = useCallback(() => {
    if (typeof window === 'undefined') return []
    try {
      return JSON.parse(localStorage.getItem('servileon_events') || '[]')
    } catch (error) {
      console.error('Error getting analytics data:', error)
      return []
    }
  }, [])

  return {
    trackEvent,
    trackButtonClick,
    trackFormSubmission,
    trackServiceView,
    getAnalyticsData
  }
} 