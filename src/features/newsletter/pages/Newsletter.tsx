import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { useNewsletter } from "@/features/newsletter/hooks/useNewsletter";
import { useGetCategories } from "@/features/categories/hooks/useGetCategories";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useNavigate } from "react-router-dom";
import Spinner from "@/shared/components/ui/spinner"

export default function Newsletter() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { subscription, isLoading, subscribe, updatePreferences, unsubscribe, isSubscribing, isUpdating, isUnsubscribing } = useNewsletter();
  const { data: categories = [] } = useGetCategories();
  
  const initialCategories = useMemo(() => subscription?.preferredCategories || [], [subscription]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    setSelectedCategories(initialCategories);
  }, [initialCategories]);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.warning("Inicia sesion para acceder al newsletter", {
        description: "Seras redirigido al login...",
      });
      setTimeout(() => navigate("/login"), 2000);
    }
  }, [isAuthenticated, navigate]);

  const handleToggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSubscribe = () => {
    if (selectedCategories.length === 0) {
      toast.error("Selecciona al menos una categoria", {
        description: "Debes elegir las categorias que te interesan.",
      });
      return;
    }
    subscribe(
      { preferredCategories: selectedCategories },
      {
        onSuccess: () => {
          toast.success("Suscripcion exitosa!", {
            description: "Recibiras novedades de las categorias seleccionadas.",
          });
        },
        onError: (error: unknown) => {
          const message = error instanceof Error 
            ? error.message 
            : "Ocurrio un error inesperado.";
          toast.error("Error al suscribirse", {
            description: message,
          });
        },
      }
    );
  };

  const handleUpdatePreferences = () => {
    if (selectedCategories.length === 0) {
      toast.error("Selecciona al menos una categoria", {
        description: "Debes elegir las categorias que te interesan.",
      });
      return;
    }
    updatePreferences(
      { preferredCategories: selectedCategories },
      {
        onSuccess: () => {
          toast.success("Preferencias actualizadas!", {
            description: "Tus categorias han sido actualizadas.",
          });
        },
        onError: (error: unknown) => {
          const message = error instanceof Error 
            ? error.message 
            : "Ocurrio un error inesperado.";
          toast.error("Error al actualizar", {
            description: message,
          });
        },
      }
    );
  };

  const handleUnsubscribe = () => {
    unsubscribe(undefined, {
      onSuccess: () => {
        toast.success("Te has desuscrito", {
          description: "Ya no recibirás el newsletter.",
        });
        setSelectedCategories([]);
      },
      onError: (error: unknown) => {
        const message = error instanceof Error 
          ? error.message 
          : "Ocurrio un error inesperado.";
        toast.error("Error al desuscribirse", {
          description: message,
        });
      },
    });
  };

  if (!isAuthenticated) {
    return null;
  }

  const isSubscribed = subscription && subscription.isActive;

  return (
    <div className="flex items-center justify-center py-16 px-4">
      <Card className="w-full max-w-2xl p-8 shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Newsletter</h1>
          <p className="text-gray-600 mt-2">
            {isSubscribed
              ? "Actualiza tus preferencias o desuscribete"
              : "Suscribete para recibir las ultimas novedades"}
          </p>
        </div>

        {isLoading ? (
        <div className="py-8">
          <Spinner size={40} />
        </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Selecciona las categorias de tu interes:
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleToggleCategory(category.id)}
                    className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                      selectedCategories.includes(category.id)
                        ? "bg-amber-100 border-amber-500 text-amber-800"
                        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 min-w-[220px]">
              {isSubscribed ? (
                <>
                  <Button
                    variant="warning"
                    size="lg"
                    onClick={handleUpdatePreferences}
                    disabled={isUpdating || selectedCategories.length === 0}
                  >
                  {isUpdating ? (
                <>
                  <Spinner size={18} />
                  Actualizando...
                </>
              ) : (
                  "Actualizar preferencias"
                )}
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleUnsubscribe}
                    disabled={isUnsubscribing}
                    className="flex items-center justify-center gap-2 min-w-[170px] text-red-600 border-red-300 hover:bg-red-50"
                  >
                  {isUnsubscribing ? (
                <>
                  <Spinner size={18} />
                  Desuscribiendo...
                </>
              ) : (
                  "Desuscribirse"
              )}
                  </Button>
                </>
              ) : (
                <Button
                  variant="warning"
                  size="lg"
                  onClick={handleSubscribe}
                  disabled={isSubscribing || selectedCategories.length === 0}
                  className="flex items-center justify-center gap-2 min-w-[180px]"
                >
                {isSubscribing ? (
                  <>
                    <Spinner size={18} />
                    Suscribiendo...
                  </>
                ) : (
                  "Suscribirme"
                )}
              </Button>
              )}
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
