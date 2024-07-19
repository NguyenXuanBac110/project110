// src/types/product.ts
export type Product = {
  rating: any;
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: Category;
  isShow: boolean;
};

export type Category = {
  id: number;
  name: string;
  description: string;
};
