import type { MetadataRoute } from "next"
import { siteMetadata } from "@/data/resume"

/**
 * Generate sitemap.xml for SEO
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteMetadata.siteUrl

  const routes = ["", "/projects", "/about", "/contact", "/privacy"]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }))
}
