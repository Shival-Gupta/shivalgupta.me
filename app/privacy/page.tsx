import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { contact } from "@/data/resume"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Shival Gupta's portfolio website.",
}

/**
 * Privacy policy page
 * Removed AnimatedSection wrapper - content visible immediately
 */
export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <article className="prose prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary max-w-3xl">
            <h1>Privacy Policy</h1>
            <p className="lead">
              Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>

            <h2>Overview</h2>
            <p>
              This privacy policy describes how {contact.name}'s portfolio website collects, uses, and protects your
              information when you visit this site.
            </p>

            <h2>Information Collection</h2>
            <p>This website may collect the following information:</p>
            <ul>
              <li>
                <strong>Contact form submissions:</strong> Name, email address, and message content when you use the
                contact form.
              </li>
              <li>
                <strong>Analytics data:</strong> Anonymous usage statistics through Vercel Analytics to understand how
                visitors interact with the site.
              </li>
            </ul>

            <h2>Use of Information</h2>
            <p>Any information collected is used solely for:</p>
            <ul>
              <li>Responding to your inquiries</li>
              <li>Improving the website experience</li>
              <li>Understanding site traffic and usage patterns</li>
            </ul>

            <h2>Data Protection</h2>
            <p>
              Your information is kept secure and is not shared with third parties except as required by law or to
              provide the services you request.
            </p>

            <h2>Cookies</h2>
            <p>
              This website uses minimal, essential cookies for functionality. Analytics may use cookies to track
              anonymous usage data.
            </p>

            <h2>Third-Party Services</h2>
            <p>This site may use the following third-party services:</p>
            <ul>
              <li>Vercel (hosting and analytics)</li>
              <li>GitHub (code repository links)</li>
            </ul>

            <h2>Your Rights</h2>
            <p>
              You have the right to request access to, correction of, or deletion of any personal data I hold about you.
            </p>

            <h2>Contact</h2>
            <p>
              For any privacy-related questions, please contact me at{" "}
              <a href={`mailto:${contact.email}`}>{contact.email}</a>.
            </p>
          </article>
        </div>
      </section>
      <Footer />
    </main>
  )
}
