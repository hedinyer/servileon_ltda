"use client"

import { Suspense } from 'react'
import { ThemeProvider } from '@/components/theme-provider'
import { NotificationProvider } from '../hooks/useNotification'
import AnalyticsTracker from './AnalyticsTracker'
import ScrollToTopButton from './ScrollToTopButton'
import ReadingProgressBar from './ReadingProgressBar'
import ClientOnly from './ClientOnly'

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <NotificationProvider>
        <Suspense fallback={<div>{children}</div>}>
          <AnalyticsTracker>
            <ClientOnly>
              <ReadingProgressBar />
            </ClientOnly>
            {children}
            <ClientOnly>
              <ScrollToTopButton />
            </ClientOnly>
          </AnalyticsTracker>
        </Suspense>
      </NotificationProvider>
    </ThemeProvider>
  )
} 