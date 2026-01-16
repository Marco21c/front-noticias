import { NavLink } from "react-router-dom"

type Props = {
    to: string;
    children: React.ReactNode;
    label: string;
}
export default function navItem({ to, children, label }: Props) {
  return (
    <NavLink to={to} className={({isActive}) => [
         "group relative flex items-center justify-center gap-1 ",
      "cursor-pointer font-medium text-black md:text-base text-xs",
      "px-3 py-2 rounded-full transition-colors",
      "hover:bg-white/10",
       "after:absolute after:left-0 after:-bottom-1",
      "after:h-0.5 after:bg-white-300 after:transition-all after:duration-300",
      isActive ? "after:w-full" : "after:w-0 group-hover:after:w-full",
    ].join(" ")}>
         {children}
    </NavLink>
  );
}
