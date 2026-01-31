import dayjs from "dayjs";
import type { INews } from "../../interfaces/News.type";

type Props = {
    news: INews;
};

export default function NewsDetail({news}:Props) {
    return (
        <article className="mx-auto max-w-3xl px-4 py-10">
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">
                {news.category}
            </p>

            <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-4">
                {news.title}
            </h1>

            <p className="text-xl text-gray-700 mb-6">
                {news.summary}
            </p>

            <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                <span>Por {news.author}</span>
                <time>
                    {dayjs(news.publicationDate).format("DD [de] MM [de] YYYY")}
                </time>
            </div>

            {news.mainImage && (
                <img src={news.mainImage}
                    alt={news.title}
                    className="w-full rounded-md mb-10"/>
            )}

            <div className="prose prose-lg max-w-none leading-relaxed">
                {news.content}
            </div>

            {news.highlights.length > 0 && (
                <aside className="mt-12 border-l-4 border-gray-300 pl-4">
                    <h3 className="font-semibold mb-3">
                    Claves de la noticia
                    </h3>
                    <ul className="list-disc ml-4 space-y-1 text-gray-700">
                    {news.highlights.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                    </ul>
                </aside>
            )}
        </article>
    )
}