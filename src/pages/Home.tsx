import NewsList from "./components/NewsList";

export default function Home() { 

  return (
    <>
        <main className="max-w-6xl mx-auto px-4">
          <div>
          <h1 className="text-3xl font-serif font-bold mt-8 mb-6 justify-center flex">
            Últimas Noticias
          </h1>
          <NewsList/>
          </div>
          <br />
          <p className="text-gray-600">
            Ultimas noticias de politica, economía, deportes y más.
          </p>

        </main>
    </>
  );
}

