export interface MenuItem {
  id?: string;
  siteId?: string; // e.g. 'global', 'streatham', 'slough'
  name: string;
  description: string;
  price: number;
  ingredients?: string;
  category: 'Burgers' | 'Sides' | 'Desserts' | 'Shakes' | 'Drinks';
  isDailyItem: boolean;
  isActive: boolean;
  imageUrl?: string;
  galleryUrls?: string[];
}

export interface OrderItem {
  id: string;
  menuItemId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id?: string;
  status: 'Pending' | 'Preparing' | 'Completed' | 'Cancelled';
  items: OrderItem[];
  total: number;
  createdAt: number;
  customerName: string;
}
