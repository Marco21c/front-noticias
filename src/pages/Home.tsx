import { useMemo } from "react";
import { useGetNews } from "@/features/news/hooks/useGetNews";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { AlertTriangle, Newspaper } from "lucide-react";

import NewsList from "@/features/news/components/NewsList";
import NewsFeatured from "@/features/news/components/NewsFeatured";
import OthersNews from "@/features/news/components/OthersNews";

export default function Home() {
  const { data, isLoading, isError } = useGetNews();
  const { heroNews, importantNews, otherNews } = useMemo(() => {
    if (!data) return { heroNews: [], importantNews: [], otherNews: [] };

    // Ordenar todas las noticias desde la más reciente a la más vieja
    const sortedData = [...data].sort((a, b) => new Date(b.publicationDate!).getTime() - new Date(a.publicationDate!).getTime());

    const highlighted = sortedData.filter(n => n.variant === 'highlighted');
    const featured = sortedData.filter(n => n.variant === 'featured');
    const defaults = sortedData.filter(n => n.variant === 'default' || !n.variant);

    // 1. Destacadas: 1 destacada principal, 1 importante y 3 por defecto
    const mainHighlighted = highlighted.slice(0, 1);
    const firstFeatured = featured.slice(0, 1);
    const firstDefaults = defaults.slice(0, 3);
    const heroNews = [...mainHighlighted, ...firstFeatured, ...firstDefaults];

    // 2. Importantes: Las 4 noticias que le siguen a la importante
    const importantNews = featured.slice(1, 5);

    // 3. Otras noticias: La destacada que envejeció + llenar con defaults
    const remainingHighlighted = highlighted.slice(1);
    const remainingFeatured = featured.slice(5);
    const remainingDefaults = defaults.slice(3);
    
    const pool = [...remainingHighlighted, ...remainingFeatured, ...remainingDefaults].sort(
      (a, b) => new Date(b.publicationDate!).getTime() - new Date(a.publicationDate!).getTime()
    );
    // Tomar 7 para el listado inferior
    const otherNews = pool.slice(0, 7);

    return { heroNews, importantNews, otherNews };
  }, [data]);

  if (isLoading)
    return (
      <div className="max-w-6xl mx-auto px-4 mt-12 space-y-4">
        <Skeleton className="h-40 w-full rounded-xl" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    );

  if (isError) {
    return (
      <div className="mt-20 flex flex-col items-center text-center">
        <AlertTriangle className="mb-4 w-12 h-12 text-red-500" />

        <h2 className="mb-2 font-serif text-2xl font-bold">
          Ocurrio un error
        </h2>

        <p className="max-w-md text-gray-600">
          No pudimos cargar las noticias en este momento.
          Por favor, intenta nuevamente mas tarde.
        </p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="mt-20 flex flex-col items-center text-center">
        <Newspaper className="mb-4 w-12 h-12 text-gray-400" />

        <h2 className="mb-2 font-serif text-2xl font-bold">
          No hay noticias disponibles
        </h2>

        <p className="max-w-md text-gray-600">
          Todavia no se publicaron noticias.
          Volve mas tarde para ver las novedades.
        </p>
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 pb-20">
      <section className="mt-8">
        <h1 className="font-sans text-sm uppercase tracking-[0.2em] font-bold mb-4 text-gray-900 border-b-2 border-black pb-2">
          Destacadas
        </h1>

        <NewsList data={heroNews} />
      </section>

      {importantNews.length > 0 && (
        <section className="mt-16">
          <h2 className="font-sans text-sm uppercase tracking-[0.2em] font-bold mb-4 text-gray-900 border-b-2 border-black pb-2">
            Importantes
          </h2>

          <NewsFeatured data={importantNews} />
        </section>
      )}

      {otherNews.length > 0 && (
        <section className="mt-16">
          <h2 className="font-sans text-sm uppercase tracking-[0.2em] font-bold mb-4 text-gray-900 border-b-2 border-black pb-2">
            Otras noticias
          </h2>

          <OthersNews data={otherNews} />
        </section>
      )}
    </main>
  );
}
