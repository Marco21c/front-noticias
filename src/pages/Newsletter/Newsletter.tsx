import NewsletterCards from "./components/NewsletterCards";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { newslettersCards } from "@/mocks/newslettersMocks";


export default function Newsletter() {
  const navigate = useNavigate();
  const {isAuthenticated} = useAuth();

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-14 px-4">
        <h1 className="text-3xl font-bold text-center mb-3">
          Suscribite a nuestros newsletters
        </h1>

        <p className="text-center text-gray-600 mb-10">
          Elegí qué secciones querés recibir por email
        </p>

       <NewsletterCards
           options={newslettersCards}
           isAuthenticated={isAuthenticated}
           onRequireLogin={() => navigate("/login")}
           onChange={(selected) => {
             console.log("Suscripciones:", selected); }} />
      </div>
    </main>
  );
}
