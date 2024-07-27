// src/types/product.ts
export type Product = {
  rating: any;
  id: string;
  title: string;
  price: number;
  image: string;
  images: string[];
  description: string;
  category: Category;
  isShow: boolean;
  relatedProducts?: Product[];
  quantity: number;
};

interface CartItem extends Product {
  quantity: number;
}
export type Category = {
  id: number;
  name: string;
  description: string;
};


