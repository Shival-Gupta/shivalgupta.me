import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProjectsGrid } from "@/components/projects-grid"
import { projects } from "@/data/resume"

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore my portfolio of AI, Robotics, IoT, and XR projects including autonomous robots, VR experiences, and smart home systems.",
}

/**
 * Projects page with filterable grid
 */
export default function ProjectsPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="max-w-2xl mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Projects</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              A collection of my work in AI, Robotics, IoT, and Extended Reality. Each project represents a unique
              challenge solved with cutting-edge technology.
            </p>
          </div>

          {/* Projects Grid */}
          <ProjectsGrid projects={projects} />
        </div>
      </section>
      <Footer />
    </main>
  )
}
