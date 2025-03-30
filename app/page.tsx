"use client";

import { Button } from "@/components/ui/button";
import { ChefHat, UtensilsCrossed } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col items-center">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md p-4 fixed top-0 z-50 flex justify-between items-center px-6 md:px-12">
        <div className="flex items-center gap-3 text-2xl font-bold text-gray-800">
          <ChefHat className="h-8 w-8 text-green-500" /> CloudChef
        </div>
        <div className="flex gap-4">
          <Button
            variant="outline"
            className="text-gray-700 hover:text-green-500 hover:bg-white  border-green-500"
            asChild
          >
            <Link href="/login">Login</Link>
          </Button>
          <Button
            className="bg-green-500 hover:bg-green-400 text-white"
            asChild
          >
            <Link href="/register">Sign Up</Link>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="w-full text-center pt-24 pb-16 px-6 md:px-12 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-extrabold mb-6 leading-tight text-gray-900">
            Delicious <span className="text-green-500">Homemade</span> Meals at
            Your Doorstep
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Discover and order freshly made meals from talented home chefs
            around you.
          </p>
          <div className="flex justify-center gap-6">
            <Button
              size="lg"
              className="bg-green-500 hover:bg-green-400 text-white gap-2"
              asChild
            >
              <Link href="/user/dashboard">
                Customer <UtensilsCrossed className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white gap-2"
              asChild
            >
              <Link href="/chef/dashboard">
                Chef? Enroll <ChefHat className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mt-12"
        >
          <Image
            src="/images/food.avif"
            alt="Delicious food"
            width={800}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl px-6 md:px-12 mt-8 mb-16">
        {[
          {
            title: "Fresh & Authentic",
            desc: "Enjoy homemade meals crafted with passion.",
            img: "/images/fresh-food.jpg",
          },
          {
            title: "Support Local Chefs",
            desc: "Empower home chefs by ordering directly from them.",
            img: "/images/support-chefs.jpg",
          },
          {
            title: "Easy & Secure Ordering",
            desc: "Seamless ordering exp with secure payments.",
            img: "/images/easy-order.jpg",
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="p-6 rounded-xl bg-white shadow-lg text-center border border-gray-200"
          >
            <h3 className="text-xl font-semibold text-green-500 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.desc}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
