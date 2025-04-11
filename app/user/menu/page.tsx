"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus, Search, Leaf, Sprout } from "lucide-react";
import Link from "next/link";
import { getAllMenuItem } from "@/app/actions/menu.action";
import { MenuItem } from "@/models/menu.modules";
import { Badge } from "@/components/ui/badge";

type CartItem = MenuItem & {
  quantity: number;
};

export default function MenuPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"All" | "Veg" | "Non-Veg">("All");
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const fetchMenu = async () => {
    const result = await getAllMenuItem();
    if (result.success && result.data) {
      setMenu(result.data);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const addToCart = (item: MenuItem) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (cartItem) => cartItem.title === item.title
      );
      if (existingItem) {
        return currentCart.map((cartItem) =>
          cartItem.title === item.title
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...currentCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemTitle: string) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.title === itemTitle);
      if (existingItem?.quantity === 1) {
        return currentCart.filter((item) => item.title !== itemTitle);
      }
      return currentCart.map((item) =>
        item.title === itemTitle ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const filteredMenu = menu.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filter === "All" || item.type === filter)
  );

  return (
    <div className="min-h-screen bg-green-50 w-full">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10 border-b border-green-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-800 flex items-center gap-2">
            <Sprout className="text-green-600" />
            Green Eats
          </h1>
          
          <Button 
            variant="ghost" 
            className="relative text-green-700 hover:bg-green-50"
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            <ShoppingCart className="text-green-600" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cart.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="relative max-w-md mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400" />
            <input
              type="text"
              placeholder="Search dishes..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-green-200 focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filter === "All" ? "default" : "outline"}
              onClick={() => setFilter("All")}
              className={`rounded-full ${filter === "All" ? "bg-green-600 hover:bg-green-700" : "text-green-700 border-green-300 hover:bg-green-50"}`}
            >
              All Items
            </Button>
            <Button
              variant={filter === "Veg" ? "default" : "outline"}
              onClick={() => setFilter("Veg")}
              className={`rounded-full flex gap-2 items-center ${filter === "Veg" ? "bg-green-600 hover:bg-green-700" : "text-green-700 border-green-300 hover:bg-green-50"}`}
            >
              <Leaf className="w-4 h-4" />
              Veg Only
            </Button>
            <Button
              variant={filter === "Non-Veg" ? "default" : "outline"}
              onClick={() => setFilter("Non-Veg")}
              className={`rounded-full ${filter === "Non-Veg" ? "bg-amber-600 hover:bg-amber-700" : "text-amber-700 border-amber-300 hover:bg-amber-50"}`}
            >
              Non-Veg Only
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Menu Items */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-6 text-green-800">Our Menu</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMenu.map((item) => (
                <div
                  key={item.title}
                  className="bg-white rounded-xl shadow-sm overflow-hidden border border-green-100 hover:shadow-md transition-shadow"
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-green-900">
                        {item.title}
                      </h3>
                      <Badge 
                        variant={item.type === "Veg" ? "default" : "secondary"} 
                        className={`text-xs ${item.type === "Veg" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}
                      >
                        {item.type}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {item.discription}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-green-700">
                        ${item.price.toFixed(2)}
                      </span>
                      <Button
                        size="sm"
                        onClick={() => addToCart(item)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart - Desktop */}
          <div className="hidden md:block w-80">
            <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6 sticky top-28 h-[calc(100vh-180px)] overflow-y-auto">
              <div className="flex items-center gap-3 mb-4">
                <ShoppingCart className="w-6 h-6 text-green-600" />
                <h2 className="text-xl font-bold text-green-800">Your Order</h2>
                {cart.length > 0 && (
                  <span className="bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                )}
              </div>
              
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="mx-auto w-10 h-10 text-green-200 mb-2" />
                  <p className="text-gray-500">Your cart is empty</p>
                  <p className="text-sm text-gray-400 mt-1">Add items to get started</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.title}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50"
                      >
                        <div className="bg-green-100 rounded-md w-10 h-10 flex items-center justify-center text-green-600">
                          <Leaf className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-green-900">{item.title}</h4>
                          <p className="text-sm text-green-600">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.title)}
                            className="text-green-600 hover:text-green-800 hover:bg-green-100"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="font-medium w-6 text-center text-green-800">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => addToCart(item)}
                            className="text-green-600 hover:text-green-800 hover:bg-green-100"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-green-100">
                    <div className="flex justify-between mb-4 text-lg font-bold text-green-800">
                      <span>Total</span>
                      <span>${(cartTotal + 2.99).toFixed(2)}</span>
                    </div>
                    <Link href="/checkout">
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        Proceed to Checkout
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div 
            className="absolute inset-0 bg-black/30"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-xl p-6 max-h-[80vh] overflow-y-auto border-t-4 border-green-500">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-green-800">Your Order</h3>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsCartOpen(false)}
                className="text-green-600 hover:bg-green-50"
              >
                <Minus className="w-5 h-5" />
              </Button>
            </div>
            
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="mx-auto w-10 h-10 text-green-200 mb-2" />
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div
                      key={item.title}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50"
                    >
                      <div className="bg-green-100 rounded-md w-10 h-10 flex items-center justify-center text-green-600">
                        <Leaf className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-green-900">{item.title}</h4>
                        <p className="text-sm text-green-600">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.title)}
                          className="text-green-600 hover:text-green-800 hover:bg-green-100"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="font-medium w-6 text-center text-green-800">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => addToCart(item)}
                          className="text-green-600 hover:text-green-800 hover:bg-green-100"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-green-100 pt-4">
                  <div className="flex justify-between mb-4 font-bold text-lg text-green-800">
                    <span>Total</span>
                    <span>${(cartTotal + 2.99).toFixed(2)}</span>
                  </div>
                  <Link href="/checkout">
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={() => setIsCartOpen(false)}
                    >
                      Checkout Now
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}