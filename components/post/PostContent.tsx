"use client";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math'; // 1. IMPORTADO
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex'; // 2. IMPORTADO
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useEffect, useState } from 'react';

const useDarkMode = () => {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);
  return isDark;
};

interface PostContentProps {
  content: string;
}

export const PostContent = ({ content }: PostContentProps) => {
  const isDarkMode = useDarkMode();
  return (
    <article className="
      bg-theme-bg2 p-2 lg:p-6 rounded-xl lg:text-base
      prose prose-slate lg:prose-lg max-w-none
      prose-p:text-theme-text prose-p:leading-relaxed prose-p:text-justify prose-p:my-0!
      
      prose-code:bg-slate-200 dark:prose-code:bg-gray-600 dark:prose-code:text-theme-text! prose-code:py-px prose-code:px-1 prose-code:rounded-sm
      prose-code:before:content-none prose-code:after:content-none
      [&_pre_code]:block
      [&_pre_code]:bg-transparent!

      [&_.katex-display]:my-8 
      [&_.katex-display]:text-center 
      [&_.katex-display]:overflow-x-auto 
      [&_.katex-display]:overflow-y-hidden 
      [&_.katex-display]:py-2

      prose-strong:text-theme-text prose-strong:font-bold 
      prose-img:block! prose-img:mx-auto! prose-img:shadow-none! prose-img:rounded-none!
      prose-figure:my-1 prose-figure:mt-6

      lg:prose-table:w-[60%] lg:prose-table:mx-auto
      
      prose-th:my-0! prose-th:p-2 prose-th:text-left prose-th:font-bold prose-th:text-(--line-color-700)
      prose-th:border-b-2 prose-th:border-theme-border

      prose-tr:border-b prose-tr:border-theme-border transition-colors
      prose-td:p-2 prose-td:text-theme-muted prose-td:align-middle

      prose-headings:font-bold
      prose-h2:text-theme-sec dark:prose-h2:text-theme-sec! prose-h2:mt-12 prose-h2:border-b prose-h2:border-theme-border prose-h2:pb-2
      prose-h3:text-theme-sec dark:prose-h3:text-theme-sec! prose-h3:mt-10 prose-h3:mb-2 
      prose-h4:text-theme-sec dark:prose-h4:text-theme-sec! prose-h4:mt-10 prose-h4:mb-2
      prose-h5:text-theme-sec dark:prose-h5:text-theme-sec! prose-h5:mt-10 prose-h5:mb-2

      prose-a:text-(--line-color) prose-a:font-semibold prose-a:no-underline hover:prose-a:underline hover:prose-a:opacity-80

      prose-blockquote:border-l-(--line-color) prose-blockquote:bg-(--line-color)/10 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:text-theme-muted prose-blockquote:not-italic
      prose-li:text-theme-text prose-li:marker:text-(--line-color)

      prose-pre:bg-theme-code prose-pre:border prose-pre:border-none prose-pre:shadow-sm
    ">
      <ReactMarkdown
        // 3. Adicionado o rehypeKatex junto com o rehypeRaw
        rehypePlugins={[rehypeRaw, rehypeKatex]}
        // 4. Adicionado o remarkMath junto com o remarkGfm
        remarkPlugins={[remarkGfm, remarkMath]}
        components={{
          p: ({ children }) => {
            if (typeof children === 'object' && children !== null) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const isImage = (children as any).type === 'img' || (children as any).props?.node?.tagName === 'img';
              if (isImage) return <>{children}</>;
            }
            return <p className="mb-4 leading-relaxed">{children}</p>;
          },
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          img: ({ node, ...props }) => {
            const srcString = typeof props.src === 'string' ? props.src : '';
            const [url, label] = srcString.split('#');

            const classMap: Record<string, string> = {
              small: 'max-w-50 mx-auto',
              side: 'max-w-[40%] float-right ml-4 mb-4 mx-auto',
              full: 'w-full',
              center: 'max-w-[70%] mx-auto display-block'
            };

            const customClass = label ? classMap[label] : 'w-full';

            return (
              <figure className="text-center my-0">
                <img src={url} className={customClass} alt={props.alt || ''} />
                {props.alt && (
                  <figcaption className="text-sm text-theme-muted italic mt-1!">
                    {props.alt}
                  </figcaption>
                )}
              </figure>
            );
          },
          // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={isDarkMode ? vscDarkPlus : oneLight}
                customStyle={{
                  backgroundColor: 'transparent',
                  padding: 0,
                  margin: 0,
                  fontSize: '0.95rem',
                }}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).trim().replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
};