import Link from "next/link";
import { generatePalette } from "@/utils/generatePalette";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface TrailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function TrailPage({ params }: TrailPageProps) {
  const { slug } = await params;

  const res = await fetch(`${apiUrl}/trails/${slug}`, {
    next: { revalidate: 300 }, // Cache de 5 minutos
  });

  if (!res.ok) {
    return <div className="p-20 text-center font-bold text-xl">Trilha não encontrada.</div>;
  }

  const trailData = await res.json();

  return (
    <div className="max-w-5xl mx-auto py-20 px-3 xl:px-6">
      <header className="mb-12">
        <h1 className="text-5xl font-black text-theme-text mt-4 uppercase tracking-tight">
          {trailData.title}
        </h1>
        <p className="text-slate-500 mt-2 text-lg">
          Explore as linhas de aprendizado desta trilha.
        </p>
      </header>

      <div className="grid gap-2 xl:gap-8">
        {trailData.lines?.map((line: any) => {
          const lineColor = line.color || "#64748b";
          const palette = generatePalette(lineColor);

          return (
            <section
              key={line.id}
              className="bg-theme-bg border border-theme-border rounded-2xl p-3 xl:p-8 shadow-sm transition-colors"
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
              {/* 3. Usa as variáveis para pintar o título da linha */}
              <h2 className="text-2xl font-bold mb-6 text-(--line-color-700)">
                {line.title}
              </h2>
              
              <div className="grid gap-3">
                {line.posts?.map((post: any) => (
                  <Link
                    key={post.id}
                    href={`/post/${slug}/${line.slug}/${post.slug}`}
                    className="group flex items-center justify-between p-4 bg-theme-bg rounded-lg border border-theme-border/60 hover:border-(--line-color-500) hover:bg-(--line-color-50)/10 dark:hover:bg-(--line-color-900)/10 transition-all"
                  >
                    <span className="font-medium text-theme-text group-hover:text-(--line-color-600) dark:group-hover:text-(--line-color-400) transition-colors">
                      {post.title}
                    </span>
                    <span className="text-xs text-theme-muted group-hover:text-(--line-color-600) dark:group-hover:text-(--line-color-400) font-bold uppercase tracking-widest transition-colors">
                      Estação {post.order.toString().padStart(2, "0")}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}