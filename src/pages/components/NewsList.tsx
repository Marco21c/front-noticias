import type { INews } from "@/types/News.type";
import NewsCard from "../../components/ui/NewsCard";

type Props = {
  data: INews[];
};

/**
 * Componente que muestra una lista de noticias en un layout de grid destacado.
 * La primera noticia se muestra como destacada, la segunda como principal
 * y las siguientes tres como default.
 * 
 * @component
 * @param {Props} props - Propiedades del componente
 * @param {INews[]} props.data - Lista de noticias a mostrar (max 5)
 * @returns {JSX.Element} Grid de noticias con layout especial
 */
export default function NewsList({ data }: Props) {

  const highlightedNews = data[0];
  const featuredNews = data[1];
  const defaultNews = data.slice(2, 5);

  return (
    <>
      <section className="mt-8 grid grid-cols-1 divide-x divide-y md:grid-cols-4 md:grid-rows-3 gap-2">

        {highlightedNews && (
          <div className="md:col-span-3 md:row-span-2 divide-x divide-y">
            <NewsCard
              title={highlightedNews.title}
              slug={highlightedNews.slug}
              summary={highlightedNews.summary}
              author={highlightedNews.author}
              category={highlightedNews.category}
              mainImage={highlightedNews.mainImage}
              publicationDate={highlightedNews.publicationDate}
              variant={'highlighted'}
            />
          </div>
        )}

        {featuredNews && (
          <div className="md:col-start-4 md:row-span-3 divide-x divide-y">
            <NewsCard
              title={featuredNews.title}
              slug={featuredNews.slug}
              summary={featuredNews.summary}
              author={featuredNews.author}
              category={featuredNews.category}
              mainImage={featuredNews.mainImage}
              publicationDate={featuredNews.publicationDate}
              variant={'featured'}
            />
          </div>
        )}

        {defaultNews.map(item => (
          <div key={item.title} className="md:col-span-1 md:row-start-3 divide-x divide-y">
            <NewsCard
              title={item.title}
              slug={item.slug}
              summary={item.summary}
              author={item.author}
              category={item.category}
              publicationDate={item.publicationDate}
              variant={'default'}
            />
          </div>
        ))}

      </section>
    </>
  );
}
