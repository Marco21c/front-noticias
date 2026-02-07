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

export default function OffCanvasMenu({ open, onClose, categories }:Props) {
 
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
                <NavItem key={category._id} name={category.name} _id={category._id} />
          ))}
        </nav>
      </aside>
    </>
  )
}
