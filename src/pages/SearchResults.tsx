import { useSearchParams } from "react-router-dom";
import { useSearchNews } from "@/hooks/useGetNews";
import NewsCard from "@/components/ui/NewsCard";
import type { INews } from "@/types/News.type";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.trim() ?? "";

  const shouldSearch = query.length > 0;

  const {
    data: news = [],
    isLoading,
    isError,
    error,
  } = useSearchNews(query, { enabled: shouldSearch });

  if (!query) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-6">
        <p className="text-gray-600">
          Ingresá un término para buscar noticias.
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

      {!isLoading && !isError && news.length === 0 && (
        <p>No se encontraron noticias.</p>
      )}

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {news.map((item: INews) => (
          <NewsCard
            key={item.id ?? item.slug}
            title={item.title}
            summary={item.summary}
            author={item.author}
            category={item.category}
            publicationDate={item.publicationDate}
            variant="default"
          />
        ))}
      </section>
    </main>
  );
}