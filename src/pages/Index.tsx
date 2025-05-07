
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { HeroBanner } from "@/components/HeroBanner";
import { CountrySelector } from "@/components/CountrySelector";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { getFeaturedProducts, getRecentProducts } from "@/lib/data";

const Index = () => {
  const featuredProducts = getFeaturedProducts();
  const recentProducts = getRecentProducts(6);

  return (
    <Layout>
      <HeroBanner />
      <CountrySelector />
      
      <FeaturedProducts 
        title="Featured Products" 
        products={featuredProducts} 
        viewAllLink="/categories"
      />
      
      <div className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-playfair mb-6">
              Authentic Traditions from the Cradle of Civilization
            </h2>
            <p className="text-lg mb-6">
              The Fertile Crescent, often called the "Cradle of Civilization," is the region where
              human civilization began to flourish. Our curated collection brings you authentic
              products from this historic region, preserving traditions that date back millennia.
            </p>
            <p className="text-lg">
              From exquisite textiles and handcrafted jewelry to ancient spices and delicious
              foods, discover the rich cultural heritage of Egypt, Lebanon, Palestine, Cyprus,
              Syria, Iraq, and Jordan.
            </p>
          </div>
        </div>
      </div>
      
      <FeaturedProducts 
        title="New Arrivals" 
        products={recentProducts} 
        viewAllLink="/categories"
      />
    </Layout>
  );
};

export default Index;
