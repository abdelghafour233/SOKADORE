
import { Product, Category } from './types';

export const CATEGORIES: { id: Category; name: string; icon: string }[] = [
  { id: 'electronics', name: 'إلكترونيات', icon: '📱' },
  { id: 'home', name: 'منزل وأثاث', icon: '🏠' },
  { id: 'cars', name: 'سيارات', icon: '🚗' },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'آيفون 15 برو ماكس',
    price: 14500,
    category: 'electronics',
    description: 'أحدث هاتف من شركة آبل مع معالج A17 Pro القوي.',
    image: 'https://picsum.photos/seed/iphone/600/400',
    features: ['شاشة 6.7 إنش', 'كاميرا 48 ميجابكسل', 'تيتانيوم'],
  },
  {
    id: '2',
    name: 'أريكة جلدية فاخرة',
    price: 8500,
    category: 'home',
    description: 'أريكة مريحة وعصرية تناسب غرفة المعيشة الحديثة.',
    image: 'https://picsum.photos/seed/sofa/600/400',
    features: ['جلد طبيعي', 'مقاعد مريحة', 'ضمان 5 سنوات'],
  },
  {
    id: '3',
    name: 'سيارة دفع رباعي عائلية',
    price: 320000,
    category: 'cars',
    description: 'سيارة عائلية واسعة مع نظام أمان متقدم وكفاءة في استهلاك الوقود.',
    image: 'https://picsum.photos/seed/car/600/400',
    features: ['7 مقاعد', 'نظام ملاحة متطور', 'توفير وقود'],
  },
  {
    id: '4',
    name: 'لابتوب للأعمال',
    price: 12000,
    category: 'electronics',
    description: 'جهاز قوي للعمل والدراسة بتصميم نحيف وخفيف.',
    image: 'https://picsum.photos/seed/laptop/600/400',
    features: ['معالج i7', '16GB RAM', 'شاشة OLED'],
  },
];
