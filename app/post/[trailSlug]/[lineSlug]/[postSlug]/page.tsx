import { notFound } from "next/navigation";
import Link from "next/link";
import { PostHeader } from "@/components/post/PostHeader";
import { PostContent } from "@/components/post/PostContent";
import { PostSidebar } from "@/components/post/PostSidebar";
import { PostTrails } from "@/components/post/PostTrails";
import { MobileSidebar } from "@/components/post/MobileSidebar";
import { generatePalette } from "@/utils/generatePalette";
import { PostNavigation } from "@/components/post/PostNavigation";

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

  // Busca paralela para otimizar velocidade
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

  return (
    <div
      className="w-full mx-auto grid grid-cols-1 xl:grid-cols-[minmax(280px,1fr)_minmax(0,1000px)_minmax(280px,1fr)] relative"
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
      <aside className="hidden xl:block min-w-0">
        <PostSidebar 
          line={currentPost.line} 
          posts={linePosts || []} 
          currentPostSlug={currentPost.slug} 
        />
      </aside>

      {/* Conteúdo Central */}
      <main className="min-w-0 max-w-full xl:max-w-250 px-2 py-8 lg:p-10">
        <nav className="mb-8 lg:mb-10 flex items-center text-sm font-medium text-theme-muted overflow-x-auto whitespace-nowrap pb-2">
          <Link href="/" className="hover:text-theme-text transition-colors flex items-center gap-1.5">
            <span>-</span> Início
          </Link>
          <span className="mx-2 opacity-40">/</span>
          <Link 
            href={`/trail/${trailSlug}`} 
            className="hover:text-(--line-color-600) dark:hover:text-(--line-color-400) transition-colors flex items-center gap-1.5"
          >
            <span>-</span> {currentPost.line.trail.title}
          </Link>
          <span className="mx-2 opacity-40">/</span>
          <span className="text-(--line-color-500) font-bold opacity-80">
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
      </main>

      {/* Sidebar Direita (Trilhas) */}
      <aside className="hidden xl:block min-w-0">
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