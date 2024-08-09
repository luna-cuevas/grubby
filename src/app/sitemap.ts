import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.grubby.ai";

  const staticPaths = ["/", "/pricing", "/login", "/sign-up"];

  const formattedPaths = staticPaths.map((path) => {
    return {
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    };
  });

  return formattedPaths as MetadataRoute.Sitemap;
}
