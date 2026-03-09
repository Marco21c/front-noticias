import { Link } from "react-router-dom";

type NewsCardsProps = {
  title: string;
  slug?: string;
  summary: string;
  author: { name?: string };
  category: { id?: string; name?: string };
  mainImage?: string;
  publicationDate?: string | null;
  variant: "default" | "highlighted" | "featured";
};

const categoryColors: Record<string, string> = {
  education: "text-orange-800 bg-orange-100",
  technology: "text-blue-800 bg-blue-100",
  health: "text-emerald-800 bg-emerald-100",
  sports: "text-red-800 bg-red-100",
  politic: "text-purple-800 bg-purple-100",
  economy: "text-yellow-800 bg-yellow-100",
  science: "text-indigo-800 bg-indigo-100"
};

export default function NewsCard({
  title,
  slug,
  summary,
  author,
  category,
  mainImage,
  publicationDate,
  variant,
}: NewsCardsProps) {
  const cardContent = (
    <article
      className="group flex flex-col h-full bg-transparent transition-all duration-300"
    >

      {/* Imagen (Oculta en Default) */}
      {variant !== "default" && mainImage && (
        <div
          className={`
            relative overflow-hidden bg-zinc-100 flex flex-col items-center justify-center
            ${variant === "highlighted"
              ? "h-80 md:h-[400px] mb-4 md:mb-6"
              : "aspect-video mb-3"}
          `}
        >
          {variant === "highlighted" && (
            <span className="absolute top-4 left-4 z-10 bg-black text-white text-[10px] uppercase font-bold px-3 py-1 tracking-widest">
              Exclusiva
            </span>
          )}
          
          <img
            src={mainImage}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
      )}

      {/* Cuerpo de la Noticia */}
      <div className="flex flex-col flex-1">
      <span
        className={`
          inline-block text-[10px] font-bold uppercase tracking-widest mb-3
          ${categoryColors[category?.name ?? ""] ?? "text-gray-600"}
  `}
>
          {category?.name ?? ""}
</span>

        <h2
          className={`
            font-bold leading-tight tracking-tight font-serif text-gray-900 group-hover:underline decoration-2 underline-offset-4
        
            ${
              variant === "highlighted"
                ? "text-4xl md:text-5xl lg:text-6xl mb-3"
                : variant === "featured"
                ? "text-2xl"
                : "text-xl"
            }
          `}
        >
          {title}
        </h2>

        <p
          className={`
            mt-1 text-gray-700 leading-relaxed font-serif
            ${variant === "highlighted"
              ? "text-lg md:text-xl font-light"
              : variant === "featured"
                ? "text-sm line-clamp-3 mt-3"
                : "text-base line-clamp-3 mt-3"
            }
          `}
        >
          {summary}
        </p>

        <div className={`
            mt-4 pt-3 border-t border-gray-200 text-xs font-sans font-medium text-gray-500 flex items-center gap-2 uppercase tracking-wide
        `}>
          <span className="text-gray-900">{author?.name ?? ""}</span>
          {publicationDate && (
            <>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <time dateTime={publicationDate}>
                {new Date(publicationDate).toLocaleDateString("es-AR", { month: 'short', day: 'numeric', year: 'numeric' })}
              </time>
            </>
          )}
        </div>
      </div>
    </article>
  );

  if (slug) {
    return (
      <Link to={`/news/${slug}`} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
