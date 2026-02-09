import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="w-full min-h-[70vh] flex flex-col items-center justify-center text-center">
      
      <span className="mb-4 text-sm font-semibold uppercase tracking-widest text-yellow-600">
        ERROR
      </span>

      <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
        La página no existe
      </h1>

      <div className="h-1 w-16 bg-yellow-500 mb-6" />

      <p className="text-gray-600 max-w-md mb-8">
        La noticia que estás buscando no existe o fue movida.
        Podés volver a la portada para seguir leyendo las últimas noticias.
      </p>

      <Link
        to="/"
        className="inline-block rounded-md bg-yellow-500 px-6 py-3 font-semibold text-black hover:bg-yellow-400 transition"
      >
        Volver a inicio
      </Link>
    </main>
  );
}
