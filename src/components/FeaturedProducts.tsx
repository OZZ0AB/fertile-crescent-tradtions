
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./ProductCard";
import { Product } from "@/lib/types";

interface FeaturedProductsProps {
  title: string;
  products: Product[];
  viewAllLink?: string;
}

export function FeaturedProducts({ title, products, viewAllLink }: FeaturedProductsProps) {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-playfair">{title}</h2>
          {viewAllLink && (
            <Button asChild variant="outline">
              <Link to={viewAllLink}>View All</Link>
            </Button>
          )}
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
