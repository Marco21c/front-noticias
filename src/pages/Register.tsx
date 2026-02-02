import RegisterForm from "./components/RegisterForm";
import { Link } from "react-router-dom";

export default function RegisterPage() {
    return (
        <>
            {/* Formulario */}
            <div className="flex items-center justify-center min-h-screen p-8 bg-gray-50">
                <div className="w-full max-w-md">
                    {/* Logo mobile (solo visible en pantallas chicas) */}
                    <div className="md:hidden text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Tu Proyecto</h1>
                        <p className="text-gray-600 mt-2">Bienvenido!</p>
                    </div>

                    {/* Título de la sección */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">Crear cuenta</h2>
                    </div>

                    {/* Componente del formulario */}
                    <RegisterForm />

                    {/* Links adicionales */}
                    <div className="mt-6 space-y-4">

                        {/* Divisor */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-gray-50 text-gray-500">
                                    ¿Ya tenés cuenta?
                                </span>
                            </div>
                        </div>

                        {/* Registro */}
                        <div className="text-center">
                            <Link
                                to="/login"
                                className="text-sm font-medium text-blue-600 hover:text-blue-700"
                            >
                                Iniciar sesión
                            </Link>
                        </div>

                        {/* Login con redes sociales (opcional - comentado por ahora) */}
                        {/* 
            <div className="space-y-3 pt-4">
              <button className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
                <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
                <span className="text-sm font-medium text-gray-700">Continuar con Google</span>
              </button>
            </div>
            */}
                    </div>
                </div>
            </div>
        </>
    );
}