import { useGetNewsPorCategories } from "@/features/news/hooks/useGetNews";
import { useParams } from "react-router-dom";
import NewsList from "@/features/news/components/NewsList";
import NewsFeatured from "@/features/news/components/NewsFeatured";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { useMemo } from "react";
import OthersNews from "@/features/news/components/OthersNews";

export default function NewsCategory() {
    const { id } = useParams();
    const { data, isLoading, isError } = useGetNewsPorCategories(id!);

          
    const invertedData = useMemo(
    () => (data ? [...data].reverse() : []),
    [data]
  );

  if (isLoading) return <div className="space-y-3 mt-10">
      <Skeleton className="h-40 w-full rounded-xl" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
    if (isError) return <p>Ocurrio un error</p>
    if (!data || data.length === 0) return <p>No hay noticias</p>

  
return (
  <main className="max-w-6xl mx-auto px-4 pb-20">

    <header className="mt-12 mb-10">
      <p className="uppercase tracking-widest text-sm text-yellow-600 font-semibold mb-2">
        Categoria
      </p>

      <h1 className="text-4xl md:text-5xl font-serif font-bold capitalize">
        {id}
      </h1>

      <div className="h-1 w-24 bg-yellow-500 mt-4" />
    </header>

    <section className="mb-16">
      <NewsList data={invertedData.slice(0, 5)} />
    </section>

    {data.length >= 5 && (
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">
          Importantes
        </h2>
        <div className="h-px w-full bg-gray-300 mb-6" />

        <NewsFeatured data={invertedData.slice(5, 9)} />
      </section>
    )}

    {data.length >= 10 && (
      <section>
        <h2 className="text-2xl font-bold mb-4">
          Otras noticias
        </h2>
        <div className="h-px w-full bg-gray-300 mb-6" />

        <OthersNews data={invertedData.slice(9, 17)} />
      </section>
    )}
  </main>
);
}
