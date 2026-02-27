import { NavLink } from "react-router-dom"
import { baseStyles } from "@/shared/styles/styleLinkNav";

interface NavItemProps {
  name: string;
  id?: string;
}

export default function NavItem({ name, id }: NavItemProps) {
  return (
    <NavLink to={`/category/${id}`} className={baseStyles}>
         {name}
    </NavLink>
  );
}
