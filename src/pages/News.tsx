import { useParams } from "react-router-dom";
import NewsDetail from "./components/NewsDetail";
import { useGetNews } from "../hooks/useGetNews";

export default function News() {
  const { slug } = useParams<{ slug: string }>();

  const { data, isLoading, isError } = useGetNews();

  if (isLoading) {
    return <p className="p-10">Cargando noticia...</p>;
  }

  if (isError || !data) {
    return <p className="p-10 text-red-500">Ocurrió un error</p>;
  }


  const news = data.find(
    item => item.slug === slug
  );

  if (!news) {
    return <p className="p-10 text-red-500">Noticia no encontrada</p>;
  }

  return <NewsDetail news={news} />;
}
