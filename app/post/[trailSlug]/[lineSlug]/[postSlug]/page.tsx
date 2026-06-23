import { notFound } from "next/navigation";
import Link from "next/link";
import { PostHeader } from "@/components/post/PostHeader";
import { PostContent } from "@/components/post/PostContent";
import { PostSidebar } from "@/components/post/PostSidebar";
import { PostTrails } from "@/components/post/PostTrails";
import { MobileSidebar } from "@/components/post/MobileSidebar";
import { generatePalette } from "@/utils/generatePalette";
import { PostNavigation } from "@/components/post/PostNavigation";
import { ChevronRight, Home } from "lucide-react";
import { Metadata } from "next";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface PostPageProps {
  params: Promise<{
    trailSlug: string;
    lineSlug: string;
    postSlug: string;
  }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { trailSlug, lineSlug, postSlug } = await params;

  const [postRes, trailsRes, linePostsRes] = await Promise.all([
    fetch(`${apiUrl}/posts/${trailSlug}/${lineSlug}/${postSlug}`, { next: { revalidate: 60 } }),
    fetch(`${apiUrl}/trails`, { next: { revalidate: 3600 } }),
    fetch(`${apiUrl}/lines/${trailSlug}/${lineSlug}`, { next: { revalidate: 3600 } })
  ]);

  if (!postRes.ok) notFound();

  const currentPost = await postRes.json();
  const allTrails = await trailsRes.json();
  const linePosts = await linePostsRes.json();

  const lineColor = currentPost.line.color || "#64748b";
  const palette = generatePalette(lineColor);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": currentPost.title,
    "description": currentPost.summary,
    "image": currentPost.coverImage,
    "author": {
      "@type": "Person",
      "name": currentPost.author || "Marcos Corazza"
    },
    "datePublished": currentPost.date,
  };

  return (
    <div
      className="w-full mx-auto grid grid-cols-1 xl:grid-cols-[minmax(280px,1fr)_minmax(0,1000px)_minmax(280px,1fr)] relative "
      style={{
        "--line-color": lineColor,
        "--line-color-50": palette[50],
        "--line-color-100": palette[100],
        "--line-color-200": palette[200],
        "--line-color-300": palette[300],
        "--line-color-400": palette[400],
        "--line-color-500": palette[500],
        "--line-color-600": palette[600],
        "--line-color-700": palette[700],
        "--line-color-800": palette[800],
        "--line-color-900": palette[900],
        "--line-color-950": palette[950],
      } as React.CSSProperties}
    >
      {/* Sidebar Esquerda (Posts da Linha) */}
      <aside className="hidden xl:ml-0 xl:block 2xl:ml-24 min-w-0 border-r border-theme-border mt-6">
        <PostSidebar
          line={currentPost.line}
          posts={linePosts || []}
          currentPostSlug={currentPost.slug}
        />
      </aside>

      {/* Conteúdo Central */}
      <main className="min-w-0 max-w-full xl:max-w-250 py-8 px-2 lg:p-10">
        <nav className="mb-8 lg:mb-10 flex items-center text-sm font-medium text-theme-muted overflow-x-auto whitespace-nowrap pb-2">
          <Link href="/" className="hover:text-(--line-color-700) transition-colors flex items-center gap-1.5">
            <Home className="size-4" />
            HOME
          </Link>
          <ChevronRight className="size-4 opacity-40 mx-2" />
          <Link
            href={`/trail/${trailSlug}`}
            className="hover:text-(--line-color-700) transition-colors flex items-center gap-1.5"
          >
            {currentPost.line.trail.title}
          </Link>
          <ChevronRight className="size-4 opacity-40 mx-2" />
          <span className="text-(--line-color-700) font-bold">
            {currentPost.line.title}
          </span>
        </nav>

        <PostHeader post={currentPost} />
        <PostContent content={currentPost.content} />
        <PostNavigation
          posts={linePosts || []}
          currentPostSlug={currentPost.slug}
          trailSlug={trailSlug}
          lineSlug={lineSlug}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </main>

      {/* Sidebar Direita (Trilhas) */}
      <aside className="hidden xl:block xl:mr-0 2xl:mr-24 min-w-0 border-l border-theme-border mt-6">
        <PostTrails
          allTrails={allTrails || []}
          currentTrailSlug={currentPost.line.trail.slug}
          currentLineSlug={currentPost.line.slug}
        />
      </aside>

      <MobileSidebar
        line={currentPost.line}
        posts={linePosts || []}
        currentPostSlug={currentPost.slug}
      />
    </div>
  );
}

export async function generateStaticParams() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/posts/all-slugs`);
  if (!res.ok) return [];
  const posts = await res.json();
  return posts.map((post: any) => ({
    trailSlug: post.trailSlug,
    lineSlug: post.lineSlug,
    postSlug: post.postSlug,
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { trailSlug, lineSlug, postSlug } = await params;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${apiUrl}/posts/${trailSlug}/${lineSlug}/${postSlug}`);
  if (!res.ok) return {};
  const post = await res.json();

  return {
    title: `${post.title} | CORAZZA.DEV`,
    description: post.summary || `Aprenda mais sobre ${post.title} na linha ${post.line.title}.`,
    openGraph: {
      title: post.title,
      description: post.summary,
      images: post.coverImage ? [{ url: post.coverImage }] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
    },
  };
}