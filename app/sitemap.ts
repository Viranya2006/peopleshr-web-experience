import type { MetadataRoute } from "next";
import { GUIDES } from "@/lib/guides";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const latestGuide = GUIDES.map((g) => g.updated).sort().at(-1);
  return [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/admin-cost"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/health-check"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/guides"), lastModified: latestGuide, changeFrequency: "weekly", priority: 0.8 },
    ...GUIDES.map((g) => ({
      url: absoluteUrl(`/guides/${g.slug}`),
      lastModified: g.updated,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: absoluteUrl("/request-demo"), changeFrequency: "yearly", priority: 0.5 },
  ];
}
