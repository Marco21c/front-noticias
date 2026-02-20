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
      className={`
        h-screen
        bg-zinc-950 text-zinc-200
        border-r border-zinc-800
        transition-all duration-300
        ${open ? "w-64" : "w-20"}
        flex flex-col justify-between
      `}
    >
      {/* Top */}
      <div>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-5 border-b border-zinc-800">
          {open && (
            <h1 className="text-sm font-semibold tracking-wide text-white">
              Panel de Control
            </h1>
          )}

          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-lg hover:bg-zinc-800 transition"
          >
            <Menu size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 p-3 mt-4">
          {links.map(({ name, icon: Icon, href }) => (
            <NavLink
              key={name}
              to={href}
              className={({ isActive }) =>
                `
                flex items-center gap-3
                px-3 py-2 rounded-xl
                text-sm font-medium
                transition-all
                ${
                  isActive
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                }
              `
              }
            >
              <Icon size={18} />
              {open && <span>{name}</span>}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom */}
      <div className="p-4 border-t border-zinc-800">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-xl
                    text-sm font-medium text-zinc-400
                    hover:bg-red-500/10 hover:text-red-400
                    transition"
        >
          <LogOut size={18} />
          {open && <span>Salir</span>}
        </button>
      </div>
    </aside>
  );
}
