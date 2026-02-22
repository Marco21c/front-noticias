import { useGetNews, useGetNewsPorCategories } from "@/hooks/useGetNews";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from "react";
import PanelNewsCard from "./PanelNewsCard";
import { useNavigate } from "react-router-dom";
import { useDeleteNew } from "@/hooks/useUpdateNew";

interface Props {
  category: string;
}

/**
 * Componente de lista de noticias para el panel de administracion.
 * Permite filtrar por categoria y muestra tarjetas con opciones de edicion y eliminacion.
 * 
 * @component
 * @param {Props} props - Propiedades del componente
 * @param {string} props.category - Categoria para filtrar (vacío muestra todas)
 * @returns {JSX.Element} Grid de tarjetas de noticias
 */
export default function ListNews({ category }: Props) {
  const { mutate: deleteNews } = useDeleteNew();
  const allNewsQuery = useGetNews();
  const categoryNewsQuery = useGetNewsPorCategories(category === "todas" ? "" : category);

  const { data, isError, isLoading } = category === "todas" 
    ? allNewsQuery 
    : { 
        data: categoryNewsQuery.data, 
        isError: categoryNewsQuery.isError, 
        isLoading: categoryNewsQuery.isLoading 
      };

  const navigate = useNavigate();
  const invertedData = useMemo(
    () => (data ? [...data].reverse() : []),
    [data]
  );

  if (isLoading)
    return (
      <div className="space-y-3 mt-10">
        <Skeleton className="h-40 w-full rounded-xl" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    );

  if (isError) return <p className="p-6 text-zinc-500">Ocurrio un error</p>;
  if (!data || data.length === 0) return <p className="p-6 text-zinc-500">No hay noticias</p>;

  return (
    <div className="px-6 md:px-8 pb-12">
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
        {invertedData.map((news) => (
          <PanelNewsCard
            key={news.id}
            {...news}
            onEdit={() => navigate(`../edit/${news.id}`)}
            onDelete={() => {
              if (window.confirm("Eliminar noticia?")) {
                deleteNews(news.id);
              }
            }}
          />
        ))}
      </section>
    </div>
  );
}
