import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NewsList from "./components/NewsList";
import HeaderTop from "./components/HeaderTop";

export default function Home() {
  return (
    <>
      <HeaderTop />

      <div className="min-h-screen bg-gray-100">

        <Navbar />

        <main className="max-w-5xl mx-auto px-4">

          <h1 className="text-3xl font-bold mt-8 mb-6">
            Noticias del Día
          </h1>

          <NewsList />

          <p className="text-gray-600">
            Ultimas noticias de politica, economía, deportes y más.
          </p>

        </main>

        <Footer />

      </div>
    </>
  );
}