

export default function AbouUs() {
  return (
    <main className="bg-white min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Sobre Nosotros</h1>

        <div className="space-y-6 text-neutral-700 leading-relaxed text-sm md:text-base">
          <p>
            WebNoticias es un medio digital independiente dedicado a informar con
            rapidez, claridad y responsabilidad sobre los hechos más relevantes
            de la actualidad local, nacional e internacional.
          </p>

          <section>
            <h2 className="font-semibold text-lg mb-2">Nuestra misión</h2>
            <p>
              Brindar información veraz y accesible para que nuestros lectores
              puedan comprender lo que sucede a su alrededor y tomar decisiones
              informadas.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">Qué hacemos</h2>
            <p>
              Cubrimos noticias de política, economía, deportes, tecnología,
              cultura y sociedad, con contenido actualizado las 24 horas y
              adaptado a los nuevos formatos digitales.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">Nuestros valores</h2>
            <ul className="list-disc ml-6 space-y-1">
              <li>Compromiso con la verdad</li>
              <li>Transparencia periodística</li>
              <li>Pluralidad de opiniones</li>
              <li>Responsabilidad social</li>
              <li>Innovación digital</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">Nuestro equipo</h2>
            <p>
              Contamos con periodistas, editores y desarrolladores que trabajan
              en conjunto para ofrecer una experiencia informativa moderna,
              confiable y de calidad.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
