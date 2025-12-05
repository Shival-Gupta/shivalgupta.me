import Link from "next/link"
import { Github, Linkedin, Mail, Phone } from "lucide-react"
import { contact } from "@/data/resume"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy", label: "Privacy" },
  ]

  const socialLinks = [
    { href: contact.github, icon: Github, label: "GitHub" },
    { href: contact.linkedin, icon: Linkedin, label: "LinkedIn" },
    { href: `mailto:${contact.email}`, icon: Mail, label: "Email" },
    { href: `tel:${contact.phone}`, icon: Phone, label: "Phone" },
  ]

  return (
    <footer className="border-t border-border/40 bg-card/50">
      <div className="container mx-auto px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2 font-mono text-lg font-semibold group">
              <span className="text-primary transition-transform group-hover:scale-110">{"<"}</span>
              <span>{contact.name.split(" ")[0]}</span>
              <span className="text-primary transition-transform group-hover:scale-110">{"/>"}</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Building intelligent systems at the intersection of AI, Robotics, IoT, and Extended Reality.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit hover:translate-x-1 transform duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="font-semibold">Connect</h3>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:scale-110 transition-all"
                  aria-label={link.label}
                >
                  <link.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">{contact.email}</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-border/40 text-center text-sm text-muted-foreground">
          <p>
            © {currentYear} {contact.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
