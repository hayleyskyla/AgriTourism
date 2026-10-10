export type Role = 'tourist' | 'farmer' | 'admin' | 'guest';

export type ScreenId =
  | 'page_1_landing'
  | 'page_2_signup'
  | 'page_3_login'
  | 'page_4_tourist_dashboard'
  | 'page_5_explore_farms'
  | 'page_6_farm_detail'
  | 'page_7_booking'
  | 'page_8_marketplace'
  | 'page_9_cart'
  | 'page_10_farmer_dashboard'
  | 'page_11_my_bookings'
  | 'page_12_admin_dashboard';

export interface Farm {
  id: string;
  name: string;
  province: string;
  municipality: string;
  locationText: string;
  rating: number;
  reviewCount: number;
  pricePerPerson: number;
  activityType: string;
  tag: string;
  description: string;
  operatingHours: string;
  amenities: string[];
  activities: string[];
  image: string;
  accentBg: string;
  iconEmoji: string;
  isWishlisted?: boolean;
}

export interface ActivityBookingDetails {
  farmId: string;
  farmName: string;
  activityTitle: string;
  duration: string;
  includesGuide: boolean;
  featureItem: string;
  pricePerPerson: number;
  date: string;
  participants: number;
  total: number;
  imageEmoji: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  category: 'fruits_vegetables' | 'dairy_eggs' | 'meat_poultry' | 'handicrafts' | 'others';
  categoryLabel: string;
  farmName: string;
  iconEmoji: string;
  bgColor: string;
  inStock: boolean;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface Booking {
  id: string;
  farmId: string;
  farmName: string;
  activity: string;
  date: string;
  guests: number;
  priceTotal: number;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  customerName: string;
  customerEmail: string;
  imageEmoji?: string;
}

export interface FarmerStat {
  totalProducts: number;
  newOrders: number;
  activeBookings: number;
}

export interface AdminStat {
  totalUsers: number;
  totalFarms: number;
  totalBookings: number;
  totalProducts: number;
}
