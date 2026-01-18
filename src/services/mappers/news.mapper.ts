import type { News } from '../../types/news.ts';

type BackendNews = {
    _id: string;
    title: string;
    slug: string;
    summary: string;
    content: string;
    highlighted?: boolean;
    featured?: boolean;
    category: string;
    author?: string;
    mainImage?: string;
    publicationDate: string;
    status: 'draft' | 'published' | 'archived';
};

export const mapNewsFromBackend = (item: BackendNews): News => {
    return {
        id: item._id,
        title: item.title,
        slug: item.slug,
        summary: item.summary,
        content: item.content,
        highlighted: Boolean(item.highlighted),
        featured: Boolean(item.featured),
        category: item.category,
        author: item.author,
        mainImage: item.mainImage,
        publicationDate: item.publicationDate,
        status: item.status,
    };
};

export const mapNewsArray = (data: any []): News[] => {
    return data.map(mapNewsFromBackend);
};