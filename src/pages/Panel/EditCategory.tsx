import { useNavigate, useParams } from "react-router-dom";
import { useUpdateCategory } from "@/hooks/useUpdateCategories";
import FormCategories from "./components/FormCategories";
import { useGetCategoryById } from "@/hooks/useGetCategories";
import type { ICategory } from "@/types/Category.type";

/**
 * Pagina para editar una categoria existente.
 * Carga los datos de la categoria y permite modificarlos.
 * 
 * @component
 * @returns {JSX.Element} Formulario de edicion de categoria
 */
export default function EditCategory() {
  const { id } = useParams<{ id: string }>();
  const { data: category, isLoading } = useGetCategoryById(id!);
  const { mutate: updateCategory, isPending } = useUpdateCategory();
  const navigate = useNavigate();
  
  if (isLoading) return <p className="p-6 text-zinc-500">Cargando...</p>;

  /**
   * Maneja el envio del formulario de edicion.
   * @param {Partial<ICategory>} data - Datos actualizados de la categoria
   */
  const handleSubmit = (data: Partial<ICategory>) => {
    updateCategory(
      {
        id: id!,
        category: data,
      },
      {
        onSuccess: () => {
          navigate("/panel/categories");
        },
      }
    );
  };
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-center">Editar categoria</h2>

      <FormCategories
        initialValues={category}
        onSubmit={handleSubmit}
        isLoading={isPending}
        submitLabel="Actualizar categoria"
      />
    </div>
  );
}
