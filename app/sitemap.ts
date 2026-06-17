import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://buildblock.dev'
  // Use a stable date representing the last significant content update
  const lastModified = new Date('2024-06-17') 

  return [
    {
      url: baseUrl,
      lastModified: lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    // If you add more actual pages like /portfolio or /about as separate routes, add them here.
    // For now, it's a single-page application, so we keep it focused.
  ]
}
