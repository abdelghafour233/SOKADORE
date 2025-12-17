
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { ChevronRight, ShoppingCart, ShieldCheck, Truck, RefreshCcw, Star } from 'lucide-react';

interface ProductDetailProps {
  products: Product[];
  addToCart: (p: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ products, addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">المنتج غير موجود</h2>
        <Link to="/" className="text-indigo-600 underline">العودة للرئيسية</Link>
      </div>
    );
  }

  const handleBuyNow = () => {
    addToCart(product);
    navigate('/cart');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm text-gray-500 mb-8 gap-2">
        <Link to="/" className="hover:text-indigo-600">الرئيسية</Link>
        <ChevronRight size={14} />
        <span>{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white p-6 md:p-10 rounded-3xl shadow-sm">
        {/* Image Gallery */}
        <div>
          <div className="rounded-2xl overflow-hidden mb-4 aspect-square">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-4">
             {[1,2,3,4].map(i => (
               <div key={i} className="aspect-square rounded-lg overflow-hidden border border-gray-100 hover:border-indigo-600 cursor-pointer">
                 <img src={`https://picsum.photos/seed/${product.id+i}/200/200`} alt="" className="w-full h-full object-cover" />
               </div>
             ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-black mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map(i => <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />)}
            </div>
            <span className="text-gray-400 text-sm">(45 تقييم)</span>
          </div>

          <div className="mb-8">
            <span className="text-4xl font-black text-indigo-700">{product.price.toLocaleString()}</span>
            <span className="text-xl font-bold text-gray-400 mr-2">درهم مغربي</span>
          </div>

          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="space-y-4 mb-10">
            <h3 className="font-bold text-lg">المميزات الرئيسية:</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {product.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-700 bg-gray-50 p-3 rounded-xl">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <button 
              onClick={handleBuyNow}
              className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-bold text-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
            >
              شراء الآن
            </button>
            <button 
              onClick={() => addToCart(product)}
              className="flex-1 bg-white text-indigo-600 border-2 border-indigo-600 py-4 rounded-2xl font-bold text-xl hover:bg-indigo-50 transition-all"
            >
              أضف للسلة
            </button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-100">
            <div className="flex flex-col items-center text-center gap-2">
              <Truck size={24} className="text-indigo-500" />
              <span className="text-xs font-bold text-gray-500">توصيل سريع</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <ShieldCheck size={24} className="text-indigo-500" />
              <span className="text-xs font-bold text-gray-500">ضمان سنة</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <RefreshCcw size={24} className="text-indigo-500" />
              <span className="text-xs font-bold text-gray-500">استرجاع سهل</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
