
import React from 'react';
import { Order, Product } from '../types';
import { ShoppingBag, Package, DollarSign, Users, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface AdminDashboardProps {
  orders: Order[];
  products: Product[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ orders, products }) => {
  const totalRevenue = orders.reduce((acc, o) => o.status === 'completed' ? acc + o.totalPrice : acc, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;

  const data = [
    { name: 'يناير', value: 4000 },
    { name: 'فبراير', value: 3000 },
    { name: 'مارس', value: 2000 },
    { name: 'أبريل', value: 2780 },
    { name: 'مايو', value: 1890 },
    { name: 'يونيو', value: 2390 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">نظرة عامة</h1>
        <div className="text-gray-500 text-sm">مرحباً بك مجدداً في لوحة التحكم</div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><DollarSign /></div>
            <span className="text-green-500 text-sm font-bold flex items-center gap-1"><TrendingUp size={14}/> +12%</span>
          </div>
          <div className="text-gray-400 text-sm mb-1">إجمالي المبيعات (الناجحة)</div>
          <div className="text-2xl font-bold">{totalRevenue.toLocaleString()} د.م</div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-orange-50 text-orange-600 rounded-xl"><ShoppingBag /></div>
            <span className="text-orange-500 text-sm font-bold">{pendingOrders} قيد الانتظار</span>
          </div>
          <div className="text-gray-400 text-sm mb-1">إجمالي الطلبات</div>
          <div className="text-2xl font-bold">{orders.length}</div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Package /></div>
          </div>
          <div className="text-gray-400 text-sm mb-1">المنتجات النشطة</div>
          <div className="text-2xl font-bold">{products.length}</div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-xl"><Users /></div>
          </div>
          <div className="text-gray-400 text-sm mb-1">الزوار اليوم</div>
          <div className="text-2xl font-bold">1,240</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold mb-6">تحليلات المبيعات</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold mb-6">أحدث الطلبات</h3>
          <div className="space-y-4">
            {orders.slice(0, 5).map(order => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <div className="font-bold text-sm">{order.customerName}</div>
                  <div className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString('ar-MA')}</div>
                </div>
                <div className="text-sm font-bold text-indigo-600">{order.totalPrice.toLocaleString()} د.م</div>
                <span className={`text-xs px-2 py-1 rounded-full ${order.status === 'pending' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                  {order.status === 'pending' ? 'معلق' : 'مكتمل'}
                </span>
              </div>
            ))}
            {orders.length === 0 && <p className="text-gray-400 text-center py-10">لا يوجد طلبات حالياً</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
