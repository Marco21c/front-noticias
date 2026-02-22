import { useNavigate, useParams } from "react-router-dom";
import FormNew from "./components/FormNew";
import type { INewsCreate } from "@/types/News.type";
import { useGetNew } from "@/hooks/useGetNews";
import { useUpdateNew } from "@/hooks/useUpdateNew";

/**
 * Pagina para editar una noticia existente.
 * Carga los datos de la noticia y permite modificarlos.
 * 
 * @component
 * @returns {JSX.Element | null} Formulario de edicion o null si no hay ID
 */
export default function EditNew() {
  const { id } = useParams();
  const { data } = useGetNew(id);
  const { mutate, isPending } = useUpdateNew();
  const navigate = useNavigate();
  
  if (!id) return null;

  /**
   * Maneja el envio del formulario de edicion.
   * 
   * @param {INewsCreate} form - Datos actualizados de la noticia
   */
  const onSubmit = (form: INewsCreate) => {
    mutate({ id, payload: form },
      {
        onSuccess: () => navigate("/panel/news"),
      }
    );
  };

  if (!data) return null;

  const defaultValues = {
    ...data,
    category: data.category?.id || '',
  };

  return (
    <div className="border border-secondary-300 justify-center rounded-lg p-8 mr-4 ml-12 md:mr-12 md:ml-32 my-12 bg-secondary/90 flex">

    <FormNew
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      isPending={isPending}
      title="Editar noticia"
      submitText="Actualizar"
    />
    </div>
  );
}
