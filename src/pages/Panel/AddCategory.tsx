import { useCreateCategory } from "@/hooks/useUpdateCategories";
import FormCategories from "./components/FormCategories";
import { useNavigate } from "react-router-dom";

export default function AddCategory() {
  const { mutate: createCategory, isPending } = useCreateCategory();
  const navigate = useNavigate();
  const handleSubmit = (data: any) => {
    createCategory(data, {
      onSuccess: () => {
        navigate("/panel/categories"); 
      },
    });
  };
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-center">Nueva categoría</h2>

      <FormCategories
        onSubmit={handleSubmit}
        isLoading={isPending}
        submitLabel="Crear categoría"
      />
    </div>
  );
}