import AuthActions from "./AuthActions";
import SearchBar from "./SearchBar";

export default function HeaderTop() {
    return (    
        <div className="bg-white border-b">
            <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">

                <SearchBar />

            <h1 className="text-2xl font-bold">Noticias</h1>

                <AuthActions />

            </div>
        </div>
    );
}