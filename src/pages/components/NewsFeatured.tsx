
import type { INews } from "@/types/News.type";
import NewsCard from "../../components/ui/NewsCard";

type Props = {
  data: INews[];
};

export default function NewsList({data}:Props) {
   
    return (
        <>
            <section className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-2 border-x divide-x">
             {data?.map((news) => (
               <div key={news._id}>
                 <NewsCard {...news} variant="featured" />
               </div>
             ))}
           </section>
        </>
    )
}
