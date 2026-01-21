import { useGetNews } from "@/hooks/useGetNews";
import NewsCard from "../../components/ui/NewsCard"
export default function NewsList() {
    const { data, isLoading, isError } = useGetNews();
    if (isLoading) return <p>Cargando...</p>
    if (isError) return <p>Ocurrió un error</p>
    if (!data || data.length === 0) return <p>No hay noticias</p>

    return (
        <>
            <section className="mt-8 grid grid-cols-1 md:grid-cols-4 md:grid-rows-1 gap-2 border-x divide-x">
                <div className="md:col-start-1 md:row-span-1">
                    <NewsCard
                        title={data[0].title}
                        summary={data[0].summary}
                        author={data[0].author}
                        category={data[0].category}
                        mainImage={data[0].mainImage}
                        publicationDate={data[0].publicationDate}
                        variant={'featured'}
                    />
                </div>
                <div className="md:col-start-2 md:row-span-1">
                    <NewsCard
                        title={data[1].title}
                        summary={data[1].summary}
                        author={data[1].author}
                        category={data[1].category}
                        mainImage={data[1].mainImage}
                        publicationDate={data[1].publicationDate}
                        variant={'featured'}
                    />
                </div>
                <div className="md:col-start-3 md:row-span-1">
                    <NewsCard
                        title={data[2].title}
                        summary={data[2].summary}
                        author={data[2].author}
                        category={data[2].category}
                        mainImage={data[2].mainImage}
                        publicationDate={data[2].publicationDate}
                        variant={'featured'}
                    />
                </div>
                <div className="md:col-start-4 md:row-span-1">
                    <NewsCard
                        title={data[3].title}
                        summary={data[3].summary}
                        author={data[3].author}
                        category={data[3].category}
                        mainImage={data[3].mainImage}
                        publicationDate={data[3].publicationDate}
                        variant={'featured'}
                    />
                </div>
            </section>
        </>
    )
}
