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
                        title={data[6].title}
                        summary={data[6].summary}
                        author={data[6].author}
                        category={data[6].category}
                        mainImage={data[6].mainImage}
                        publicationDate={data[6].publicationDate}
                        variant={'featured'}
                    />
                </div>
                <div className="md:col-start-2 md:row-span-1">
                    <NewsCard
                        title={data[7].title}
                        summary={data[7].summary}
                        author={data[7].author}
                        category={data[7].category}
                        mainImage={data[7].mainImage}
                        publicationDate={data[7].publicationDate}
                        variant={'featured'}
                    />
                </div>
                <div className="md:col-start-3 md:row-span-1">
                    <NewsCard
                        title={data[8].title}
                        summary={data[8].summary}
                        author={data[8].author}
                        category={data[8].category}
                        mainImage={data[8].mainImage}
                        publicationDate={data[8].publicationDate}
                        variant={'featured'}
                    />
                </div>
                <div className="md:col-start-4 md:row-span-1">
                    <NewsCard
                        title={data[9].title}
                        summary={data[9].summary}
                        author={data[9].author}
                        category={data[9].category}
                        mainImage={data[9].mainImage}
                        publicationDate={data[9].publicationDate}
                        variant={'featured'}
                    />
                </div>
            </section>
        </>
    )
}
