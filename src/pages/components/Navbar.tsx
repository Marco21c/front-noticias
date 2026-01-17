import NavItem from "../../components/ui/NavItem";
import { Button } from "@/components/ui/Button";
import { Search, Menu, Bell } from "lucide-react";


const categories = [
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
  return (
    <>
      <header className="w-full border-b border-gray-300">
      
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3"> 
        <div className="flex items-center gap-3">
          <Menu className="h-6 w-6 cursor-pointer mr-2 text-gray-600 hover:text-black" />
          <span className="text-2xl font-serif font-bold tracking-tight"> WebNoticias </span>
        </div>
        <div className="flex items-center gap-3">
          <Bell className="h-6 w-6 cursor-pointer text-gray-600 hover:text-black"/>
          <Search className="h-6 w-6 cursor-pointer text-gray-600 hover:text-black" />
          <Button variant={"warning"} > Iniciar Sesión </Button>
          <Button variant={"outline"} > Suscribirse </Button>
        </div>
      </div>

      <nav className="border-t border-gray-100">
        <ul className="mx-auto flex max-w-7xl gap-6 px-4 py-2">
          {categories.map((category) => (
            <NavItem key={category.to}  to={category.to}>
              {category.name}
            </NavItem>
          ))}
        </ul>
      </nav>
    </header>
    </>
  )
}
