import NavItem from "../../components/ui/NavItem";
import { Button } from "@/components/ui/button";
import { Menu, Bell, User } from "lucide-react";
import SearchBar from "./SearchBar";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import OffCanvasMenu from "../../components/ui/OffCanvasMenu";
import { categories } from "@/mocks/categoriesMocks";
import { baseStyles } from "@/styles/styleLinkNav";
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

   const handleSearch = () => {
    //parametro => query: string
    //aqui va a ir la consulta para mostrar la noticia o por palabra 😎😛
    console.log("Búsqueda");
  }
 
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

            <Button variant={"warning"} size={"sm"} onClick={() => navigate("/login")}> <User className="hidden sm:block" /> Ingresar </Button>

            <Button variant={"outline"} size={"sm"}> <Bell className="hidden sm:block" /> Suscribirse </Button>
          </div>
        </div>

        <nav className="hidden md:block border-t border-gray-100">
          <ul className="mx-auto flex max-w-7xl gap-6 px-4 py-2">
            <NavLink to={"/"} className={baseStyles}> Ultimas noticias</NavLink>
            {categories.map((category) => (
              <NavItem key={category._id} name={category.name} _id={category._id} />
                
            ))}
          </ul>
        </nav>
      </header>
      <OffCanvasMenu open={open} onClose={() => setOpen(false)} categories={categories} />
    </>
  )
}
