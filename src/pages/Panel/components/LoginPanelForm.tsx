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

/**
 * Esquema de validacion para el formulario de login del panel.
 */
const loginSchema = z.object({
  email: z.string().email("Email invalido."),
  password: z.string().min(6, "La contrasena debe tener al menos 6 caracteres."),
});

type LoginFormData = z.infer<typeof loginSchema>;

/**
 * Componente de formulario para el inicio de sesion en el panel de administracion.
 * Autentica al usuario y lo redirige al dashboard.
 * 
 * @component
 * @returns {JSX.Element} Formulario de login del panel
 */
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

  /**
   * Maneja el envio del formulario de login del panel.
   * 
   * @param {LoginFormData} data - Credenciales del usuario
   */
  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);

      const response = await apiClient.post("/auth/login", data);
      const { token, user } = response.data.data;

      login(token, {
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        role: user.role as UserRole,
      });

      toast.success("Sesion iniciada!", {
        description: `Bienvenido ${user.name} ${user.lastName}`,
      });

      navigate("/panel/dashboard");
    } catch (error: unknown) {
      const message = error instanceof Error 
        ? error.message 
        : "Ocurrio un error inesperado. Intenta nuevamente.";
      toast.error("Error en el inicio de sesion", {
        description: message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-16 px-4">
      <Card className="w-full max-w-md p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center">
          Iniciar Sesion
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

          <div className="space-y-1">
            <label className="text-sm font-medium">Contrasena</label>
            <Input
              type="password"
              placeholder="Ingresa tu contrasena"
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
            {isLoading ? "Iniciando sesion..." : "Iniciar Sesion"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default LoginForm;
