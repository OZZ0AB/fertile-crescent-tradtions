
import React from "react";
import { Link } from "react-router-dom";
import { countries } from "@/lib/data";

export function CountrySelector() {
  return (
    <section className="py-12 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-playfair text-center mb-8">
          Shop by Country
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {countries.map((country) => (
            <Link
              key={country.id}
              to={`/country/${country.id}`}
              className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow flex flex-col items-center"
            >
              <div className="h-16 w-16 rounded-full bg-muted mb-3 overflow-hidden">
                <img
                  src={country.image}
                  alt={country.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="font-medium">{country.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
