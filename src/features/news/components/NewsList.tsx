import type { INews } from "@/features/news/types/News.type.ts";
import NewsCard from "./NewsCard";

type Props = {
  data: INews[];
};

export default function NewsList({ data }: Props) {

  const highlightedNews = data[0];
  const featuredNews = data[1];
  const defaultNews = data.slice(2, 5);

  return (
    <>
      <section className="mt-8 border-t-4 border-black pt-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {highlightedNews && (
            <div className="md:col-span-8 md:border-r border-gray-300 md:pr-6">
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

          <div className="md:col-span-4 flex flex-col gap-6">
            {featuredNews && (
              <div className="border-b border-gray-300 pb-6">
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

            <div className="flex flex-col gap-6 divide-y divide-gray-300">
              {defaultNews.map(item => (
                <div key={item.id || item.slug} className="pt-6 first:pt-0">
                  <NewsCard
                    title={item.title}
                    slug={item.slug}
                    summary={item.summary}
                    author={item.author}
                    category={item.category}
                    mainImage={item.mainImage}
                    publicationDate={item.publicationDate}
                    variant={'default'}
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
