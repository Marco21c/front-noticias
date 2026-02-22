import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNewsletter } from "@/hooks/useNewsletter";
import { useGetCategories } from "@/hooks/useGetCategories";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

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
      toast.warning("Inicia sesión para acceder al newsletter", {
        description: "Serás redirigido al login...",
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
          toast.success("Suscripción exitosa!", {
            description: "Recibirás novedades de las categorías seleccionadas.",
          });
        },
        onError: (error: unknown) => {
          const message = error instanceof Error 
            ? error.message 
            : "Ocurrió un error inesperado.";
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
            description: "Tus categorías han sido actualizadas.",
          });
        },
        onError: (error: unknown) => {
          const message = error instanceof Error 
            ? error.message 
            : "Ocurrió un error inesperado.";
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
          : "Ocurrió un error inesperado.";
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
              ? "Actualiza tus preferencias o desuscríbete"
              : "Suscríbete para recibir las últimas novedades"}
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Cargando...</p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Selecciona las categorías de tu interés:
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

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {isSubscribed ? (
                <>
                  <Button
                    variant="warning"
                    size="lg"
                    onClick={handleUpdatePreferences}
                    disabled={isUpdating || selectedCategories.length === 0}
                  >
                    {isUpdating ? "Actualizando..." : "Actualizar preferencias"}
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleUnsubscribe}
                    disabled={isUnsubscribing}
                    className="text-red-600 border-red-300 hover:bg-red-50"
                  >
                    {isUnsubscribing ? "Desuscribiendo..." : "Desuscribirse"}
                  </Button>
                </>
              ) : (
                <Button
                  variant="warning"
                  size="lg"
                  onClick={handleSubscribe}
                  disabled={isSubscribing || selectedCategories.length === 0}
                >
                  {isSubscribing ? "Suscribiendo..." : "Suscribirme"}
                </Button>
              )}
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
