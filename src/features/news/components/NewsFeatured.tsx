import type { INews } from "@/features/news/types/News.type.ts";
import NewsCard from "./NewsCard";

type Props = {
  data: INews[];
};

export default function NewsFeatured({data}: Props) {
    return (
        <>
            <section className="mt-12 border-t border-b border-black py-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:divide-x divide-gray-300">
                 {data?.map((news) => (
                   <div key={news.id} className="md:px-6 first:pl-0 last:pr-0">
                     <NewsCard {...news} variant="featured" />
                   </div>
                 ))}
              </div>
            </section>
        </>
    )
}
