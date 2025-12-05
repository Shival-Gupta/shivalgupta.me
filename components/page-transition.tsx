"use client"

import { motion, AnimatePresence } from "motion/react"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"

/**
 * PageTransition - Wraps page content with smooth enter/exit animations
 * Uses Motion (Framer Motion) for declarative animations
 */
interface PageTransitionProps {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1], // Custom easing for smooth feel
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
