"use client";

import { useState } from "react";
import Link from "next/link";
import { Post } from "@/types";
import { List } from "lucide-react";

interface MobileSidebarProps {
  line: any;
  posts: Post[];
  currentPostSlug: string;
}

export const MobileSidebar = ({ line, posts, currentPostSlug }: MobileSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentIndex = posts.findIndex((x) => x.slug === currentPostSlug);

  return (
    <div className="xl:hidden">
      {/* BOTÃO FLUTUANTE - Fixado no canto inferior esquerdo */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 p-4 rounded-full text-white shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 font-bold text-sm cursor-pointer border border-white/10"
        style={{ backgroundColor: "var(--line-color-700)" }}
      >
        <List className="size-5" />
        <span>Track</span>
      </button>

      {/* GAVETA / DRAWER OVERLAY */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Fundo escurecido com desfoque sutil (Backdrop) */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsOpen(false)}
          />

          {/* Painel de Navegação (Desliza da esquerda) */}
          <div className="relative flex flex-col w-full max-w-xs bg-theme-bg border-r border-theme-border h-full shadow-2xl overflow-y-auto z-10 p-6 animate-in slide-in-from-left duration-200">
            {/* Cabeçalho do Menu com botão fechar */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-theme-border">
              <h3 className="text-xs font-bold text-(--line-color-700) uppercase tracking-widest">
                {line.title}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-theme-text hover:text-theme-sec font-bold text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Linha do Tempo das Estações */}
            <div className="relative border-l-8 border-(--line-color-700) ml-3 py-2">
              {posts.map((p, index) => {
                const isCurrent = p.slug === currentPostSlug;
                const isPast = index < currentIndex;

                return (
                  <div key={p.slug} className="mb-4 ml-6 relative">
                    {/* Indicador visual circular */}
                    <div
                      className={`absolute -left-9 top-1 w-4 h-4 rounded-full border-2 bg-slate-200 transition-all duration-300
                        ${isCurrent ? "scale-150 border-(--line-color-700)" : "border-slate-500"}`}
                    />

                    <Link
                      href={`/post/${line.trail.slug}/${line.slug}/${p.slug}`}
                      onClick={() => setIsOpen(false)}
                      className={`text-sm -mx-2 transition-colors flex items-center group w-full min-w-0 overflow-hidden
                        ${isCurrent ? "font-bold text-(--line-color-700)" : 
                          isPast ? "text-theme-muted opacity-60 hover:opacity-100" : "text-theme-text opacity-80 hover:opacity-100"}`}
                    >
                      <span className="mr-1 shrink-0">
                        {p.order.toString().padStart(2, "0")}
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
        </div>
      )}
    </div>
  );
};