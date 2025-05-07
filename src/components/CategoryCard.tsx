
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Category } from "@/lib/types";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link to={`/category/${category.id}`}>
      <Card className="overflow-hidden h-full transition-shadow hover:shadow-md">
        <div className="h-40 bg-muted">
          <img
            src={category.image}
            alt={category.name}
            className="h-full w-full object-cover"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-playfair font-medium text-lg mb-1">{category.name}</h3>
          <div className="text-sm text-muted-foreground capitalize mb-2">
            {category.country}
          </div>
          <p className="text-sm line-clamp-2">{category.description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
