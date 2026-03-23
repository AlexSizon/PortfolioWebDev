export type AdminCategory = {
  id: string;
  name: string;
  order: number;
};

export type AdminMenuItem = {
  id: string;
  name: string;
  description: string;
  ingredients: string;
  price: number;
  imageUrl: string | null;
  available: boolean;
  categoryId: string;
  category: AdminCategory;
};
