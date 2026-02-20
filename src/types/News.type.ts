export type NewsStatus = 'draft' | 'in_review' | 'approved' | 'published' | 'rejected';

export type NewsVariant = 'highlighted' | 'featured' | 'default';

export interface INews {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  highlights: string[];
  author: { name?: string };
  category: { id?: string; name?: string };
  mainImage?: string;
  source?: string;
  variant: NewsVariant;
  status: NewsStatus;
  publicationDate?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface INewsCreate {
  title: string;
  slug?: string;
  summary: string;
  content: string;
  highlights?: string[];
  category: string;
  mainImage?: string;
  source?: string | null;
  variant?: NewsVariant;
}



