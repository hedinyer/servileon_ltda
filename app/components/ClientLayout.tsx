"use client"

import { ThemeProvider } from '@/components/theme-provider'
import { NotificationProvider } from '../hooks/useNotification'
import AnalyticsTracker from './AnalyticsTracker'
import ScrollToTopButton from './ScrollToTopButton'
import ReadingProgressBar from './ReadingProgressBar'

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <NotificationProvider>
        <AnalyticsTracker>
          <ReadingProgressBar />
          {children}
          <ScrollToTopButton />
        </AnalyticsTracker>
      </NotificationProvider>
    </ThemeProvider>
  )
} 