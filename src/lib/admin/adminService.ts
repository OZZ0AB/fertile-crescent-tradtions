
import { supabase } from "@/integrations/supabase/client";
import { 
  Product, 
  Category, 
  User, 
  Order, 
  OrderItem,
  Address,
  Country 
} from "@/lib/types";
import { users, products, categories, orders, getProductById } from "@/lib/data";
import { toast } from "@/hooks/use-toast";

// User Management
export const getUsers = async (): Promise<User[]> => {
  // For now, using the mock data
  // In a real implementation with Supabase, it would be:
  // const { data, error } = await supabase.from('users').select('*');
  return users;
};

export const addUser = async (user: Omit<User, "id">): Promise<User> => {
  // Mock implementation
  const newUser: User = {
    ...user,
    id: `user-${Date.now()}`,
  };
  
  users.push(newUser);
  toast({
    title: "User created",
    description: `${user.name} has been added successfully.`,
  });
  return newUser;
};

export const updateUser = async (user: User): Promise<User> => {
  // Mock implementation
  const index = users.findIndex(u => u.id === user.id);
  if (index !== -1) {
    users[index] = { ...user };
    toast({
      title: "User updated",
      description: `${user.name} has been updated successfully.`,
    });
  }
  return user;
};

export const deleteUser = async (userId: string): Promise<void> => {
  // Mock implementation
  const index = users.findIndex(u => u.id === userId);
  if (index !== -1) {
    const userName = users[index].name;
    users.splice(index, 1);
    toast({
      title: "User deleted",
      description: `${userName} has been removed successfully.`,
    });
  }
};

// Product Management
export const getProducts = async (): Promise<Product[]> => {
  // Mock implementation
  return products;
};

export const addProduct = async (product: Omit<Product, "id">): Promise<Product> => {
  // Mock implementation
  const newProduct: Product = {
    ...product,
    id: `product-${Date.now()}`,
  };
  
  products.push(newProduct);
  toast({
    title: "Product created",
    description: `${product.name} has been added successfully.`,
  });
  return newProduct;
};

export const updateProduct = async (product: Product): Promise<Product> => {
  // Mock implementation
  const index = products.findIndex(p => p.id === product.id);
  if (index !== -1) {
    products[index] = { ...product };
    toast({
      title: "Product updated",
      description: `${product.name} has been updated successfully.`,
    });
  }
  return product;
};

export const deleteProduct = async (productId: string): Promise<void> => {
  // Mock implementation
  const index = products.findIndex(p => p.id === productId);
  if (index !== -1) {
    const productName = products[index].name;
    products.splice(index, 1);
    toast({
      title: "Product deleted",
      description: `${productName} has been removed successfully.`,
    });
  }
};

// Category Management
export const getCategories = async (): Promise<Category[]> => {
  // Mock implementation
  return categories;
};

export const addCategory = async (category: Omit<Category, "id">): Promise<Category> => {
  // Mock implementation
  const newCategory: Category = {
    ...category,
    id: `category-${Date.now()}`,
  };
  
  categories.push(newCategory);
  toast({
    title: "Category created",
    description: `${category.name} has been added successfully.`,
  });
  return newCategory;
};

export const updateCategory = async (category: Category): Promise<Category> => {
  // Mock implementation
  const index = categories.findIndex(c => c.id === category.id);
  if (index !== -1) {
    categories[index] = { ...category };
    toast({
      title: "Category updated",
      description: `${category.name} has been updated successfully.`,
    });
  }
  return category;
};

export const deleteCategory = async (categoryId: string): Promise<void> => {
  // Mock implementation
  const index = categories.findIndex(c => c.id === categoryId);
  if (index !== -1) {
    const categoryName = categories[index].name;
    categories.splice(index, 1);
    toast({
      title: "Category deleted",
      description: `${categoryName} has been removed successfully.`,
    });
  }
};

// Order Management
export const getOrders = async (): Promise<Order[]> => {
  // Mock implementation
  return orders;
};

export const getOrderDetails = async (orderId: string): Promise<Order | undefined> => {
  // Mock implementation
  return orders.find(order => order.id === orderId);
};

export const updateOrderStatus = async (
  orderId: string, 
  status: Order['status']
): Promise<Order | undefined> => {
  // Mock implementation
  const index = orders.findIndex(o => o.id === orderId);
  if (index !== -1) {
    orders[index].status = status;
    toast({
      title: "Order updated",
      description: `Order #${orderId} status updated to ${status}.`,
    });
    return orders[index];
  }
  return undefined;
};

// Helper functions
export const getOrderTotal = (items: OrderItem[]): number => {
  return items.reduce((total, item) => total + (item.quantity * item.price), 0);
};

export const getOrderItems = (items: OrderItem[]): { product: Product | undefined, quantity: number, total: number }[] => {
  return items.map(item => {
    const product = getProductById(item.productId);
    return {
      product,
      quantity: item.quantity,
      total: item.quantity * item.price
    };
  });
};
