"use client"

import { useEffect, useRef, type ReactNode } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * GSAPScrollSection - Uses GSAP ScrollTrigger for advanced scroll animations
 * Supports parallax, pinning, and scrub effects
 */
interface GSAPScrollSectionProps {
  children: ReactNode
  className?: string
  animation?: "fadeUp" | "fadeIn" | "scaleUp" | "parallax"
  scrub?: boolean | number
}

export function GSAPScrollSection({
  children,
  className = "",
  animation = "fadeUp",
  scrub = false,
}: GSAPScrollSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const el = sectionRef.current

    const animations = {
      fadeUp: { y: 60, opacity: 0 },
      fadeIn: { opacity: 0 },
      scaleUp: { scale: 0.9, opacity: 0 },
      parallax: { y: 100 },
    }

    const ctx = gsap.context(() => {
      gsap.from(el, {
        ...animations[animation],
        duration: scrub ? 1 : 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "top 20%",
          scrub: scrub,
          toggleActions: scrub ? undefined : "play none none reverse",
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [animation, scrub])

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  )
}

/**
 * GSAPParallaxImage - Creates a parallax scrolling effect on images
 */
interface GSAPParallaxImageProps {
  src: string
  alt: string
  className?: string
  speed?: number
}

export function GSAPParallaxImage({ src, alt, className = "", speed = 0.5 }: GSAPParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        yPercent: -20 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [speed])

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <img ref={imageRef} src={src || "/placeholder.svg"} alt={alt} className="w-full h-[120%] object-cover" />
    </div>
  )
}
