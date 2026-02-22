import { useNavigate, useParams } from "react-router-dom";
import { useUpdateCategory } from "@/hooks/useUpdateCategories";
import FormCategories from "./components/FormCategories";
import { useGetCategoryById } from "@/hooks/useGetCategories";

export default function EditCategory() {
  const { id } = useParams<{ id: string }>();
  const { data: category, isLoading } = useGetCategoryById(id!);
  const { mutate: updateCategory, isPending} = useUpdateCategory();
  const navigate = useNavigate();
  if (isLoading) return <p>Cargando...</p>;

 const handleSubmit = (data: any) => {
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
      <h2 className="text-xl font-semibold mb-4 text-center">Editar categoría</h2>

      <FormCategories
        initialValues={category}
        onSubmit={handleSubmit}
        isLoading={isPending}
        submitLabel="Actualizar categoría"
      />
    </div>
  );
}