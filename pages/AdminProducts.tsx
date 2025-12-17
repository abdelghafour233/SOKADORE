
import React, { useState } from 'react';
import { Product, Category } from '../types';
import { CATEGORIES } from '../constants';
import { Plus, Trash2, Edit, Search, Image as ImageIcon } from 'lucide-react';

interface AdminProductsProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const AdminProducts: React.FC<AdminProductsProps> = ({ products, setProducts }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    category: 'electronics',
    description: '',
    image: 'https://picsum.photos/seed/newproduct/600/400',
    features: ['ميزة 1', 'ميزة 2']
  });

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...formData, id: editingProduct.id } : p));
    } else {
      const newProduct = { ...formData, id: Math.random().toString(36).substr(2, 9) };
      setProducts(prev => [...prev, newProduct]);
    }
    setIsModalOpen(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      price: 0,
      category: 'electronics',
      description: '',
      image: 'https://picsum.photos/seed/newproduct/600/400',
      features: ['ميزة 1', 'ميزة 2']
    });
  };

  const openEdit = (p: Product) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      price: p.price,
      category: p.category,
      description: p.description,
      image: p.image,
      features: p.features
    });
    setIsModalOpen(true);
  };

  const filteredProducts = products.filter(p => p.name.includes(searchTerm));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold">إدارة المنتجات</h1>
        <button 
          onClick={() => { setEditingProduct(null); setIsModalOpen(true); }}
          className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all"
        >
          <Plus size={20} /> إضافة منتج جديد
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
        <Search className="text-gray-400" size={20} />
        <input 
          type="text" 
          placeholder="ابحث عن منتج..."
          className="flex-1 outline-none text-gray-700"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden flex flex-col shadow-sm">
            <div className="h-40 overflow-hidden relative">
              <img src={product.image} className="w-full h-full object-cover" alt="" />
              <div className="absolute top-2 left-2 flex gap-1">
                <button onClick={() => openEdit(product)} className="p-2 bg-white/90 text-indigo-600 rounded-lg shadow-sm hover:bg-white"><Edit size={16} /></button>
                <button onClick={() => handleDelete(product.id)} className="p-2 bg-white/90 text-red-500 rounded-lg shadow-sm hover:bg-white"><Trash2 size={16} /></button>
              </div>
            </div>
            <div className="p-4 flex-1">
              <div className="text-xs text-indigo-600 font-bold mb-1">{CATEGORIES.find(c => c.id === product.category)?.name}</div>
              <h3 className="font-bold mb-2 line-clamp-1">{product.name}</h3>
              <div className="text-lg font-black text-gray-800">{product.price.toLocaleString()} د.م</div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-2xl p-8 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-8">{editingProduct ? 'تعديل المنتج' : 'إضافة منتج جديد'}</h2>
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">اسم المنتج</label>
                  <input required className="w-full px-4 py-2 bg-gray-50 rounded-xl outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">السعر (درهم)</label>
                  <input type="number" required className="w-full px-4 py-2 bg-gray-50 rounded-xl outline-none" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">القسم</label>
                  <select className="w-full px-4 py-2 bg-gray-50 rounded-xl outline-none" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value as Category})}>
                    {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">رابط الصورة</label>
                  <input className="w-full px-4 py-2 bg-gray-50 rounded-xl outline-none" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">الوصف</label>
                <textarea rows={4} className="w-full px-4 py-2 bg-gray-50 rounded-xl outline-none" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
              </div>
              <div className="flex gap-4">
                <button type="submit" className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-bold">حفظ المنتج</button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-xl font-bold">إلغاء</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
