
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function HeroBanner() {
  return (
    <div className="relative bg-olive overflow-hidden">
      <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-30"></div>
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white mb-6">
            Discover the Treasures of the Fertile Crescent
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            Authentic products from Egypt, Lebanon, Palestine, Cyprus, Syria,
            Iraq, and Jordan - bringing ancient traditions to your modern life.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              asChild
              className="bg-white text-olive hover:bg-sand text-lg px-6 py-6"
              size="lg"
            >
              <Link to="/categories">Shop Now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white text-white hover:bg-white/10 text-lg px-6 py-6"
              size="lg"
            >
              <Link to="/about">Our Story</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
