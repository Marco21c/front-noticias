import { useGetNews } from "@/hooks/useGetNews";
import NewsCard from "../../components/ui/NewsCard"
export default function NewsList() {
  const { data, isLoading, isError } = useGetNews()
  
  console.log("Llega a la vista.", data);
  if (isLoading) return <p>Cargando...</p>
  if (isError) return <p>Ocurrió un error</p>
  if (!data || data.length === 0) return <p>No hay noticias</p>

  //const principalNews = data[data.length - 1]
  const restNews = data.slice(0, -1)

  return (
    <section className="mt-8 space-y-8">
      {/* Noticia principal */}
      
      {/* Grid de noticias secundarias */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {restNews.map(item => (
          <NewsCard
            key={item.title}
            title={item.title}
            summary={item.summary}
            author={item.author}
            category={item.category}
            mainImage={item.mainImage}
            publicationDate={item.publicationDate}
            variant={item.variant}
          />
        ))}
      </div>
    </section>
  )
}
