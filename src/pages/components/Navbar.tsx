import NavItem from "../../components/ui/NavItem";
import { NavLink } from "react-router";
import { Search, Menu } from "lucide-react";
import navItem from "@/components/ui/NavItem";

const categories = [
  { name: "Ultimas noticias",
    to: "/"
    } , 
  { name: "Economia",
    to: "/economia" 

  }
]
export default function Navbar() {
  return (
    <>
      <header className="flex">
           <Menu/>
           <span> WebNoticias </span>
           <Search/>

      </header>
      <nav>
             <ul className="flex">
                {categories.map( category => (
                   <NavItem  to={category.to} label={category.name}> {category.name}</NavItem>
                ) )}
             </ul>
      </nav>
    </>
  )
}
