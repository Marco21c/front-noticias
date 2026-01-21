import NewsList from "./components/NewsList";
import NewsFeatured from "./components/NewsFeatured";
import OthersNews from "./components/OthersNews";

export default function Home() {

  return (
    <>
      <main className="max-w-6xl mx-auto px-4">
        <div>
          <h1 className="text-3xl font-serif font-bold mt-8 mb-6 justify-center flex">
            Últimas Noticias
          </h1>
        </div>
        <h2 className="text-2xl font-serif font-bold mt-8 mb-6 border-b-4 border-gray-600">Destacadas</h2>
        <NewsList />

        <h2 className="text-2xl font-serif font-bold mt-8 mb-6 border-b-4 border-gray-600">Importantes</h2>
        <NewsFeatured />

        <h2 className="text-2xl font-serif font-bold mt-8 mb-6 border-b-4 border-gray-600">Otras Noticias</h2>
        <OthersNews />
        <p className="text-gray-600">
          Ultimas noticias de politica, economía, deportes y más.
        </p>

      </main>
    </>
  );
}

