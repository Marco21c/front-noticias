import { useCreateCategory } from "@/features/categories/hooks/useUpdateCategories";
import FormCategories from "../components/FormCategories";
import { useNavigate } from "react-router-dom";
import type { ICategory } from "@/features/categories/types/Category.type";

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
  <div className="flex justify-center mt-12 px-4">
    <div className="w-full max-w-md space-y-6">
      
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-bold text-gray-800">
          Nueva categoría
        </h2>
        <p className="text-sm text-gray-500">
          Creá una categoría para organizar las noticias
        </p>
      </div>

      <FormCategories
        onSubmit={handleSubmit}
        isLoading={isPending}
        submitLabel="Crear categoría"
      />
    </div>
  </div>
)};
