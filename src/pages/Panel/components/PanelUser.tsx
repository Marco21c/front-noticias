import { Outlet } from "react-router-dom";
import SideBarPanel from "./SideBarPanel";

/**
 * Layout principal del panel de administracion.
 * Incluye la barra lateral de navegacion y el area de contenido principal.
 * 
 * @component
 * @returns {JSX.Element} Layout con sidebar y outlet para rutas anidadas
 */
export default function PanelUser() {
  return (
    <div className="flex min-h-screen">
      <SideBarPanel />

      <main className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  );
}
