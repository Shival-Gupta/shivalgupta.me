"use client"

import { useState } from "react"
import { Github, ExternalLink, Play, Award, Bot, Cpu, Wifi, Glasses, Globe, Gamepad2, Terminal, LayoutGrid } from "lucide-react"
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
import type { Project, ProjectCategory } from "@/data/resume"

// 2. UPDATED: Sorted & Fixed Icons
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

  // Filter projects if category array includes the selected filter
  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter((p) => p.categories.includes(activeFilter as ProjectCategory))

  return (
    <div className="space-y-8">
      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const Icon = cat.icon
          
          // --- NEW: Calculate count for this category ---
          const count = cat.id === "all" 
            ? projects.length 
            : projects.filter(p => p.categories.includes(cat.id as ProjectCategory)).length

          return (
            <Button
              key={cat.id}
              variant={activeFilter === cat.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(cat.id)}
              className={cn("gap-2 transition-all duration-200", activeFilter !== cat.id && "hover:border-primary/50")}
            >
              <Icon className="h-4 w-4" />
              {cat.label}
              
              {/* --- NEW: Display the count --- */}
              <span className={cn(
                "text-xs px-1 py-0.2 rounded-full tabular-nums", 
                activeFilter === cat.id 
                  ? "bg-primary-foreground/20 text-primary-foreground" 
                  : "bg-muted text-muted-foreground"
              )}>
                {count}
              </span>
            </Button>
          )
        })}
      </div>

      {/* Project grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
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
    <Card className="group flex flex-col h-full bg-card/50 border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="space-y-3">
        <div className="flex flex-col gap-2">
          {/* Header Row: Date */}
          <div className="flex justify-between items-start">
             <span className="text-xs text-muted-foreground font-mono mt-1">{project.dateRange}</span>
          </div>
          
          {/* Categories Row */}
          <div className="flex flex-wrap gap-2">
            {project.categories.map((cat) => (
              <Badge key={cat} variant="outline" className={cn("capitalize", categoryColors[cat])}>
                {cat}
              </Badge>
            ))}
          </div>
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