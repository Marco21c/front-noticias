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
  <div className="flex justify-center items-start mt-10">
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md space-y-4 rounded-xl bg-white/20 p-6 shadow-lg"
    >
      <div>
        <label className="label pb-4">Nombre</label>
        <input
          className="input input-bordered w-full  border rounded-xl border-gray-300 p-2"
          {...register("name", { required: "El nombre es obligatorio" })}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">
            {errors.name.message}
          </p>
        )}
      </div>
      <div>
        <label className="label pb-4">Descripcion</label>
        <textarea
          className="textarea textarea-bordered w-full border rounded-xl border-gray-300 p-2"
          {...register("description")}
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          className="checkbox"
          {...register("isActive")}
        />
        <span>Activa</span>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="btn btn-primary w-full"
      >
        {isLoading ? "Guardando..." : submitLabel}
      </Button>
    </form>
  </div>
);
}
