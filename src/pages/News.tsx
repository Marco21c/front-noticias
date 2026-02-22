import { useParams } from "react-router-dom";
import NewsDetail from "./components/NewsDetail";
import { useGetNews } from "../hooks/useGetNews";

/**
 * Pagina de detalle de una noticia individual.
 * Busca la noticia por su slug y muestra el detalle completo.
 * 
 * @component
 * @returns {JSX.Element} Pagina de detalle de noticia
 */
export default function News() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, isError } = useGetNews();

  if (isLoading) {
    return (
      <section className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-sm uppercase tracking-widest text-yellow-600 font-semibold mb-3">
          Cargando
        </p>
        <h2 className="font-serif text-3xl font-bold text-gray-800">
          Estamos preparando la noticia
        </h2>
        <p className="mt-4 text-gray-600">
          Un momento por favor...
        </p>
      </section>
    );
  }

  if (isError || !data) {
    return (
      <section className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-sm uppercase tracking-widest text-red-600 font-semibold mb-3">
          Error
        </p>
        <h2 className="font-serif text-3xl font-bold text-gray-800">
          Ocurrio un problema
        </h2>
        <p className="mt-4 text-gray-600">
          No pudimos cargar la noticia en este momento.
        </p>
      </section>
    );
  }

  const news = data.find(item => item.slug === slug);

  if (!news) {
    return (
      <section className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-sm uppercase tracking-widest text-gray-500 font-semibold mb-3">
          404
        </p>
        <h2 className="font-serif text-3xl font-bold text-gray-800">
          Noticia no encontrada
        </h2>
        <p className="mt-4 text-gray-600">
          La noticia que buscas no existe o fue eliminada.
        </p>
      </section>
    );
  }


  return <NewsDetail news={news} />;
}
