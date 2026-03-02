import type { INews } from "@/features/news/types/News.type.ts";
import NewsCard from "./NewsCard";

type Props = {
  data: INews[];
};

export default function NewsFeatured({data}: Props) {
    return (
        <>
            <section className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-2 border-x divide-x">
             {data?.map((news) => (
               <div key={news.id}>
                 <NewsCard {...news} variant="featured" />
               </div>
             ))}
           </section>
        </>
    )
}
