import { useCreateNew } from "@/hooks/useUpdateNew";
import { useNavigate } from "react-router-dom";
import type { INewsCreate } from "@/interfaces/News.type";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { categories } from "@/mocks/categoriesMocks";
import type { ICategory } from "@/interfaces/Category.type";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function AddNew() {
  const navigate = useNavigate();
  const { mutate, isPending } = useCreateNew();
  const [tags, setTags] = useState<string[]>([]);
  const [input, setInput] = useState(""); 
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<INewsCreate>();

  const onSubmit = (dataN: INewsCreate) => {
    mutate(dataN, {
      onSuccess: () => {
      toast({
        title: "Noticia creada correctamente. ",
        description: "La noticia se guardó exitosamente",
      });

      setTimeout(() => navigate("/panel/news"), 700);
    },
    onError: () => {
      toast({
        title: "Error.",
        description: "No se pudo crear la noticia",
        variant: "destructive",
      });
    },   });
  };
   const addTag = (value: string) => {
    const clean = value.trim();

    if (!clean || tags.includes(clean)) return;

    const updated = [...tags, clean];

    setTags(updated);
    setValue("highlights", updated); // 
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
    <>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 border border-secondary-300 rounded rounded-lg p-8 mr-4 ml-12 md:mr-12 md:ml-32 my-12 bg-secondary/90 flex">
        
         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4  p-6 bg-white/90 rounded-2xl shadow-xl text-sm">
             <h2 className="text-2xl font-semibold text-center">Crear noticia</h2>
             <input placeholder="Título" className="w-full border p-2 rounded-lg"
               {...register("title", { required: "El título es obligatorio" })} />
             {errors.title && ( <p className="text-red-500 text-sm">{errors.title.message}</p> )}
            
             <input  placeholder="Resumen" className="w-full border p-2 rounded-lg"
               {...register("summary", { required: "El resumen es obligatorio" })}/>
             {errors.summary && ( <p className="text-red-500 text-sm">{errors.summary.message}</p> )}
             
             <input  placeholder="Autor" className="w-full border p-2 rounded-lg"
               {...register("author", { required: "El autor es obligatorio." })}/>
             {errors.author && ( <p className="text-red-500 text-sm">{errors.author.message}</p> )} 
            
             <input  placeholder="Url Imagen" className="w-full border p-2 rounded-lg"
               {...register("mainImage", { required: "La imagen es obligatorio." })}/>
             {errors.mainImage && ( <p className="text-red-500 text-sm">{errors.mainImage.message}</p> )} 
           
             <input  placeholder="LInk Externo (opcional)" className="w-full border p-2 rounded-lg"
               {...register("source")}/>
             
             <textarea
               rows={6}  placeholder="Contenido" className="w-full border p-2 rounded-lg"
               {...register("content", { required: "El contenido es obligatorio" })} />
             {errors.content && ( <p className="text-red-500 text-sm">{errors.content.message}</p>)}
            
             <select {...register("variant",  { required: "El tipo es obligatorio." })} className="w-full border p-2 rounded-lg">
              <option value="" className=" text-black/30"> Seleccionar tipo</option>
              <option value="published">Publicación</option>
              <option value="draft">Borrador</option>
             </select>
             {errors.variant && ( <p className="text-red-500 text-sm">{errors.variant.message}</p>)}
             
              <select {...register("category",  { required: "La categoria es obligatoria." }) } className="w-full border p-2 rounded-lg">
                <option value=""> Seleccionar categoría</option>
               { categories.map( (category: ICategory) => (
                  <option value={category.name}  key={category._id}> {category.name} </option>
               )
               )} 
              </select>
              {errors.category && ( <p className="text-red-500 text-sm">{errors.category.message}</p>)}
             <input type="hidden" {...register("highlights")} />
             <div className="border rounded-lg p-2 flex flex-wrap gap-2" >
                {tags.map((tag) => (
                  <span key={tag} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2" >
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="text-xs" >
                      ✕
                    </button>
                  </span>
                ))}

               <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} 
                 placeholder="Agregar palabra clave..."  className="flex-1 outline-none min-w-[120px]" />
             </div>

             <Button type="submit" disabled={isPending}  className="disabled:opacity-50" >
               {isPending ? "Guardando..." : "Crear noticia"}
             </Button>
        </form> 
        <div className="grid justify-center p-12">
                <h1 className="text-center text-lg font-semibold"> Vista Previa </h1>

                <div className="bg-red-300/90 h-80 w-80">
                       
                </div>
        </div>
    </div>
    </>
  )
}
