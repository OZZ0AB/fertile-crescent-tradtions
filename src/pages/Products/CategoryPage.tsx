
import React from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/ProductCard";
import { getCategoryById, getProductsByCategory } from "@/lib/data";
import { ChevronRight } from "lucide-react";

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = getCategoryById(categoryId || "");
  const products = getProductsByCategory(categoryId || "");

  if (!category) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-2xl font-semibold mb-4">Category Not Found</h1>
          <p className="mb-6">The category you're looking for doesn't exist.</p>
          <Link
            to="/categories"
            className="text-olive hover:underline flex items-center"
          >
            <ChevronRight size={16} className="mr-1" />
            Back to Categories
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-muted py-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm mb-4">
            <Link to="/" className="text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <ChevronRight size={16} className="mx-2" />
            <Link to="/categories" className="text-muted-foreground hover:text-foreground">
              Categories
            </Link>
            <ChevronRight size={16} className="mx-2" />
            <span>{category.name}</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
            {category.name}
          </h1>
          <p className="text-muted-foreground max-w-3xl">
            {category.description} - <span className="capitalize">{category.country}</span>
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        {products.length > 0 ? (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No products found in this category yet.</p>
            <Link
              to="/categories"
              className="text-olive hover:underline flex items-center justify-center"
            >
              <ChevronRight size={16} className="mr-1" />
              Browse other categories
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CategoryPage;
