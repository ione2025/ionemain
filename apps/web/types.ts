export type Product = {
  id: string;
  name: string;
  price: number;
  rating?: number;
  image: string;
  images?: string[];
  description: string;
  category?: 'Electronics' | 'Apparel' | 'Home & Garden';
  specs?: { label: string; value: string }[];
  reviews?: { author: string; rating: number; comment: string; date: string }[];
};

export type CartItem = {
  productId: string;
  qty: number;
};