import Link from "next/link";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface TrailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function TrailPage({ params }: TrailPageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const res = await fetch(`${apiUrl}/trails/${slug}`, {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    return <div className="p-20 text-center font-bold text-xl">Trilha não encontrada.</div>;
  }

  const trailData = await res.json();

  return (
    <div className="max-w-5xl mx-auto py-20 px-6">
      <header className="mb-12">
        <Link href="/" className="text-blue-600 hover:underline font-medium">
          ← Voltar para o início
        </Link>
        <h1 className="text-5xl font-black text-theme-text mt-4 uppercase tracking-tight">
          {trailData.title}
        </h1>
        <p className="text-slate-500 mt-2 text-lg">
          Explore as linhas de aprendizado desta trilha.
        </p>
      </header>

      <div className="grid gap-8">
        {trailData.lines?.map((line: any) => (
          <section
            key={line.id}
            className="bg-theme-bg border border-theme-border rounded-2xl p-8 shadow-sm"
          >
            <h2 className="text-2xl font-bold text-theme-text mb-6">
              {line.title}
            </h2>

            <div className="grid gap-3">
              {line.posts?.map((post: any) => (
                <Link
                  key={post.id}
                  href={`/post/${slug}/${line.slug}/${post.slug}`}
                  className="group flex items-center justify-between p-4 bg-theme-bg rounded-lg border border-transparent hover:border-theme-border hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all"
                >
                  <span className="font-medium text-theme-text group-hover:text-blue-500 transition-colors">
                    {post.title}
                  </span>
                  <span className="text-xs text-theme-muted font-bold uppercase tracking-widest">
                    Estação {post.order.toString().padStart(2, "0")}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}