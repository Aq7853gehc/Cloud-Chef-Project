"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash, Pencil } from "lucide-react";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
}

const initialMenu: MenuItem[] = [
  { id: "1", name: "Grilled Chicken", description: "Served with vegetables", price: 12.99 },
  { id: "2", name: "Pasta Primavera", description: "Fresh vegetables and pasta", price: 10.99 },
];

const ChefMenuManagement: React.FC = () => {
  const [menu, setMenu] = useState<MenuItem[]>(initialMenu);
  const [newItem, setNewItem] = useState<MenuItem>({ id: "", name: "", description: "", price: 5 });

  const addMenuItem = () => {
    if (newItem.name && newItem.description && newItem.price) {
      setMenu([...menu, { ...newItem, id: Date.now().toString() }]);
      setNewItem({ id: "", name: "", description: "", price: 0 });
    }
  };

  const removeMenuItem = (id: string) => {
    setMenu(menu.filter((item) => item.id !== id));
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">Menu Management</h2>
      <div className="mb-6 bg-white shadow-md p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Add New Menu Item</h3>
        <div className="flex flex-col gap-3">
          <Input placeholder="Item Name" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} />
          <Textarea placeholder="Description" value={newItem.description} onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} />
          <Input type="text" placeholder="Price" value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) || 0 })} />
          <Button onClick={addMenuItem} className="bg-green-600 text-white hover:bg-green-500 flex items-center">
            <Plus className="w-4 h-4 mr-2" /> Add Item
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {menu.map((item) => (
          <Card key={item.id} className="bg-white shadow-md rounded-lg p-4">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">{item.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{item.description}</p>
              <p className="text-gray-600 font-bold mt-2">${item.price.toFixed(2)}</p>
              <div className="mt-4 flex gap-2">
                <Button className="bg-red-600 text-white hover:bg-red-500" onClick={() => removeMenuItem(item.id)}>
                  <Trash className="w-4 h-4" />
                </Button>
                <Button className="bg-blue-600 text-white hover:bg-blue-500">
                  <Pencil className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ChefMenuManagement;
