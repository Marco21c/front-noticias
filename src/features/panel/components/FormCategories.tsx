import { useForm } from "react-hook-form";
import type { ICategory } from "@/features/categories/types/Category.type.ts";
import { Button } from "@/shared/components/ui/button";

interface FormCategoriesProps {
  initialValues?: Partial<ICategory>;
  onSubmit: (data: Partial<ICategory>) => void;
  isLoading?: boolean;
  submitLabel?: string;
}

export default function FormCategories({
  initialValues,
  onSubmit,
  isLoading = false,
  submitLabel = "Guardar",
}: FormCategoriesProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<ICategory>>({
    defaultValues: {
      name: "",
      description: "",
      isActive: true,
      ...initialValues,
    },
  });

  return (
  <div className="flex justify-center items-start mt-12 px-4">
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-6"
    >
      <div className="space-y-2">
        <label className=" font-medium text-gray-700">
          Nombre
        </label>
        <input
          className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm 
                    focus:outline-none focus:ring-2 focus:ring-blue-700 
                    focus:border-blue-700 transition"
          {...register("name", { required: "El nombre es obligatorio" })}
        />
        {errors.name && (
          <p className="text-red-500 text-xs">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="font-medium text-gray-700">
          Descripción
        </label>
        <textarea
        rows={4}
          className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm 
                    focus:outline-none focus:ring-2 focus:ring-blue-700 
                    focus:border-blue-700 transition resize-none"
          {...register("description")}
        />
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          className= "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          {...register("isActive")}
        />
        <span>Categoría activa</span>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className= "w-full rounded-xl py-2.5 font-medium"
      >
        {isLoading ? "Guardando..." : submitLabel}
      </Button>
    </form>
  </div>
);
}
