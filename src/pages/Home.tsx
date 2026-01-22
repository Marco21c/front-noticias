import NewsList from "./components/NewsList";
import NewsFeatured from "./components/NewsFeatured";
import OthersNews from "./components/OthersNews";

export default function Home() {

  return (
    <>
      <main className="max-w-6xl mx-auto px-4">

        <h1 className="text-2xl font-serif font-bold mt-10 mb-2 border-b-4 border-gray-600">Destacadas</h1>
        <NewsList />

        <h2 className="text-2xl font-serif font-bold mt-10 mb-2 border-b-4 border-gray-600">Importantes</h2>
        <NewsFeatured />


        <h2 className="text-2xl font-serif font-bold mt-10 mb-2 border-b-4 border-gray-600">Otras Noticias</h2>
        <OthersNews />
        <p className="text-gray-600">
          Ultimas noticias de politica, economía, deportes y más.
        </p>

      </main>
    </>
  );
}

