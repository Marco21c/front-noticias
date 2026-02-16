import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { apiClient } from "@/lib/axios";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import type { UserRole } from "@/types/User.type";

/* VALIDATION */
const loginSchema = z.object({
  email: z.string().email("Email inválido."),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres."),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);

      const response = await apiClient.post("/auth/login", data);
      const { token, user } = response.data;

      login(token, {
        id: user._id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        role: user.role as UserRole,
      });

      toast.success("Sesión iniciada!", {
        description: `Bienvenido ${user.name} ${user.lastName}`,
      });

      navigate("/panel/dashboard");
    } catch (error: any) {
      toast.error("Error en el inicio de sesión", {
        description:
          error.response?.data?.message ||
          "Ocurrió un error inesperado. Intenta nuevamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-16 px-4">
      <Card className="w-full max-w-md p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center">
          Iniciar Sesión
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* EMAIL */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Email</label>
            <Input
              type="email"
              placeholder="Ingresa tu email"
              disabled={isLoading}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Contraseña</label>
            <Input
              type="password"
              placeholder="Ingresa tu contraseña"
              disabled={isLoading}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            variant="warning"
            size="lg"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default LoginForm;

