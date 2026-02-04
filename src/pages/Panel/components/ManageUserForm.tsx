import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { apiClient } from '@/lib/axios';
import { toast } from "sonner";
import { Button } from '@/components/ui/button';
import { UserRole } from '@/interfaces/User.roles';

/* VALIDATION SCHEMA */
const manageUserSchema = z.object({
    name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres.'),
    email: z.email('Email inválido.'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres.'),
    role: z.enum([UserRole.ADMIN, UserRole.EDITOR, UserRole.USER], {
        message: 'Debe seleccionar un rol válido.'
    })
});

type ManageUserFormData = z.infer<typeof manageUserSchema>;

interface ManageUserFormProps {
    onUserCreated?: () => void;
}

const ManageUserForm = ({ onUserCreated }: ManageUserFormProps) => {
    /* Local States */
    const [isLoading, setIsLoading] = useState(false);

    /* REACT HOOK FORM CONFIGURATION */
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<ManageUserFormData>({
        resolver: zodResolver(manageUserSchema),
    });

    /* SUBMIT FUNCTION */
    const onSubmit = async (data: ManageUserFormData) => {
        try {
            setIsLoading(true);

            /* API CALL */
            await apiClient.post('/user', data);

            toast.success("Usuario creado exitosamente!", {
                description: `El usuario ${data.name} con rol ${data.role} ha sido creado.`,
            });

            /* Reset form after successful creation */
            reset();

            /* Callback to refresh user list if provided */
            if (onUserCreated) {
                onUserCreated();
            }

        } catch (error: any) {
            /* Handle Server Errors */
            if (error.response?.data?.message) {
                toast.error("Error al crear usuario", {
                    description: error.response.data.message,
                });
            } else {
                toast.error("Error al crear usuario", {
                    description: "Ocurrió un error inesperado. Por favor intenta nuevamente.",
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className='text-2xl font-bold mb-6 text-gray-800'>Crear Nuevo Usuario</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                {/* INPUT NAME */}
                <div>
                    <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-1'>
                        Nombre Completo
                    </label>
                    <input
                        id='name'
                        type='text'
                        {...register('name')}
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        placeholder='Ingrese el nombre completo'
                        disabled={isLoading}
                    />
                    {errors.name && (
                        <p className='text-red-500 text-sm mt-1'>{errors.name.message}</p>
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
                        placeholder='Ingrese el email'
                        disabled={isLoading}
                    />
                    {errors.email && (
                        <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>
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
                        placeholder='Ingrese la contraseña'
                        disabled={isLoading}
                    />
                    {errors.password && (
                        <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>
                    )}
                </div>

                {/* INPUT ROLE */}
                <div>
                    <label htmlFor='role' className='block text-sm font-medium text-gray-700 mb-1'>
                        Rol
                    </label>
                    <select
                        id='role'
                        {...register('role')}
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white'
                        disabled={isLoading}
                    >
                        <option value=''>Selecciona un rol</option>
                        <option value={UserRole.ADMIN}>Administrador</option>
                        <option value={UserRole.EDITOR}>Editor</option>
                        <option value={UserRole.USER}>Usuario</option>
                    </select>
                    {errors.role && (
                        <p className='text-red-500 text-sm mt-1'>{errors.role.message}</p>
                    )}
                </div>

                {/* Role Description */}
                <div className='bg-blue-50 border border-blue-200 rounded-md p-4'>
                    <h3 className='text-sm font-semibold text-blue-900 mb-2'>Descripción de Roles:</h3>
                    <ul className='text-xs text-blue-800 space-y-1'>
                        <li><strong>Administrador:</strong> Aprueba/rechaza noticias de editores</li>
                        <li><strong>Editor:</strong> Crea/edita noticias (requiere aprobación)</li>
                        <li><strong>Usuario:</strong> Solo lectura</li>
                    </ul>
                </div>

                {/* SUBMIT BUTTON */}
                <Button
                    type='submit'
                    variant='warning'
                    size='lg'
                    className='w-full'
                    disabled={isLoading}
                >
                    {isLoading ? 'Creando Usuario...' : 'Crear Usuario'}
                </Button>
            </form>
        </div>
    );
};

export default ManageUserForm;
