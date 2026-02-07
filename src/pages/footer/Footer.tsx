import ScrollToTop from "@/components/ui/ScrollToTop";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { NavLink } from "react-router-dom";
import { categories } from "@/mocks/categoriesMocks";

type FooterLink = {
  label: string;
  path: string;
};

const footerLinks: FooterLink[] = [
  { label: "Sobre nosotros", path: "/about-us" },
  { label: "Contacto", path: "/contact" },
  { label: "Términos y condiciones", path: "/terms-and-conditions" },
  { label: "Política de privacidad", path: "/policies" },
];

export default function Footer() {
  return (
    <footer className="bg-secondary/40 border-top border-2 mt-12">
      <ScrollToTop />
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-4">
        <div>
          <h2 className="text-2xl font-bold mb-3">
            WebNoticias
          </h2>
          <p className="text-sm text-neutral-600">
            Noticias actualizadas las 24 horas. Política, economía,
            deportes, tecnología y mucho más, en un solo lugar.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Secciones Principales</h3>
          <ul className="flex flex-col space-y-2 text-sm">
            {categories.slice(0,4).map(
              (category) => (
                <NavLink key={category._id} to={`/category/${category.name}`} 
                className={({ isActive }) =>
                  `transition hover:text-black/70 ${
                    isActive ? "font-semibold text-black" : "text-neutral-600"
                  }`
                }>
                  {category.name}
                </NavLink>  
                 ) )}
          </ul>
        </div>

        <div>
          
          <h3 className="font-semibold mb-4">Información</h3>
            <ul className="space-y-2 text-sm">
          {footerLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `transition hover:text-black/70 ${
                    isActive ? "font-semibold text-black" : "text-neutral-600"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
        </div>

       
        <div>
          <h3 className="font-semibold mb-4">Seguinos</h3>
          <div className="flex gap-4">
            <a className="hover:text-black/70 transition cursor-pointer" target="_blank">
              <Facebook size={25} />
            </a>
            <a className="hover:text-black/70 transition cursor-pointer" target="_blank">
              <Twitter size={25} />
            </a>
            <a className="hover:text-black/70 transition cursor-pointer" target="_blank">
              <Instagram size={25} />
            </a>
            <a className="hover:text-black/70 transition cursor-pointer" target="_blank">
              <Youtube size={25} />
            </a>
          </div>
        </div>
      </div>
      
      <div className="border-t border-4 text-center text-xs text-neutral-500 py-4">
        © {new Date().getFullYear()} WebNoticias — Todos los derechos reservados
      </div>
    </footer>
  );
}
