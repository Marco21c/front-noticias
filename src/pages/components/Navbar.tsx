import NavItem from "../../components/ui/NavItem";
import { Button } from "@/components/ui/button";
import { Menu, Bell, User } from "lucide-react";
import SearchBar from "./SearchBar";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import OffCanvasMenu from "../../components/ui/OffCanvasMenu";
import { useGetCategories } from "@/hooks/useGetCategories";
import { baseStyles } from "@/styles/styleLinkNav";
import useHideOnScroll from "@/components/ui/useHideOnScroll";
import { useAuth } from "@/contexts/AuthContext";
import UserDropdown from "@/components/ui/UserDropdown";
import { toast } from "sonner";
import { USER_ROLES, type UserRole } from "@/types/User.type";

/**
 * Barra de navegacion principal del sitio.
 * Incluye logo, buscador, menu de usuario y navegacion por categorias.
 * Se adapta a dispositivos moviles con un menu lateral desplegable.
 * 
 * @component
 * @returns {JSX.Element} Barra de navegacion con menu responsive
 */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const hidden = useHideOnScroll();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const { data: categories = [] } = useGetCategories();

  /**
   * Maneja la busqueda de noticias redirigiendo a la pagina de resultados.
   * @param {string} query - Termino de busqueda ingresado por el usuario
   */
  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  /**
   * Maneja el click en el boton de newsletter.
   * Verifica si el usuario esta autenticado antes de permitir la suscripcion.
   */
  const handleNewsletterClick = () => {
    if (!isAuthenticated) {
      toast.warning("Inicia sesion para suscribirte", {
        description: "Seras redirigido al login...",
      });
      setTimeout(() => navigate('/login'), 2000);
    } else {
      navigate('/newsletter');
    }
  };
  
  /**
   * Obtiene el rol del usuario o un valor por defecto.
   * @returns {UserRole} Rol del usuario autenticado
   */
  const getUserRole = (): UserRole => {
    return user?.role ?? USER_ROLES.USER;
  };
  
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-gray-300 bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Menu className="md:h-6 md:w-6 h-5 w-5 cursor-pointer md:mr-2 text-gray-600 hover:text-black" onClick={() => setOpen(true)} />
            <span className="md:text-2xl xs:text-xl font-serif font-bold tracking-tight">WebNoticias </span>
          </div>
          <div className="flex items-center gap-3">
            <SearchBar onSearch={handleSearch} />
             { isAuthenticated
             ? (
              <div className="flex">
                <UserDropdown 
                  userName={user?.name ?? "Usuario"} 
                  onLogout={logout} 
                  role={getUserRole()} 
                />
              </div>
             )
             : (<Button variant={"warning"} size={"sm"} onClick={() => navigate("/login")}> <User className="hidden sm:block" /> Ingresar </Button>)}
            <Button variant={"outline"} size={"sm"} onClick={handleNewsletterClick}> <Bell className="hidden sm:block" /> Newsletter </Button>
          </div>
        </div>
      </header>
       <nav className={` hidden md:block
            border-t border-gray-100
            sticky top-[64px] z-40 bg-white
            transition-transform duration-300
            ${hidden ? "-translate-y-full" : "translate-y-0"}`} >

          <ul className="mx-auto flex max-w-7xl gap-6 px-4 py-2 border-b border-gray-300">
            <NavLink to={"/"} className={baseStyles}> Ultimas noticias</NavLink>
            {categories.map((category) => (
              <NavItem key={category.id} name={category.name} />
            ))}
          </ul>
        </nav>
      <OffCanvasMenu open={open} onClose={() => setOpen(false)} categories={categories} />
    </>
  )
}
