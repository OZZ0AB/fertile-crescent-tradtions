
export type Country = 'egypt' | 'lebanon' | 'palestine' | 'cyprus' | 'syria' | 'iraq' | 'jordan';

export interface Category {
  id: string;
  name: string;
  country: Country;
  description: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  country: Country;
  categoryId: string;
  featured: boolean;
  inStock: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  addresses: Address[];
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'canceled';
  date: string;
  addressId: string;
  totalAmount: number;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}
