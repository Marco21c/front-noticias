import { useSearchParams } from "react-router-dom";
import { useSearchNews } from "@/hooks/useGetNews";
import NewsCard from "@/components/ui/NewsCard";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const { data: news = [], isLoading: loading, isError: error } = useSearchNews(query);

  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="mb-6 text-2xl font-semibold">
        Resultados para:{" "}
        <span className="italic text-gray-600">"{query}"</span>
      </h1>

      {loading && <p>Buscando noticias...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && news.length === 0 && (
        <p>No se encontraron noticias.</p>
      )}

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {news.map((item: any) => (
          <NewsCard key={item.id} news={item} />
        ))}
      </section>
    </main>
  );
}