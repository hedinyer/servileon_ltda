"use client"

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import NotificationToast, { NotificationType } from '../components/NotificationToast'

interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  duration?: number
}

interface NotificationContextType {
  notifications: Notification[]
  showNotification: (type: NotificationType, title: string, message: string, duration?: number) => void
  hideNotification: (id: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  
  // Show a new notification
  const showNotification = useCallback((
    type: NotificationType, 
    title: string, 
    message: string, 
    duration = 5000
  ) => {
    const id = Date.now().toString()
    
    setNotifications(prev => [
      ...prev,
      { id, type, title, message, duration }
    ])
    
    // Auto-remove notification after duration (if not 0)
    if (duration > 0) {
      setTimeout(() => {
        hideNotification(id)
      }, duration + 300) // Add 300ms for animation
    }
    
    return id
  }, [])
  
  // Hide a notification by id
  const hideNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }, [])
  
  return (
    <NotificationContext.Provider value={{ notifications, showNotification, hideNotification }}>
      {children}
      
      {/* Render all active notifications */}
      {notifications.map(notification => (
        <NotificationToast
          key={notification.id}
          type={notification.type}
          title={notification.title}
          message={notification.message}
          duration={notification.duration}
          onClose={() => hideNotification(notification.id)}
          isVisible={true}
        />
      ))}
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)
  
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  
  return context
} 