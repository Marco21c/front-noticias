import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  let title = "Ocurrió un error inesperado";
  let message =
    "Algo salió mal mientras cargábamos esta página. Intenta nuevamente.";

  // Error de React Router
  if (isRouteErrorResponse(error)) {
    title = `Error ${error.status}`;
    message = error.statusText;
  }

  // error JS 
  if (error instanceof Error) {
    message = error.message;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center bg-white">
      
      <span className="mb-4 text-sm font-semibold uppercase tracking-widest text-red-600">
        ERROR
      </span>

      <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
        {title}
      </h1>

      <div className="h-1 w-16 bg-red-500 mb-6" />

      <p className="text-gray-600 max-w-md mb-8">
        {message}
      </p>

      <Link
        to="/"
        className="inline-block rounded-md bg-black px-6 py-3 font-semibold text-white hover:bg-zinc-800 transition"
      >
        Volver al inicio
      </Link>
    </main>
  );
}