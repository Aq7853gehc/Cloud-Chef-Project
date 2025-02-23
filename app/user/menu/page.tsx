"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus, Search, Filter } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
};

type CartItem = MenuItem & {
  quantity: number;
};

const sampleMenu: MenuItem[] = [
  { id: "1", name: "Spaghetti Carbonara", description: "Classic Italian pasta with creamy sauce and bacon.", price: 12.99, imageUrl: "/images/carbonara.jpg", category: "Italian" },
  { id: "2", name: "Margherita Pizza", description: "Tomato, fresh mozzarella, and basil on a crispy crust.", price: 14.99, imageUrl: "/images/pizza.jpeg", category: "Italian" },
  { id: "3", name: "Grilled Chicken Salad", description: "Healthy salad with grilled chicken and fresh veggies.", price: 10.99, imageUrl: "/images/salad.jpeg", category: "Salad" },
  { id: "4", name: "Butter Chicken", description: "Rich and creamy tomato-based Indian chicken dish.", price: 15.99, imageUrl: "/images/butter-chicken.jpeg", category: "Indian" },
  { id: "5", name: "Chow Mein", description: "Stir-fried noodles with vegetables and chicken.", price: 11.99, imageUrl: "/images/chow-mein.jpeg", category: "Chinese" },
  { id: "6", name: "Sushi Platter", description: "Fresh sushi selection with soy sauce and wasabi.", price: 18.99, imageUrl: "/images/sushi.jpeg", category: "Japanese" },
];

export default function MenuPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

  const addToCart = (item: MenuItem) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return currentCart.map((cartItem) => cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem);
      }
      return [...currentCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === itemId);
      if (existingItem?.quantity === 1) {
        return currentCart.filter((item) => item.id !== itemId);
      }
      return currentCart.map((item) => item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item);
    });
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const filteredMenu = sampleMenu.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) && (filter === "All" || item.category === filter)
  );

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <Search className="w-5 h-5 text-gray-900" />
          <input
            type="text"
            placeholder="Search dishes..."
            className="border p-2 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Filter className="w-5 h-5 text-gray-900" />
          <select className="border p-2 rounded-md" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Italian">Italian</option>
            <option value="Indian">Indian</option>
            <option value="Chinese">Chinese</option>
            <option value="Japanese">Japanese</option>
            <option value="Salad">Salad</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Available Dishes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMenu.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <Image src={item.imageUrl} alt={item.name} className="w-full h-52 object-cover" width={208} height={208}/>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-semibold text-gray-900">${item.price.toFixed(2)}</span>
                    <Button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-500" onClick={() => addToCart(item)}>
                      <Plus className="w-4 h-4 mr-2" /> Add
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingCart className="w-6 h-6 text-gray-900" />
            <h2 className="text-xl font-semibold text-gray-900">Your Cart</h2>
          </div>
          {cart.length === 0 ? <p className="text-gray-500 text-center">Your cart is empty</p> : (
            <>
              <div className="space-y-4 h-fit">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between border-b pb-3">
                    <Image src={item.imageUrl} alt={item.name} className="w-12 h-12 object-cover rounded-md" width={48} height={48} />
                    <div className="flex-1 pl-3">
                      <h4 className="text-gray-900 font-medium">{item.name}</h4>
                      <p className="text-gray-500 text-sm">${item.price.toFixed(2)} x {item.quantity}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button className="bg-gray-200 text-gray-900 px-2 py-1 rounded-md hover:bg-gray-300" onClick={() => removeFromCart(item.id)}>
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="text-lg font-semibold">{item.quantity}</span>
                      <Button className="bg-gray-900 text-white px-2 py-1 rounded-md hover:bg-gray-800" onClick={() => addToCart(item)}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-medium text-gray-900">Total</span>
                  <span className="text-xl font-bold text-gray-900">${cartTotal.toFixed(2)}</span>
                </div>
                <Link href="/order">
                  <Button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-500">Checkout</Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
