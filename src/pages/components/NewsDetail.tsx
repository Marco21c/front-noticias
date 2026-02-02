import dayjs from "dayjs";
import type { INews } from "../../interfaces/News.type";

type Props = {
news: INews;
};

export default function NewsDetail({ news }: Props) {
return (
    <article className="mx-auto max-w-3xl px-4 py-10">
    
    <p className="text-m uppercase tracking-widest text-yellow-600 mb-3 font-extrabold">
        {news.category}
    </p>

    <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight mb-4">
        {news.title}
    </h1>


    <div className="h-1 w-30 bg-yellow-500 mb-6" />


    <p className="text-2xl text-gray-800 mb-5">
        {news.summary}
    </p>

    <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <span>Por {news.author}</span>
        <span className="text-yellow-600">•</span>
        <time>
            {dayjs(news.publicationDate).format("DD [de] MMMM [de] YYYY")}
        </time>
    </div>


    {news.mainImage && (
        <img
        src={news.mainImage}
        alt={news.title}
        className="w-full rounded-md mb-10"
        />
    )}

      {/* Línea horizontal */}
    <div className="h-px w-full bg-yellow-500 mb-8" />


    <div className="prose prose-lg max-w-none leading-relaxed">
        {news.content}
    </div>

    {news.highlights?.length > 0 && (
        <aside className="mt-12 border-l-4 border-yellow-400 pl-4 bg-yellow-50 py-4 rounded-r">
        <h3 className="font-semibold mb-3 text-yellow-700">
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
);
}
