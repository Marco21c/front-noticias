import NewsList from "./components/NewsList";
import NewsFeatured from "./components/NewsFeatured";
import OthersNews from "./components/OthersNews";
import { useGetNews } from "@/hooks/useGetNews";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from "react";

export default function Home() {
   
  const { data , isLoading, isError } = useGetNews();


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
         
                 <h1 className="text-2xl font-serif font-bold mt-10 mb-4 border-b-4 border-gray-600"> Destacadas</h1>
                 <NewsList data={invertedData.slice(0,5)}/>
          
                {invertedData.length >= 5 && (
                  <>
                           <h2>Importantes</h2>
                           <NewsFeatured data={invertedData.slice(5,9)} />
                  </>
                )}
     
                {invertedData.length >= 8 && (
                  <>
                    <h2>Otras Noticias</h2>
                    <OthersNews data={invertedData.slice(9,17)} />
                  </>
                )}
           
               </main>
             </>
    
  );
}

