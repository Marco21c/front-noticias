import { NavLink } from "react-router-dom"
import { baseStyles } from "@/styles/styleLinkNav";

interface NavItemProps {
  name: string;
}

export default function NavItem({ name }: NavItemProps) {
  return (
    <NavLink to={`/category/${name}`} className={baseStyles}>
         {name}
    </NavLink>
  );
}
