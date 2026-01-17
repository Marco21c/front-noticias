
import NewsCard from "../../components/ui/NewsCard"
import { newsMock } from "../mocks/newsMocks"


export default function NewsList() {
    const featuredNews = newsMock.filter(news => news.variant === 'featured');
    const regularNews = newsMock.filter(news => news.variant !== 'featured');

    const mainFeatured = featuredNews[0];
    const secondaryFeatured = featuredNews.slice(1);

    return (
        <section className="mt-8 space-y-10">
            {/* Main Featured News */}
            {mainFeatured && (
                <div>
                    <NewsCard {...mainFeatured} variant="featured" />
                </div>
            )}

            {/* Secondary Featured News */}
            {secondaryFeatured.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {secondaryFeatured.map(news => (
                        <NewsCard key={news.id} {...news} variant="featured" />
                    ))}
                </div>
            )}

            {/* Regular News */} 
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> 
                {regularNews.map((news) => (
                    <NewsCard key={news.id} {...news} />
                ))}
            </div>
        </section>
    )
}