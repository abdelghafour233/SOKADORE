
import React, { useState } from 'react';
import { Product, Category } from '../types';
import { CATEGORIES } from '../constants';
import { ShoppingCart, Eye, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface StoreHomeProps {
  products: Product[];
  addToCart: (p: Product) => void;
}

const StoreHome: React.FC<StoreHomeProps> = ({ products, addToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-indigo-600 text-white py-20 px-4 overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            تسوق أفضل المنتجات <br /> بأفضل الأسعار في المغرب
          </h1>
          <p className="text-xl md:text-2xl text-indigo-100 mb-10 max-w-2xl mx-auto">
            إلكترونيات، أثاث منزلي، وسيارات مختارة بعناية لتناسب ذوقكم الرفيع. توصيل سريع لجميع المدن.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#products" className="bg-white text-indigo-600 px-8 py-3 rounded-full font-bold text-lg hover:shadow-lg transition-all">تصفح المنتجات</a>
            <a href="#categories" className="bg-indigo-500 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-indigo-400 transition-all border border-indigo-400">الأقسام</a>
          </div>
        </div>
        {/* Abstract shapes for design */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full filter blur-3xl opacity-50 -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-800 rounded-full filter blur-3xl opacity-50 -ml-32 -mb-32"></div>
      </section>

      {/* Categories */}
      <section id="categories" className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">تسوق حسب القسم</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button 
              onClick={() => setSelectedCategory('all')}
              className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${selectedCategory === 'all' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-100 hover:border-indigo-200'}`}
            >
              <span className="text-4xl">🛍️</span>
              <span className="font-bold">الكل</span>
            </button>
            {CATEGORIES.map(cat => (
              <button 
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${selectedCategory === cat.id ? 'border-indigo-600 bg-indigo-50' : 'border-gray-100 hover:border-indigo-200'}`}
              >
                <span className="text-4xl">{cat.icon}</span>
                <span className="font-bold">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="products" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">
              {selectedCategory === 'all' ? 'آخر المنتجات' : CATEGORIES.find(c => c.id === selectedCategory)?.name}
            </h2>
            <span className="text-gray-500 font-medium">{filteredProducts.length} منتج</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col">
                <div className="relative overflow-hidden aspect-video">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-indigo-600 shadow-sm">
                    {CATEGORIES.find(c => c.id === product.category)?.name}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-indigo-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-4">
                    {[1,2,3,4,5].map(i => <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-black text-indigo-700">{product.price.toLocaleString()}</span>
                      <span className="text-sm font-bold text-gray-400 mr-1">درهم</span>
                    </div>
                    <div className="flex gap-2">
                       <Link to={`/product/${product.id}`} className="p-2 text-gray-400 hover:text-indigo-600 transition-colors">
                         <Eye size={20} />
                       </Link>
                       <button 
                        onClick={() => addToCart(product)}
                        className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                       >
                         <ShoppingCart size={20} />
                       </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-500">لا توجد منتجات في هذا القسم حالياً</h3>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default StoreHome;
