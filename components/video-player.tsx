"use client"

import { useState, useMemo } from "react"
import { Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VideoPlayerProps {
  src: string
  title: string
}

export function VideoPlayer({ src, title }: VideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  // Smart URL parsing for YouTube and GitHub
  const videoConfig = useMemo(() => {
    try {
      // Case 1: YouTube (Standard, Shortened, or Embed)
      if (src.includes("youtube.com") || src.includes("youtu.be")) {
        let videoId = ""
        
        if (src.includes("youtube.com/watch")) {
          // Handle standard watch URLs (e.g., ?v=...)
          const urlParams = new URL(src).searchParams
          videoId = urlParams.get("v") || ""
        } else if (src.includes("youtu.be")) {
          // Handle shortened URLs (remove query params like ?si=...)
          videoId = src.split("/").pop()?.split("?")[0] || ""
        } else if (src.includes("youtube.com/embed/")) {
          // Handle embed URLs
          videoId = src.split("/embed/")[1]?.split("?")[0] || ""
        }

        if (videoId) {
          return { 
            type: "youtube", 
            url: `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` 
          }
        }
      }
      
      // Case 2: Standard Direct Link (or already raw GitHub link)
      return { type: "native", url: src }
    } catch (e) {
      console.error("Video URL parsing error:", e)
      return { type: "error", url: "" }
    }
  }, [src])

  if (error || videoConfig.type === "error") {
    return (
      <div className="aspect-video bg-muted rounded-lg flex flex-col items-center justify-center gap-2 text-muted-foreground">
        <AlertCircle className="h-8 w-8 text-destructive/50" />
        <p className="text-sm font-medium">Video unavailable</p>
        <Button variant="outline" size="sm" asChild className="mt-2">
          <a href={src} target="_blank" rel="noopener noreferrer">
            Open Original Link
          </a>
        </Button>
      </div>
    )
  }

  return (
    <div className="relative aspect-video bg-black rounded-lg overflow-hidden border border-border/50 shadow-2xl">
      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/10 backdrop-blur-sm z-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {/* Render Player based on type */}
      {videoConfig.type === "youtube" ? (
        <iframe
          src={videoConfig.url}
          title={title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setIsLoading(false)}
        />
      ) : (
        <video
          className="w-full h-full object-contain"
          controls
          playsInline
          autoPlay
          onLoadedData={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false)
            setError(true)
          }}
        >
          <source src={videoConfig.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  )
}