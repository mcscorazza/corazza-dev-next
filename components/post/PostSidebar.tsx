import Link from "next/link";
import { Post, Line } from "@/types"; // Ajuste o import do Line se necessário

interface SidebarProps {
  line: Line;
  posts: Post[];
  currentPostSlug: string;
}

export const PostSidebar = ({ line, posts, currentPostSlug }: SidebarProps) => {
  const currentIndex = posts.findIndex(x => x.slug === currentPostSlug);

  return (
    <div className='sticky top-28 p-8'>
      <h3 className="text-sm font-bold text-(--line-color-800)! dark:text-(--line-color-700)! uppercase tracking-widest mb-6">
        {line.title}
      </h3>
      <div className="relative border-l-8 border-(--line-color-800) dark:border-(--line-color-700) ml-3 py-2">
        {posts.map((p, index) => {
          const isCurrent = p.slug === currentPostSlug;
          const isPast = index < currentIndex;

          return (
            <div key={p.slug} className="mb-4 ml-6 relative">
              <div
                className={`absolute -left-9 top-1 w-4 h-4 rounded-full border-2 bg-slate-300 transition-all duration-300
                  ${isCurrent ? 'scale-150 border-(--line-color-700)' : 'border-slate-500'}`}
              />
              <Link
                href={`/post/${line.trail.slug}/${line.slug}/${p.slug}`}
                className={`text-sm transition-colors flex items-center group w-full min-w-0 overflow-hidden
                  ${isCurrent ? 'font-bold text-(--line-color-700)' :
                    isPast ? 'text-slate-400 hover:text-slate-600' : 'text-slate-300 hover:text-slate-500'}`}
              >
                <span className="mr-2 text-base shrink-0">
                  {p.order.toString().padStart(2, '0')}
                </span>
                <span className="truncate" title={p.title}>
                  {p.title}
                </span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};