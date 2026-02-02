export interface INews {
  _id: string;
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

export interface INewsCreate {
  title: string; //
  slug: string ; 
  summary: string; //
  content: string; //
  highlights: string[];
  author: string; //
  category: string; // 
  mainImage?: string; //
  source?: string | null; //
  variant: string; 
  status: string; //
}



    