import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AboutContent } from "@/components/about-content"

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Shival Gupta - B.Tech graduate from VIT Chennai specializing in AI and Robotics, with experience in XR development and full-stack engineering.",
}

/**
 * About page with timeline and skills
 */
export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <AboutContent />
      <Footer />
    </main>
  )
}
