"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChefHat, Star, MapPin, Clock, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const chefs = [
  {
    id: 1,
    name: "Gordon Ramsay",
    specialty: "British Cuisine",
    rating: 4.9,
    img: "/images/chef.jpg",
    location: "London, UK",
    exp: "20+ years",
  },
  {
    id: 2,
    name: "Massimo Bottura",
    specialty: "Italian Cuisine",
    rating: 4.8,
    img: "/images/chef.jpg",
    location: "Modena, Italy",
    exp: "25+ years",
  },
  {
    id: 3,
    name: "Dominique Crenn",
    specialty: "French Cuisine",
    rating: 4.7,
    img: "/images/chef.jpg",
    location: "San Francisco, USA",
    exp: "15+ years",
  },
  {
    id: 4,
    name: "Gordon Ramsay",
    specialty: "British Cuisine",
    rating: 4.9,
    img: "/images/chef.jpg",
    location: "London, UK",
    exp: "20+ years",
  },
  {
    id: 5,
    name: "Massimo Bottura",
    specialty: "Italian Cuisine",
    rating: 4.8,
    img: "/images/chef.jpg",
    location: "Modena, Italy",
    exp: "25+ years",
  },
  {
    id: 6,
    name: "Dominique Crenn",
    specialty: "French Cuisine",
    rating: 4.7,
    img: "/images/chef.jpg",
    location: "San Francisco, USA",
    exp: "15+ years",
  },
];

export default function ChefsPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
            <ChefHat className="w-10 h-10 text-primary" />
            Top Chefs Near You
          </h1>
          <Button variant="outline" className="gap-2">
            View All <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Chef Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {chefs.map((chef) => (
            <motion.div
              key={chef.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-white shadow-sm rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-48 w-full">
                  <Image
                    src={chef.img}
                    alt={chef.name}
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-green-600 hover:bg-green-700">
                    <Star className="w-4 h-4 mr-1" />
                    {chef.rating}
                  </Badge>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {chef.name}
                  </h2>
                  <p className="text-lg text-gray-600 mb-4">{chef.specialty}</p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{chef.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{chef.exp} exp</span>
                    </div>
                  </div>
                  <Button
                    onClick={() => router.push(`/chefs/${chef.id}`)}
                    className="w-full mt-6 bg-gradient-to-r from-primary to-green-600 hover:from-primary/90 hover:to-green-600/90"
                  >
                    View Profile <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
