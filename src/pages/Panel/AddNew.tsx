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