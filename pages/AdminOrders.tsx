
import React from 'react';
import { Order } from '../types';
// Added ShoppingBag to imports
import { CheckCircle, XCircle, Clock, Search, MapPin, Phone, User, ShoppingBag } from 'lucide-react';

interface AdminOrdersProps {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

const AdminOrders: React.FC<AdminOrdersProps> = ({ orders, setOrders }) => {
  const updateStatus = (id: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">إدارة الطلبات</h1>

      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex flex-col lg:flex-row justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold">#{order.id}</span>
                  <span className={`text-xs px-3 py-1 rounded-full font-bold ${
                    order.status === 'pending' ? 'bg-orange-100 text-orange-600' : 
                    order.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {order.status === 'pending' ? 'قيد الانتظار' : order.status === 'completed' ? 'مكتمل' : 'ملغي'}
                  </span>
                  <span className="text-gray-400 text-xs">{new Date(order.createdAt).toLocaleString('ar-MA')}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-gray-700"><User size={18} className="text-indigo-400" /> {order.customerName}</div>
                  <div className="flex items-center gap-2 text-gray-700"><MapPin size={18} className="text-indigo-400" /> {order.city}</div>
                  <div className="flex items-center gap-2 text-gray-700" dir="ltr"><Phone size={18} className="text-indigo-400" /> {order.phone}</div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <h4 className="text-xs font-bold text-gray-400 mb-2 uppercase">المنتجات المطلوبة</h4>
                  <div className="space-y-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span>{item.name} × {item.quantity}</span>
                        <span className="font-bold">{(item.price * item.quantity).toLocaleString()} د.م</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between font-bold">
                    <span>المجموع الكلي:</span>
                    <span className="text-indigo-600">{order.totalPrice.toLocaleString()} د.م</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-row lg:flex-col gap-2 justify-end">
                {order.status === 'pending' && (
                  <>
                    <button 
                      onClick={() => updateStatus(order.id, 'completed')}
                      className="bg-green-500 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-green-600 transition-colors"
                    >
                      <CheckCircle size={16} /> تأكيد التوصيل
                    </button>
                    <button 
                      onClick={() => updateStatus(order.id, 'cancelled')}
                      className="bg-red-50 text-red-500 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-red-100 transition-colors"
                    >
                      <XCircle size={16} /> إلغاء الطلب
                    </button>
                  </>
                )}
                {order.status !== 'pending' && (
                   <button 
                    onClick={() => updateStatus(order.id, 'pending')}
                    className="text-gray-400 text-xs hover:underline"
                  >
                    إعادة ضبط كمعلق
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl">
            <ShoppingBag size={48} className="mx-auto text-gray-200 mb-4" />
            <p className="text-gray-400">لا توجد طلبات لعرضها حالياً</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
