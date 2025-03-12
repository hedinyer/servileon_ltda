"use client"

import { useEffect, useCallback } from 'react'
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

  // Track page views
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = useSearchParams()
      trackEvent('page_view', undefined, {
        url: window.location.href,
        referrer: document.referrer || 'direct',
        query: Object.fromEntries(searchParams?.entries() || [])
      })
    }
  }, [pathname])

  // Track events
  const trackEvent = useCallback((type: string, id?: string, data?: Record<string, any>) => {
    if (typeof window === 'undefined') return

    const event: AnalyticsEvent = {
      type,
      id,
      path: pathname,
      timestamp: new Date().toISOString(),
      data
    }

    // Store in localStorage for demo purposes
    // In a real app, you would send this to your analytics service
    const events = JSON.parse(localStorage.getItem('servileon_events') || '[]')
    events.push(event)
    localStorage.setItem('servileon_events', JSON.stringify(events))

    console.log(`Analytics event: ${type}`, event)
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
    return JSON.parse(localStorage.getItem('servileon_events') || '[]')
  }, [])

  return {
    trackEvent,
    trackButtonClick,
    trackFormSubmission,
    trackServiceView,
    getAnalyticsData
  }
} 