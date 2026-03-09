import { useForm, Controller } from "react-hook-form";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useState, useCallback, useEffect } from "react";
import { Button } from "@/shared/components/ui/button";
import { useGetCategories } from "@/features/categories/hooks/useGetCategories";
import type { INewsCreate } from "@/features/news/types/News.type.ts";
import { X, UploadCloud } from "lucide-react";
import { useDropzone } from "react-dropzone";

interface FormNewProps {
  defaultValues?: Partial<INewsCreate>;
  onSubmit: (data: INewsCreate) => void;
  isPending?: boolean;
  title?: string;
  serverError?: string | null;
  submitText?: string;
  onPreviewChange?: (values: Partial<INewsCreate>) => void;
  draftKey?: string;
}

export default function FormNew({ defaultValues, onSubmit, isPending, title = "Crear noticia", submitText = "Guardar", serverError, onPreviewChange, draftKey }: FormNewProps) {

  const [initialDraft] = useState<Partial<INewsCreate>>(() => {
    if (draftKey) {
      const saved = sessionStorage.getItem(`draft_${draftKey}`);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return { ...defaultValues, ...parsed };
        } catch {
          return defaultValues || {};
        }
      }
    }
    return defaultValues || {};
  });

  const { register, handleSubmit, setValue, watch, control, formState: { errors } } = useForm<INewsCreate>({ 
    defaultValues: Object.keys(initialDraft).length > 0 ? initialDraft : undefined
  });
  
  const { data: categories = [] } = useGetCategories();
  
  const mainImageFile = watch("mainImage");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setValue("mainImage", acceptedFiles[0]);
    }
  }, [setValue]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false
  });

  useEffect(() => {
    // Suscribirse a los cambios del form directamente usando la API de react-hook-form
    const subscription = watch((value) => {
      // 1. Actualizar el Preview
      if (onPreviewChange) {
        onPreviewChange(value as Partial<INewsCreate>);
      }
      
      // 2. Guardar en Drafts
      if (draftKey) {
        const draftData = { ...value };
        if (draftData.mainImage instanceof File) {
          delete draftData.mainImage;
        }
        sessionStorage.setItem(`draft_${draftKey}`, JSON.stringify(draftData));
      }
    });
    
    return () => subscription.unsubscribe();
  }, [watch, onPreviewChange, draftKey]);

  const [tags, setTags] = useState<string[]>(
    initialDraft.highlights || defaultValues?.highlights || []
  );
  const [input, setInput] = useState("");

  const addTag = (value: string) => {
    const clean = value.trim();
    if (!clean || tags.includes(clean)) return;

    const updated = [...tags, clean];
    setTags(updated);
    setValue("highlights", updated);
  };

  const removeTag = (tag: string) => {
    const updated = tags.filter((t) => t !== tag);
    setTags(updated);
    setValue("highlights", updated);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      e.stopPropagation();
      addTag(input);
      setInput("");
    }
  };

  const onSubmitHandler = (data: INewsCreate) => {
    if (draftKey) {
      sessionStorage.removeItem(`draft_${draftKey}`); // Delete draft on success trigger
    }
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="space-y-4 p-6 bg-white/90 rounded-2xl shadow-xl text-sm max-w-2xl"
    >
      <h2 className="text-2xl font-semibold text-center">{title}</h2>
      {serverError && (
        <div className="bg-red-100 text-red-600 p-3 rounded-lg text-sm">
          {serverError}
        </div>
      )}
      <input
        placeholder="Titulo"
        className="w-full border p-2 rounded-lg"
        {...register("title", { required: "El titulo es obligatorio" })}
      />
      {errors.title && <p className="text-red-500">{errors.title.message}</p>}

      <input
        placeholder="Resumen"
        className="w-full border p-2 rounded-lg"
        {...register("summary", { required: "El resumen es obligatorio" })}
      />
      {errors.summary && <p className="text-red-500">{errors.summary.message}</p>}

      <div 
        {...getRootProps()} 
        className={`w-full border-2 border-dashed p-6 flex flex-col items-center justify-center cursor-pointer rounded-lg transition-colors ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'
        }`}
      >
        <input {...getInputProps()} />
        <UploadCloud className="w-10 h-10 text-gray-400 mb-2" />
        {mainImageFile ? (
          <p className="text-sm font-medium text-blue-600 text-center break-all">
            {mainImageFile instanceof File ? mainImageFile.name : mainImageFile}
          </p>
        ) : (
          <div className="text-center">
            <p className="text-sm text-gray-600">Arrastra una imagen o haz click para seleccionar</p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP hasta 5MB</p>
          </div>
        )}
      </div>
      {errors.mainImage && <p className="text-red-500">{errors.mainImage.message as string}</p>}

      <div className="bg-white rounded-lg flex flex-col pt-2">
        <label className="text-sm font-medium mb-1 text-gray-700">Contenido enriquecido</label>
        <Controller
          name="content"
          control={control}
          rules={{ 
            required: "El contenido es obligatorio",
            validate: (value) => 
              (value && value.replace(/<[^>]*>/g, '').trim() !== '') || "El contenido no puede estar vacío"
          }}
          render={({ field }) => (
            <ReactQuill 
              theme="snow" 
              value={field.value || ''} 
              onChange={field.onChange} 
              placeholder="Escribe la noticia aquí..."
              className="mt-1"
            />
          )}
        />
      </div>
      {errors.content && <p className="text-red-500 mt-2">{errors.content.message}</p>}

      <select
        {...register("variant", { required: true })}
        className="w-full border p-2 rounded-lg"
      >
        <option value="">Seleccionar tipo</option>
        <option value="highlighted">Destacada</option>
        <option value="featured">Principal</option>
        <option value="default">Por defecto</option>
      </select>
      {errors.variant && <p className="text-red-500">{errors.variant.message}</p>}

      <select
        {...register("category", { required: true })}
        className="w-full border p-2 rounded-lg"
      >
        <option value="">Seleccionar categoria</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      {errors.category && <p className="text-red-500">{errors.category.message}</p>}

      <input type="hidden" {...register("highlights")} />

      <div className="border rounded-lg p-2 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
          >
            {tag}
            <button type="button" onClick={() => removeTag(tag)}>
              <X size={14} />
            </button>
          </span>
        ))}

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Agregar palabra clave..."
          className="flex-1 outline-none"
        />
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Guardando..." : submitText}
      </Button>
    </form>
  );
}
