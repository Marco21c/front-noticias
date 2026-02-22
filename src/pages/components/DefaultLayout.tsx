import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "../footer/Footer";

/**
 * Layout principal del sitio publico.
 * Incluye la barra de navegacion, el area de contenido y el footer.
 * 
 * @component
 * @returns {JSX.Element} Layout con navbar, outlet y footer
 */
export default function DefaultLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-100">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
