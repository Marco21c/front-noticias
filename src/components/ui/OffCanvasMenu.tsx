import { X } from "lucide-react";
import type { ICategory } from "@/types/Category.type";
import NavItem from "./NavItem";
import { NavLink } from "react-router-dom";
import { baseStyles } from "@/styles/styleLinkNav";

type Props = {
  open: boolean;
  onClose: () => void;
  categories: ICategory[];
};

/**
 * Menu lateral desplegable para dispositivos moviles.
 * Muestra las categorias y enlaces de navegacion principal.
 * 
 * @component
 * @param {Props} props - Propiedades del componente
 * @param {boolean} props.open - Estado de visibilidad del menu
 * @param {() => void} props.onClose - Funcion para cerrar el menu
 * @param {ICategory[]} props.categories - Lista de categorias a mostrar
 * @returns {JSX.Element} Menu lateral animado con overlay
 */
export default function OffCanvasMenu({ open, onClose, categories }: Props) {
  
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={onClose}
        />
      )}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-white z-50
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <span className="font-semibold font-serif mt-1"> WebNoticias</span>
          <X className="cursor-pointer" onClick={onClose} />
        </div>

        <nav className="flex flex-col gap-2 p-4">
            <NavLink to={"/"} className={baseStyles}> Ultimas noticias</NavLink>
          {categories.map((category) => (
                <NavItem key={category.id} name={category.name} />
          ))}
        </nav>
      </aside>
    </>
  )
}
