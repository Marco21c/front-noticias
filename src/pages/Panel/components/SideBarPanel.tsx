import { useState } from "react";
import { LayoutDashboard, Newspaper, PlusSquare, Folder, Menu, LogOut, } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const links = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/panel/dashboard" },
  { name: "Noticias", icon: Newspaper, href: "/panel/news" },
  { name: "Crear", icon: PlusSquare, href: "/panel/new" },
  { name: "Categorias", icon: Folder, href: "/panel/categories" }
];

export default function AdminSidebar() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  return (
    <aside
      className={`h-screen
    bg-zinc-900 text-white
    border-r border-zinc-800
    transition-all duration-300
        ${open ? "w-64" : "w-16"}
        flex flex-col justify-between `}  >

      <div>
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          {open && <h1 className="font-bold"> Panel de Control</h1>}
          <button onClick={() => setOpen(!open)}>
            <Menu size={20} />
          </button>
        </div>

        <nav className="flex flex-col gap-1 p-2">
          {links.map(({ name, icon: Icon, href }) => (
            <NavLink
              key={name}
              to={href}
              className=" flex items-center gap-3
                p-3 rounded-xl
                hover:bg-zinc-800
                transition
                text-sm " >
              <Icon size={18} />
              {open && <span>{name}</span>}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-3 border-t border-zinc-800">
        <Button variant="outline" className=" flex items-center gap-3
            w-full p-2 rounded-lg
            hover:bg-white-600/20 text-black" onClick={() => navigate("/")} >
          <LogOut size={18} />
          {open && <span>Salir</span>}
        </Button>
      </div>
    </aside>
  );
}
