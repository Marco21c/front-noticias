
import NewsCard from "../../components/ui/NewsCard"
import { newsMock } from "../mocks/newsMocks"


export default function NewsList() {
    return (
       <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {newsMock.map((news) => (
            <NewsCard
                key={news.id}
                title={news.title}
                excerpt={news.excerpt}
                section={news.section}
                imageUrl={news.imageUrl}
                publishedAt={news.publishedAt}
                variant={news.variant}
            />
        ))}
       </section>
    );
}