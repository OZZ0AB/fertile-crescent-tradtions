
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { getProductById, getProductsByCategory, getRecentProducts } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import { ChevronRight, Minus, Plus, ShoppingCart } from "lucide-react";

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = getProductById(productId || "");
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (product) {
      addItem(product.id, quantity);
    }
  };

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-2xl font-semibold mb-4">Product Not Found</h1>
          <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/categories"
            className="text-olive hover:underline flex items-center"
          >
            <ChevronRight size={16} className="mr-1" />
            Browse Products
          </Link>
        </div>
      </Layout>
    );
  }

  const relatedProducts = getProductsByCategory(product.categoryId).filter(
    (p) => p.id !== product.id
  );
  
  const suggestions = relatedProducts.length >= 4 
    ? relatedProducts.slice(0, 4) 
    : [...relatedProducts, ...getRecentProducts(4 - relatedProducts.length)];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center text-sm mb-4">
          <Link to="/" className="text-muted-foreground hover:text-foreground">
            Home
          </Link>
          <ChevronRight size={16} className="mx-2" />
          <Link to="/categories" className="text-muted-foreground hover:text-foreground">
            Categories
          </Link>
          <ChevronRight size={16} className="mx-2" />
          <Link 
            to={`/category/${product.categoryId}`} 
            className="text-muted-foreground hover:text-foreground"
          >
            {product.categoryId.charAt(0).toUpperCase() + product.categoryId.slice(1)}
          </Link>
          <ChevronRight size={16} className="mx-2" />
          <span className="truncate max-w-[200px]">{product.name}</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Product Image */}
          <div className="bg-muted rounded-lg overflow-hidden h-[400px]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-playfair font-bold mb-2">{product.name}</h1>
              <p className="text-muted-foreground mb-4 capitalize">
                <Link to={`/country/${product.country}`} className="hover:text-olive hover:underline">
                  {product.country}
                </Link>
              </p>
              <p className="text-2xl font-semibold">${product.price.toFixed(2)}</p>
            </div>
            
            <div className="border-t border-b py-6">
              <p className="text-foreground">{product.description}</p>
            </div>
            
            {product.inStock ? (
              <div className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1}
                    >
                      <Minus size={16} />
                    </Button>
                    <div className="w-12 text-center">{quantity}</div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={increaseQuantity}
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Available <span className="text-foreground font-medium">In Stock</span>
                  </div>
                </div>
                
                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-olive hover:bg-olive-dark py-6"
                  size="lg"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-destructive font-medium">Out of Stock</p>
                <Button
                  className="w-full"
                  variant="outline"
                  disabled
                >
                  Currently Unavailable
                </Button>
              </div>
            )}
          </div>
        </div>
        
        {/* Related Products */}
        <FeaturedProducts
          title="You may also like"
          products={suggestions}
        />
      </div>
    </Layout>
  );
};

export default ProductDetail;
