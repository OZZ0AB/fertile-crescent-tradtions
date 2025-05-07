
import { Category, Product, User, Address, Order } from './types';

export const countries = [
  { id: 'egypt', name: 'Egypt', image: '/placeholder.svg' },
  { id: 'lebanon', name: 'Lebanon', image: '/placeholder.svg' },
  { id: 'palestine', name: 'Palestine', image: '/placeholder.svg' },
  { id: 'cyprus', name: 'Cyprus', image: '/placeholder.svg' },
  { id: 'syria', name: 'Syria', image: '/placeholder.svg' },
  { id: 'iraq', name: 'Iraq', image: '/placeholder.svg' },
  { id: 'jordan', name: 'Jordan', image: '/placeholder.svg' },
];

export const categories: Category[] = [
  {
    id: 'food',
    name: 'Food',
    country: 'egypt',
    description: 'Traditional Egyptian delicacies and ingredients',
    image: '/placeholder.svg'
  },
  {
    id: 'clothing',
    name: 'Clothing',
    country: 'palestine',
    description: 'Traditional Palestinian garments and textiles',
    image: '/placeholder.svg'
  },
  {
    id: 'spices',
    name: 'Spices',
    country: 'lebanon',
    description: 'Authentic Lebanese spice blends',
    image: '/placeholder.svg'
  },
  {
    id: 'pottery',
    name: 'Pottery',
    country: 'syria',
    description: 'Handcrafted Syrian pottery and ceramics',
    image: '/placeholder.svg'
  },
  {
    id: 'jewelry',
    name: 'Jewelry',
    country: 'jordan',
    description: 'Traditional Jordanian jewelry and accessories',
    image: '/placeholder.svg'
  },
  {
    id: 'textiles',
    name: 'Textiles',
    country: 'iraq',
    description: 'Handwoven Iraqi textiles and carpets',
    image: '/placeholder.svg'
  },
  {
    id: 'sweets',
    name: 'Sweets',
    country: 'cyprus',
    description: 'Traditional Cypriot desserts and treats',
    image: '/placeholder.svg'
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Palestinian Kuffiyeh',
    description: 'Traditional Palestinian scarf, symbol of Palestinian heritage and solidarity',
    price: 24.99,
    image: '/placeholder.svg',
    country: 'palestine',
    categoryId: 'clothing',
    featured: true,
    inStock: true
  },
  {
    id: '2',
    name: 'Lebanese Zaatar',
    description: 'Traditional Lebanese herb mix with sesame seeds, sumac, and salt',
    price: 12.99,
    image: '/placeholder.svg',
    country: 'lebanon',
    categoryId: 'spices',
    featured: true,
    inStock: true
  },
  {
    id: '3',
    name: 'Egyptian Koshari Mix',
    description: 'Egypt\'s national dish - a mix of rice, lentils, and pasta with spices',
    price: 9.99,
    image: '/placeholder.svg',
    country: 'egypt',
    categoryId: 'food',
    featured: true,
    inStock: true
  },
  {
    id: '4',
    name: 'Syrian Ceramic Bowl',
    description: 'Hand-painted ceramic bowl with traditional Syrian patterns',
    price: 39.99,
    image: '/placeholder.svg',
    country: 'syria',
    categoryId: 'pottery',
    featured: false,
    inStock: true
  },
  {
    id: '5',
    name: 'Jordanian Silver Pendant',
    description: 'Hand-crafted silver pendant with traditional Jordanian design',
    price: 59.99,
    image: '/placeholder.svg',
    country: 'jordan',
    categoryId: 'jewelry',
    featured: false,
    inStock: true
  },
  {
    id: '6',
    name: 'Iraqi Wool Carpet',
    description: 'Handwoven wool carpet with traditional Iraqi patterns',
    price: 199.99,
    image: '/placeholder.svg',
    country: 'iraq',
    categoryId: 'textiles',
    featured: true,
    inStock: true
  },
  {
    id: '7',
    name: 'Cypriot Baklava',
    description: 'Traditional Cypriot sweet pastry made of layers of filo filled with nuts and sweetened with syrup',
    price: 15.99,
    image: '/placeholder.svg',
    country: 'cyprus',
    categoryId: 'sweets',
    featured: false,
    inStock: true
  },
  {
    id: '8',
    name: 'Egyptian Hibiscus Tea',
    description: 'Egyptian Karkade tea made from dried hibiscus flowers',
    price: 7.99,
    image: '/placeholder.svg',
    country: 'egypt',
    categoryId: 'food',
    featured: false,
    inStock: true
  }
];

export const users: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    addresses: []
  },
  {
    id: '2',
    name: 'Regular User',
    email: 'user@example.com',
    role: 'user',
    addresses: [
      {
        id: '1',
        name: 'Home',
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        postalCode: '12345',
        country: 'USA',
        isDefault: true
      }
    ]
  }
];

export const orders: Order[] = [
  {
    id: '1',
    userId: '2',
    items: [
      { productId: '1', quantity: 1, price: 24.99 },
      { productId: '3', quantity: 2, price: 9.99 }
    ],
    status: 'delivered',
    date: '2023-04-15',
    addressId: '1',
    totalAmount: 44.97
  }
];

// Helper functions to mimic API calls
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.categoryId === categoryId);
};

export const getProductsByCountry = (country: string): Product[] => {
  return products.filter(product => product.country === country);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getRecentProducts = (limit = 6): Product[] => {
  return [...products].sort(() => 0.5 - Math.random()).slice(0, limit);
};

export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    product => 
      product.name.toLowerCase().includes(lowerQuery) || 
      product.description.toLowerCase().includes(lowerQuery) ||
      product.country.toLowerCase().includes(lowerQuery)
  );
};

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(category => category.id === id);
};

export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};
