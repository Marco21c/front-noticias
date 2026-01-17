export default function SearchBar() {
    return (
        <input
            type="text"
            placeholder="Buscar noticias..."
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    );
}