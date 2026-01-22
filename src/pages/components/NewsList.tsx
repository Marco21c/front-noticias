import { useGetNews } from "@/hooks/useGetNews";
import NewsCard from "../../components/ui/NewsCard"
export default function NewsList() {
  const { data, isLoading, isError } = useGetNews();
  if (isLoading) return <p>Cargando...</p>
  if (isError) return <p>Ocurrió un error</p>
  if (!data || data.length === 0) return <p>No hay noticias</p>

  const highlightedNews = data[0];
  const featuredNews = data[1];
  const defaultNews = data.slice(2, 5);

  return (
    <>
      <section className="mt-8 grid grid-cols-1 divide-x divide-y md:grid-cols-4 md:grid-rows-3 gap-2">
        {/* Noticia highlighted */}
        {highlightedNews && (
          <div className="md:col-span-3 md:row-span-2 divide-x divide-y">
            <NewsCard
              title={highlightedNews.title}
              summary={highlightedNews.summary}
              author={highlightedNews.author}
              category={highlightedNews.category}
              mainImage={highlightedNews.mainImage}
              publicationDate={highlightedNews.publicationDate}
              variant={'highlighted'}
            />
          </div>
        )}

        {/* Noticia featured */}
        {featuredNews && (
          <div className="md:col-start-4 md:row-span-3 divide-x divide-y">
            <NewsCard
              title={featuredNews.title}
              summary={featuredNews.summary}
              author={featuredNews.author}
              category={featuredNews.category}
              mainImage={featuredNews.mainImage}
              publicationDate={featuredNews.publicationDate}
              variant={'featured'}
            />
          </div>
        )}

        {/* Noticias default */}
        {defaultNews.map(item => (
          <div key={item.title} className="md:col-span-1 md:row-start-3 divide-x divide-y">
            <NewsCard
              title={item.title}
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
  )
}
