/**
 * Pagina de Politica de Privacidad.
 * Informa sobre la recopilacion, uso y proteccion de datos personales.
 * 
 * @component
 * @returns {JSX.Element} Pagina informativa de privacidad
 */
export default function Policies(){
  return (
    <main className="bg-white min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Politica de Privacidad</h1>

        <div className="space-y-6 text-neutral-700 leading-relaxed text-sm md:text-base">
          <p>
            En WebNoticias respetamos la privacidad de nuestros usuarios y nos
            comprometemos a proteger la informacion personal que comparten con
            nosotros. Esta politica explica como recopilamos, utilizamos y
            protegemos sus datos.
          </p>

          <section>
            <h2 className="font-semibold text-lg mb-2">Datos que recopilamos</h2>
            <p>
              Podemos recopilar informacion como nombre, correo electronico o
              cualquier dato proporcionado voluntariamente a traves de
              formularios de contacto, suscripciones o comentarios.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">Uso de la informacion</h2>
            <ul className="list-disc ml-6 space-y-1">
              <li>Enviar newsletters o noticias relevantes</li>
              <li>Responder consultas o solicitudes</li>
              <li>Mejorar la experiencia del usuario</li>
              <li>Analizar estadisticas de uso del sitio</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">Cookies</h2>
            <p>
              Utilizamos cookies y tecnologias similares para recordar
              preferencias, medir trafico y optimizar el rendimiento del sitio.
              Puede deshabilitarlas desde la configuracion de su navegador.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">Proteccion de datos</h2>
            <p>
              Implementamos medidas tecnicas y organizativas para proteger la
              informacion contra accesos no autorizados, perdida o alteracion.
              Todas nuestras conexiones utilizan cifrado HTTPS.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">Servicios de terceros</h2>
            <p>
              Podemos utilizar herramientas externas como servicios de analisis
              o publicidad que pueden recopilar datos anonimos de navegacion.
              Estas plataformas cuentan con sus propias politicas de privacidad.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">Derechos del usuario</h2>
            <p>
              Usted puede solicitar la modificacion o eliminacion de sus datos
              personales enviando un correo electronico a nuestro equipo de
              contacto.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">Cambios en la politica</h2>
            <p>
              Nos reservamos el derecho de actualizar esta politica para
              adaptarla a cambios legales o mejoras del servicio.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">Contacto</h2>
            <p>
              Para consultas relacionadas con privacidad:
              <br />
              contacto-privacidad@webnoticias.com
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
