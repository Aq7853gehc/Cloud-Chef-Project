"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const chefs = [
  { id: 1, name: "Gordon Ramsay", specialty: "British Cuisine", rating: 4.9, img: "/images/chef.jpg" },
  { id: 2, name: "Massimo Bottura", specialty: "Italian Cuisine", rating: 4.8, img: "/images/chef.jpg" },
  { id: 3, name: "Dominique Crenn", specialty: "French Cuisine", rating: 4.7, img: "/images/chef.jpg" },
];

export default function ChefsPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-4">Top Chefs</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {chefs.map((chef) => (
          <Card key={chef.id} className="p-4 flex flex-col items-center text-center">
            <img src={chef.img} alt={chef.name} className="h-24 w-24 rounded-full object-cover mb-2" />
            <h2 className="text-xl font-semibold">{chef.name}</h2>
            <p className="text-muted-foreground">{chef.specialty}</p>
            <div className="flex items-center mt-2">
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="text-lg ml-1">{chef.rating}</span>
            </div>
            <Button className="mt-4" onClick={() => router.push(`/chefs/${chef.id}`)}>
              View Profile
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
