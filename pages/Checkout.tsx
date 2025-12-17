
import React, { useState } from 'react';
import { CartItem, Order, SiteSettings } from '../types';
import { CheckCircle, Truck, MapPin, Phone, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CheckoutProps {
  cart: CartItem[];
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  clearCart: () => void;
  settings: SiteSettings;
}

const Checkout: React.FC<CheckoutProps> = ({ cart, setOrders, clearCart, settings }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    city: '',
    phone: ''
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      customerName: formData.fullName,
      city: formData.city,
      phone: formData.phone,
      items: cart.map(item => ({ 
        productId: item.id, 
        quantity: item.quantity, 
        price: item.price,
        name: item.name
      })),
      totalPrice: total,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setOrders(prev => [newOrder, ...prev]);

    // Google Sheets Integration Simulation
    if (settings.googleSheetsUrl) {
      console.log('Sending order to Google Sheets...', newOrder);
      // In a real app, use fetch(settings.googleSheetsUrl, { method: 'POST', body: JSON.stringify(newOrder) })
    }

    setIsSuccess(true);
    clearCart();
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle size={80} className="text-green-500 animate-bounce" />
        </div>
        <h2 className="text-3xl font-black mb-4">تم استلام طلبك بنجاح!</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          شكراً لك على ثقتك في متجر النخبة. سيتصل بك فريقنا قريباً لتأكيد الطلب وترتيب عملية التوصيل.
        </p>
        <button 
          onClick={() => navigate('/')}
          className="bg-indigo-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-lg transition-all"
        >
          العودة للمتجر
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold mb-4">السلة فارغة، لا يمكنك إتمام الطلب</h2>
        <button onClick={() => navigate('/')} className="text-indigo-600 underline">ابدأ التسوق</button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-black mb-10">إتمام الطلب</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Checkout Form */}
        <div className="bg-white p-8 rounded-3xl shadow-sm">
          <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
            <Truck className="text-indigo-600" /> معلومات الشحن
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-1">
                <User size={16} /> الاسم الكامل
              </label>
              <input 
                type="text" 
                required 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all"
                placeholder="مثلاً: أحمد بناني"
                value={formData.fullName}
                onChange={e => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-1">
                <MapPin size={16} /> المدينة
              </label>
              <input 
                type="text" 
                required 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all"
                placeholder="مثلاً: الدار البيضاء، الرباط..."
                value={formData.city}
                onChange={e => setFormData({ ...formData, city: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-1">
                <Phone size={16} /> رقم الهاتف
              </label>
              <input 
                type="tel" 
                required 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all text-left"
                dir="ltr"
                placeholder="06 XX XX XX XX"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className="pt-6">
              <button 
                type="submit"
                className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
              >
                تأكيد الطلب الآن
              </button>
              <p className="text-center text-gray-400 text-sm mt-4">الدفع عند الاستلام في جميع أنحاء المغرب</p>
            </div>
          </form>
        </div>

        {/* Order Summary Summary */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm">
            <h2 className="text-xl font-bold mb-6">ملخص طلبك</h2>
            <div className="divide-y divide-gray-100 max-h-80 overflow-auto">
              {cart.map(item => (
                <div key={item.id} className="py-4 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt="" className="w-12 h-12 object-cover rounded-lg" />
                    <div>
                      <h4 className="font-bold text-sm">{item.name}</h4>
                      <span className="text-xs text-gray-400">العدد: {item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-bold text-sm">{(item.price * item.quantity).toLocaleString()} د.م</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 mt-6 pt-6 flex justify-between items-center">
              <span className="text-lg font-bold">المجموع الكلي</span>
              <span className="text-3xl font-black text-indigo-700">{total.toLocaleString()} د.م</span>
            </div>
          </div>

          <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100 flex items-start gap-4">
            <div className="p-3 bg-white rounded-2xl text-indigo-600 shadow-sm">
              <Truck size={24} />
            </div>
            <div>
              <h3 className="font-bold mb-1">توصيل مجاني</h3>
              <p className="text-sm text-indigo-700 opacity-70 leading-relaxed">توصيل منزلي مجاني لجميع مدن المغرب. الدفع كاش عند استلام الطلب.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
