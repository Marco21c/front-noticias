import type { FormEvent } from "react";
import { toast } from "sonner";

export default function Contact() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.success("Mensaje enviado!", {
                description: "Tu mensaje ha sido enviado correctamente.",
            });

    e.currentTarget.reset();
  };

  return (
    <main className="min-h-screen py-12 px-6">
      <div className="max-w-2xl mx-auto bg-secondary/80 p-8 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold mb-8 mx-4">Contactanos</h1>
        <p className="text-neutral-600 mb-6 mx-4">Escríbenos y nos pondremos en contacto contigo lo antes posible.</p>
        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6 rounded-2xl shadow-sm"
        >
         
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Nombre</label>
            <input
              required
              type="text"
              placeholder="Tu nombre"
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Email</label>
            <input
              required
              type="email"
              placeholder="tu@email.com"
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Mensaje</label>
            <textarea
              required
              rows={5}
              placeholder="Escribí tu mensaje..."
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-black/80 transition cursor-pointer"
          >
            Enviar mensaje
          </button>
        </form>
      </div>
    </main>
  );
}
