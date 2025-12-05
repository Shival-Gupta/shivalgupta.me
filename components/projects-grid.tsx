"use client"

import { useState } from "react"
import { Github, ExternalLink, Play, Award, Bot, Cpu, Wifi, Glasses, Globe } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import type { Project } from "@/data/resume"

const categories = [
  { id: "all", label: "All", icon: Globe },
  { id: "ai", label: "AI", icon: Cpu },
  { id: "robotics", label: "Robotics", icon: Bot },
  { id: "iot", label: "IoT", icon: Wifi },
  { id: "xr", label: "XR", icon: Glasses },
] as const

const categoryColors: Record<Project["category"], string> = {
  ai: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  robotics: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  iot: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  xr: "bg-primary/10 text-primary border-primary/20",
  web: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
}

interface ProjectsGridProps {
  projects: Project[]
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all")

  const filteredProjects = activeFilter === "all" ? projects : projects.filter((p) => p.category === activeFilter)

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const Icon = cat.icon
          return (
            <Button
              key={cat.id}
              variant={activeFilter === cat.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(cat.id)}
              className={cn(
                "gap-2 transition-all",
                activeFilter === cat.id && "glow-primary",
                activeFilter !== cat.id && "hover:border-primary/50",
              )}
            >
              <Icon className="h-4 w-4" />
              {cat.label}
            </Button>
          )
        })}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            className="animate-in fade-in slide-in-from-bottom-4"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">No projects found in this category.</div>
      )}
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="group flex flex-col h-full bg-card/50 border-border/50 card-hover hover-lift">
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className={cn("capitalize", categoryColors[project.category])}>
            {project.category}
          </Badge>
          <span className="text-xs text-muted-foreground font-mono">{project.dateRange}</span>
        </div>

        <div>
          <CardTitle className="text-lg group-hover:text-primary transition-colors">{project.title}</CardTitle>
          {project.subtitle && (
            <CardDescription className="flex items-center gap-1.5 mt-1">
              {project.subtitle.includes("Winner") && <Award className="h-3.5 w-3.5 text-yellow-500" />}
              {project.subtitle}
            </CardDescription>
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
              className="px-2 py-0.5 text-xs font-mono bg-muted rounded-md text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 pt-4 border-t border-border/50">
        {project.githubUrl && (
          <Button variant="ghost" size="sm" asChild className="hover:text-primary">
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4 mr-1.5" />
              Code
            </a>
          </Button>
        )}

        {project.demoUrl && (
          <Button variant="ghost" size="sm" asChild className="hover:text-primary">
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-1.5" />
              Demo
            </a>
          </Button>
        )}

        {project.videoUrl && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="hover:text-primary">
                <Play className="h-4 w-4 mr-1.5" />
                Video
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>{project.title}</DialogTitle>
                <DialogDescription>{project.subtitle}</DialogDescription>
              </DialogHeader>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Video player placeholder</p>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {project.certificateUrl && (
          <Badge variant="outline" className="ml-auto text-xs">
            <Award className="h-3 w-3 mr-1" />
            Certified
          </Badge>
        )}
      </CardFooter>
    </Card>
  )
}
