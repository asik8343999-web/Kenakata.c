
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, Link, useLocation, useNavigate } from 'react-router-dom';
import { translations } from './translations';
import { DB } from './store';
import { Language, User, CartItem, Product } from './types';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import AdminCategory from './pages/AdminCategory';
import AdminProduct from './pages/AdminProduct';
import AdminOrders from './pages/AdminOrders';
import AdminUser from './pages/AdminUser';
import AdminSetting from './pages/AdminSetting';

const MainLayout: React.FC<{
  lang: Language;
  setLang: (l: Language) => void;
  user: User | null;
  cart: CartItem[];
  addToCart: (p: Product, q?: number) => void;
  updateCart: (c: CartItem[]) => void;
  logout: () => void;
  setUser: (u: User) => void;
}> = ({ lang, setLang, user, cart, addToCart, updateCart, logout, setUser }) => {
  const t = translations[lang];
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminPath = location.pathname.startsWith('/admin');

  const toggleLang = () => {
    const newLang = lang === 'bn' ? 'en' : 'bn';
    setLang(newLang);
    DB.setLang(newLang);
  };

  return (
    <div className="min-h-screen pb-20 md:pb-10">
      {/* Top Header */}
      {!isAdminPath && (
        <header className="sticky top-0 z-50 bg-white shadow-sm px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-orange-600 flex items-center gap-2">
            <i className="fas fa-shopping-bag"></i>
            <span>{t.app_name}</span>
          </Link>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleLang}
              className="text-[10px] font-bold border border-orange-200 px-3 py-1 rounded-full bg-orange-50 text-orange-700 uppercase tracking-tight"
            >
              {lang === 'bn' ? 'English' : 'বাংলা'}
            </button>
            <Link to="/cart" className="relative text-gray-700 bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full">
              <i className="fas fa-shopping-cart text-lg"></i>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>
        </header>
      )}

      {/* Mobile Search - Hidden on Admin/Login */}
      {!isAdminPath && location.pathname !== '/login' && (
        <div className="px-4 py-2 bg-white md:max-w-xl md:mx-auto">
          <div className="relative">
            <input 
              type="text" 
              placeholder={t.search} 
              className="w-full bg-gray-100 rounded-2xl py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all border-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                   const val = (e.target as HTMLInputElement).value;
                   navigate(`/products?q=${encodeURIComponent(val)}`);
                }
              }}
            />
            <i className="fas fa-search absolute left-4 top-3.5 text-gray-400"></i>
          </div>
        </div>
      )}

      <main className={isAdminPath ? "" : "md:max-w-3xl md:mx-auto"}>
        <Routes>
          <Route path="/" element={<Home lang={lang} addToCart={addToCart} />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login lang={lang} setUser={setUser} />} />
          <Route path="/admin/login" element={user?.role === 'admin' ? <Navigate to="/admin" /> : <AdminLogin lang={lang} setUser={setUser} />} />
          
          <Route path="/products" element={<ProductList lang={lang} addToCart={addToCart} />} />
          <Route path="/product/:id" element={<ProductDetail lang={lang} addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart lang={lang} cart={cart} updateCart={updateCart} />} />
          <Route path="/checkout" element={user ? <Checkout lang={lang} cart={cart} user={user} updateCart={updateCart} /> : <Navigate to="/login" />} />
          <Route path="/orders" element={user ? <Orders lang={lang} user={user} /> : <Navigate to="/login" />} />
          <Route path="/profile" element={user ? <Profile lang={lang} user={user} logout={logout} /> : <Navigate to="/login" />} />
          
          <Route path="/admin" element={user?.role === 'admin' ? <AdminDashboard lang={lang} /> : <Navigate to="/admin/login" />} />
          <Route path="/admin/categories" element={user?.role === 'admin' ? <AdminCategory lang={lang} /> : <Navigate to="/admin/login" />} />
          <Route path="/admin/products" element={user?.role === 'admin' ? <AdminProduct lang={lang} /> : <Navigate to="/admin/login" />} />
          <Route path="/admin/orders" element={user?.role === 'admin' ? <AdminOrders lang={lang} /> : <Navigate to="/admin/login" />} />
          <Route path="/admin/users" element={user?.role === 'admin' ? <AdminUser lang={lang} /> : <Navigate to="/admin/login" />} />
          <Route path="/admin/settings" element={user?.role === 'admin' ? <AdminSetting lang={lang} /> : <Navigate to="/admin/login" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      {/* Bottom Navigation */}
      {!isAdminPath && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex items-center justify-around py-3 md:hidden z-50">
          <Link to="/" className={`flex flex-col items-center gap-1 ${location.pathname === '/' ? 'text-orange-600' : 'text-gray-400'}`}>
            <i className="fas fa-home text-lg"></i>
            <span className="text-[10px] font-bold">{t.home}</span>
          </Link>
          <Link to="/products" className={`flex flex-col items-center gap-1 ${location.pathname.startsWith('/products') ? 'text-orange-600' : 'text-gray-400'}`}>
            <i className="fas fa-th-large text-lg"></i>
            <span className="text-[10px] font-bold">{t.categories}</span>
          </Link>
          <Link to="/orders" className={`flex flex-col items-center gap-1 ${location.pathname === '/orders' ? 'text-orange-600' : 'text-gray-400'}`}>
            <i className="fas fa-receipt text-lg"></i>
            <span className="text-[10px] font-bold">{t.orders}</span>
          </Link>
          <Link to="/profile" className={`flex flex-col items-center gap-1 ${location.pathname === '/profile' ? 'text-orange-600' : 'text-gray-400'}`}>
            <i className="fas fa-user text-lg"></i>
            <span className="text-[10px] font-bold">{t.profile}</span>
          </Link>
        </nav>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('bn');
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    DB.init();
    setLang(DB.getLang());
    setUser(DB.getCurrentUser());
    setCart(DB.getCart());
    setIsLoaded(true);
  }, []);

  const updateCart = (newCart: CartItem[]) => {
    setCart(newCart);
    DB.saveCart(newCart);
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      updateCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, cart_quantity: item.cart_quantity + quantity } 
          : item
      ));
    } else {
      updateCart([...cart, { ...product, cart_quantity: quantity }]);
    }
  };

  const logout = () => {
    DB.setCurrentUser(null);
    setUser(null);
  };

  if (!isLoaded) return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-white">
      <div className="w-16 h-16 border-4 border-orange-100 border-t-orange-500 rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-400 text-sm font-bold tracking-widest uppercase">Kenakata.com</p>
    </div>
  );

  return (
    <HashRouter>
      <MainLayout 
        lang={lang} 
        setLang={setLang} 
        user={user} 
        cart={cart} 
        addToCart={addToCart} 
        updateCart={updateCart} 
        logout={logout}
        setUser={setUser}
      />
    </HashRouter>
  );
};

export default App;
