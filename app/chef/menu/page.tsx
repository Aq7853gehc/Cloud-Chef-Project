"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash, Pencil, Utensils } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category?: string;
}

const initialMenu: MenuItem[] = [
  { id: "1", name: "Grilled Chicken", description: "Served with vegetables", price: 12.99, category: "Main Course" },
  { id: "2", name: "Pasta Primavera", description: "Fresh vegetables and pasta", price: 10.99, category: "Main Course" },
];

const ChefMenuManagement: React.FC = () => {
  const [menu, setMenu] = useState<MenuItem[]>(initialMenu);
  const [newItem, setNewItem] = useState<MenuItem>({ id: "", name: "", description: "", price: 0, category: "" });
  const [isAdding, setIsAdding] = useState(false);

  const addMenuItem = () => {
    if (newItem.name && newItem.description && newItem.price) {
      setMenu([...menu, { ...newItem, id: Date.now().toString() }]);
      setNewItem({ id: "", name: "", description: "", price: 0, category: "" });
      setIsAdding(false);
    }
  };

  const removeMenuItem = (id: string) => {
    setMenu(menu.filter((item) => item.id !== id));
  };

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
            className="bg-gradient-to-r from-primary to-green-600 hover:from-primary/90 hover:to-green-600/90"
          >
            <Plus className="w-5 h-5 mr-2" />
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
              <h3 className="text-xl font-semibold mb-4 text-gray-800">New Menu Item</h3>
              <div className="space-y-4">
                <Input
                  placeholder="Item Name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="bg-gray-50 border-gray-200"
                />
                <Textarea
                  placeholder="Description"
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  className="bg-gray-50 border-gray-200"
                />
                <Input
                  type="number"
                  placeholder="Price"
                  value={newItem.price}
                  onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) || 0 })}
                  className="bg-gray-50 border-gray-200"
                />
                <Input
                  placeholder="Category (Optional)"
                  value={newItem.category || ""}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  className="bg-gray-50 border-gray-200"
                />
                <Button onClick={addMenuItem} className="w-full bg-green-600 hover:bg-green-700">
                  <Plus className="w-5 h-5 mr-2" />
                  Add to Menu
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {menu.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-semibold">{item.name}</CardTitle>
                      {item.category && (
                        <Badge variant="outline" className="text-sm text-primary border-primary">
                          {item.category}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{item.description}</p>
                    <p className="text-2xl font-bold text-primary mb-4">${item.price.toFixed(2)}</p>
                    <div className="flex gap-2">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeMenuItem(item.id)}
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
      </div>
    </div>
  );
};

export default ChefMenuManagement;