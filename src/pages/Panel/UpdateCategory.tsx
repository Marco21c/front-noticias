import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useGetCategories } from "@/hooks/useGetCategories";
import { NavLink } from "react-router-dom";
import { useDeleteCategory } from "@/hooks/useUpdateCategories";
import { toast } from "sonner";

export default function CategoriesList() {
  const { data: categories = [], isLoading } = useGetCategories();
  const { mutate: deleteCategory, isPending } = useDeleteCategory();

  const handleDelete = (id: string) => {
    deleteCategory(id, {
      onSuccess: () => {
        toast.success("Categoría eliminada correctamente");
      },
      onError: (error: unknown) => {
        const message = error instanceof Error 
          ? error.message 
          : "Error al eliminar la categoría";
        toast.error(message);
      },
    });
  };

  if (isLoading) {
    return <p className="p-6 text-zinc-500">Cargando categorías...</p>;
  }

  const hasCategories = categories.length > 0;

  return (
    <div className="px-6 md:px-12 py-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-900">
              Categorías
            </h1>
            <p className="text-sm text-zinc-500 mt-1">
              Gestiona las categorías de las noticias ({categories.length})
            </p>
          </div>

          <NavLink to="/panel/categories/new">
            <Button className="flex items-center gap-2">
              <Plus size={16} />
              Nueva categoría
            </Button>
          </NavLink>
        </div>

        <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden">
          {hasCategories ? (
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-600">
                <tr>
                  <th className="text-left px-6 py-3 font-medium">Nombre</th>
                  <th className="text-right px-6 py-3 font-medium">
                    Acciones
                  </th>
                </tr>
              </thead>

              <tbody>
                {categories.map((category) => (
                  <tr
                    key={category.id}
                    className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50 transition"
                  >
                    <td className="px-6 py-4 font-medium text-zinc-800">
                      {category.name}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-4">
                        <NavLink
                          to={`/panel/categories/${category.id}/edit`}
                          className="p-2 rounded-lg text-zinc-500 hover:bg-blue-50 hover:text-blue-600 transition"
                        >
                          <Pencil size={16} />
                        </NavLink>

                        <button
                          onClick={() => handleDelete(category.id)}
                          disabled={isPending}
                          className="p-2 rounded-lg text-zinc-500 hover:bg-red-50 hover:text-red-600 transition disabled:opacity-50"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-16 flex flex-col items-center justify-center text-center">
              <p className="text-zinc-500 mb-4">
                No hay categorías creadas
              </p>
              <NavLink to="/panel/categories/new">
                <Button className="flex items-center gap-2">
                  <Plus size={16} />
                  Crear primera categoría
                </Button>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}