
import React from "react";
import { Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { User, Check } from "lucide-react";

const ProfileTab = () => {
  const { user } = useAuth();
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center py-8">
        <div className="h-24 w-24 rounded-full bg-olive flex items-center justify-center text-white mb-4">
          <User size={48} />
        </div>
        <h3 className="text-2xl font-medium">{user?.name}</h3>
        <p className="text-muted-foreground">{user?.email}</p>
        <p className="mt-2 px-3 py-1 bg-muted text-foreground rounded-full text-sm capitalize">
          {user?.role}
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>
            Update your account details here
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue={user?.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={user?.email} />
              </div>
            </div>
            <Button type="submit" className="bg-olive hover:bg-olive-dark">
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Update your password to keep your account secure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input id="currentPassword" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input id="confirmPassword" type="password" />
            </div>
            <Button type="submit" className="bg-olive hover:bg-olive-dark">
              Update Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

const AddressesTab = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Your Addresses</CardTitle>
            <CardDescription>
              Manage your shipping and billing addresses
            </CardDescription>
          </div>
          <Button className="bg-olive hover:bg-olive-dark">Add New Address</Button>
        </CardHeader>
        <CardContent>
          {user?.addresses && user.addresses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {user.addresses.map((address) => (
                <Card key={address.id} className="relative">
                  {address.isDefault && (
                    <div className="absolute top-2 right-2 px-2 py-1 bg-olive text-white text-xs rounded-full flex items-center">
                      <Check size={12} className="mr-1" />
                      Default
                    </div>
                  )}
                  <CardContent className="p-6">
                    <h4 className="font-medium mb-2">{address.name}</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      {address.street}<br />
                      {address.city}, {address.state} {address.postalCode}<br />
                      {address.country}
                    </p>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      {!address.isDefault && (
                        <Button variant="outline" size="sm">Set as Default</Button>
                      )}
                      <Button variant="destructive" size="sm">Remove</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">You don't have any saved addresses yet.</p>
              <Button className="bg-olive hover:bg-olive-dark">Add Your First Address</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const Account = () => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-playfair font-bold mb-8">My Account</h1>
        
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2 md:grid-cols-2 gap-2">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4">
            <ProfileTab />
          </TabsContent>
          
          <TabsContent value="addresses" className="space-y-4">
            <AddressesTab />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Account;
