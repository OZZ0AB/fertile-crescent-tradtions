
import React from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/ProductCard";
import { CategoryCard } from "@/components/CategoryCard";
import { ChevronRight } from "lucide-react";
import { getProductsByCountry, categories } from "@/lib/data";

const CountryPage = () => {
  const { countryId } = useParams<{ countryId: string }>();
  const products = getProductsByCountry(countryId || "");
  const countryCategoriesRaw = categories.filter(category => category.country === countryId);
  
  // Find country name from any product
  const countryName = products.length > 0 
    ? products[0].country.charAt(0).toUpperCase() + products[0].country.slice(1) 
    : countryCategoriesRaw.length > 0
    ? countryCategoriesRaw[0].country.charAt(0).toUpperCase() + countryCategoriesRaw[0].country.slice(1)
    : countryId;

  if (!countryId) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-2xl font-semibold mb-4">Country Not Found</h1>
          <p className="mb-6">The country you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="text-olive hover:underline flex items-center"
          >
            <ChevronRight size={16} className="mr-1" />
            Back to Home
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
            <span className="capitalize">{countryName}</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-playfair font-bold mb-4 capitalize">
            {countryName} Products
          </h1>
          <p className="text-muted-foreground max-w-3xl">
            Discover authentic traditions and handcrafted items from {countryName},
            featuring the region's unique cultural heritage.
          </p>
        </div>
      </div>
      
      {countryCategoriesRaw.length > 0 && (
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-playfair font-bold mb-6">
            Categories from {countryName}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {countryCategoriesRaw.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      )}
      
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-playfair font-bold mb-6">
          All Products from {countryName}
        </h2>
        
        {products.length > 0 ? (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No products found from this country yet.</p>
            <Link
              to="/categories"
              className="text-olive hover:underline flex items-center justify-center"
            >
              <ChevronRight size={16} className="mr-1" />
              Browse categories
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CountryPage;
