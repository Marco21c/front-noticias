import { useEffect, useState } from "react";

/**
 * Hook que detecta el scroll y determina si un elemento debe ocultarse.
 * Oculta el elemento cuando se hace scroll hacia abajo mas alla del umbral.
 * 
 * @param {number} [threshold=80] - Cantidad de pixels de scroll para activar
 * @returns {boolean} True si el elemento debe ocultarse
 * 
 * @example
 * const hidden = useHideOnScroll(100);
 * <nav className={hidden ? "-translate-y-full" : "translate-y-0"} />
 */
export default function useHideOnScroll(threshold = 80) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastScroll = window.scrollY;

    const handleScroll = () => {
      const current = window.scrollY;

      if (current > lastScroll && current > threshold) {
        setHidden(true);
      } else {
        setHidden(false); 
      }

      lastScroll = current;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return hidden;
}
