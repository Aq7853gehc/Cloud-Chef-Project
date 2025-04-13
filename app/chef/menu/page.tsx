"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash, Pencil, Utensils, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { MenuItem } from "@/models/menu.modules";
import { addMenuItem, getAllMenuItem } from "@/app/actions/menu.action";
import { Skeleton } from "@/components/ui/skeleton";

const ChefMenuManagement: React.FC = () => {
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
  });

  const fetchMenu = async () => {
    try {
      setIsLoading(true);
      const result = await getAllMenuItem();
      if (result.success && result.data) {
        setMenu(result.data);
      }
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
        });
        setIsAdding(false);
      } else {
        alert(result.error || "Failed to add menu item");
      }
    } catch (error) {
      console.error("Error adding item:", error);
      alert("An error occurred while adding the item");
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeMenuItem = async (index: number) => {
    // Implement your delete logic here
    console.log("Remove item at index:", index);
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Utensils className="w-8 h-8 text-primary" />
            Menu Management
          </h1>
          <Button
            onClick={() => setIsAdding(!isAdding)}
            className={`bg-gradient-to-r from-primary to-green-600 hover:from-primary/90 hover:to-green-600/90`}
            disabled={isLoading}
          >
            {isAdding ? (
              <X className="w-5 h-5 mr-2" />
            ) : (
              <Plus className="w-5 h-5 mr-2" />
            )}
            {isAdding ? "Cancel" : "Add Item"}
          </Button>
        </div>

        {/* Add New Item Form */}
        <AnimatePresence>
          {isAdding && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white shadow-sm rounded-lg p-6 mb-8 border border-gray-100"
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                New Menu Item
              </h3>
              <div className="space-y-4">
                <Input
                  placeholder="Item Name*"
                  value={newItem.title}
                  onChange={(e) =>
                    setNewItem({ ...newItem, title: e.target.value })
                  }
                  className="bg-gray-50 border-gray-200"
                  required
                  disabled={isSubmitting}
                />
                <select
                  value={newItem.type}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      type: e.target.value as "Veg" | "Non-Veg",
                    })
                  }
                  className="flex h-10 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  <option value="Veg">Vegetarian</option>
                  <option value="Non-Veg">Non-Vegetarian</option>
                </select>
                <Input
                  type="number"
                  placeholder="Price*"
                  value={newItem.price || ""}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      price: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="bg-gray-50 border-gray-200"
                  required
                  disabled={isSubmitting}
                />
                <Textarea
                  placeholder="Description*"
                  value={newItem.discription}
                  onChange={(e) =>
                    setNewItem({ ...newItem, discription: e.target.value })
                  }
                  className="bg-gray-50 border-gray-200"
                  required
                  disabled={isSubmitting}
                />
                <Input
                  placeholder="Category (Optional)"
                  value={newItem.category || ""}
                  onChange={(e) =>
                    setNewItem({ ...newItem, category: e.target.value })
                  }
                  className="bg-gray-50 border-gray-200"
                  disabled={isSubmitting}
                />
                <Button
                  onClick={handleAddItem}
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Adding..."
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
              <Card key={index} className="overflow-hidden">
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-6 w-1/4" />
                    <div className="flex gap-2">
                      <Skeleton className="h-9 w-16" />
                      <Skeleton className="h-9 w-16" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {menu.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <Card className="">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-semibold">
                          {item.title}
                        </CardTitle>
                        <Badge
                          variant="outline"
                          className="text-xs text-primary border-primary"
                        >
                          {item.type}
                        </Badge>
                      </div>
                      {item.category && (
                        <Badge variant="secondary" className="text-xs mt-2">
                          {item.category}
                        </Badge>
                      )}
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">{item.discription}</p>
                      <p className="text-2xl font-bold text-primary mb-4">
                        ${item.price.toFixed(2)}
                      </p>
                      <div className="flex gap-2">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeMenuItem(index)}
                          className="flex-1"
                        >
                          <Trash className="w-4 h-4 mr-2" />
                          Remove
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Pencil className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChefMenuManagement;