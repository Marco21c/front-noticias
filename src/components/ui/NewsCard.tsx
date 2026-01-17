type NewsCardProps = {
    title: string;
    excerpt: string;
    section: string;
    imageUrl?: string;
    publishedAt?: string;
    author?: string;
    variant?: "default" | "featured";
}

export default function NewsCard({ title, excerpt, section, imageUrl, publishedAt, author, variant }: NewsCardProps) {
    return (
        <article className={`bg-white rounded-md shadow-sm border overflow-hidden transition hover:shadow-md hover:-translate-y-0.5`}>

            <img
                src={imageUrl || `https://picsum.photos/400/200?random=${encodeURIComponent(title)}`}
                alt={title}
                className={`w-full object-cover ${variant === 'featured' ? 'h-72' : 'h-44'}`}
            />

            {author && (<div className="px-4 py-2 text-xs text-gray-500">
                Por {author}
                </div>)}

            <div className="p-4">
                <span className="text-xs uppercase text-blue-600 font-semibold">
                    {section}
                </span>

                <h2 className={`mt-2 font-bold ${variant === 'featured' 
                    ? 'text-2xl leading-tight' 
                    : 'text-base'
                    }`}>
                    {title}
                </h2>

                <p className={ `mt-2 ${variant === 'featured'
                    ? "text-gray-700"
                    : "text-gray-600 text-sm"
                }`}>
                    {excerpt}
                </p>

                <p className="text-xs text-gray-500 mt-3">
                    Publicado {publishedAt || 'hace unos minutos'}
                </p>

            </div>

        </article>
    );
}