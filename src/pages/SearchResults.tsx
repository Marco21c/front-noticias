import { useSearchParams } from "react-router-dom";
import { useSearchNews } from "@/hooks/useGetNews";
import NewsCard from "@/components/ui/NewsCard";
import type { INews } from "@/types/News.type";

/**
 * Pagina de resultados de busqueda de noticias.
 * Muestra las noticias que coinciden con el termino de busqueda
 * ingresado por el usuario mediante el parametro de URL "q".
 * 
 * @component
 * @returns {JSX.Element} Pagina con grid de resultados de busqueda
 */
export default function SearchResults() {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q")?.trim() ?? "";
  const shouldSearch = query.length > 0;

  const {
    data,
    isLoading,
    isError,
    error,
  } = useSearchNews(query, { enabled: shouldSearch });

  const items = data ?? [];

  if (!query) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-6">
        <p className="text-gray-600">
          Ingresa un termino para buscar noticias.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="mb-6 text-2xl font-semibold">
        Resultados para{" "}
        <span className="italic text-gray-600">"{query}"</span>
      </h1>

      {isLoading && <p>Buscando noticias...</p>}

      {isError && (
        <p className="text-red-500">
          {(error as Error)?.message || "Error al buscar noticias"}
        </p>
      )}

      {!isLoading && !isError && items.length === 0 && (
        <p>No se encontraron noticias.</p>
      )}

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item: INews) => (
          <NewsCard
            key={item.id ?? item.slug ?? ""}
            title={item.title}
            slug={item.slug}
            summary={item.summary}
            author={item.author}
            category={item.category}
            mainImage={item.mainImage}
            publicationDate={item.publicationDate ?? ""}
            variant="default"
          />
        ))}
      </section>
    </main>
  );
}