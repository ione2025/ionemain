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

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export type OrderItem = {
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  total: number;
};

export type Order = {
  id: string;
  orderNumber: string;
  buyerId: string;
  buyerName: string;
  buyerEmail: string;
  sellerId?: string;
  sellerName?: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
};

export type Invoice = {
  id: string;
  invoiceNumber: string;
  orderId: string;
  issueDate: string;
  dueDate: string;
  status: 'paid' | 'unpaid' | 'overdue';
};