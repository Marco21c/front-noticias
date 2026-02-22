import { Link } from "react-router-dom";

/**
 * Pagina de error 404 para rutas no encontradas.
 * Muestra un mensaje de error y un boton para volver al inicio.
 * 
 * @component
 * @returns {JSX.Element} Pagina 404 con mensaje y link de regreso
 */
export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      
      <span className="mb-4 text-sm font-semibold uppercase tracking-widest text-yellow-600">
        ERROR
      </span>

      <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
        La pagina no existe
      </h1>

      <div className="h-1 w-16 bg-yellow-500 mb-6" />

      <p className="text-gray-600 max-w-md mb-8">
        La noticia que estas buscando no existe o fue movida.
        Podes volver a la portada para seguir leyendo las ultimas noticias.
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
