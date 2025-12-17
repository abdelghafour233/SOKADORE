
import React from 'react';
import { CartItem } from '../types';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CartProps {
  cart: CartItem[];
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, q: number) => void;
}

const Cart: React.FC<CartProps> = ({ cart, removeFromCart, updateQuantity }) => {
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="text-8xl mb-6">🛒</div>
        <h2 className="text-3xl font-black mb-4">سلة المشتريات فارغة</h2>
        <p className="text-gray-500 mb-8">لم تقم بإضافة أي منتجات للسلة بعد.</p>
        <Link to="/" className="inline-block bg-indigo-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-lg transition-all">
          ابدأ التسوق الآن
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-black mb-10 flex items-center gap-3">
        <ShoppingBag className="text-indigo-600" /> سلة المشتريات
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-4">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl" />
              <div className="flex-1">
                <h3 className="font-bold text-lg">{item.name}</h3>
                <span className="text-indigo-600 font-bold">{item.price.toLocaleString()} درهم</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-1 hover:text-indigo-600 transition-colors"
                >
                  <Minus size={18} />
                </button>
                <span className="w-8 text-center font-bold">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 hover:text-indigo-600 transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
              <button 
                onClick={() => removeFromCart(item.id)}
                className="p-2 text-red-400 hover:text-red-600 transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-3xl shadow-sm h-fit sticky top-24">
          <h2 className="text-xl font-bold mb-6">ملخص الطلب</h2>
          <div className="space-y-4 mb-8">
            <div className="flex justify-between">
              <span className="text-gray-500">المجموع الفرعي</span>
              <span className="font-bold">{total.toLocaleString()} درهم</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">التوصيل</span>
              <span className="text-green-500 font-bold">مجاني</span>
            </div>
            <div className="border-t border-gray-100 pt-4 flex justify-between">
              <span className="text-lg font-bold">المجموع الكلي</span>
              <span className="text-2xl font-black text-indigo-700">{total.toLocaleString()} درهم</span>
            </div>
          </div>
          <Link to="/checkout" className="block w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-center text-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
            إتمام الطلب
          </Link>
          <Link to="/" className="flex items-center justify-center gap-2 mt-4 text-gray-500 hover:text-indigo-600 transition-colors">
            <ArrowLeft size={16} /> العودة للتسوق
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
