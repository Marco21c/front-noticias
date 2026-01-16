type NewsCardProps = {
    title: string;
    excerpt: string;
    section: string;
    imageUrl?: string;
    publishedAt?: string;
    variant?: "default" | "featured";
}

export default function NewsCard({ title, excerpt, section, imageUrl, publishedAt, variant }: NewsCardProps) {
    return (
        <article className={`bg-white rounded-md shadow-sm border overflow-hidden ${variant === "featured" ? "md:col-span-2 " : ""}`}>

            <img
                src={imageUrl || `https://via.placeholder.com/400x200?text=${encodeURIComponent(title)}`}
                alt={title}
                className={`w-full object-cover ${variant === 'featured' ? 'h-72' : 'h-48'}`}
            />

            <div className="p-4">
                <span className="text-xs uppercase text-blue-600 font-semibold">
                    {section}
                </span>

                <h2 className="text-lg font-bold mt-2">
                    {title}
                </h2>

                <p className="text-gray-600 text-sm mt-2">
                    {excerpt}
                </p>

                <p className="text-xs text-gray-500 mt-3">
                    Publicado {publishedAt || 'hace unos minutos'}
                </p>

            </div>

        </article>
    );
}