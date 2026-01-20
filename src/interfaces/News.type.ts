export interface INews {
  _id?: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  highlights: string[];
  author: string;
  category: string;
  mainImage?: string;
  source?: string;
  variant: string;
  status: string;
  publicationDate: string;
}

/* export type StatusNews = 'draft' | 'published' | 'archived' ;

export interface NewsApi{
    _id: string
    title: string
    slug: string
    summary: string
    content: string
    highlights: boolean
    author: string
    category: string
    mainImage: string
    status: string
    publicationDate: Date
} */

    