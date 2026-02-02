import { Button } from "@/components/ui/button";
import { categories } from "@/mocks/categoriesMocks";
import { useState } from "react";
import ListNews from "./components/ListNews";

export default function UpdateNew() {
  const [ category, setCategory] = useState("todas");

  return (
    <>
    <div className="border border-secondary-300 rounded rounded-lg p-8 mr-4 ml-12 md:mr-12 md:ml-32 my-12 flex">
        
         <ul className="mx-auto gap-6 px-4 py-2 flex justify-center bg-black/10 rounded rounded-lg">
            <li > <Button variant="ghost" onClick={() => setCategory("todas")} > Todas </Button> </li>
            {categories.map((category) => (
                <li key={category._id}> 
                  <Button variant="ghost" onClick={() => setCategory(category.name)}  > {category.name} </Button>
                </li>
            ))}
          </ul>       
    </div>
    <ListNews category={category}></ListNews> 
   </>
  )
}
