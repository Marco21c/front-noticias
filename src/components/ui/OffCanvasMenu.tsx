import { X } from "lucide-react";
import { NavLink } from "react-router-dom";

type Category = {
  name: string;
  to: string;
};

const categories: Category[] = [
  { name: "Últimas noticias", to: "/" },
  { name: "Economía", to: "/economia" },
  { name: "Internacional", to: "/internacional" },
];

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function OffCanvasMenu({ open, onClose }:Props) {
 
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
          {categories.map((cat) => (
            <NavLink
              key={cat.to}
              to={cat.to}
              onClick={onClose}
              className="px-3 py-2 rounded hover:bg-gray-100"
            >
              {cat.name}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}
