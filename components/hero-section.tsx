"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import { ArrowRight, Download, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { heroContent, skills } from "@/data/resume"

const HeroCanvas = dynamic(() => import("@/components/hero-canvas").then((mod) => mod.HeroCanvas), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />,
})

/**
 * HeroSection - Clean, simple hero without heavy animations
 * Removed GSAP - using CSS transitions only for instant visibility
 */
export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute inset-0 bg-radial-fade" />

      {/* 3D Canvas - responsive visibility */}
      <div className="hidden sm:block sm:opacity-50 md:opacity-70 lg:opacity-100 transition-opacity duration-500">
        <HeroCanvas />
      </div>

      {/* Mobile fallback gradient orbs */}
      <div className="absolute inset-0 sm:hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
      </div>

      {/* Content - all visible immediately */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Greeting */}
          <div className="space-y-4">
            <p className="text-primary font-mono text-sm tracking-wider uppercase">{heroContent.greeting}</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
              {heroContent.name}
            </h1>
          </div>

          {/* Tagline with highlights */}
          <div className="space-y-4">
            <p className="text-lg md:text-xl text-muted-foreground">{heroContent.tagline}</p>
            <div className="flex flex-wrap justify-center gap-2">
              {heroContent.highlights.map((highlight) => (
                <Badge
                  key={highlight}
                  className="px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors cursor-default"
                >
                  {highlight}
                </Badge>
              ))}
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto text-pretty">
            {heroContent.description}
          </p>

          {/* CTAs - removed animation, always visible */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" asChild className="group hover:scale-[1.02] transition-transform">
              <Link href={heroContent.cta.primary.href}>
                {heroContent.cta.primary.text}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="hover:bg-primary/10 hover:scale-[1.02] transition-all bg-transparent"
            >
              <a href={heroContent.cta.secondary.href} download>
                <Download className="mr-2 h-4 w-4" />
                {heroContent.cta.secondary.text}
              </a>
            </Button>
          </div>

          {/* Tech stack preview */}
          <div className="pt-8">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">Tech I work with</p>
            <div className="flex flex-wrap justify-center gap-2">
              {skills
                .flatMap((s) => s.items)
                .slice(0, 8)
                .map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-mono text-muted-foreground bg-muted/50 rounded-full hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator - CSS animation only */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-6 w-6 text-muted-foreground" />
        </div>
      </div>
    </section>
  )
}
