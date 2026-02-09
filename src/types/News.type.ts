export enum NewsStatus {
  DRAFT = 'draft',           // Borrador del editor
  PENDING = 'pending',       // Enviada para aprobación
  APPROVED = 'approved',     // Aprobada por admin
  REJECTED = 'rejected',     // Rechazada por admin
  REVIEW = 'review',         // En revisión
  PUBLISHED = 'published'    // Publicada
}

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
  status: NewsStatus;
  reviewReason?: string[];  // Observacion de la revision
  reviewedBy?: string[];    // Usuario que reviso
  reviewedAt?: string[];    // Fecha de revision
  publicationDate: string;
}

export interface INewsCreate {
  title: string; //
  slug: string;
  summary: string; //
  content: string; //
  highlights: string[];
  author: string; //
  category: string; // 
  mainImage?: string; //
  source?: string | null; //
  variant: string;
  status: NewsStatus; //
}



