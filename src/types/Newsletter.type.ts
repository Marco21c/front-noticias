export interface INewsletter {
  _id: string;
  user: string;
  preferredCategories: string[];
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SubscribeRequest {
  preferredCategories: string[];
}

export interface UpdatePreferencesRequest {
  preferredCategories: string[];
}
