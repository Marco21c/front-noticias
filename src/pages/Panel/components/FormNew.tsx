import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { categories } from "@/mocks/categoriesMocks";
import type { ICategory } from "@/interfaces/Category.type";
import type { INewsCreate } from "@/interfaces/News.type";

interface Props {
  defaultValues?: Partial<INewsCreate>;
  onSubmit: (data: INewsCreate) => void;
  isPending?: boolean;
  title?: string;
   serverError?: string | null;
  submitText?: string;
}

export default function FormNew({ defaultValues, onSubmit, isPending, title = "Crear noticia", submitText = "Guardar", serverError}: Props) {
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<INewsCreate>({ defaultValues});

  const [tags, setTags] = useState<string[]>(
    defaultValues?.highlights || []
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
      addTag(input);
      setInput("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-6 bg-white/90 rounded-2xl shadow-xl text-sm max-w-2xl"
    >
      <h2 className="text-2xl font-semibold text-center">{title}</h2>
       {serverError && (
        <div className="bg-red-100 text-red-600 p-3 rounded-lg text-sm">
          {serverError}
        </div>
      )}
      <input
        placeholder="Título"
        className="w-full border p-2 rounded-lg"
        {...register("title", { required: "El título es obligatorio" })}
      />
      {errors.title && <p className="text-red-500">{errors.title.message}</p>}

      <input
        placeholder="Resumen"
        className="w-full border p-2 rounded-lg"
        {...register("summary", { required: "El resumen es obligatorio" })}
      />
      {errors.summary && <p className="text-red-500">{errors.summary.message}</p>}

      <input
        placeholder="Autor"
        className="w-full border p-2 rounded-lg"
        {...register("author", { required: "El autor es obligatorio" })}
      />
      {errors.author && <p className="text-red-500">{errors.author.message}</p>}

      <input
        placeholder="Url Imagen"
        className="w-full border p-2 rounded-lg"
        {...register("mainImage", { required: "La imagen es obligatoria" })}
      />
        {errors.mainImage && <p className="text-red-500">{errors.mainImage.message}</p>}

      <textarea
        rows={6}
        placeholder="Contenido"
        className="w-full border p-2 rounded-lg"
        {...register("content", { required: "El contenido es obligatorio" })}
      />
       {errors.content && <p className="text-red-500">{errors.content.message}</p>}

      <select
        {...register("variant", { required: true })}
        className="w-full border p-2 rounded-lg"
      >
        <option value="">Seleccionar tipo</option>
        <option value="published">Publicación</option>
        <option value="draft">Borrador</option>
      </select>
        {errors.variant && <p className="text-red-500">{errors.variant.message}</p>}
 
      <select
        {...register("category", { required: true })}
        className="w-full border p-2 rounded-lg"
      >
        <option value="">Seleccionar categoría</option>
        {categories.map((c: ICategory) => (
          <option key={c._id} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>
      {errors.category && <p className="text-red-500">{errors.category.message}</p>}

      {/* TAGS */}
      <input type="hidden" {...register("highlights")} />

      <div className="border rounded-lg p-2 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
          >
            {tag}
            <button type="button" onClick={() => removeTag(tag)}>
              ✕
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
