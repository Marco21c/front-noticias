import { useNavigate } from "react-router-dom";
import type { INewsCreate } from "@/interfaces/News.type";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { categories } from "@/mocks/categoriesMocks";
import type { ICategory } from "@/interfaces/Category.type";
import { useState } from "react";
import { toast } from "sonner";

export default function AddNew() {
  const navigate = useNavigate();
  const { mutate, isPending } = useCreateNew();
  const [tags, setTags] = useState<string[]>([]);
  const [input, setInput] = useState(""); 
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<INewsCreate>();

  const onSubmit = (data: INewsCreate) => {
    mutate(data, {
      onSuccess: () => {
      toast.success("Noticia creada correctamente. ", {
        description: "La noticia se guardó exitosamente"
      });

      setTimeout(() => navigate("/panel/news"), 700);
    },
    onError: () => {
      toast.error("Error al crear la noticia.",{
        description: "No se pudo crear la noticia"
      });
    },   });
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 border border-secondary-300 rounded rounded-lg p-8 mr-4 ml-12 md:mr-12 md:ml-32 my-12 bg-secondary/90 flex">

    <FormNew
      onSubmit={onSubmit}
      isPending={isPending}
      serverError={error?.message || null}
      title="Crear noticia"
      submitText="Crear"
    />
     <div className="grid justify-center p-12">
                <h1 className="text-center text-lg font-semibold"> Vista Previa </h1>

                <div className="bg-red-300/90 h-80 w-80">
                       
                </div>
        </div>
    </div>
  );
}
