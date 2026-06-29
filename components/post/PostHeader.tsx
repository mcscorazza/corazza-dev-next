import { Post } from '@/types';
import { formatCustomDate } from '@/utils/formatDate';

interface PostHeaderProps {
  post: Post;
}

export const PostHeader = ({ post }: PostHeaderProps) => {
  const stationNumber = post.order.toString().padStart(2, '0');

  return (
    <header className="mb-12">
      {/* Número da Estação */}
      <h1 className='text-4xl! drop-shadow-sm mb-4 p-2 font-bold'>Estação
        <span className='text-(--line-color-600)! dark:text-(--line-color-700)! font-extrabold'> #{stationNumber} </span>
      </h1>

      {/* Capa do post com o título */}
      <div className='relative rounded-sm lg:rounded-xl overflow-hidden'>
        {post.coverImage && (
          <img src={post.coverImage} alt={`Capa de ${post.title}`} className="w-full object-cover min-h-20" />
        )}
        <h2 className='absolute inset-0 [text-shadow:2px_2px_4px_rgba(0,0,0,1)] bg-black/30 text-(--line-color-50)! flex items-end justify-start m-0! p-6 text-xl! lg:text-4xl! font-bold'>
          {post.title}
        </h2>
      </div>

      {/* Autor e Data do Post */}
      <div className="flex items-start mb-4 flex-wrap flex-col">
        <small className='text-center tracking-wider text-theme-muted text-sm my-2'>
          {post.author} | {formatCustomDate(post.date)}
        </small>
        <div className='flex gap-2 flex-wrap justify-center'>
          {post.tags && post.tags.split(',').map((tag, idx) => (
            <span key={idx}
              className="text-(--line-color-700) text-xs border border-(--line-color-700)
            rounded-lg py-1.5 px-3 cursor-pointer hover:text-slate-800 dark:hover:text-slate-200">
              #{tag.trim()}
            </span>
          ))}
        </div>
      </div>

      {/* Resumo do Post */}
      {post.summary && (
        <p className="text-sm text-theme-text italic leading-relaxed border-l-4 border-(--line-color-700) p-4">
          {post.summary}
        </p>
      )}
    </header>
  );
};