import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import "./globals.css";
import Script from "next/script";

// Configuração da fonte
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
      </head>
      {/* Injetando a variável da fonte direto na tag body */}
      <body className={`${roboto.className} min-h-screen antialiased`}>

        <header className="py-4 px-6 border-b-2 border-theme-bg2 bg-theme-bg/80 backdrop-blur-md sticky top-0 z-10">
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

      </body>
    </html>
  );
}