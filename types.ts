
export type Category = 'electronics' | 'home' | 'cars';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  description: string;
  image: string;
  features: string[];
}

export interface Order {
  id: string;
  customerName: string;
  city: string;
  phone: string;
  items: { productId: string; quantity: number; price: number; name: string }[];
  totalPrice: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface SiteSettings {
  fbPixel: string;
  googlePixel: string;
  tiktokPixel: string;
  googleSheetsUrl: string;
  domain: string;
  nameServers: string[];
}

export interface CartItem extends Product {
  quantity: number;
}
