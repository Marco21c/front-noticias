import { NavLink } from "react-router-dom"

type Props = {
    to: string;
    children: React.ReactNode;
}
export default function navItem({ to, children }: Props) {
  return (
    <NavLink to={to} className={({ isActive }) =>
    `
    relative inline-block px-3 py-1 mb-2
    font-medium md:text-base text-xs

    after:content-['']
    after:absolute after:left-0 after:-bottom-1
    after:h-[2px] after:w-full after:bg-black/10
    after:scale-x-0 after:origin-left
    after:transition-transform after:duration-300

    hover:after:scale-x-100
    ${isActive ? "after:scale-x-100" : ""}
    `}>
         {children}
    </NavLink>
  );
}
