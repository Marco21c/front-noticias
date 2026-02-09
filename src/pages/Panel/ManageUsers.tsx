import { useState, useEffect } from 'react';
import ManageUserForm from './components/ManageUserForm';
import { apiClient } from '@/lib/axios';
import { USER_ROLES, type UserRole, type IUser, type IUserBackend } from '@/types/User.type';
import { toast } from 'sonner';

const ManageUsers = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    /* Fetch all users */
    const fetchUsers = async () => {
        try {
            setIsLoading(true);
            const response = await apiClient.get<{ data: IUserBackend[] }>('/user');
            
            // 👇 Transformar usuarios del backend al formato del frontend
            const transformedUsers: IUser[] = (response.data.data || []).map(user => ({
                id: user._id,
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            }));
            
            setUsers(transformedUsers);
        } catch (error: any) {
            toast.error("Error al cargar usuarios", {
                description: error.response?.data?.message || "No se pudieron cargar los usuarios.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    /* Load users on component mount */
    useEffect(() => {
        fetchUsers();
    }, []);

    /* Delete user */
    const handleDeleteUser = async (userId: string) => {
        if (!window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
            return;
        }

        try {
            await apiClient.delete(`/user/${userId}`);
            toast.success("Usuario eliminado", {
                description: "El usuario ha sido eliminado exitosamente.",
            });
            fetchUsers(); // Refresh list
        } catch (error: any) {
            toast.error("Error al eliminar usuario", {
                description: error.response?.data?.message || "No se pudo eliminar el usuario.",
            });
        }
    };

    /* Get role badge color */
    const getRoleBadgeColor = (role: UserRole) => {
        switch (role) {
            case USER_ROLES.SUPERADMIN:
                return 'bg-purple-100 text-purple-800 border-purple-300';
            case USER_ROLES.ADMIN:
                return 'bg-blue-100 text-blue-800 border-blue-300';
            case USER_ROLES.EDITOR:
                return 'bg-green-100 text-green-800 border-green-300';
            case USER_ROLES.USER:
                return 'bg-gray-100 text-gray-800 border-gray-300';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    /* Get role display name in Spanish */
    const getRoleDisplayName = (role: UserRole) => {
        switch (role) {
            case USER_ROLES.SUPERADMIN:
                return 'Superadmin';
            case USER_ROLES.ADMIN:
                return 'Administrador';
            case USER_ROLES.EDITOR:
                return 'Editor';
            case USER_ROLES.USER:
                return 'Usuario';
            default:
                return role;
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Usuarios</h1>
                <p className="text-gray-600">Panel de administración para crear y gestionar usuarios del sistema</p>
            </div>

            {/* User Creation Form */}
            <div className="mb-12">
                <ManageUserForm onUserCreated={fetchUsers} />
            </div>

            {/* Users List */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Lista de Usuarios</h2>

                {isLoading ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500">Cargando usuarios...</p>
                    </div>
                ) : users.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500">No hay usuarios registrados</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Nombre
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Rol
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Fecha de Creación
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {user.name} {user.lastName}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{user.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getRoleBadgeColor(user.role)}`}>
                                                {getRoleDisplayName(user.role)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString('es-ES') : '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            {user.role !== USER_ROLES.SUPERADMIN && (
                                                <button
                                                    onClick={() => handleDeleteUser(user.id)}
                                                    className="text-red-600 hover:text-red-900 transition-colors"
                                                >
                                                    Eliminar
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageUsers;