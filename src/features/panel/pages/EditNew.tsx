import { useNavigate, useParams } from "react-router-dom";
import FormNew from "../components/FormNew";
import NewsPreview from "../components/NewsPreview";
import type { INewsCreate } from "@/features/news/types/News.type.ts";
import { useGetNew } from "@/features/news/hooks/useGetNews";
import { useUpdateNew } from "@/features/news/hooks/useUpdateNew";
import { useState } from "react";

export default function EditNew() {
  const { id } = useParams();
  const { data } = useGetNew(id);
  const { mutate, isPending } = useUpdateNew();
  const navigate = useNavigate();
  const [previewData, setPreviewData] = useState<Partial<INewsCreate>>({});

  if (!id || !data) return null;

  const onSubmit = (form: INewsCreate) => {
    mutate({ id, payload: form },
      {
        onSuccess: () => navigate("/panel/news"),
      }
    );
  };

  const defaultValues = {
    ...data,
    category: data.category?.id || '',
  } as Partial<INewsCreate>;

  return (
    <div className="px-6 md:px-12 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        <div className="lg:col-span-2 bg-white rounded-2xl border border-zinc-200 shadow-sm p-8">
          <FormNew
            defaultValues={defaultValues}
            onSubmit={onSubmit}
            isPending={isPending}
            title="Editar noticia"
            submitText="Actualizar"
            onPreviewChange={setPreviewData}
            draftKey={`edit_article_${id}`}
          />
        </div>

        <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-6 max-h-[850px] overflow-y-auto">
          <NewsPreview data={Object.keys(previewData).length > 0 ? previewData : defaultValues} />
        </div>

      </div>
    </div>
  );
}
