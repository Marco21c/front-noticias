import { useEffect, useState } from "react";
import type { INewsCreate } from "@/features/news/types/News.type.ts";
import { useGetCategories } from "@/features/categories/hooks/useGetCategories";

interface NewsPreviewProps {
  data: Partial<INewsCreate>;
}

export default function NewsPreview({ data }: NewsPreviewProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const { data: categories = [] } = useGetCategories();

  const selectedCategory = categories.find(c => c.id === data.category);
  const categoryName = selectedCategory ? selectedCategory.name : "Categoría";

  useEffect(() => {
    let isActive = true;
    // Manejar Blob/File object desde Multer Dropzone o un string de la BD
    if (data.mainImage instanceof File) {
      const objectUrl = URL.createObjectURL(data.mainImage);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (isActive) setImageSrc(objectUrl);
      return () => {
        isActive = false;
        URL.revokeObjectURL(objectUrl); // cleanup memory leak
      };
    } else if (typeof data.mainImage === "string") {
      if (isActive) setImageSrc(data.mainImage);
    } else {
      if (isActive) setImageSrc(null);
    }
    return () => { isActive = false; };
  }, [data.mainImage]);

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-6 flex-shrink-0">
        Vista previa en vivo
      </h2>
      <div className="rounded-xl border border-zinc-100 p-4 bg-white shadow-sm flex-1">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="Preview portada"
            className="w-full h-48 object-cover rounded-md mb-4 bg-zinc-100"
          />
        ) : (
          <div className="w-full h-48 bg-zinc-100 rounded-md mb-4 flex items-center justify-center text-zinc-400 text-sm border border-dashed border-zinc-300">
            Sin imagen principal
          </div>
        )}
        
        <div className="flex flex-wrap gap-2 mb-3">
          {data.variant && data.variant !== 'default' && (
            <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-semibold uppercase">
              {data.variant === 'highlighted' ? 'Destacada' : 'Principal'}
            </span>
          )}
          {data.category && (
            <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-semibold">
              {categoryName}
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
          {data.title || "Título de tu noticia..."}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {data.summary || "Escribe un breve resumen para atrapar a los lectores. Este texto aparecerá en las tarjetas y portadas de la web noticias."}
        </p>
        
        {data.highlights && data.highlights.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-auto pt-4 border-t border-zinc-100">
            {data.highlights.map((tag, idx) => (
              <span key={idx} className="bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded text-xs">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
