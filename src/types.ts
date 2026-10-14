export type ViewType = 'home' | 'menu' | 'orders' | 'support' | 'account' | 'customize' | 'cart' | 'tracking';

export interface Product {
  id: string;
  name: string;
  category: 'cakes' | 'pastries' | 'chocolates' | 'pizza' | 'burgers' | 'sandwiches' | 'puffs' | 'fries' | 'desserts' | 'beverages';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  description: string;
  image: string;
  diet: 'veg' | 'eggless' | 'non-veg';
  badge?: string;
  weightOptions?: string[];
  isCustomizable?: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  weight?: string;
  diet: 'veg' | 'eggless' | 'non-veg';
  customPlaque?: string;
  addons?: string[];
  subOptions?: string[];
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  weight?: string;
  diet: 'veg' | 'eggless' | 'non-veg';
  note?: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'active' | 'delivered' | 'cancelled';
  items: OrderItem[];
  total: number;
  paymentMethod: string;
  address: string;
  eta?: string;
  riderName?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  cardType?: 'note_relayed' | 'product_card' | 'escalation' | 'none';
  cardData?: any;
}
