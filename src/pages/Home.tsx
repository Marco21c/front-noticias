import NewsList from "./components/NewsList";
import { useEffect, useState } from "react";
import { getNews } from "../services/news.services";
import type { News } from "../types/news";


export default function Home() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getNews()
    .then((data) => {
      console.log('📰 Noticias recibidas:', data);
      console.log('🖼️ Primera noticia mainImage:', data[0]?.mainImage);
      setNews(data);
    })
    .catch((error) => {
      console.error("Error fetching news:", error);
    })
    .finally(()=> setLoading(false));
  }, []);

  return (
    <>
        <main className="max-w-6xl mx-auto px-4">

          <h1 className="text-3xl font-serif font-bold mt-8 mb-6 justify-center flex">
            Últimas Noticias
          </h1>

          { loading ? (
            <p className="text-gray-500"> Cargando noticias...</p>
          ) : ( <NewsList news= {news} /> ) }
          
          <br />

          <p className="text-gray-600">
            Ultimas noticias de politica, economía, deportes y más.
          </p>

        </main>
    </>
  );
}

