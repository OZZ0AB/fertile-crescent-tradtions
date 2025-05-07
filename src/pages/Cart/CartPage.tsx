
import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { getProductById } from "@/lib/data";
import { ChevronRight, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";

const CartPage = () => {
  const { items, updateQuantity, removeItem, clearCart, subtotal } = useCart();
  
  const cartItems = items.map((item) => {
    const product = getProductById(item.productId);
    return { ...item, product };
  });
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center text-sm mb-6">
          <Link to="/" className="text-muted-foreground hover:text-foreground">
            Home
          </Link>
          <ChevronRight size={16} className="mx-2" />
          <span>Shopping Cart</span>
        </div>
        
        <h1 className="text-3xl font-playfair font-bold mb-8">Your Shopping Cart</h1>
        
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg border overflow-hidden">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-muted">
                      <th className="text-left px-6 py-3">Product</th>
                      <th className="text-center px-6 py-3">Quantity</th>
                      <th className="text-right px-6 py-3">Price</th>
                      <th className="text-right px-6 py-3">Total</th>
                      <th className="px-6 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {cartItems.map((item) => (
                      item.product && (
                        <tr key={item.productId}>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="h-16 w-16 bg-muted rounded overflow-hidden mr-4">
                                <img
                                  src={item.product.image}
                                  alt={item.product.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div>
                                <Link
                                  to={`/product/${item.productId}`}
                                  className="font-medium hover:text-olive"
                                >
                                  {item.product.name}
                                </Link>
                                <p className="text-sm text-muted-foreground mt-1 capitalize">
                                  {item.product.country}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus size={14} />
                              </Button>
                              <Input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value) || 1)}
                                className="w-12 mx-2 text-center"
                              />
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              >
                                <Plus size={14} />
                              </Button>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            ${item.product.price.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 text-right font-medium">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.productId)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 size={18} />
                            </Button>
                          </td>
                        </tr>
                      )
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
                <Link to="/categories">
                  <Button variant="outline">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-lg border p-6">
                <h2 className="text-xl font-playfair font-bold mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>
                
                <div className="border-t pt-3 mb-6">
                  <div className="flex justify-between text-lg font-medium">
                    <span>Total</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                </div>
                
                <Button
                  className="w-full bg-olive hover:bg-olive-dark mb-4"
                  size="lg"
                >
                  Proceed to Checkout
                </Button>
                
                <p className="text-sm text-muted-foreground text-center">
                  Secure checkout powered by Stripe
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 max-w-md mx-auto">
            <div className="mx-auto w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
              <ShoppingCart size={36} className="text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-playfair font-medium mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any products to your cart yet.
              Browse our collections and discover authentic products from the Fertile Crescent.
            </p>
            <Button
              asChild
              className="bg-olive hover:bg-olive-dark"
              size="lg"
            >
              <Link to="/categories">Start Shopping</Link>
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
