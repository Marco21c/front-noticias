import { Navigate } from "react-router-dom";
import LoginPanelForm from "./components/LoginPanelForm";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Pagina de inicio de sesion para el panel de administracion.
 * Permite a usuarios autenticados acceder al panel de control.
 * Si el usuario ya esta autenticado, redirige automaticamente al dashboard.
 * 
 * @component
 * @returns {JSX.Element} Formulario de login del panel o redireccion al dashboard
 */
export default function LoginPanel() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-100">
        <p>Cargando...</p>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/panel/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">
          Panel de Administracion
        </h1>

        <LoginPanelForm />
      </div>
    </div>
  );
}

