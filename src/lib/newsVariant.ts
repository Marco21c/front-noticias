import type { News } from '../interfaces/news';

export type NewsVariant = 'highlighted' | 'featured' | 'default';

export const getNewsVariant = (news: News): NewsVariant => {
    if (news.highlighted) return 'highlighted';
    if (news.featured) return 'featured';
    return 'default';
};