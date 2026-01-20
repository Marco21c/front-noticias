import type { News, NewsApi } from '../interfaces/News.type';

export const mapNewsFromBackend = (item: NewsApi): News => {
    return {
        id: item._id,
        title: item.title,
        slug: item.slug,
        summary: item.summary,
        content: item.content,
        highlighted: Boolean(item.highlights),
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