import { useGetNewsPorCategories } from "@/hooks/useGetNews";
import { useParams } from "react-router-dom";
import NewsList from "./components/NewsList";
import NewsFeatured from "./components/NewsFeatured";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from "react";
import OthersNews from "./components/OthersNews";


export default function NewsCategory() {
    const { id } = useParams();
     const { data, isLoading, isError }  = useGetNewsPorCategories (id!);

          
    const invertedData = useMemo(
    () => (data ? [...data].reverse() : []),
    [data]
  );

   if (isLoading) return <div className="space-y-3 mt-10">
      <Skeleton className="h-40 w-full rounded-xl" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
    if (isError) return <p>Ocurrió un error</p>
    if (!data || data.length === 0) return <p>No hay noticias</p>
  

  
    return (
        <>
          <main className="max-w-6xl mx-auto px-4">
    
            <h1 className="text-2xl font-serif font-bold mt-10 mb-4 border-b-4 border-gray-600">{id}</h1>
            <NewsList data={invertedData.slice(0,5)}/>
     
           {data.length >= 5 && (
             <>
                      <h2>Importantes</h2>
                      <NewsFeatured data={invertedData.slice(5,9)} />
             </>
           )}

           {data.length >= 10 && (
             <>
               <h2>Otras Noticias</h2>
               <OthersNews data={invertedData.slice(9,17)} />
             </>
           )}

           
          </main>
        </>
      );
  
}
