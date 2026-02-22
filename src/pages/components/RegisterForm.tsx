import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { apiClient } from "@/lib/axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

/**
 * Esquema de validacion para el formulario de registro de usuarios.
 * Define las reglas de validacion para nombre, apellido, email y contrasena.
 */
const registerSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters long.'),
    lastName: z.string().min(3, 'Last name must be at least 3 characters long.'),
    email: z.email('Invalid email.'),
    password: z.string().min(6, 'Password must be at least 6 characters long.'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

/**
 * Componente de formulario para el registro de nuevos usuarios.
 * Permite a los usuarios crear una cuenta proporcionando nombre, apellido,
 * email y contrasena. Incluye validacion del lado del cliente y manejo de errores.
 * 
 * @component
 * @returns {JSX.Element} Formulario de registro con campos validados
 */
const RegisterForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const {
        register, handleSubmit, formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    /**
     * Maneja el envio del formulario de registro.
     * Realiza la peticion al servidor para crear un nuevo usuario
     * y redirige al login en caso de exito.
     * 
     * @param {RegisterFormData} data - Datos del formulario validados
     */
    const onSubmit = async (data: RegisterFormData) => {
        try {
            setIsLoading(true);

            await apiClient.post('/user', data);

            toast.success("Registro exitoso!", {
                description: "Tu cuenta ha sido creada correctamente.",
            });

            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (error: unknown) {
            const message = error instanceof Error 
                ? error.message 
                : "Ocurrio un error inesperado. Por favor intenta nuevamente.";
            toast.error("Error en el registro", {
                description: message,
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <p className='text-1xl font-bold mb-6 text-left'> Ingresá tus datos para registrarte </p>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                { /* INPUT NAME */}
                <div>
                    <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-1'>
                        Nombre
                    </label>
                    <input
                        id='name'
                        type='text'
                        {...register('name')}
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        placeholder='Enter your name'
                        disabled={isLoading}
                    />
                    {errors.name && (
                        <p className='text-red-500 text-sm mt-1'> {errors.name.message} </p>
                    )}
                </div>

                { /* LAST NAME */}
                <div>
                    <label htmlFor='lastName' className='block text-sm font-medium text-gray-700 mb-1'>
                        Apellido
                    </label>
                    <input
                        id='lastName'
                        type='text'
                        {...register('lastName')}
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        placeholder='Enter your lastName'
                        disabled={isLoading}
                    />
                    {errors.lastName && (
                        <p className='text-red-500 text-sm mt-1'> {errors.lastName.message} </p>
                    )}
                </div>

                {/* INPUT EMAIL */}
                <div>
                    <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>
                        Email
                    </label>
                    <input
                        id='email'
                        type='email'
                        {...register('email')}
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        placeholder='Enter your email'
                        disabled={isLoading}
                    />
                    {errors.email && (
                        <p className='text-red-500 text-sm mt-1'> {errors.email.message} </p>
                    )}
                </div>

                {/* INPUT PASSWORD */}
                <div>
                    <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-1'>
                        Contraseña
                    </label>
                    <input
                        id='password'
                        type='password'
                        {...register('password')}
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        placeholder='Enter your password'
                        disabled={isLoading}
                    />
                    {errors.password && (
                        <p className='text-red-500 text-sm mt-1'> {errors.password.message} </p>
                    )}
                </div>

                {/* SUBMIT BUTTON */}
                <Button
                    type='submit'
                    variant='warning'
                    size='lg'
                    className='w-full'
                    disabled={isLoading}
                >
                    {isLoading ? 'Registrando...' : 'Registrarse'}
                </Button>
            </form>
        </div>
    )
}

export default RegisterForm;