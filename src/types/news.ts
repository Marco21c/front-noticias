export type News = {
    id: string;
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
}