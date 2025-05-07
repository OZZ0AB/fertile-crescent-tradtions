
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, User, Menu, Search, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useSearch } from "@/context/SearchContext";
import { countries } from "@/lib/data";

export function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const { totalItems } = useCart();
  const { searchQuery, setSearchQuery, performSearch } = useSearch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch();
    setSearchOpen(false);
  };

  return (
    <header className="border-b border-border bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-playfair font-bold text-olive">Fertile Crescent</span>
              <span className="ml-1 text-sm text-muted-foreground">Emporium</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-foreground hover:text-olive transition-colors"
            >
              Home
            </Link>
            <div className="relative group">
              <span className="text-foreground hover:text-olive transition-colors cursor-pointer">
                Countries
              </span>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                <div className="py-1">
                  {countries.map((country) => (
                    <Link
                      key={country.id}
                      to={`/country/${country.id}`}
                      className="block px-4 py-2 text-sm hover:bg-muted"
                    >
                      {country.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link
              to="/categories"
              className="text-foreground hover:text-olive transition-colors"
            >
              Categories
            </Link>
            <Link
              to="/about"
              className="text-foreground hover:text-olive transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-10"
              >
                <Search size={18} />
              </Button>
            </form>

            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart size={24} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-olive text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {isAuthenticated ? (
              <div className="relative group">
                <Button variant="ghost" size="icon">
                  <User size={24} />
                </Button>
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                  <div className="py-1">
                    <div className="px-4 py-2 text-sm font-medium border-b">
                      {user?.name}
                    </div>
                    <Link
                      to="/account"
                      className="block px-4 py-2 text-sm hover:bg-muted"
                    >
                      My Account
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm hover:bg-muted"
                    >
                      My Orders
                    </Link>
                    {user?.role === "admin" && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-sm hover:bg-muted"
                      >
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-destructive hover:bg-muted"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search size={24} />
            </Button>

            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart size={24} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-olive text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        {searchOpen && (
          <div className="md:hidden mt-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-10"
              >
                <Search size={18} />
              </Button>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-foreground hover:text-olive transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <div className="relative">
                <details className="group">
                  <summary className="list-none text-foreground hover:text-olive transition-colors cursor-pointer flex justify-between items-center">
                    Countries
                    <span className="ml-2">▼</span>
                  </summary>
                  <div className="pl-4 mt-2 space-y-2">
                    {countries.map((country) => (
                      <Link
                        key={country.id}
                        to={`/country/${country.id}`}
                        className="block text-sm hover:text-olive"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {country.name}
                      </Link>
                    ))}
                  </div>
                </details>
              </div>
              <Link
                to="/categories"
                className="text-foreground hover:text-olive transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                to="/about"
                className="text-foreground hover:text-olive transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              {isAuthenticated ? (
                <>
                  <hr className="border-border" />
                  <div className="text-sm font-medium">{user?.name}</div>
                  <Link
                    to="/account"
                    className="text-foreground hover:text-olive transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Account
                  </Link>
                  <Link
                    to="/orders"
                    className="text-foreground hover:text-olive transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Orders
                  </Link>
                  {user?.role === "admin" && (
                    <Link
                      to="/admin"
                      className="text-foreground hover:text-olive transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-left text-destructive hover:text-destructive/90"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="bg-olive hover:bg-olive-dark text-white font-medium py-2 px-4 rounded text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
