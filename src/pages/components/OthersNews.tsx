import type { INews } from "@/types/News.type";
import NewsCard from "../../components/ui/NewsCard";

type Props = {
  data: INews[];
};

/**
 * Componente que muestra noticias adicionales en un layout complejo.
 * La primera noticia es featured, las siguientes dos son default,
 * y las ultimas cinco tambien son default.
 * 
 * @component
 * @param {Props} props - Propiedades del componente
 * @param {INews[]} props.data - Lista de noticias a mostrar (hasta 8)
 * @returns {JSX.Element} Grid complejo de noticias adicionales
 */
export default function OthersNews({data}: Props) {
    const featuredNews = data[0];
    const defaultNews = data.slice(1, 3);
    const othersNews = data.slice(3, 8);

    return (
        <>
            <section className="mt-8 grid grid-cols-1 md:grid-cols-4 md:grid-rows-4 gap-2 border-x divide-x">
                {featuredNews && (
                    <div className="md:col-span-2 md:row-span-2">
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

                {defaultNews.map((item, index) => (
                    <div key={index} className="md:col-start-3 md:col-span-2 md:row-span-1">
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

                {othersNews.map((item, index) => (
                    <div key={index} className="md:col-span-1 md:row-span-2">
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
