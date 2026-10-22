import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

// AI assistants are allowed on purpose: being quoted in their answers is part of the goal.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
