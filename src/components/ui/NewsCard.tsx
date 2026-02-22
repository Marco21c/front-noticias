import { Link } from "react-router-dom";

type NewsCardsProps = {
  title: string;
  slug?: string;
  summary: string;
  author: { name?: string };
  category: { id?: string; name?: string };
  mainImage?: string;
  publicationDate: string;
  variant: string;
};
//Colores propios a cada categoria de noticia
const categoryColors: Record<string, string> = {
  education: "text-orange-700 bg-orange-200",
  technology: "text-blue-700 bg-blue-100",
  health: "text-green-700 bg-green-100",
  sports: "text-red-700 bg-red-100",
  politic: "text-purple-700 bg-purple-100",
  economy: "text-yellow-700 bg-yellow-100",
  science: "text-indigo-700 bg-indigo-100"

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
      className={`
          group overflow-hidden bg-white rounded-xl
          border border-zinc-200
          shadow-sm
          hover:shadow-md
          transition-all duration-300
          ${variant === "highlighted" ? "col-span-full" : ""}
  `}
    >


      {/* Imagen */}
      {mainImage && (
        <div
          className={`
            relative mb-3 overflow-hidden
            ${variant === "highlighted"
              ? "h-96"
              : variant === "featured"
                ? "h-64"
                : "h-48"}
    `}
        >

{variant === "highlighted" && (
  <span className="absolute top-4 left-4 z-10 bg-yellow-400 text-black text-[11px] font-bold uppercase px-3 py-1 tracking-widest">
    Exclusiva
  </span>
)}
          <img
            src={mainImage}
            alt={title}
            className="h-full w-full object-cover transition group-hover:brightness-95"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-200" />
        </div>
        
      )}

      {/* Contenido */}
      <div className={`
              space-y-2
              ${variant === "highlighted" ? "space-y-3" : ""}
  `}
>
        {/* Categoría */}
      <span
        className={`
          mb-2 inline-block text-[11px] font-semibold uppercase tracking-widest px-2 py-1 rounded
          ${categoryColors[category] ?? "text-gray-600 bg-gray-100"}
  `}
>
          {category}
</span>

        {/* Título */}
        <h2
          className={`
            font-bold leading-tight tracking-tight font-serif
            group-hover:text-black
        
            ${
              variant === "highlighted"
                ? "text-3xl md:text-4xl"
                : variant === "featured"
                ? "text-xl"
                : "text-base"
            }
          `}
        >
          {title}
        </h2>

        {/* Resumen */}
        <p
          className={`
            mt-2 text-gray-700 leading-relaxed
            ${variant === "highlighted"
              ? "text-lg"
              : variant === "featured"
                ? "text-sm"
                : "text-xs line-clamp-3"
            }
          `}
        >
          {summary}
        </p>

        {/* Footer */}
        <div className="mt-3 text-xs text-gray-500 flex gap-3">
          <span>{author}</span>
          <time>
            {new Date(publicationDate).toLocaleDateString("es-AR")}
          </time>
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
