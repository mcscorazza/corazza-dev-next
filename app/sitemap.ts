import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/posts/all-slugs`);
  const allPosts = res.ok ? await res.json() : [];

  const postUrls = allPosts.map((post: any) => ({
    url: `https://corazza.dev/post/${post.trailSlug}/${post.lineSlug}/${post.postSlug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: "https://corazza.dev",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...postUrls,
  ];
}