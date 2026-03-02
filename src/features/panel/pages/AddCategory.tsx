import { useCreateCategory } from "@/features/categories/hooks/useUpdateCategories";
import FormCategories from "../components/FormCategories";
import { useNavigate } from "react-router-dom";
import type { ICategory } from "@/features/categories/types/Category.type.ts";

export default function AddCategory() {
  const { mutate: createCategory, isPending } = useCreateCategory();
  const navigate = useNavigate();
  
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
