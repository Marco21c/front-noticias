import NewsList from "./components/NewsList";

export default function Home() {
  return (

    <>
        <main className="max-w-5xl mx-auto px-4">

          <h1 className="text-3xl font-serif font-bold mt-8 mb-6">
            Noticias del Día
          </h1>

          <NewsList />
          
          <br />
          <p className="text-gray-600">
            Ultimas noticias de politica, economía, deportes y más.
          </p>

        </main>
    </>
  );
}

