import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import { contact } from "@/data/resume"
import { Github, Linkedin, Mail, Phone, Globe } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Shival Gupta for collaboration opportunities, project inquiries, or just to say hello.",
}

/**
 * Contact page with form and social links
 */
export default function ContactPage() {
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

  return (
    <main className="min-h-screen">
      <Navigation />
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="max-w-2xl mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Have a project in mind or want to collaborate? I'd love to hear from you. Fill out the form below or reach
              out directly through any of my channels.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <ContactForm />

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold mb-6">Contact Info</h2>
                <div className="space-y-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-4 p-4 rounded-lg bg-card/50 border border-border/50 hover:border-primary/30 transition-colors group"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <link.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{link.label}</p>
                        <p className="font-medium group-hover:text-primary transition-colors">{link.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="p-6 rounded-lg bg-card/50 border border-border/50">
                <h3 className="font-semibold mb-2">Location</h3>
                <p className="text-muted-foreground">
                  Chennai, India
                  <br />
                  <span className="text-sm">Open to remote opportunities worldwide</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
