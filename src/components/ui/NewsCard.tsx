import type { News } from '../../types/news';
import type { NewsVariant } from '../../lib/newsVariant';

type NewsCardsProps = {
    title: News['title'];
    excerpt: News['summary'];
    section: News['category'];
    imageUrl?: News['mainImage'];
    publishedAt?: News['publicationDate'];
    author?: News['author'];
    variant?: NewsVariant;
}

const getImageHeight = (variant?: NewsVariant) => {
    switch (variant) {
        case 'highlighted': return 'h-80';
        case 'featured': return 'h-48';
        default: return 'hidden';
    }
};

const getTitleStyles = (variant?: NewsVariant) => {
    switch (variant) {
        case 'highlighted': return 'text-4xl md:text-5xl leading-tight font-black';
        case 'featured': return 'text-lg md:text-xl leading-snug font-bold';
        default: return 'text-base font-bold';
    }
};

const getExcerptStyles = (variant?: NewsVariant) => {
    switch (variant) {
        case 'highlighted': return 'text-base md:text-lg text-gray-700 line-clamp-3';
        case 'featured': return 'text-sm text-gray-600 line-clamp-2';
        default: return 'text-sm text-gray-600 line-clamp-2';
    }
};

export default function NewsCard({ title, excerpt, section, imageUrl, publishedAt, author, variant }: NewsCardsProps) {
    const isHighlighted = variant === 'highlighted';
    const isFeatured = variant === 'featured';

    // Layout featured con imagen cuadrada (estilo El País)
    if (isFeatured) {
        return (
            <article className="flex gap-4 py-6 border-b border-gray-200 cursor-pointer group hover:bg-gray-50 transition-colors px-2">
                
                <div className="relative flex-shrink-0 overflow-hidden rounded-sm bg-gray-300 w-48 h-48">
                    <img
                        src={imageUrl || 'https://images.unsplash.com/photo-1585776245865-b0b07fb11b13?w=400&h=400&fit=crop'}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1585776245865-b0b07fb11b13?w=400&h=400&fit=crop';
                        }}
                    />
                </div>

                <div className="flex flex-col flex-grow min-w-0">
                    <div className="mb-2">
                        <span className="text-xs uppercase tracking-wider font-bold text-blue-600 hover:text-blue-700 transition-colors">
                            {section}
                        </span>
                    </div>

                    <h2 className={`${getTitleStyles(variant)} text-gray-900 mb-3 line-clamp-3 group-hover:text-blue-600 transition-colors`}>
                        {title}
                    </h2>

                    <p className={`${getExcerptStyles(variant)} mb-4 flex-grow`}>
                        {excerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="font-medium">
                            {author && `Por ${author} • `}{publishedAt}
                        </span>
                        <span className="text-blue-600 font-semibold group-hover:text-blue-700">
                            Leer más →
                        </span>
                    </div>
                </div>
            </article>
        );
    }

    // Layout destacado para highlighted
    if (isHighlighted) {
        return (
            <article className="cursor-pointer group mb-8">
                <div className="relative overflow-hidden rounded-lg bg-gray-300 mb-6">
                    <img
                        src={imageUrl || 'https://images.unsplash.com/photo-1585776245865-b0b07fb11b13?w=600&h=600&fit=crop'}
                        alt={title}
                        className={`w-full object-cover ${getImageHeight(variant)} group-hover:scale-105 transition-transform duration-300`}
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1585776245865-b0b07fb11b13?w=600&h=600&fit=crop';
                        }}
                    />
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-lg">
                        Destacada
                    </div>
                </div>

                <div className="space-y-3">
                    <span className="inline-block text-xs uppercase tracking-wider font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded">
                        {section}
                    </span>

                    <h2 className={`${getTitleStyles(variant)} text-gray-900 group-hover:text-blue-600 transition-colors`}>
                        {title}
                    </h2>

                    <p className={`${getExcerptStyles(variant)} text-gray-700`}>
                        {excerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-200">
                        <span className="font-medium">
                            {author && `Por ${author} • `}{publishedAt}
                        </span>
                        <span className="text-blue-600 font-semibold group-hover:text-blue-700">
                            Leer más →
                        </span>
                    </div>
                </div>
            </article>
        );
    }

    // Layout minimalista para default
    return (
        <article className="py-6 border-b border-gray-200 cursor-pointer group hover:bg-gray-50 transition-colors px-2">
            <div className="mb-2">
                <span className="text-xs uppercase tracking-wider font-bold text-blue-600 group-hover:text-blue-700 transition-colors">
                    {section}
                </span>
            </div>

            <h2 className={`${getTitleStyles(variant)} text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors`}>
                {title}
            </h2>

            <p className={`${getExcerptStyles(variant)} mb-3`}>
                {excerpt}
            </p>

            <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="font-medium">
                    {author && `Por ${author} • `}{publishedAt}
                </span>
            </div>
        </article>
    );
}