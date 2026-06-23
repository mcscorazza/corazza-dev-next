"use client";

import { useState } from "react";
import Link from "next/link";
import { TrailSummary } from "@/types";
import { ArrowRight } from "lucide-react";

interface TrailsProps {
  allTrails: TrailSummary[];
  currentTrailSlug: string;
  currentLineSlug: string;
}

export const PostTrails = ({
  allTrails,
  currentTrailSlug,
  currentLineSlug
}: TrailsProps) => {
  // Movemos o estado que ficava na PostPage para dentro do próprio componente
  const [expandedTrail, setExpandedTrail] = useState<string | null>(currentTrailSlug);

  const onToggleTrail = (slug: string) => {
    setExpandedTrail(expandedTrail === slug ? null : slug);
  };

  return (
    <div className='sticky top-28 p-6'>
      <h3 className="text-sm font-bold text-(--line-color-700) uppercase tracking-widest mb-6">
        Explorar Mapa
      </h3>

      <div className="flex flex-col gap-3">
        {allTrails.map(trail => {
          const isCurrentTrail = trail.slug === currentTrailSlug;
          const isExpanded = expandedTrail === trail.slug;

          return (
            <div
              key={trail.slug}
              className={`rounded-2xl border transition-all overflow-hidden 
                ${isCurrentTrail ? 'border-(--line-color-700) bg-(--line-color-50) dark:bg-(--line-color-950)/20 shadow-sm' : 'border-theme-border'}`}
            >
              <button
                onClick={() => onToggleTrail(trail.slug)}
                className={`w-full text-left p-4 flex flex-col transition-colors cursor-pointer
                  ${isExpanded ? 'bg-(--line-color-50) dark:bg-(--line-color-950)/20' : 'bg-transparente hover:bg-(--line-color-50) dark:hover:bg-(--line-color-950)/20'}`}
              >
                <div className="flex flex-row items-center justify-between w-full">
                  <h4 className={`font-bold text-sm mt-1! 
                    ${isCurrentTrail ? 'text-(--line-color-800)' : 'text-theme-muted'}`}>
                    {trail.title}
                  </h4>
                  <span className="text-[14px] text-slate-500">
                    {isExpanded ? '▲' : '▼'}
                  </span>
                </div>
                <span className="text-[10px] font-medium text-slate-500 uppercase mt-1">
                  {trail.lines?.length || 0} Linhas • {trail.postsCount || 0} Estações
                </span>
              </button>

              {isExpanded && trail.lines && (
                <div className="p-2 flex flex-col gap-1 border-t border-theme-border">
                  {trail.lines.map((line) => {
                    const isCurrentLine = isCurrentTrail && line.slug === currentLineSlug;

                    return (
                      <Link
                        key={line.slug}
                        href={`/post/${trail.slug}/${line.slug}/${line.firstPostSlug}`}
                        className={`text-xs p-3 rounded-lg flex items-center justify-between group transition-all 
                          ${isCurrentLine
                            ? 'text-(--line-color) font-bold'
                            : 'text-theme-text hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-200'
                          }`}
                      >
                        <span>{line.title}</span>
                        {!isCurrentLine && <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <ArrowRight  className="size-4 opacity-100 mx-2 text-(--line-color-800)" />
                          </span>}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};