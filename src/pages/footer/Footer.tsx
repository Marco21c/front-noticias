import ScrollToTop from "@/components/ui/ScrollToTop";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useGetCategories } from "@/hooks/useGetCategories";

type FooterLink = {
  label: string;
  path: string;
};

/**
 * Enlaces del footer para paginas informativas.
 */
const footerLinks: FooterLink[] = [
  { label: "Sobre nosotros", path: "/about-us" },
  { label: "Contacto", path: "/contact" },
  { label: "Terminos y condiciones", path: "/terms-and-conditions" },
  { label: "Politica de privacidad", path: "/policies" },
];

/**
 * Componente de pie de pagina del sitio.
 * Incluye enlaces a categorias, paginas informativas y redes sociales.
 * 
 * @component
 * @returns {JSX.Element} Footer con navegacion y redes sociales
 */
export default function Footer() {
  const { data: categories = [] } = useGetCategories();
  
  return (
    <footer className="bg-secondary/40 border-t border-2 mt-12">
      <ScrollToTop />
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-4">
        <div>
          <h2 className="text-2xl font-bold mb-3">
            WebNoticias
          </h2>
          <p className="text-sm text-neutral-600">
            Noticias actualizadas las 24 horas. Politica, economia,
            deportes, tecnologia y mucho mas, en un solo lugar.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Secciones Principales</h3>
          <ul className="flex flex-col space-y-2 text-sm">
            {categories.slice(0,4).map(
              (category) => (
                <NavLink key={category.id} to={`/category/${category.name}`} 
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
          
          <h3 className="font-semibold mb-4">Informacion</h3>
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
            <a href="#" className="hover:text-black/70 transition cursor-pointer" target="_blank" rel="noopener noreferrer">
              <Facebook size={25} />
            </a>
            <a href="#" className="hover:text-black/70 transition cursor-pointer" target="_blank" rel="noopener noreferrer">
              <Twitter size={25} />
            </a>
            <a href="#" className="hover:text-black/70 transition cursor-pointer" target="_blank" rel="noopener noreferrer">
              <Instagram size={25} />
            </a>
            <a href="#" className="hover:text-black/70 transition cursor-pointer" target="_blank" rel="noopener noreferrer">
              <Youtube size={25} />
            </a>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 text-center text-xs text-neutral-500 py-4">
        (c) {new Date().getFullYear()} WebNoticias - Todos los derechos reservados
      </div>
    </footer>
  );
}
