import { useGetNews, useGetNewsPorCategories } from "@/hooks/useGetNews";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from "react";
import { Pencil, Trash2 } from "lucide-react";
import NewsCard from "@/components/ui/NewsCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDeleteNew } from "@/hooks/useUpdateNew";

interface Props {
  category: string;
}

export default function ListNews({category}: Props) {

    const { mutate: deleteNews, isPending } = useDeleteNew();
    const {data, isError, isLoading} = category == "todas" ? useGetNews(): useGetNewsPorCategories(category);
    const navigate = useNavigate();
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
    <div className="flex p-6 mx-24 my-12">
      <section className="mt-8 grid grid-cols-1 md:grid-cols-3 md:p-6 gap-4 border-x divide-x">
                   {invertedData?.map((news) => (
                     <div key={news._id}>
                        <div className="flex p-2 justify-end gap-2 ">
                        <Button onClick={() => navigate(`../edit/${news._id}`)}
                         variant="default" > <Pencil size={24} color="white"/> </Button>
                       <Button variant="destructive" onClick={() => {
                              if (confirm("¿Eliminar noticia?")) {
                                deleteNews(news._id); } }}>
                        <Trash2 size={24} color="white"/> </Button> 
                        </div>
                       <NewsCard {...news} variant="featured" />
                     </div>
                   ))}
      </section>
   </div>
  )
}
