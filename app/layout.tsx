import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import "katex/dist/katex.min.css";
import "./globals.css";
import Script from "next/script";

const roboto = Roboto({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "CORAZZA.DEV",
  description: "Trilhas de Estudo e Conteúdo Técnico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>

      </head>

      <Script
        id="google-adsense"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />

      <body className={`${roboto.className} min-h-screen antialiased`}>

        <header className="py-4 px-6 border-b-2 border-theme-border bg-theme-bg/80 backdrop-blur-md sticky top-0 z-10">
          <div className="max-w-full mx-auto flex justify-between items-center">
            <Link href="/" className="text-3xl font-black text-theme-text tracking-tighter">
              CORAZZA<span className="text-blue-600">.DEV</span>
            </Link>
            <ThemeToggle />
          </div>
        </header>

        <main>
          {children}
        </main>

        <footer className="py-8 text-center text-sm text-theme-muted border-t border-theme-border mt-12">
          <div className="flex justify-center gap-4 mb-4">
            <a href="/sobre" className="hover:text-theme-text transition-colors">Sobre o Autor</a>
            <a href="/privacidade" className="hover:text-theme-text transition-colors">Política de Privacidade</a>
          </div>
          <p>© {new Date().getFullYear()} corazza.dev. Todos os direitos reservados.</p>
        </footer>

        <Script id="theme-sync" strategy="beforeInteractive">
          {`
            try {
              if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            } catch (_) {}
          `}
        </Script>


      </body>
    </html>
  );
}