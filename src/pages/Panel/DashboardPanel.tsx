import { Link } from "react-router-dom";
import { FileText, Folder, PlusCircle } from "lucide-react";

/**
 * Dashboard principal del panel de administracion.
 * Muestra estadisticas basicas y enlaces rapidos a las secciones principales.
 * 
 * @component
 * @returns {JSX.Element} Pagina de dashboard con tarjetas de resumen
 */
export default function DashboardPanel() {
  return (
    <div className="px-6 md:px-12 py-10">
      <div className="max-w-6xl mx-auto space-y-10">
        <div>
          <h1 className="text-3xl font-semibold text-zinc-900">
            Dashboard
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Bienvenido al panel. Gestiona tu contenido y revisa el estado de tu sitio.
          </p>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-500">Noticias</p>
                <p className="text-2xl font-semibold mt-1">0</p>
              </div>
              <FileText className="text-zinc-400" />
            </div>
          </div>

          <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-500">Categorias</p>
                <p className="text-2xl font-semibold mt-1">0</p>
              </div>
              <Folder className="text-zinc-400" />
            </div>
          </div>

          <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
            <div>
              <p className="text-sm text-zinc-500">Que quieres hacer ahora?</p>
              <div className="mt-3 space-y-2">
                <Link
                  to="/panel/new"
                  className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                >
                  <PlusCircle size={16} />
                  Crear noticia
                </Link>

                <Link
                  to="/panel/categories"
                  className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                >
                  <PlusCircle size={16} />
                  Gestionar categorias
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
