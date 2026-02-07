import { NavLink } from "react-router-dom"
import type { ICategory } from "@/types/Category.type"; 
import { baseStyles } from "@/styles/styleLinkNav";

export default function NavItem({ name, _id }: ICategory) {
  return (
    <NavLink to={`/category/${name}`} className={baseStyles}>
         {name}
    </NavLink>
  );
}
