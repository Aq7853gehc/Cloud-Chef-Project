"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus, Search, Leaf, Sprout,  ChevronDown, X,  } from "lucide-react";
import Link from "next/link";
import { getAllMenuItem } from "@/app/actions/menu.action";
import { MenuItem } from "@/models/menu.modules";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { addOrder } from "@/app/actions/order.action";
import { useSession } from "next-auth/react";

export type CartItem = MenuItem & {
  quantity: number;
};

export default function MenuPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"All" | "Veg" | "Non-Veg">("All");
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState< string | "default" | "price-asc" | "price-desc">("default");
  const {data:session} = useSession()
  const fetchMenu = async () => {
    setIsLoading(true);
    try {
      const result = await getAllMenuItem();
      if (result.success && result.data) {
        setMenu(result.data);
        console.log(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch menu:", error);
    } finally {
      setIsLoading(false);
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
    setIsCartOpen(true);
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

  const filteredMenu = menu
    .filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filter === "All" || item.type === filter)
    )
    .sort((a, b) => {
      if (sortOption === "price-asc") return a.price - b.price;
      if (sortOption === "price-desc") return b.price - a.price;
      return 0;
    });

  const deliveryFee = 2.99;
  const orderMinimum = 10.00;

  const placeOrder = async()=>{
    try {
      if (!session?.user._id) throw new Error("No user Id found")
      const data = {
        user: session?.user._id,
        items:[...cart],
        totalAmount:cartTotal+deliveryFee
      }
      const result = await addOrder(data)
      if(!result) throw new Error("")
    } catch (error) {
      console.log(error) 
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white w-full">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-20 border-b border-green-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Sprout className="text-green-600 h-8 w-8" />
            <h1 className="text-2xl font-bold text-green-800 font-serif">
            Our Seasonal Menu
            </h1>
          </Link>
          
          <Button 
            variant="ghost" 
            className="relative text-green-700 hover:bg-green-50 group"
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            <div className="relative">
              <ShoppingCart className="text-green-600 transition-transform group-hover:scale-110" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </div>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-4">
        {/* Hero Section */}
        
        {/* Search and Filter */}
        <div className="mb-8 bg-white p-4 rounded-xl shadow-sm border border-green-100">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400" />
              <input
                type="text"
                placeholder="Search dishes..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-green-200 focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
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
              
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="appearance-none bg-white border border-green-200 text-green-700 py-2 pl-4 pr-8 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="default">Sort by</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Menu Items */}
          <div className="flex-1">
            
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden border border-green-100">
                    <div className="p-5 space-y-3">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                      <div className="flex justify-between items-center">
                        <Skeleton className="h-6 w-1/4" />
                        <Skeleton className="h-9 w-20" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredMenu.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-green-100">
                <Search className="mx-auto w-10 h-10 text-green-300 mb-4" />
                <h3 className="text-xl font-semibold text-green-800 mb-2">No items found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence initial={false}>
                  {filteredMenu.map((item) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-xl shadow-sm overflow-hidden border border-green-100 hover:shadow-md transition-all hover:-translate-y-1"
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
                        {/* @ts-expect-error this is not the problem */}
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{`Made By:- Chef ${item.createdBy.name}`}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-green-700">
                            ${item.price.toFixed(2)}
                          </span>
                          <Button
                            size="sm"
                            onClick={() => addToCart(item)}
                            className="bg-green-600 hover:bg-green-700 shadow-sm"
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Add
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
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
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
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
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-green-100">
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-green-700">
                        <span>Subtotal</span>
                        <span className="font-medium">${cartTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-green-700">
                        <span>Delivery</span>
                        <span className="font-medium">${deliveryFee.toFixed(2)}</span>
                      </div>
                      {cartTotal < orderMinimum && (
                        <div className="text-sm text-amber-600 bg-amber-50 p-2 rounded">
                          Add ${(orderMinimum - cartTotal).toFixed(2)} more to place order
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between text-lg font-bold mb-6 text-green-800">
                      <span>Total</span>
                      <span>${(cartTotal + deliveryFee).toFixed(2)}</span>
                    </div>
                    <Link href="/user/menu/checkout">
                      <Button 
                        className="w-full bg-green-600 hover:bg-green-700 shadow-sm"
                        disabled={cartTotal < orderMinimum}
                        onClick={placeOrder}
                      >
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
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            <div 
              className="absolute inset-0 bg-black/30"
              onClick={() => setIsCartOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-xl p-6 max-h-[80vh] overflow-y-auto border-t-4 border-green-500"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-green-800">Your Order</h3>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsCartOpen(false)}
                  className="text-green-600 hover:bg-green-50"
                >
                  <X className="w-5 h-5" />
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
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
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
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="border-t border-green-100 pt-4">
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-green-700">
                        <span>Subtotal</span>
                        <span>${cartTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-green-700">
                        <span>Delivery</span>
                        <span>${deliveryFee.toFixed(2)}</span>
                      </div>
                      {cartTotal < orderMinimum && (
                        <div className="text-sm text-amber-600 bg-amber-50 p-2 rounded">
                          Add ${(orderMinimum - cartTotal).toFixed(2)} more to order
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between mb-4 font-bold text-lg text-green-800">
                      <span>Total</span>
                      <span>${(cartTotal + deliveryFee).toFixed(2)}</span>
                    </div>
                    <Link href="/user/menu/checkout">
                      <Button 
                        className="w-full bg-green-600 hover:bg-green-700 shadow-sm"
                        disabled={cartTotal < orderMinimum}
                        onClick={() => setIsCartOpen(false)}
                      >
                        Checkout Now
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}