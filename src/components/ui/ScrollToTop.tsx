import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Componente que hace scroll al inicio de la pagina cuando cambia la ruta.
 * Se coloca en el layout para aplicar a todas las paginas.
 * 
 * @component
 * @returns {null} No renderiza nada
 */
export default function ScrollToTop(): null {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
}
