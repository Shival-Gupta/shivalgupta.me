"use client"

import { useEffect, useRef } from "react"

/**
 * CursorGlow - Smooth glowing cursor effect
 * Fixed lg:hidden bug - should show on large screens, not hide
 */
export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const currentPos = useRef({ x: 0, y: 0 })
  const rafId = useRef<number>(0)

  useEffect(() => {
    const hasPointer = window.matchMedia("(pointer: fine)").matches
    if (!hasPointer || !glowRef.current) return

    glowRef.current.style.display = "block"

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }

    const animate = () => {
      const lerp = 0.25
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * lerp
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * lerp

      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(600px circle at ${currentPos.current.x}px ${currentPos.current.y}px, rgba(115, 86, 215, 0.06), transparent 40%)`
      }

      rafId.current = requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    rafId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <div ref={glowRef} className="pointer-events-none fixed inset-0 z-30 hidden lg:block" style={{ display: "none" }} />
  )
}
