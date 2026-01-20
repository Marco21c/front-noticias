type NewsCardsProps = {
  title: string
  summary: string
  author: string
  category: string
  mainImage?: string
  publicationDate: string
  variant: string
}

export default function NewsCard({ title, summary, author, category, mainImage, publicationDate, variant}: NewsCardsProps) {
  
  return (
    <article
      className={`
        overflow-hidden rounded-xl bg-white shadow-md transition
        ${variant === "highlighted" ? "col-span-full" : ""}
      `}
    >
      {/* Imagen */}
      {mainImage && (
        <div
          className={
            variant === "highlighted"
              ? "h-96"
              : variant === "featured"
              ? "h-64"
              : "h-48"
          }
        >
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
        <span className="mb-2 inline-block rounded bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-700">
          {category}
        </span>

        {/* Título */}
        <h2
          className={`
            font-bold leading-tight
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
            mt-2 text-gray-600
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
        <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
          <span>{author}</span>
          <time>
            {new Date(publicationDate).toLocaleDateString('es-AR')}
          </time>
        </div>
      </div>
    </article>
  )
}
