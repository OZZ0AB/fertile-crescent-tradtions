
import React from "react";
import { Navigate, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { orders, users, products, categories } from "@/lib/data";
import { Edit, Plus, Trash2 } from "lucide-react";

const UsersTab = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-playfair font-bold">Users</h2>
      <Button className="bg-olive hover:bg-olive-dark">
        <Plus className="mr-2 h-4 w-4" /> Add User
      </Button>
    </div>

    <div className="bg-white rounded-lg border overflow-hidden">
      <table className="min-w-full">
        <thead>
          <tr className="bg-muted">
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Email</th>
            <th className="px-6 py-3 text-left">Role</th>
            <th className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4">{user.name}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4 capitalize">{user.role}</td>
              <td className="px-6 py-4">
                <div className="flex justify-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Edit size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                    <Trash2 size={16} />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const ProductsTab = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-playfair font-bold">Products</h2>
      <Button className="bg-olive hover:bg-olive-dark">
        <Plus className="mr-2 h-4 w-4" /> Add Product
      </Button>
    </div>

    <div className="bg-white rounded-lg border overflow-hidden">
      <table className="min-w-full">
        <thead>
          <tr className="bg-muted">
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Country</th>
            <th className="px-6 py-3 text-left">Category</th>
            <th className="px-6 py-3 text-right">Price</th>
            <th className="px-6 py-3 text-center">In Stock</th>
            <th className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {products.map((product) => (
            <tr key={product.id}>
              <td className="px-6 py-4">{product.name}</td>
              <td className="px-6 py-4 capitalize">{product.country}</td>
              <td className="px-6 py-4 capitalize">{product.categoryId}</td>
              <td className="px-6 py-4 text-right">${product.price.toFixed(2)}</td>
              <td className="px-6 py-4 text-center">
                {product.inStock ? (
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    In Stock
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                    Out of Stock
                  </span>
                )}
              </td>
              <td className="px-6 py-4">
                <div className="flex justify-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Edit size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                    <Trash2 size={16} />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const CategoriesTab = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-playfair font-bold">Categories</h2>
      <Button className="bg-olive hover:bg-olive-dark">
        <Plus className="mr-2 h-4 w-4" /> Add Category
      </Button>
    </div>

    <div className="bg-white rounded-lg border overflow-hidden">
      <table className="min-w-full">
        <thead>
          <tr className="bg-muted">
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Country</th>
            <th className="px-6 py-3 text-left">Description</th>
            <th className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {categories.map((category) => (
            <tr key={category.id}>
              <td className="px-6 py-4">{category.name}</td>
              <td className="px-6 py-4 capitalize">{category.country}</td>
              <td className="px-6 py-4">
                <p className="truncate max-w-xs">{category.description}</p>
              </td>
              <td className="px-6 py-4">
                <div className="flex justify-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Edit size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                    <Trash2 size={16} />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const OrdersTab = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-playfair font-bold">Orders</h2>
    </div>

    <div className="bg-white rounded-lg border overflow-hidden">
      <table className="min-w-full">
        <thead>
          <tr className="bg-muted">
            <th className="px-6 py-3 text-left">Order ID</th>
            <th className="px-6 py-3 text-left">User</th>
            <th className="px-6 py-3 text-left">Date</th>
            <th className="px-6 py-3 text-right">Total</th>
            <th className="px-6 py-3 text-center">Status</th>
            <th className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {orders.map((order) => {
            const user = users.find(user => user.id === order.userId);
            return (
              <tr key={order.id}>
                <td className="px-6 py-4">#{order.id}</td>
                <td className="px-6 py-4">{user?.name || 'Unknown'}</td>
                <td className="px-6 py-4">{order.date}</td>
                <td className="px-6 py-4 text-right">${order.totalAmount.toFixed(2)}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'canceled' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    <Button variant="ghost" size="sm">
                      <Edit size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  </div>
);

const AdminPage = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-playfair font-bold mb-8">Admin Dashboard</h1>
        
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid grid-cols-4 gap-2 mb-4">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users" className="space-y-4">
            <UsersTab />
          </TabsContent>
          
          <TabsContent value="products" className="space-y-4">
            <ProductsTab />
          </TabsContent>
          
          <TabsContent value="categories" className="space-y-4">
            <CategoriesTab />
          </TabsContent>
          
          <TabsContent value="orders" className="space-y-4">
            <OrdersTab />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminPage;
