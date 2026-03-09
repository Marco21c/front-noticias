import { useNavigate } from "react-router-dom";
import { useCreateNew } from "@/features/news/hooks/useUpdateNew";
import FormNew from "@/features/panel/components/FormNew";
import NewsPreview from "@/features/panel/components/NewsPreview";
import { toast } from "sonner";
import { useState } from "react";
import type { INewsCreate } from "@/features/news/types/News.type.ts";

export default function AddNew() {
  const navigate = useNavigate();
  const { mutate, isPending, error } = useCreateNew();
  const [previewData, setPreviewData] = useState<Partial<INewsCreate>>({});

  const onSubmit = (data: INewsCreate) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Noticia creada correctamente");
        navigate("/panel/news");
      },
    });
  };

  return (
    <div className="px-6 md:px-12 py-10">
    
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
      
      <div className="lg:col-span-2 bg-white rounded-2xl border border-zinc-200 shadow-sm p-8">
        <FormNew
          onSubmit={onSubmit}
          isPending={isPending}
          serverError={error?.message || null}
          title="Crear noticia"
          submitText="Crear"
          onPreviewChange={setPreviewData}
          draftKey="new_article_draft"
        />
      </div>

      <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-6 max-h-[850px] overflow-y-auto">
        <NewsPreview data={previewData} />
      </div>

    </div>
  </div>
);
}
