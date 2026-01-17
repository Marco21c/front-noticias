import { useState } from "react";
import { Search} from "lucide-react";

type Props = {
  onSearch?: (value: string) => void;
};

export default function SearchBar({onSearch}:Props) {
  
    const [value, setValue] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
           e.preventDefault();
           onSearch?.(value);
           setValue("");
    }

  return (
<form  onSubmit={handleSubmit} className="hidden md:flex items-center gap-2 rounded-full border border-gray-300 px-3 py-1.5 bg-white">
            <input type="text" placeholder="Buscar..." value={value} 
            onChange={(e) => setValue(e.target.value)}
        className="bg-transparent outline-none text-sm w-40 md:w-56 "/>
          <button type="submit">
          <Search className="md:h-6 w-6 h-5 w-5 ml-2 cursor-pointer text-gray-600 hover:text-black" />
          </button>
          </form>
  )
}
