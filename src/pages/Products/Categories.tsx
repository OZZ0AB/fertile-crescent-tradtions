
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { CategoryCard } from "@/components/CategoryCard";
import { categories } from "@/lib/data";

const Categories = () => {
  return (
    <Layout>
      <div className="bg-muted py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-playfair text-center font-bold mb-4">
            Product Categories
          </h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            Browse our curated collection of authentic products from across the Fertile Crescent region,
            categorized to help you find exactly what you're looking for.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="category-grid">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
