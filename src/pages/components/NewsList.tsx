import NewsCard from "../../components/ui/NewsCard"
import { getNewsVariant } from "@/lib/newsVariant";
import type { News } from "@/types/news";


export default function NewsList({news}: {news: News[]}) {

    return (
        <section className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4"> 
            {news.map(item => (<NewsCard
                key={item.id}
                title={item.title}
                excerpt={item.summary}
                section={item.category}
                imageUrl={item.mainImage}
                publishedAt={item.publicationDate}
                author={item.author}
                variant={getNewsVariant(item)}
                />
            ))}
        </section>
    )
}