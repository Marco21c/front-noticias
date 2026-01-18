type NewsCardsProps = {
    title: string
    summary: string
    highlights: boolean
    author: string
    category: string
    mainImage: string
    publicationDate: Date
    main: boolean
}
export default function NewsCard({ title, summary, highlights, author,category, mainImage, publicationDate, main}: NewsCardsProps) {
    return (
       <article
      className={`
        relative overflow-hidden rounded-xl bg-white shadow-md transition
        ${ main
            ? "col-span-full"
            : highlights
            ? "md:col-span-2 md:row-span-2"
            : ""
        }
      `}
    >
      {/* Imagen */}
      <div className={main ? "h-96" : highlights ? "h-64 md:h-80" : "h-48"}>
        <img
          src={mainImage}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Contenido */}
      <div className={`p-4 ${main || highlights ? "p-6" : ""}`}>
        {/* Badge */}
        {main && (
          <span className="mb-2 inline-block rounded bg-red-600 px-3 py-1 text-xs font-bold text-white">
            Ultimo momento
          </span>
        )}

        {/* Categoría */}
        <span className="mb-2 ml-2 inline-block rounded bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
          {category}
        </span>

        {/* Título */}
        <h2
          className={`font-bold leading-tight ${
            main
              ? "text-3xl md:text-4xl"
              : highlights
              ? "text-2xl"
              : "text-lg"
          }`}
        >
          {title}
        </h2>

        {/* Resumen */}
        <p
          className={`mt-3 text-gray-600 ${
            main ? "text-lg" : highlights ? "text-base" : "text-sm line-clamp-3"
          }`}
        >
          {summary}
        </p>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
          <span>{author}</span>
          <time>
            {publicationDate.toLocaleDateString("es-AR")}
          </time>
        </div>
      </div>
    </article>
    )
}