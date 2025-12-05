import type { MetadataRoute } from "next"
import { siteMetadata } from "@/data/resume"

/**
 * Generate robots.txt for SEO
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
  }
}
