
export type Language = 'bn' | 'en';

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: 'user' | 'admin';
}

export interface Category {
  id: string;
  name: { bn: string; en: string };
  image: string;
}

export interface Product {
  id: string;
  cat_id: string;
  name: { bn: string; en: string };
  description: { bn: string; en: string };
  price: number;
  stock: number;
  image: string;
  created_at: string;
}

export interface OrderItem {
  product_id: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  user_id: string;
  items: OrderItem[];
  total_amount: number;
  status: 'placed' | 'dispatched' | 'delivered';
  created_at: string;
}

export interface CartItem extends Product {
  cart_quantity: number;
}
