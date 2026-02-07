import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { apiClient } from '@/lib/axios';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from "sonner";
import type { UserRole } from '@/types/User.type';

/* VALIDATION SCHEMA */
const loginSchema = z.object({
    email: z.email('Invalid email.'),
    password: z.string().min(6, 'Password must be at least 6 characters long.'),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginResponse {
    data: {
        token: string;
        user: {
            _id: string;
            name: string;
            lastName: string;
            email: string;
            role: UserRole;
        };
    };
}

const LoginForm = () => {
    /* Local States */
    const [isLoading, setIsLoading] = useState(false);


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

            /* API CALL */
            const response = await apiClient.post<LoginResponse>('/auth/login', data);


            /* EXTRACT TOKEN AND USER */
            const { token, user } = response.data.data;

            const userData = {
                id: user._id,
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
            };

            /* SAVE TOKEN AND USER */
            login(token, userData);

            toast.success("Sesion Iniciada!",
                {
                    description: `Bienvenido ${user.name} ${user.lastName}`
                })

            /* REDIRECT */
            navigate('/panel/dashboard');

        } catch (error: any) {
            /* Handle Server Errors */
            if (error.response?.data?.message) {
                toast.error("Error en los datos!", {
                    description: error.response.data.message,
                });
            } else {
                toast.error("Error en el inicio de sesión", {
                    description: "Ocurrió un error inesperado. Por favor intenta nuevamente.",
                });
            }
        } finally {
            setIsLoading(false);
        }

    }


    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className='text-2xl font-bold mb-6 text-center'> Iniciar Sesión </h2>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                { /* INPUT EMAIL */}
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
                    {isLoading ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
                </Button>
            </form>
        </div>
    )
}

export default LoginForm;
