import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

/* VALIDATION SCHEMA */
const loginSchema = z.object({
    email: z.email('Invalid email.'),
    password: z.string().min(6, 'Password must be at least 6 characters long.'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
    /* Local States */
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);

    /* Navigation Hooks */
    const navigate = useNavigate();

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
            const response = await axios.post('/login', data);

            /* SAVE TOKEN */
            localStorage.setItem('token', response.data.token);

            /* REDIRECT */
            navigate('/');

        } catch (error: any) {
            /* Handle Server Errors */
            if (error.response?.data?.message) {
                setServerError(error.response.data.message);
            } else {
                setServerError('Login error. Please try again!')
            }
        } finally {
            setIsLoading(false);
        }

    }


    return (
        <div className="max w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className='text-2xl font-bol mb-6 text-center'> Login </h2>
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
                <button
                    type='submit'
                    disabled={isLoading}
                    className='w-full bg-amber-300 text-black py-2 px-4 rounded-md hover:bg-amber-400 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors'
                >
                    {isLoading ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
                </button>

                {/* ERROR DEL SERVIDOR */}
                {serverError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                        {serverError}
                    </div>
                )}
            </form>
        </div>
    )
}

export default LoginForm;
