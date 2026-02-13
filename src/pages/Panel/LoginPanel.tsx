import LoginPanelForm from "./components/LoginPanelForm";

export default function LoginPanel() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">
          Panel de Administración
        </h1>

        <LoginPanelForm />
      </div>
    </div>
  );
}

