import { useNavigate, useParams } from "react-router-dom";
import { useUpdateCategory } from "@/features/categories/hooks/useUpdateCategories";
import FormCategories from "../components/FormCategories";
import { useGetCategoryById } from "@/features/categories/hooks/useGetCategories";
import type { ICategory } from "@/features/categories/types/Category.type.ts";

export default function EditCategory() {
  const { id } = useParams<{ id: string }>();
  const { data: category, isLoading } = useGetCategoryById(id!);
  const { mutate: updateCategory, isPending } = useUpdateCategory();
  const navigate = useNavigate();
  
  if (isLoading) return <p className="p-6 text-zinc-500">Cargando...</p>;

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
