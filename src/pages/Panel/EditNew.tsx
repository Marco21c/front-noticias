import { useNavigate, useParams } from "react-router-dom";
import FormNew from "./components/FormNew";
import type { INewsCreate } from "@/types/News.type";
import { useGetNew } from "@/hooks/useGetNews";
import { useUpdateNew } from "@/hooks/useUpdateNew";

export default function EditNew() {
  const { id } = useParams();
  const { data } = useGetNew(id);
  const { mutate, isPending } = useUpdateNew();
  const navigate = useNavigate();
  if (!id) return null;

  const onSubmit = (form: INewsCreate) => {
    mutate({ id, payload:form },
         {
      onSuccess: () => navigate("/panel/news"),
    }
    );
    
  };

  if (!data) return null;

  return (
   <div className="border border-secondary-300 justify-center rounded rounded-lg p-8 mr-4 ml-12 md:mr-12 md:ml-32 my-12 bg-secondary/90 flex">

    <FormNew
      defaultValues={data}
      onSubmit={onSubmit}
      isPending={isPending}
      title="Editar noticia"
      submitText="Actualizar"
    />
    </div>
  );
}
