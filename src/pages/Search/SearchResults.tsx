
import React, { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/ProductCard";
import { useSearch } from "@/context/SearchContext";
import { ChevronRight, Search } from "lucide-react";

const SearchResults = () => {
  const { searchResults, searchQuery, setSearchQuery, performSearch } = useSearch();
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    const queryParam = searchParams.get('q');
    if (queryParam && queryParam !== searchQuery) {
      setSearchQuery(queryParam);
      performSearch();
    }
  }, [searchParams, performSearch, searchQuery, setSearchQuery]);
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center text-sm mb-6">
          <Link to="/" className="text-muted-foreground hover:text-foreground">
            Home
          </Link>
          <ChevronRight size={16} className="mx-2" />
          <span>Search Results</span>
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl font-playfair font-bold mb-4">
            Search Results: "{searchQuery}"
          </h1>
          <p className="text-muted-foreground">
            Found {searchResults.length} results for your search
          </p>
        </div>
        
        {searchResults.length > 0 ? (
          <div className="product-grid">
            {searchResults.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Search size={24} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No results found</h3>
            <p className="text-muted-foreground mb-6">
              We couldn't find any products matching your search.
              Try using different keywords or browse our categories.
            </p>
            <Link to="/categories" className="text-olive hover:underline">
              Browse All Categories
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SearchResults;
