"use client"
import { useRef } from "react"
import { Download, Briefcase, GraduationCap, Code, Music, Camera, Activity, Video, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { skills, experience, education, extracurriculars } from "@/data/resume"

const activityIcons: Record<string, typeof Music> = {
  music: Music,
  camera: Camera,
  activity: Activity,
  video: Video,
}

/**
 * AboutContent - Timeline and skills with smooth GSAP scroll animations
 * Simplified animations - removed blur/clip effects, using simple opacity + y transforms
 */
export function AboutContent() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const experienceRef = useRef<HTMLDivElement>(null)
  const educationRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const interestsRef = useRef<HTMLDivElement>(null)

  return (
    <section className="pt-24 pb-16" ref={containerRef}>
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16" ref={headerRef}>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">About Me</h1>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6 text-pretty">
            I'm a passionate developer specializing in AI, Robotics, IoT, and Extended Reality. With a B.Tech in
            Computer Science from VIT Chennai, I love building systems that bridge the physical and digital worlds.
          </p>
          <Button asChild className="hover:scale-[1.02] transition-transform">
            <a href="https://resume.shivalgupta.me/" download>
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </a>
          </Button>
        </div>

        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Experience Timeline */}
            <div ref={experienceRef}>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                Experience
              </h2>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div
                    key={exp.id}
                    className="relative pl-8 pb-6 border-l-2 border-border last:border-transparent group hover:border-primary/50 transition-colors"
                  >
                    <div className="absolute left-[-9px] top-0 h-4 w-4 rounded-full bg-primary border-4 border-background group-hover:scale-110 transition-transform" />
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="font-semibold transition-all duration-500 group-hover:drop-shadow-[0_0_5px_currentColor]">{exp.role}</h3>
                        <span className="text-sm font-mono text-muted-foreground">{exp.dateRange}</span>
                      </div>
                      <p className="text-primary">
                        {exp.company}
                        <span className="text-muted-foreground"> · {exp.location}</span>
                      </p>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {exp.description.map((item, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="text-primary">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                      {exp.certificateUrl && (
                        <Badge variant="outline" className="mt-2 hover:bg-primary/10 transition-colors">
                          <Award className="h-3 w-3 mr-1" />
                          Certificate Available
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Timeline */}
            <div ref={educationRef}>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                Education
              </h2>
              <div className="space-y-6">
                {education.map((edu) => (
                  <div
                    key={edu.id}
                    className="relative pl-8 pb-6 border-l-2 border-border last:border-transparent group hover:border-primary/50 transition-colors"
                  >
                    <div className="absolute left-[-9px] top-0 h-4 w-4 rounded-full bg-primary border-4 border-background group-hover:scale-110 transition-transform" />
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="font-semibold group-hover:text-primary transition-colors">{edu.degree}</h3>
                        <span className="text-sm font-mono text-muted-foreground">{edu.dateRange}</span>
                      </div>
                      <p className="text-muted-foreground">
                        {edu.institution}
                        {edu.location && `, ${edu.location}`}
                      </p>
                      <Badge variant="secondary" className="mt-2">
                        {edu.gradeType}: {edu.grade}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <Card
              ref={skillsRef}
              className="bg-card/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  Technical Skills
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {skills.map((skillGroup) => (
                  <div key={skillGroup.category}>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">{skillGroup.category}</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {skillGroup.items.map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="font-mono text-xs hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors cursor-default"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Interests card */}
            <Card
              ref={interestsRef}
              className="bg-card/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <CardHeader>
                <CardTitle>Beyond Code</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {extracurriculars.map((activity) => {
                    const Icon = activityIcons[activity.icon || "activity"] || Activity
                    return (
                      <div
                        key={activity.name}
                        className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
                      >
                        <Icon className="h-4 w-4 text-primary" />
                        <span className="text-sm">{activity.name}</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
