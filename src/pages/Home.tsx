import { useMemo } from "react";
import { useGetNews } from "@/hooks/useGetNews";
import { Skeleton } from "@/components/ui/skeleton";

import NewsList from "./components/NewsList";
import NewsFeatured from "./components/NewsFeatured";
import OthersNews from "./components/OthersNews";

export default function Home() {
  const { data, isLoading, isError } = useGetNews();

  const invertedData = useMemo(
    () => (data ? [...data].reverse() : []),
    [data]
  );

  if (isLoading)
    return (
      <div className="max-w-6xl mx-auto px-4 mt-12 space-y-4">
        <Skeleton className="h-40 w-full rounded-xl" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    );

  if (isError) return <p className="text-center mt-10">Ocurrió un error</p>;
  if (!data || data.length === 0)
    return <p className="text-center mt-10">No hay noticias</p>;

  return (
    <main className="max-w-6xl mx-auto px-4 pb-16">
      {/* ===== DESTACADAS ===== */}
      <section className="mt-12">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">
          Destacadas
        </h1>
        <div className="h-1 w-30 bg-yellow-500 mb-8" />

        <NewsList data={invertedData.slice(0, 5)} />
      </section>

      {/* ===== IMPORTANTES ===== */}
      {invertedData.length >= 5 && (
        <section className="mt-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-2">
            Importantes
          </h2>
          <div className="h-px w-full bg-yellow-500 mb-6" />

          <NewsFeatured data={invertedData.slice(5, 9)} />
        </section>
      )}

      {/* ===== OTRAS NOTICIAS ===== */}
      {invertedData.length >= 8 && (
        <section className="mt-16">
          <h2 className="mt-14 mb-6 text-xl font-serif font-semibold border-l-4 border-gray-400 pl-3">
            Otras noticias
          </h2>
          <div className="h-px w-full bg-yellow-400 mb-6" />

          <OthersNews data={invertedData.slice(9, 17)} />
        </section>
      )}
    </main>
  );
}
