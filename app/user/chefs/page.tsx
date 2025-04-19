"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChefHat,  MapPin, Clock, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getChefs } from "@/app/actions/user.action";
import { IUser } from "@/models/user.models";


export default function ChefsPage() {
  const router = useRouter();
  const [chefs, setChefs] = useState<IUser[]>([]);
 const fetctChefs = async ()=>{
  const response = await getChefs();
  if (!response.success) return console.log(response.msg);
  setChefs(response.data);
 }
 useEffect(() => {
  fetctChefs();
 }, []);
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
              key={chef._id as string}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-white shadow-sm rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-48 w-full">
                  <Image src={"/images/chef.jpg"} alt={chef.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {chef.name}
                  </h2>
                  <p className="text-lg text-gray-600 mb-4">{chef.specialty}</p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{chef.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{chef.exp} exp</span>
                    </div>
                  </div>
                  <Button
                    onClick={() => router.push(`/chefs/${chef._id}`)}
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
