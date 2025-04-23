"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash, Pencil, Utensils, X, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { MenuItem } from "@/types/type";
import { addMenuItem, getMenuByUser } from "@/app/actions/menu.action";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import mongoose from "mongoose";

const ChefMenuManagement: React.FC = () => {
  const { data: session } = useSession();
  if (!session) redirect("/login");
  if (session.user.role !== "chef") redirect("/");

  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newItem, setNewItem] = useState<MenuItem>({
    title: "",
    type: "Veg",
    price: 0,
    discription: "",
    category: "",
    createdBy: session?.user?._id as unknown as mongoose.Types.ObjectId,
  });

  const fetchMenu = async () => {
    try {
      setIsLoading(true);
      const result = await getMenuByUser(session?.user?._id as string);
      if (result.success && result.data) setMenu(result.data);
    } catch (error) {
      console.error("Failed to fetch menu:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddItem = async () => {
    if (!newItem.title || !newItem.discription || newItem.price === undefined) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setIsSubmitting(true);
      const result = await addMenuItem(newItem);
      if (result.success) {
        await fetchMenu();
        setNewItem({
          title: "",
          type: "Veg",
          price: 0,
          discription: "",
          category: "",
          createdBy: session?.user?._id as unknown as mongoose.Types.ObjectId,
        });
        setIsAdding(false);
      }
    } catch (error) {
      console.error("Error adding item:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Utensils className="w-8 h-8 text-primary" />
            Menu Management
          </h1>
          <Button
            onClick={() => setIsAdding(!isAdding)}
            className="bg-gradient-to-r from-primary to-green-600 hover:from-primary/90 hover:to-green-600/90 shadow-lg hover:shadow-primary/30 transition-all"
            disabled={isLoading}
          >
            {isAdding ? (
              <X className="w-5 h-5 mr-2" />
            ) : (
              <Plus className="w-5 h-5 mr-2" />
            )}
            {isAdding ? "Cancel" : "Add Item"}
          </Button>
        </motion.div>

        {/* Add New Item Form */}
        <AnimatePresence>
          {isAdding && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white shadow-lg rounded-xl p-6 mb-8 border border-gray-100"
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                New Menu Item
              </h3>
              <div className="space-y-4">
                <Input
                  placeholder="Item Name*"
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  className="bg-gray-50 border-gray-200 focus:ring-2 focus:ring-primary"
                  disabled={isSubmitting}
                />
                
                <div className="relative">
                  <select
                    value={newItem.type}
                    onChange={(e) => setNewItem({ ...newItem, type: e.target.value as "Veg" | "Non-Veg" })}
                    className="w-full h-10 pl-3 pr-8 rounded-md border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-primary appearance-none"
                    disabled={isSubmitting}
                  >
                    <option value="Veg">Vegetarian</option>
                    <option value="Non-Veg">Non-Vegetarian</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                </div>

                <Input
                  type="number"
                  placeholder="Price*"
                  value={newItem.price || ""}
                  onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) || 0 })}
                  className="bg-gray-50 border-gray-200 focus:ring-2 focus:ring-primary"
                  disabled={isSubmitting}
                />

                <Textarea
                  placeholder="Description*"
                  value={newItem.discription}
                  onChange={(e) => setNewItem({ ...newItem, discription: e.target.value })}
                  className="bg-gray-50 border-gray-200 focus:ring-2 focus:ring-primary min-h-[100px]"
                  disabled={isSubmitting}
                />

                <Input
                  placeholder="Category (Optional)"
                  value={newItem.category || ""}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  className="bg-gray-50 border-gray-200 focus:ring-2 focus:ring-primary"
                  disabled={isSubmitting}
                />

                <Button
                  onClick={handleAddItem}
                  className="w-full bg-green-600 hover:bg-green-700 transition-transform hover:scale-[1.02] shadow-md"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                  ) : (
                    <>
                      <Plus className="w-5 h-5 mr-2" />
                      Add to Menu
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Menu Items Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden relative"
              >
                <div className="p-6 space-y-4">
                  <Skeleton className="h-6 w-3/4 rounded-lg" />
                  <Skeleton className="h-4 w-full rounded-lg" />
                  <Skeleton className="h-4 w-2/3 rounded-lg" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-6 w-1/4 rounded-lg" />
                    <div className="flex gap-2">
                      <Skeleton className="h-9 w-16 rounded-lg" />
                      <Skeleton className="h-9 w-16 rounded-lg" />
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-40 animate-shimmer" />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {menu.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all border border-gray-100"
                >
                  <Card className="border-0">
                    <CardHeader className="pb-0">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-semibold text-gray-900">
                          {item.title}
                        </CardTitle>
                        <Badge
                          variant={item.type === "Veg" ? "default" : "destructive"}
                          className="text-xs shadow-sm"
                        >
                          {item.type}
                        </Badge>
                      </div>
                      {item.category && (
                        <Badge variant="outline" className="text-xs mt-2 bg-gray-50">
                          {item.category}
                        </Badge>
                      )}
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {item.discription}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-2xl font-bold text-primary">
                          ₹{item.price.toFixed(2)}
                        </p>
                        <div className="flex gap-2">
                          <Button
                            variant="destructive"
                            size="sm"
                            className="shadow-sm hover:shadow-md transition-shadow"
                          >
                            <Trash className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="shadow-sm hover:shadow-md transition-shadow"
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {!isLoading && menu.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="mb-4 text-gray-400">
              <Utensils className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Your menu is empty
            </h3>
            <p className="text-gray-600">Start by adding your first menu item</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ChefMenuManagement;