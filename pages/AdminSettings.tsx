
import React from 'react';
import { SiteSettings } from '../types';
import { Facebook, Chrome, Music, Table, Globe, ShieldCheck } from 'lucide-react';

interface AdminSettingsProps {
  settings: SiteSettings;
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
}

const AdminSettings: React.FC<AdminSettingsProps> = ({ settings, setSettings }) => {
  const handleChange = (field: keyof SiteSettings, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-8 pb-20">
      <h1 className="text-3xl font-bold">الإعدادات المتقدمة</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pixel Management */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
             أكواد التتبع (Pixels)
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Facebook size={18} className="text-blue-600" /> Facebook Pixel ID
              </label>
              <input 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="1234567890..."
                value={settings.fbPixel}
                onChange={e => handleChange('fbPixel', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Chrome size={18} className="text-green-600" /> Google Analytics ID
              </label>
              <input 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
                placeholder="G-XXXXXXX..."
                value={settings.googlePixel}
                onChange={e => handleChange('googlePixel', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Music size={18} className="text-pink-600" /> TikTok Pixel ID
              </label>
              <input 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="CXXXXXXXXXXXXXXXXX..."
                value={settings.tiktokPixel}
                onChange={e => handleChange('tiktokPixel', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Integration Management */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
            الربط الآلي (Integrations)
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Table size={18} className="text-green-700" /> Google Sheets Webhook URL
              </label>
              <input 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="https://script.google.com/macros/s/..."
                value={settings.googleSheetsUrl}
                onChange={e => handleChange('googleSheetsUrl', e.target.value)}
              />
              <p className="text-xs text-gray-400 mt-2">سيتم إرسال كل طلب جديد تلقائياً لهذا الرابط.</p>
            </div>
          </div>
        </div>

        {/* Domain Management */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 lg:col-span-2">
          <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
            إعدادات الدومين والتقنية
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Globe size={18} className="text-indigo-600" /> الدومين (Domain)
              </label>
              <input 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-indigo-600"
                value={settings.domain}
                onChange={e => handleChange('domain', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <ShieldCheck size={18} className="text-indigo-600" /> Name Servers
              </label>
              <div className="space-y-2">
                {settings.nameServers.map((ns, idx) => (
                  <input 
                    key={idx}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl outline-none"
                    value={ns}
                    onChange={e => {
                      const newNs = [...settings.nameServers];
                      newNs[idx] = e.target.value;
                      handleChange('nameServers', newNs);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-indigo-600 text-white p-8 rounded-3xl shadow-lg flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h3 className="text-xl font-bold mb-2">حفظ التغييرات؟</h3>
          <p className="opacity-80">سيتم تفعيل الإعدادات الجديدة فوراً على جميع صفحات المتجر.</p>
        </div>
        <button className="bg-white text-indigo-600 px-12 py-3 rounded-full font-bold text-lg hover:shadow-xl transition-all">
          حفظ الكل
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;
