"use client"

import { useRef } from "react"
import { motion, useInView } from "motion/react"

/**
 * TextReveal - Animates text character by character or word by word
 * Creates an elegant typing/reveal effect
 */
interface TextRevealProps {
  text: string
  className?: string
  delay?: number
  byWord?: boolean
}

export function TextReveal({ text, className = "", delay = 0, byWord = false }: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const items = byWord ? text.split(" ") : text.split("")

  return (
    <span ref={ref} className={className}>
      {items.map((item, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.3,
            delay: delay + i * (byWord ? 0.1 : 0.02),
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
        >
          {item}
          {byWord && i < items.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </span>
  )
}
