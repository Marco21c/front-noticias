import { NavLink } from "react-router-dom"
import { baseStyles } from "@/styles/styleLinkNav";

interface NavItemProps {
  name: string;
  id?: string;
}

/**
 * Componente de item de navegacion para el menu principal.
 * Renderiza un enlace de navegacion con estilos base aplicados.
 * 
 * @component
 * @param {NavItemProps} props - Propiedades del componente
 * @param {string} props.name - Nombre de la categoria a mostrar y usar en la URL
 * @param {string} [props.id] - Identificador opcional de la categoria
 * @returns {JSX.Element} Enlace de navegacion estilizado
 */
export default function NavItem({ name }: NavItemProps) {
  return (
    <NavLink to={`/category/${name}`} className={baseStyles}>
         {name}
    </NavLink>
  );
}
