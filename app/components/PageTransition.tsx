"use client"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { TransitionType } from "../hooks/usePageTransition"

interface PageTransitionProps {
  children: React.ReactNode
  type?: TransitionType
  duration?: number
  isTransitioning?: boolean
}

export default function PageTransition({
  children,
  type = 'fade',
  duration = 0.5,
  isTransitioning = false
}: PageTransitionProps) {
  const pathname = usePathname()

  const getAnimationVariants = () => {
    switch (type) {
      case 'slide-up':
        return {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -20 }
        }
      case 'slide-down':
        return {
          initial: { opacity: 0, y: -20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: 20 }
        }
      case 'slide-left':
        return {
          initial: { opacity: 0, x: 20 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -20 }
        }
      case 'slide-right':
        return {
          initial: { opacity: 0, x: -20 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: 20 }
        }
      case 'scale':
        return {
          initial: { opacity: 0, scale: 0.95 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.95 }
        }
      case 'fade':
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 }
        }
    }
  }

  const variants = getAnimationVariants()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        transition={{ 
          duration: duration, 
          ease: [0.22, 1, 0.36, 1] // Custom cubic-bezier for smooth transitions
        }}
        className={isTransitioning ? "pointer-events-none" : ""}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
} 