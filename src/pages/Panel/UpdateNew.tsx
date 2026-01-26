import { Button } from "@/components/ui/button";
import { categories } from "@/mocks/categoriesMocks";
import { useState } from "react";
import { useGetNews, useGetNewsPorCategories } from "@/hooks/useGetNews";
import NewsList from "../components/NewsFeatured";
import { Skeleton } from "@/components/ui/skeleton";

export default function UpdateNew() {
  const [ category, setCategory] = useState("todas");
  const {data, isError, isLoading} = category == "todas" ? useGetNews(): useGetNewsPorCategories(category);
   
   if (isLoading) return <div className="space-y-3 mt-10">
      <Skeleton className="h-40 w-full rounded-xl" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
    if (isError) return <p>Ocurrió un error</p>
    if (!data || data.length === 0) return <p>No hay noticias</p>
  

   
  return (
    <>
    <div className="border border-secondary-300 rounded rounded-lg p-8 mr-4 ml-12 md:mr-12 md:ml-32 my-12 flex">
        
         <ul className="mx-auto gap-6 px-4 py-2 flex justify-center bg-black/10 rounded rounded-lg">
            <li > <Button variant="ghost" onClick={() => setCategory("todas")} > Todas </Button> </li>
            {categories.map((category) => (
                <li > 
                  <Button variant="ghost" onClick={() => setCategory(category.name)}  > {category.name} </Button>
                </li>
            ))}
          </ul>
         
    </div>
   <div className="flex p-6 mx-24 my-12">
      <NewsList data={data}/>
   </div>
   </>
  )
}
