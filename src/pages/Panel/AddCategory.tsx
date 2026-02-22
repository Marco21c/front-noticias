import { useCreateCategory } from "@/hooks/useUpdateCategories";
import FormCategories from "./components/FormCategories";
import { useNavigate } from "react-router-dom";
import type { ICategory } from "@/types/Category.type";

/**
 * Pagina para crear una nueva categoria.
 * Muestra un formulario de creacion y redirige a la lista tras el exito.
 * 
 * @component
 * @returns {JSX.Element} Pagina con formulario de creacion de categoria
 */
export default function AddCategory() {
  const { mutate: createCategory, isPending } = useCreateCategory();
  const navigate = useNavigate();
  
  /**
   * Maneja el envio del formulario de creacion de categoria.
   * @param {Partial<ICategory>} data - Datos de la nueva categoria
   */
  const handleSubmit = (data: Partial<ICategory>) => {
    createCategory(data, {
      onSuccess: () => {
        navigate("/panel/categories"); 
      },
    });
  };
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-center">Nueva categoria</h2>

      <FormCategories
        onSubmit={handleSubmit}
        isLoading={isPending}
        submitLabel="Crear categoria"
      />
    </div>
  );
}
