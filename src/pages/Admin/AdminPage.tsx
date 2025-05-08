
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { getUsers, getProducts, getCategories, getOrders } from "@/lib/admin/adminService";
import { User, Product, Category, Order } from "@/lib/types";

// Admin tab components
import UsersTab from "@/components/admin/UsersTab";
import ProductsTab from "@/components/admin/ProductsTab";
import CategoriesTab from "@/components/admin/CategoriesTab";
import OrdersTab from "@/components/admin/OrdersTab";

const AdminPage = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState("users");
  const [isLoading, setIsLoading] = useState(true);
  
  // State for each entity
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  
  // Load data based on active tab to improve performance
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        switch (activeTab) {
          case "users":
            const userData = await getUsers();
            setUsers(userData);
            break;
          case "products":
            const productData = await getProducts();
            setProducts(productData);
            break;
          case "categories":
            const categoryData = await getCategories();
            setCategories(categoryData);
            break;
          case "orders":
            const orderData = await getOrders();
            setOrders(orderData);
            break;
        }
      } catch (error) {
        console.error(`Error loading ${activeTab} data:`, error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [activeTab]);
  
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-playfair font-bold mb-8">Admin Dashboard</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 gap-2 mb-4">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-olive"></div>
            </div>
          ) : (
            <>
              <TabsContent value="users" className="space-y-4">
                <UsersTab users={users} setUsers={setUsers} />
              </TabsContent>
              
              <TabsContent value="products" className="space-y-4">
                <ProductsTab products={products} setProducts={setProducts} />
              </TabsContent>
              
              <TabsContent value="categories" className="space-y-4">
                <CategoriesTab categories={categories} setCategories={setCategories} />
              </TabsContent>
              
              <TabsContent value="orders" className="space-y-4">
                <OrdersTab orders={orders} setOrders={setOrders} users={users} />
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminPage;
