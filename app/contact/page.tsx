import type { Metadata } from "next"
import { Mail, MapPin, Linkedin, Github, Globe } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { contact } from "@/data/resume"
import { ContactInfo } from "@/components/contact-info"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Shival Gupta for collaboration opportunities, project inquiries, or just to say hello.",
}

/**
 * Contact page with form and social links
 * Removed AnimatedSection wrapper, inlined ContactInfo
 */
export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Have a project in mind or want to collaborate? I'd love to hear from you. Fill out the form below or reach
              out directly through any of my channels.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            <ContactForm />

            {/* Contact Info - inlined */}
            <ContactInfo />
            {/* <div className="space-y-6">
              <Card className="bg-card/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <a href={`mailto:${contact.email}`} className="font-medium hover:text-primary transition-colors">
                        {contact.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">{contact.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                <CardHeader>
                  <CardTitle>Connect With Me</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {contact.linkedin && (
                      <Button
                        variant="outline"
                        asChild
                        className="hover:bg-primary/10 hover:text-primary bg-transparent"
                      >
                        <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="h-4 w-4 mr-2" />
                          LinkedIn
                        </a>
                      </Button>
                    )}
                    {contact.github && (
                      <Button
                        variant="outline"
                        asChild
                        className="hover:bg-primary/10 hover:text-primary bg-transparent"
                      >
                        <a href={contact.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          GitHub
                        </a>
                      </Button>
                    )}
                    {contact.website && (
                      <Button
                        variant="outline"
                        asChild
                        className="hover:bg-primary/10 hover:text-primary bg-transparent"
                      >
                        <a href={contact.website} target="_blank" rel="noopener noreferrer">
                          <Globe className="h-4 w-4 mr-2" />
                          Website
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div> */}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
