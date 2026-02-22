import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { apiClient } from '@/lib/axios';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

/**
 * Esquema de validacion para el formulario de inicio de sesion.
 */
const loginSchema = z.object({
    email: z.string().email('Invalid email.'),
    password: z.string().min(6, 'Password must be at least 6 characters long.'),
});

type LoginFormData = z.infer<typeof loginSchema>;

/**
 * Componente de formulario para el inicio de sesion de usuarios.
 * Permite a los usuarios autenticarse con email y contrasena.
 * 
 * @component
 * @returns {JSX.Element} Formulario de login con validacion
 */
const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { login } = useAuth();

    const {
        register, handleSubmit, formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    /**
     * Maneja el envio del formulario de login.
     * Autentica al usuario y redirige a la pagina principal.
     * 
     * @param {LoginFormData} data - Credenciales del usuario
     */
    const onSubmit = async (data: LoginFormData) => {
        try {
            setIsLoading(true);
            setServerError(null);

            const response = await apiClient.post('/auth/login', data);

            const { token, user } = response.data.data;
            login(token, user);

            toast.success("Sesion Iniciada!",
                { description: `Bienvenido ${response.data.data.user.name}`
            })

            navigate('/');

        } catch (error: unknown) {
            if (error instanceof Error) {
                const message = (error as { response?: { data?: { message?: string } } })?.response?.data?.message;
                setServerError(message || "Login error. Please try again!");
                toast.error("Error en los datos!", {
                    description: message || "Ocurrio un error inesperado.",
                });
            } else {
                setServerError('Login error. Please try again!');
                toast.error("Error en el inicio de sesion", {
                    description: "Ocurrio un error inesperado. Por favor intenta nuevamente.",
                });
            }
        } finally {
            setIsLoading(false);
        }
    }

return (
    <Card className="w-full p-6 space-y-6 shadow-[0_10px_30px_rgba(0,0,0,0.25)] overflow-auto">
      
       <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-zinc-800">
          Iniciar Sesion
        </h2>
        <p className="text-sm text-zinc-500">
          Ingresa tus credenciales para acceder a tu cuenta.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            disabled={isLoading}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Contrasena
          </label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
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
          {isLoading ? "Iniciando Sesion..." : "Iniciar Sesion"}
        </Button>

        {serverError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
            {serverError}
          </div>
        )}
      </form>
    </Card>
);
}

export default LoginForm;
