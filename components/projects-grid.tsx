"use client"

import { useState } from "react"
import {
  Github,
  ExternalLink,
  Play,
  Award,
  Bot,
  Cpu,
  Wifi,
  Glasses,
  Globe,
  Gamepad2,
  Terminal,
  LayoutGrid,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import type { Project, ProjectCategory } from "@/data/resume"
import { VideoPlayer } from "@/components/video-player"

const categories = [
  { id: "all", label: "All", icon: LayoutGrid },
  { id: "ai", label: "AI", icon: Cpu },
  { id: "robotics", label: "Robotics", icon: Bot },
  { id: "iot", label: "IoT", icon: Wifi },
  { id: "web", label: "Web", icon: Globe },
  { id: "systems", label: "Systems", icon: Terminal },
  { id: "xr", label: "XR", icon: Glasses },
  { id: "games", label: "Games", icon: Gamepad2 },
] as const

const categoryColors: Record<ProjectCategory, string> = {
  ai: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  robotics: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  iot: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  xr: "bg-primary/10 text-primary border-primary/20",
  web: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  games: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  systems: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
}

interface ProjectsGridProps {
  projects: Project[]
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all")

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) =>
          p.categories.includes(activeFilter as ProjectCategory)
        )

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const Icon = cat.icon
          const count =
            cat.id === "all"
              ? projects.length
              : projects.filter((p) =>
                  p.categories.includes(cat.id as ProjectCategory)
                ).length

          return (
            <Button
              key={cat.id}
              variant={activeFilter === cat.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(cat.id)}
              className={cn(
                "gap-2",
                activeFilter !== cat.id && "hover:border-primary/50"
              )}
            >
              <Icon className="h-4 w-4" />
              {cat.label}
              <span
                className={cn(
                  "text-xs px-1 py-0.2 rounded-full tabular-nums",
                  activeFilter === cat.id
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {count}
              </span>
            </Button>
          )
        })}
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No projects found in this category.
        </div>
      )}
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="group flex flex-col h-full bg-card/50 border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-200 hover:-translate-y-1duration-200 hover:-translate-y-0.5">
      <CardHeader className="space-y-3">
        {/* Date */}
        <span className="text-xs text-muted-foreground font-mono">
          {project.dateRange}
        </span>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {project.categories.map((cat) => (
            <Badge
              key={cat}
              variant="outline"
              className={cn("capitalize", categoryColors[cat])}
            >
              {cat}
            </Badge>
          ))}
        </div>

        {/* Title + Subtitle */}
        <div>
          <CardTitle className="text-lg group-hover:text-primary transition-colors">
            {project.title}
          </CardTitle>

          {project.subtitle && (
            <div className="flex items-start justify-between gap-2 mt-1">
              <CardDescription className="flex items-center gap-1.5">
                {project.subtitle.includes("Winner") && (
                  <Award className="h-3.5 w-3.5 text-yellow-500" />
                )}
                {project.subtitle}
              </CardDescription>

              {project.certificateUrl && (
                <a
  href={project.certificateUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="shrink-0 flex items-center gap-1"
>
  <Badge
    variant="outline"
    className="
      bg-yellow-600/10
      text-yellow-500/90
      border-yellow-500/20
      text-xs
    "
  >
    <Award className="h-3 w-3 mr-1" />
    Certified
  </Badge>

  {/* External link affordance (card-hover driven) */}
  <span
    className="
      pointer-events-none
      inline-flex items-center
      opacity-0
      translate-x-[-4px]
      transition-[opacity,transform]
      duration-200
      ease-out
      group-hover:opacity-100
      group-hover:translate-x-0
      group-focus-within:opacity-100
      group-focus-within:translate-x-0
      text-yellow-500/80
    "
  >
    <ExternalLink className="h-3 w-3" />
  </span>
</a>


              )}
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        <ul className="space-y-2 text-sm text-muted-foreground">
          {project.description.map((line, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-primary mt-1.5">•</span>
              <span>{line}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-xs font-mono bg-muted rounded-md text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 pt-4 border-t border-border/50">
        {project.demoUrl && (
          <Button variant="ghost" size="sm" asChild>
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-1.5" />
              Demo
            </a>
          </Button>
        )}

        {project.videoUrl && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm">
                <Play className="h-4 w-4 mr-1.5" />
                Video
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-3xl p-0 overflow-hidden bg-background/95 border-border/50">
              <DialogHeader className="px-6 pt-6 pb-2">
                <DialogTitle className="text-xl">
                  {project.title}
                </DialogTitle>
                <DialogDescription>{project.subtitle}</DialogDescription>
              </DialogHeader>

              <div className="p-6 pt-2">
                <VideoPlayer src={project.videoUrl} title={project.title} />
              </div>
            </DialogContent>
          </Dialog>
        )}

        {project.githubUrl && (
          <Button variant="ghost" size="sm" asChild>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4 mr-1.5" />
              Code
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
