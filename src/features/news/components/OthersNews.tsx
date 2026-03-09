import type { INews } from "@/features/news/types/News.type.ts";
import NewsCard from "./NewsCard";

type Props = {
  data: INews[];
};

export default function OthersNews({data}: Props) {
    const col1 = data.slice(0, 2);
    const col2 = data.slice(2, 4);
    const col3 = data.slice(4, 7);

    return (
        <>
            <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:divide-x divide-gray-300">
                
                <div className="md:pr-6 flex flex-col gap-6 divide-y divide-gray-300">
                    {col1.map((item) => (
                        <div key={item.id || item.slug} className="pt-6 first:pt-0">
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
                </div>

                <div className="md:px-6 flex flex-col gap-6 divide-y divide-gray-300">
                    {col2.map((item) => (
                        <div key={item.id || item.slug} className="pt-6 first:pt-0">
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
                </div>

                <div className="md:pl-6 flex flex-col gap-6 divide-y divide-gray-300">
                    {col3.map((item) => (
                        <div key={item.id || item.slug} className="pt-6 first:pt-0">
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
                </div>

            </section>
        </>
    )
}
