"use client"

import type React from "react"
import { useState } from "react"
import { Send, Loader2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    formData.append("access_key", "a134c1b4-1d47-4d1d-be1a-11017c553532")

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        setIsSubmitted(true)
      } else {
        console.error("Submission failed:", data)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="bg-card/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
      {isSubmitted ? (
        <CardContent className="pt-6">
          <div className="text-center py-12 space-y-4">
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h3 className="text-xl font-semibold">Message Sent!</h3>
            <p className="text-muted-foreground">
              Thank you for reaching out. I'll get back to you as soon as possible.
            </p>
            <Button variant="outline" onClick={() => setIsSubmitted(false)} className="hover:bg-primary/10">
              Send Another Message
            </Button>
          </div>
        </CardContent>
      ) : (
        <>
          <CardHeader>
            <CardTitle>Send a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Spam protection: Hidden field */}
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    required
                    disabled={isSubmitting}
                    className="focus:border-primary focus:ring-primary/20 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    disabled={isSubmitting}
                    className="focus:border-primary focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="What's this about?"
                  required
                  disabled={isSubmitting}
                  className="focus:border-primary focus:ring-primary/20 transition-all"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project or just say hi..."
                  rows={5}
                  required
                  disabled={isSubmitting}
                  className="focus:border-primary focus:ring-primary/20 transition-all resize-none"
                />
              </div>

              <Button type="submit" className="w-full hover:scale-[1.01] transition-transform" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </>
      )}
    </Card>
  )
}