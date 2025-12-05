"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { contact } from "@/data/resume"
import { ThemeToggle } from "@/components/theme-toggle"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

const socialLinks = [
  { href: contact.github, icon: Github, label: "GitHub" },
  { href: contact.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: `mailto:${contact.email}`, icon: Mail, label: "Email" },
]

export function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-mono text-lg font-semibold tracking-tight group">
          <span className="text-primary transition-transform group-hover:scale-110">{"<"}</span>
          <span>SG</span>
          <span className="text-primary transition-transform group-hover:scale-110">{"/>"}</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors hover:text-primary relative",
                pathname === link.href ? "text-primary" : "text-muted-foreground",
              )}
            >
              {link.label}
              {pathname === link.href && (
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full" />
              )}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-1 md:flex">
          {socialLinks.map((link) => (
            <Button
              key={link.label}
              variant="ghost"
              size="icon"
              asChild
              className="h-9 w-9 text-muted-foreground hover:text-primary"
            >
              <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                <link.icon className="h-4 w-4" />
              </a>
            </Button>
          ))}
          {/* Theme toggle in header */}
          <div className="ml-2 pl-2 border-l border-border">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Toggle menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col gap-6 pt-8">
                <nav className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "px-4 py-3 text-lg font-medium transition-colors hover:bg-muted rounded-lg",
                        pathname === link.href ? "text-primary bg-muted" : "text-foreground",
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                <div className="flex gap-2 px-4 pt-4 border-t">
                  {socialLinks.map((link) => (
                    <Button key={link.label} variant="outline" size="icon" asChild className="h-10 w-10 bg-transparent">
                      <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                        <link.icon className="h-4 w-4" />
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
