"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'

export type NotificationType = 'success' | 'error' | 'info' | 'warning'

interface NotificationToastProps {
  type: NotificationType
  title: string
  message: string
  duration?: number
  onClose?: () => void
  isVisible: boolean
}

export default function NotificationToast({
  type = 'info',
  title,
  message,
  duration = 5000,
  onClose,
  isVisible
}: NotificationToastProps) {
  const [isClosing, setIsClosing] = useState(false)
  
  // Auto-close after duration
  useEffect(() => {
    if (!isVisible || duration === 0) return
    
    const timer = setTimeout(() => {
      setIsClosing(true)
      
      // Small delay to allow exit animation
      setTimeout(() => {
        if (onClose) onClose()
        setIsClosing(false)
      }, 300)
    }, duration)
    
    return () => clearTimeout(timer)
  }, [isVisible, duration, onClose])
  
  // Handle close button click
  const handleClose = () => {
    setIsClosing(true)
    
    // Small delay to allow exit animation
    setTimeout(() => {
      if (onClose) onClose()
      setIsClosing(false)
    }, 300)
  }
  
  // Icon and color based on type
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          icon: <CheckCircle className="h-6 w-6" />,
          bgColor: 'bg-green-50',
          borderColor: 'border-green-500',
          iconColor: 'text-green-500',
          titleColor: 'text-green-800',
          messageColor: 'text-green-700'
        }
      case 'error':
        return {
          icon: <AlertCircle className="h-6 w-6" />,
          bgColor: 'bg-red-50',
          borderColor: 'border-red-500',
          iconColor: 'text-red-500',
          titleColor: 'text-red-800',
          messageColor: 'text-red-700'
        }
      case 'warning':
        return {
          icon: <AlertTriangle className="h-6 w-6" />,
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-500',
          iconColor: 'text-yellow-500',
          titleColor: 'text-yellow-800',
          messageColor: 'text-yellow-700'
        }
      case 'info':
      default:
        return {
          icon: <Info className="h-6 w-6" />,
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-500',
          iconColor: 'text-blue-500',
          titleColor: 'text-blue-800',
          messageColor: 'text-blue-700'
        }
    }
  }
  
  const styles = getTypeStyles()
  
  return (
    <AnimatePresence>
      {isVisible && !isClosing && (
        <motion.div
          className={`fixed top-4 right-4 z-50 max-w-md rounded-lg shadow-lg border-l-4 ${styles.bgColor} ${styles.borderColor}`}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-4 flex">
            <div className={`flex-shrink-0 ${styles.iconColor} mr-4`}>
              {styles.icon}
            </div>
            <div className="flex-1">
              <h3 className={`font-medium ${styles.titleColor}`}>{title}</h3>
              <p className={`text-sm mt-1 ${styles.messageColor}`}>{message}</p>
            </div>
            <button 
              onClick={handleClose}
              className="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Progress bar */}
          {duration > 0 && (
            <motion.div 
              className={`h-1 ${styles.borderColor.replace('border', 'bg')}`}
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: duration / 1000, ease: 'linear' }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
} 