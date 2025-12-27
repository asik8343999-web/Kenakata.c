
import { Product, Category, User, Order, CartItem } from './types';

const STORAGE_KEYS = {
  PRODUCTS: 'kenakata_products',
  CATEGORIES: 'kenakata_categories',
  USERS: 'kenakata_users',
  ORDERS: 'kenakata_orders',
  CURRENT_USER: 'kenakata_current_user',
  CART: 'kenakata_cart',
  LANG: 'kenakata_lang'
};

const INITIAL_CATEGORIES: Category[] = [
  { id: '1', name: { bn: 'মোবাইল', en: 'Mobiles' }, image: 'https://picsum.photos/seed/mobile/200/200' },
  { id: '2', name: { bn: 'ল্যাপটপ', en: 'Laptops' }, image: 'https://picsum.photos/seed/laptop/200/200' },
  { id: '3', name: { bn: 'পোশাক', en: 'Fashion' }, image: 'https://picsum.photos/seed/fashion/200/200' },
  { id: '4', name: { bn: 'ঘড়ি', en: 'Watches' }, image: 'https://picsum.photos/seed/watch/200/200' },
  { id: '5', name: { bn: 'জুতা', en: 'Shoes' }, image: 'https://picsum.photos/seed/shoes/200/200' },
];

const INITIAL_PRODUCTS: Product[] = [
  { 
    id: 'p1', 
    cat_id: '1', 
    name: { bn: 'আইফোন ১৫ প্রো', en: 'iPhone 15 Pro' }, 
    description: { bn: 'অত্যন্ত শক্তিশালী এবং স্টাইলিশ ডিজাইনের অ্যাপল আইফোন।', en: 'A powerhouse of performance and stylish design from Apple.' },
    price: 145000, 
    stock: 10, 
    image: 'https://picsum.photos/seed/ip15/400/400',
    created_at: new Date().toISOString()
  },
  { 
    id: 'p2', 
    cat_id: '2', 
    name: { bn: 'ম্যাকবুক এয়ার এম২', en: 'MacBook Air M2' }, 
    description: { bn: 'হালকা ওজন এবং সুপার ফাস্ট এম২ চিপ প্রসেসর।', en: 'Lightweight and super fast M2 chip processor for professionals.' },
    price: 115000, 
    stock: 5, 
    image: 'https://picsum.photos/seed/mbam2/400/400',
    created_at: new Date().toISOString()
  },
  { 
    id: 'p3', 
    cat_id: '3', 
    name: { bn: 'মেনস পোলো শার্ট', en: 'Mens Polo Shirt' }, 
    description: { bn: '১০০% আরামদায়ক প্রিমিয়াম কটন কাপড়।', en: '100% comfortable premium cotton fabric for everyday wear.' },
    price: 850, 
    stock: 50, 
    image: 'https://picsum.photos/seed/polo/400/400',
    created_at: new Date().toISOString()
  },
  { 
    id: 'p4', 
    cat_id: '4', 
    name: { bn: 'রোলেক্স ওয়াচ', en: 'Rolex Luxury Watch' }, 
    description: { bn: 'আভিজাত্যের প্রতীক প্রিমিয়াম মানের ঘড়ি।', en: 'A symbol of elegance and premium quality craftsmanship.' },
    price: 25000, 
    stock: 2, 
    image: 'https://picsum.photos/seed/rolex/400/400',
    created_at: new Date().toISOString()
  },
];

export const DB = {
  init: () => {
    if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([
        { 
          id: 'admin', 
          name: 'Asik Admin', 
          phone: '01700000000', 
          email: 'asik83439999@gmail.com', 
          role: 'admin' 
        }
      ]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.LANG)) {
      localStorage.setItem(STORAGE_KEYS.LANG, 'bn');
    }
  },
  
  getProducts: (): Product[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS) || '[]'),
  saveProducts: (products: Product[]) => localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products)),
  
  getCategories: (): Category[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.CATEGORIES) || '[]'),
  saveCategories: (categories: Category[]) => localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories)),
  
  getUsers: (): User[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]'),
  saveUsers: (users: User[]) => localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users)),
  
  getOrders: (): Order[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS) || '[]'),
  saveOrders: (orders: Order[]) => localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders)),
  saveOrder: (order: Order) => {
    const orders = DB.getOrders();
    orders.unshift(order);
    DB.saveOrders(orders);
  },

  getCurrentUser: (): User | null => {
    const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return user ? JSON.parse(user) : null;
  },
  setCurrentUser: (user: User | null) => {
    if (user) localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },

  getCart: (): CartItem[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.CART) || '[]'),
  saveCart: (cart: CartItem[]) => localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart)),

  getLang: (): 'bn' | 'en' => (localStorage.getItem(STORAGE_KEYS.LANG) as any) || 'bn',
  setLang: (lang: 'bn' | 'en') => localStorage.setItem(STORAGE_KEYS.LANG, lang),
};