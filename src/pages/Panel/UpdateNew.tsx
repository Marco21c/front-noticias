import { Button } from "@/components/ui/button";
import { useGetCategories } from "@/hooks/useGetCategories";
import { useState } from "react";
import ListNews from "./components/ListNews";

export default function UpdateNew() {
  const [category, setCategory] = useState("todas");
  const { data: categories = [] } = useGetCategories();

  return (
    <div className="p-6 md:p-8">
      
      {/* Filtro de categorías */}
      <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-6 mb-8">
        <ul className="flex flex-wrap justify-center gap-4">
          <li>
            <Button
              variant={category === "todas" ? "default" : "ghost"}
              onClick={() => setCategory("todas")}
            >
              Todas
            </Button>
          </li>

          {categories.map((cat) => (
            <li key={cat.id}>
              <Button
                variant={category === cat.name ? "default" : "ghost"}
                onClick={() => setCategory(cat.name)}
              >
                {cat.name}
              </Button>
            </li>
          ))}
        </ul>
      </div>

      {/* Lista */}
      <ListNews category={category} />
    </div>
  );
}

