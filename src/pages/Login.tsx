import LoginForm from "./components/LoginForm";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md">
        {/* Branding mobile */}
        <div className="md:hidden text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tu Proyecto</h1>
          <p className="text-gray-500 mt-2">Accedé a tu cuenta</p>
        </div>

        {/* Contenedor login */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          {/* Título */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Bienvenido!</h2>
            <p className="text-gray-500 mt-2">
              Ingresa a tu cuenta
            </p>
          </div>

          {/* Formulario */}
          <LoginForm />

          {/* Links */}
          <div className="mt-6 space-y-4">
            <div className="text-center">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Divisor */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-400">
                  ¿No tenés cuenta?
                </span>
              </div>
            </div>

            <div className="text-center">
              <Link
                to="/register"
                className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
              >
                Crear cuenta nueva
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 {/* Social login (opcional) */}
            {/*
            <div className="space-y-3 pt-4">
              <button className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
                <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
                <span className="text-sm font-medium text-gray-700">Continuar con Google</span>
              </button>
            </div>
            */}