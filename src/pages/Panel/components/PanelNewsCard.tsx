import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  _id: string;
  title: string;
  summary: string;
  author: string;
  category: string;
  mainImage?: string;
  publicationDate: string;
  onEdit: () => void;
  onDelete: () => void;
};

const categoryColors: Record<string, string> = {
  education: "text-orange-700 bg-orange-200",
  technology: "text-blue-700 bg-blue-100",
  health: "text-green-700 bg-green-100",
  sports: "text-red-700 bg-red-100",
  politic: "text-purple-700 bg-purple-100",
  economy: "text-yellow-700 bg-yellow-100",
  science: "text-indigo-700 bg-indigo-100",
};

export default function PanelNewsCard({
  title,
  summary,
  author,
  category,
  mainImage,
  publicationDate,
  onEdit,
  onDelete,
}: Props) {
  return (
    <article
      className="
        group
        overflow-hidden
        bg-white
        border border-zinc-200
        rounded-2xl
        shadow-sm
        hover:shadow-md
        hover:border-zinc-300
        transition
      "
    >
      {mainImage && (
        <div className="relative h-56 overflow-hidden">
          <img
            src={mainImage}
            alt={title}
            className="h-full w-full object-cover group-hover:scale-[1.03] transition"
          />
        </div>
      )}

      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span
            className={`
              inline-block rounded px-2 py-1 text-xs font-bold uppercase tracking-widest border border-current/10
              ${categoryColors[category] ?? "bg-gray-100 text-gray-700"}
            `}
          >
            {category}
          </span>

          <div className="flex gap-1 opacity-70 group-hover:opacity-100 transition">
            <Button size="icon" 
            className="bg-black hover:bg-zinc-800 text-white"
            onClick={onEdit}>
              <Pencil size={16} />
            </Button>

            <Button size="icon" 
            className="bg-red-700 hover:bg-red-800 text-white"
            onClick={onDelete}>
              <Trash2 size={16} />
            </Button>
          </div>
        </div>

        <h3 className="font-bold text-lg leading-tight line-clamp-2">
          {title}
        </h3>

        <p className="text-sm text-zinc-600 line-clamp-3">{summary}</p>

        <div className="pt-3 border-t border-zinc-200 flex items-center justify-between text-xs text-zinc-500">
          <span>{author}</span>
          <time>
            {new Date(publicationDate).toLocaleDateString("es-AR")}
          </time>
        </div>
      </div>
    </article>
  );
}