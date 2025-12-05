"use client"

import { useRef, useState } from "react"
import type { ReactNode, MouseEvent } from "react"

/**
 * MagneticButton - Subtle magnetic hover effect using CSS transforms
 * Replaced Motion spring with CSS transition for smoother feel
 */
interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
}

export function MagneticButton({ children, className = "", strength = 0.2 }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState("translate(0px, 0px)")

  const handleMouse = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()

    const x = (clientX - (left + width / 2)) * strength
    const y = (clientY - (top + height / 2)) * strength

    setTransform(`translate(${x}px, ${y}px)`)
  }

  const reset = () => {
    setTransform("translate(0px, 0px)")
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ transform }}
      className={`transition-transform duration-200 ease-out ${className}`}
    >
      {children}
    </div>
  )
}
