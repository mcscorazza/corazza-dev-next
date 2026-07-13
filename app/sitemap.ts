import { MetadataRoute } from "next";

const NEXT_PUBLIC_API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://sua-api.com/api";
const SITE_URL = "https://corazza.dev";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["", "/sobre", "/privacidade"].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.5,
  }));

  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/sitemap-posts`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error("Falha ao buscar posts da API");
    const posts = await res.json();

    const dynamicRoutes = posts.map((post: any) => ({
      url: `${SITE_URL}/post/${post.line.trail.slug}/${post.line.slug}/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

    return [...staticRoutes, ...dynamicRoutes];
  } catch (error) {
    console.error("Erro ao gerar sitemap dinâmico:", error);
    return staticRoutes;
  }
}
