
import React from "react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-olive text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-playfair font-bold mb-4">Fertile Crescent Emporium</h3>
            <p className="mb-4">
              Bringing the authentic traditions and products of the Fertile
              Crescent region to your home.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-playfair font-semibold mb-4">Countries</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/country/egypt" className="hover:underline">Egypt</Link>
              </li>
              <li>
                <Link to="/country/lebanon" className="hover:underline">Lebanon</Link>
              </li>
              <li>
                <Link to="/country/palestine" className="hover:underline">Palestine</Link>
              </li>
              <li>
                <Link to="/country/cyprus" className="hover:underline">Cyprus</Link>
              </li>
              <li>
                <Link to="/country/syria" className="hover:underline">Syria</Link>
              </li>
              <li>
                <Link to="/country/iraq" className="hover:underline">Iraq</Link>
              </li>
              <li>
                <Link to="/country/jordan" className="hover:underline">Jordan</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-playfair font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:underline">About Us</Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:underline">Shipping Policy</Link>
              </li>
              <li>
                <Link to="/returns" className="hover:underline">Returns & Refunds</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:underline">FAQ</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline">Contact Us</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-playfair font-semibold mb-4">My Account</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="hover:underline">Login</Link>
              </li>
              <li>
                <Link to="/register" className="hover:underline">Register</Link>
              </li>
              <li>
                <Link to="/orders" className="hover:underline">Order History</Link>
              </li>
              <li>
                <Link to="/account" className="hover:underline">Account Settings</Link>
              </li>
              <li>
                <Link to="/cart" className="hover:underline">Shopping Cart</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2025 Fertile Crescent Emporium. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-4">
              <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
              <Link to="/terms" className="hover:underline">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
