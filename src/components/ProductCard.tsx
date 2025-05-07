
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product.id);
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col transition-shadow hover:shadow-md">
      <Link to={`/product/${product.id}`} className="flex-grow flex flex-col">
        <div className="relative h-48 bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            {product.featured && (
              <Badge className="bg-sand text-foreground">Featured</Badge>
            )}
            {!product.inStock && (
              <Badge variant="destructive">Out of Stock</Badge>
            )}
          </div>
        </div>
        <CardContent className="flex-grow pt-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-playfair font-medium text-lg">{product.name}</h3>
          </div>
          <div className="text-sm text-muted-foreground mb-2 capitalize">
            {product.country}
          </div>
          <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
        </CardContent>
      </Link>
      <CardFooter className="border-t p-4">
        <Button
          onClick={handleAddToCart}
          className="w-full bg-olive hover:bg-olive-dark"
          disabled={!product.inStock}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
