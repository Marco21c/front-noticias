import { useNavigate } from "react-router-dom";
import { useCreateNew } from "@/hooks/useUpdateNew";
import FormNew from "@/pages/Panel/components/FormNew";
import { toast } from "sonner";
import type { INewsCreate } from "@/types/News.type";

export default function AddNew() {
  const navigate = useNavigate();
  const { mutate, isPending, error } = useCreateNew();

  const onSubmit = (data: INewsCreate) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Noticia creada correctamente", {  });
        navigate("/panel/news");
      },
    });
  };

return (
  <div className="px-6 md:px-12 py-10">
    
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
      
      {/* Formulario */}
      <div className="lg:col-span-2 bg-white rounded-2xl border border-zinc-200 shadow-sm p-8">
        <FormNew
          onSubmit={onSubmit}
          isPending={isPending}
          serverError={error?.message || null}
          title="Crear noticia"
          submitText="Crear"
        />
      </div>

      {/* Vista previa */}
      <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-6">
          Vista previa
        </h2>

        <div className="rounded-xl border border-zinc-100 p-4">
          <div className="bg-zinc-100 h-40 rounded-md mb-4"></div>
          <div className="h-4 bg-zinc-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-zinc-100 rounded w-full mb-1"></div>
          <div className="h-3 bg-zinc-100 rounded w-5/6"></div>
        </div>
      </div>

    </div>
  </div>
);
}