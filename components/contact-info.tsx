"use client"

import { motion } from "motion/react"
import { Github, Linkedin, Mail, Phone, Globe, MapPin } from "lucide-react"
import { contact } from "@/data/resume"

/**
 * ContactInfo - Animated contact information cards
 */
const socialLinks = [
  {
    icon: Mail,
    label: "Email",
    value: contact.email,
    href: `mailto:${contact.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: contact.phone,
    href: `tel:${contact.phone}`,
  },
  {
    icon: Github,
    label: "GitHub",
    value: "shival-gupta",
    href: contact.github,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "shival-gupta",
    href: contact.linkedin,
  },
  {
    icon: Globe,
    label: "Website",
    value: "shivalgupta.me",
    href: contact.website,
  },
]

export function ContactInfo() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-6">Contact Info</h2>
        <div className="space-y-4">
          {socialLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex items-center gap-4 p-4 rounded-lg bg-card/50 border border-border/50 hover:border-primary/30 transition-colors group"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              whileHover={{ x: 4 }}
            >
              <motion.div
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <link.icon className="h-5 w-5" />
              </motion.div>
              <div>
                <p className="text-sm text-muted-foreground">{link.label}</p>
                <p className="font-medium group-hover:text-primary transition-colors">{link.value}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Location */}
      <motion.div
        className="p-6 rounded-lg bg-card/50 border border-border/50 hover:border-primary/30 transition-colors"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        whileHover={{ scale: 1.02 }}
      >
        <h3 className="font-semibold mb-2 flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          Location
        </h3>
        <p className="text-muted-foreground">
          Chennai, India
          <br />
          <span className="text-sm">Open to remote opportunities worldwide</span>
        </p>
      </motion.div>
    </div>
  )
}
