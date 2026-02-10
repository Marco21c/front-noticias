import { useState, useRef, useEffect } from "react";
import { User, LogOut, Settings, LayoutPanelTop } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Button } from "./button";

type Props = {
  userName: string;
  onLogout: () => void;
  role: string;
};

export default function UserDropdown({ userName, onLogout, role }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
   
      <Button
        onClick={() => setOpen(!open)}
        variant={"warning"}> 
        
        <User size={18} />
        <span className="hidden sm:block text-sm font-medium">
          {userName}
        </span>
      </Button>

      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute right-0 mt-2 w-48
            rounded-xl bg-white shadow-lg
            border border-gray-200
            animate-in fade-in zoom-in-95
            z-50 " >
          <ul className="p-2 text-sm flex flex-col gap-1">
        <li>
          <button className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-gray-100 transition">
            <User size={18} />
            <span>Perfil</span>
          </button>
        </li>

        { role === "admin" || role === "editor" && (
       <li>
         <NavLink to="/panel" className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-gray-100 transition">
           <LayoutPanelTop size={18} />
           <span>Panel de Control</span>
         </NavLink>
       </li>
       )}
       <li>
         <button className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-gray-100 transition">
           <Settings size={18} />
           <span>Configuración</span>
         </button>
       </li>
       <li className="border-t mt-1 pt-1">
         <button
           onClick={onLogout}
           className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-gray-100 transition text-red-600"
         >
           <LogOut size={18} />
           <span>Cerrar sesión</span>
         </button>
       </li>
     </ul>

        </div>
      )}
    </div>
  );
}
