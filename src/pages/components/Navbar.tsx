import NavItem from "../../components/ui/NavItem";
import { Button } from "@/components/ui/Button";
import { Menu, Bell, User } from "lucide-react";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import OffCanvasMenu from "./OffCanvasMenu";
type Category = {
  name: string,
  to: string
};

const categories:Category[] = [
  { name: "Ultimas noticias",
    to: "/"
    } , 
  { name: "Economia",
    to: "/economia" 
  },
  { name: "Internacional",
    to: "/internacional"
  },
   { name: "Cultura",
    to: "/cultura"
  }
]
export default function Navbar() {
   const [open, setOpen] = useState(false);
   const navigate = useNavigate();
   const handleSearch = (query:string) => {
    //aqui va a ir la consulta para mostrar la noticia o por palabra 😎😛
    console.log("Si funciona.")
   }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-gray-300 bg-white">
      
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3"> 
        <div className="flex items-center gap-3">
          <Menu className="md:h-6 md:w-6 h-5 w-5 cursor-pointer md:mr-2 text-gray-600 hover:text-black" onClick={()=> setOpen(true) }/>
          <span className="md:text-2xl xs:text-xl font-serif font-bold tracking-tight"> WebNoticias </span>
        </div>
        <div className="flex items-center gap-3">
          <SearchBar onSearch={handleSearch} /> 
           
          <Button variant={"warning"} size={"sm"} onClick={()=> navigate("/")}> <User className="hidden sm:block"/> Ingresar </Button>
          <Button variant={"outline"} size={"sm"}> <Bell className="hidden sm:block" onClick={()=> navigate("/")}/> Suscribirse </Button>
        </div>
      </div>

      <nav className="hidden md:block border-t border-gray-100">
        <ul className="mx-auto flex max-w-7xl gap-6 px-4 py-2">
          {categories.map((category) => (
            <NavItem key={category.to}  to={category.to}>
              {category.name}
            </NavItem>
          ))}
        </ul>
      </nav>
    </header>
      <OffCanvasMenu open={open} onClose={() => setOpen(false)} />
    </>
  )
}
