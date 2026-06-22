import Link from "next/link";
import { Post } from "@/types";

interface PostNavigationProps {
  posts: Post[];
  currentPostSlug: string;
  trailSlug: string;
  lineSlug: string;
}

export const PostNavigation = ({
  posts,
  currentPostSlug,
  trailSlug,
  lineSlug,
}: PostNavigationProps) => {
  // Encontra a posição da estação atual no array
  const currentIndex = posts.findIndex((p) => p.slug === currentPostSlug);

  // Define quem é o anterior e o próximo (se existirem)
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  // Se for um post isolado e não tiver nem anterior nem próximo, não renderiza nada
  if (!prevPost && !nextPost) return null;

  return (
    <nav className="mt-16 pt-8 border-t border-theme-border flex flex-col sm:flex-row gap-4 justify-between">
      {/* Botão Anterior */}
      {prevPost ? (
        <Link
          href={`/post/${trailSlug}/${lineSlug}/${prevPost.slug}`}
          className="flex-1 p-5 rounded-2xl border border-theme-border bg-theme-bg/50 hover:bg-(--line-color-50)/50 dark:hover:bg-(--line-color-900)/20 hover:border-(--line-color-500) transition-all group flex flex-col text-left"
        >
          <span className="text-xs font-bold text-theme-muted uppercase tracking-widest mb-2 group-hover:text-(--line-color-600) dark:group-hover:text-(--line-color-400) transition-colors flex items-center gap-2">
            <span>←</span> Estação Anterior
          </span>
          <span className="font-medium text-theme-text group-hover:text-blue-500 transition-colors">
            {prevPost.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1" /> // Div vazia para manter o alinhamento caso não tenha o anterior
      )}

      {/* Botão Próximo */}
      {nextPost ? (
        <Link
          href={`/post/${trailSlug}/${lineSlug}/${nextPost.slug}`}
          className="flex-1 p-5 rounded-2xl border border-theme-border bg-theme-bg/50 hover:bg-(--line-color-50)/50 dark:hover:bg-(--line-color-900)/20 hover:border-(--line-color-500) transition-all group flex flex-col text-right items-end"
        >
          <span className="text-xs font-bold text-theme-muted uppercase tracking-widest mb-2 group-hover:text-(--line-color-600) dark:group-hover:text-(--line-color-400) transition-colors flex items-center gap-2">
            Próxima Estação <span>→</span>
          </span>
          <span className="font-medium text-theme-text group-hover:text-blue-500 transition-colors text-right">
            {nextPost.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  );
};