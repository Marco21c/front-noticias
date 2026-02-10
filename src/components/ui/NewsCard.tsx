import { Link } from "react-router-dom";

type NewsCardsProps = {
  title: string;
  slug?: string;
  summary: string;
  author: string;
  category: string;
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
            overflow-hidden bg-white transition
          border border-gray-200
          hover:border-gray-300
          ${variant === "highlighted" ? "col-span-full" : ""}
  `} //Separaciones que se noten mas
>

      {/* Imagen */}
      {mainImage && (
        <div
          className={`
            relative
            ${variant === "highlighted"
              ? "h-96"
              : variant === "featured"
              ? "h-64"
              : "h-48"}
    `}
  >

{variant === "highlighted" && (
  <span className="absolute top-4 left-4 z-10 bg-yellow-400 text-black text-xs font-extrabold uppercase px-3 py-1 tracking-widest rounded-sm bg-yellow-500/90 backdrop-blur">
    Exclusiva
  </span>
)} 

          <img
            src={mainImage}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      {/* Contenido */}
      <div className={variant === "highlighted" ? "p-6" : "p-4"}>
        {/* Categoría */}
      <span
        className={`mb-3 inline-block rounded px-2 py-1 text-xs font-bold uppercase tracking-widest border border-current/10

        ${categoryColors[category] ?? "bg-gray-100 text-gray-700"}`}
>
        {category}
      </span>



        {/* Título */}
        <h2
          className={`
            font-bold leading-tight tracking-tight font-serif
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
            ${
              variant === "highlighted"
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
        <div className="mt-4 pt-3 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
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
