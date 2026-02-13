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

/* VALIDATION SCHEMA */
const loginSchema = z.object({
    email: z.string().email('Invalid email.'),
    password: z.string().min(6, 'Password must be at least 6 characters long.'),
});


type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
    /* Local States */
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);

    /* Navigation Hooks */
    const navigate = useNavigate();

    const { login } = useAuth();

    /* REACT HOOK FORM CONIGURATION */
    const {
        register, handleSubmit, formState: { errors }, // validation client errors

    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema), // Zod validations before submit
    });

    /* SUBMIT FUNCTION */
    const onSubmit = async (data: LoginFormData) => {
        try {
            setIsLoading(true);
            setServerError(null); // Clean logs errors

            /* API CALL */
            const response = await apiClient.post('/auth/login', data);


            /* SAVE TOKEN */
            const { token, user } = response.data.data;
            login(token, user);

            toast.success("Sesion Iniciada!",
                { description: `Bienvenido ${response.data.data.user.name}`
            })

            /* REDIRECT */
            navigate('/');

        } catch (error: any) {
            /* Handle Server Errors */
            if (error.response?.data?.message) {
                setServerError(error.response.data.message);
                toast.error("Error en los datos!", {
                    description: error.response.data.message,
                });
            } else {
                setServerError('Login error. Please try again!')
                toast.error("Error en el inicio de sesión", {
                    description: "Ocurrió un error inesperado. Por favor intenta nuevamente.",
                });
            }
        } finally {
            setIsLoading(false);
        }

    }

return (
    <Card className="w-full p-8 space-y-6 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
      
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-zinc-800">
          Panel Administrativo
        </h2>
        <p className="text-sm text-zinc-500">
          Ingresá tus credenciales para continuar
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        
        {/* EMAIL */}
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

        {/* PASSWORD */}
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Contraseña
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

        {/* BUTTON */}
        <Button
          type="submit"
          variant="warning"
          size="lg"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Iniciando Sesión..." : "Iniciar Sesión"}
        </Button>

        {/* SERVER ERROR */}
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
