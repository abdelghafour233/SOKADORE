
import React, { useState, useEffect, useMemo } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, LayoutDashboard, Home, Package, ShoppingBag, Settings, Menu, X, Plus, Trash2, ChevronLeft, CreditCard } from 'lucide-react';
import { Product, Order, SiteSettings, Category, CartItem } from './types';
import { CATEGORIES, INITIAL_PRODUCTS } from './constants';

// Storefront Pages
import StoreHome from './pages/StoreHome';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

// Admin Pages
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminOrders from './pages/AdminOrders';
import AdminSettings from './pages/AdminSettings';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('settings');
    return saved ? JSON.parse(saved) : {
      fbPixel: '',
      googlePixel: '',
      tiktokPixel: '',
      googleSheetsUrl: '',
      domain: 'www.myshop.com',
      nameServers: ['ns1.example.com', 'ns2.example.com']
    };
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.setItem('settings', JSON.stringify(settings));
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [products, orders, settings, cart]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateCartQuantity = (id: string, q: number) => {
    if (q < 1) return;
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: q } : item));
  };

  const clearCart = () => setCart([]);

  return (
    <HashRouter>
      <Layout 
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        settings={settings}
      >
        <Routes>
          {/* Storefront */}
          <Route path="/" element={<StoreHome products={products} addToCart={addToCart} />} />
          <Route path="/product/:id" element={<ProductDetail products={products} addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} updateQuantity={updateCartQuantity} />} />
          <Route path="/checkout" element={<Checkout cart={cart} orders={orders} setOrders={setOrders} clearCart={clearCart} settings={settings} />} />

          {/* Admin Panel */}
          <Route path="/admin" element={<AdminDashboard orders={orders} products={products} />} />
          <Route path="/admin/products" element={<AdminProducts products={products} setProducts={setProducts} />} />
          <Route path="/admin/orders" element={<AdminOrders orders={orders} setOrders={setOrders} />} />
          <Route path="/admin/settings" element={<AdminSettings settings={settings} setSettings={setSettings} />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

interface LayoutProps {
  children: React.ReactNode;
  cartCount: number;
  settings: SiteSettings;
}

const Layout: React.FC<LayoutProps> = ({ children, cartCount, settings }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Dynamic Pixel Injections
  useEffect(() => {
    if (settings.fbPixel) {
      console.log(`Injecting Facebook Pixel: ${settings.fbPixel}`);
      // In a real app, you would inject the script tag here
    }
  }, [settings.fbPixel]);

  if (isAdmin) {
    return (
      <div className="min-h-screen flex bg-gray-100 font-cairo">
        {/* Sidebar */}
        <aside className="w-64 bg-indigo-900 text-white flex-shrink-0 hidden md:flex flex-col">
          <div className="p-6 text-2xl font-bold border-b border-indigo-800 text-center">
            لوحة التحكم
          </div>
          <nav className="flex-1 mt-4">
            <Link to="/admin" className="flex items-center px-6 py-3 hover:bg-indigo-800 transition-colors">
              <LayoutDashboard className="ml-3" size={20} /> الإحصائيات
            </Link>
            <Link to="/admin/products" className="flex items-center px-6 py-3 hover:bg-indigo-800 transition-colors">
              <Package className="ml-3" size={20} /> المنتجات
            </Link>
            <Link to="/admin/orders" className="flex items-center px-6 py-3 hover:bg-indigo-800 transition-colors">
              <ShoppingBag className="ml-3" size={20} /> الطلبات
            </Link>
            <Link to="/admin/settings" className="flex items-center px-6 py-3 hover:bg-indigo-800 transition-colors">
              <Settings className="ml-3" size={20} /> الإعدادات
            </Link>
          </nav>
          <div className="p-4 border-t border-indigo-800">
            <Link to="/" className="text-sm text-indigo-300 hover:text-white transition-colors">العودة للمتجر</Link>
          </div>
        </aside>

        <div className="flex-1 flex flex-col">
          <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 md:hidden">
             <button onClick={() => setIsMenuOpen(true)} className="p-2"><Menu /></button>
             <span className="font-bold">لوحة التحكم</span>
             <div className="w-8"></div>
          </header>
          
          {/* Mobile Admin Nav */}
          {isMenuOpen && (
            <div className="fixed inset-0 bg-black/50 z-50 md:hidden" onClick={() => setIsMenuOpen(false)}>
              <div className="w-64 bg-indigo-900 h-full p-6 text-white" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-8">
                  <span className="font-bold text-xl">لوحة التحكم</span>
                  <button onClick={() => setIsMenuOpen(false)}><X /></button>
                </div>
                <div className="flex flex-col gap-4">
                  <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="flex items-center"><LayoutDashboard className="ml-2" /> الإحصائيات</Link>
                  <Link to="/admin/products" onClick={() => setIsMenuOpen(false)} className="flex items-center"><Package className="ml-2" /> المنتجات</Link>
                  <Link to="/admin/orders" onClick={() => setIsMenuOpen(false)} className="flex items-center"><ShoppingBag className="ml-2" /> الطلبات</Link>
                  <Link to="/admin/settings" onClick={() => setIsMenuOpen(false)} className="flex items-center"><Settings className="ml-2" /> الإعدادات</Link>
                  <Link to="/" onClick={() => setIsMenuOpen(false)} className="mt-8 pt-4 border-t border-indigo-700">المتجر</Link>
                </div>
              </div>
            </div>
          )}

          <main className="flex-1 overflow-auto p-4 md:p-8">
            {children}
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-cairo bg-gray-50">
      {/* Storefront Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link to="/" className="text-2xl font-black text-indigo-600 tracking-tighter">
            متجر النخبة
          </Link>

          <nav className="hidden md:flex gap-8 text-lg font-medium">
            <Link to="/" className="hover:text-indigo-600 transition-colors">الرئيسية</Link>
            <Link to="/#categories" className="hover:text-indigo-600 transition-colors">الأقسام</Link>
            <Link to="/admin" className="text-gray-400 hover:text-indigo-600 transition-colors text-sm">لوحة الإدارة</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative p-2 bg-indigo-50 rounded-full text-indigo-600 hover:bg-indigo-100 transition-colors">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-right">
          <div>
            <h3 className="text-xl font-bold mb-4">متجر النخبة</h3>
            <p className="text-gray-400">وجهتكم الأولى لأفضل المنتجات في المغرب. جودة عالية وأسعار منافسة.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/">الرئيسية</Link></li>
              <li><Link to="/cart">السلة</Link></li>
              <li><Link to="/admin">الإدارة</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">تواصل معنا</h3>
            <p className="text-gray-400">واتساب: +212 600 000 000</p>
            <p className="text-gray-400">البريد: support@example.com</p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          جميع الحقوق محفوظة © {new Date().getFullYear()} متجر النخبة المغربي
        </div>
      </footer>
    </div>
  );
};

export default App;
