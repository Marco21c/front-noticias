import NewsList from "./components/NewsList";
import NewsFeatured from "./components/NewsFeatured";
import OthersNews from "./components/OthersNews";
import { useGetNews } from "@/hooks/useGetNews";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
   
  const { data , isLoading, isError } = useGetNews();
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

        <h1 className="text-2xl font-serif font-bold mt-10 mb-2 border-b-4 border-gray-600">Destacadas</h1>
        <NewsList data={data.slice(0,6)}/>

        <h2 className="text-2xl font-serif font-bold mt-10 mb-2 border-b-4 border-gray-600">Importantes</h2>
        <NewsFeatured data={data.slice(6,10)}/>

        <h2 className="text-2xl font-serif font-bold mt-10 mb-2 border-b-4 border-gray-600">Otras Noticias</h2>
        <OthersNews data={data.slice(10,18)}/>
        <p className="text-gray-600">
          Ultimas noticias de politica, economía, deportes y más.
        </p>

      </main>
    </>
  );
}

