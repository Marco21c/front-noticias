import type { INews } from "@/types/News.type";
import NewsCard from "../../components/ui/NewsCard";

type Props = {
  data: INews[];
};

/**
 * Componente que muestra noticias en un grid de 4 columnas.
 * Todas las noticias se muestran con variante 'featured'.
 * 
 * @component
 * @param {Props} props - Propiedades del componente
 * @param {INews[]} props.data - Lista de noticias a mostrar
 * @returns {JSX.Element} Grid de noticias destacadas
 */
export default function NewsFeatured({data}: Props) {
    return (
        <>
            <section className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-2 border-x divide-x">
             {data?.map((news) => (
               <div key={news.id}>
                 <NewsCard {...news} variant="featured" />
               </div>
             ))}
           </section>
        </>
    )
}
