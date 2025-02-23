"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, ChefHat } from "lucide-react";
import Image from "next/image";

// Sample Chef Updates Data
const chefUpdates = [
  {
    id: "1",
    name: "Chef Gordon Ramsay",
    rating: 4.9,
    latestDish: "Beef Wellington",
    imageUrl: "/images/chef.jpg",
    dishImage: "/images/beef-wellington.jpg",
  },
  {
    id: "2",
    name: "Chef Jamie Oliver",
    rating: 4.7,
    latestDish: "Pasta Carbonara",
    imageUrl: "/images/chef.jpg",
    dishImage: "/images/carbonara.jpg",
  },
  {
    id: "3",
    name: "Chef Nigella Lawson",
    rating: 4.8,
    latestDish: "Chocolate Lava Cake",
    imageUrl: "/images/chef.jpg",
    dishImage: "/images/lava-cake.jpg",
  },
  {
    id: "4",
    name: "Chef Gordon Ramsay",
    rating: 4.9,
    latestDish: "Beef Wellington",
    imageUrl: "/images/chef.jpg",
    dishImage: "/images/beef-wellington.jpg",
  },
  {
    id: "5",
    name: "Chef Jamie Oliver",
    rating: 4.7,
    latestDish: "Pasta Carbonara",
    imageUrl: "/images/chef.jpg",
    dishImage: "/images/carbonara.jpg",
  },
  {
    id: "6",
    name: "Chef Nigella Lawson",
    rating: 4.8,
    latestDish: "Chocolate Lava Cake",
    imageUrl: "/images/chef.jpg",
    dishImage: "/images/lava-cake.jpg",
  },
];

export default function ChefUpdates() {
  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-2">
        <ChefHat className="w-6 h-6 text-gray-700" /> Chef Updates
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {chefUpdates.map((chef) => (
          <Card key={chef.id}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Image
                  src={chef.imageUrl}
                  alt={chef.name}
                  className="w-12 h-12 rounded-full"
                  width={48}
                  height={48}
                />
                <div>
                  <CardTitle>{chef.name}</CardTitle>
                  <div className="flex items-center text-yellow-500">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`w-4 h-4 ${
                          index < Math.round(chef.rating)
                            ? "fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-gray-700 ml-2">({chef.rating})</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Image
                src={chef.dishImage}
                alt={chef.latestDish}
                className="w-full h-40 object-cover rounded-md"
                height={160}
                width={160}
              />
              <p className="mt-3 text-gray-800 font-medium">
                Latest Dish: {chef.latestDish}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
