"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Mail, Lock, ChefHat, User } from "lucide-react";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
  const [role, setRole] = useState<"chef" | "customer">("chef"); // Default role is 'chef'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      console.log("errror,", result.error);
    } else {
      if (role === "chef") {
        router.push("/chef/dashboar");
      } else {
        router.push("/user/dashboard");
      }
    }
    // Add your form submission logic here (e.g., API call to log in the user)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl overflow-hidden">
        <CardHeader className="bg-green-600/10 p-6 border-b border-white/20">
          <CardTitle className="text-3xl font-bold text-green-800 text-center flex items-center justify-center gap-2">
            {role === "chef" ? (
              <ChefHat className="w-8 h-8" />
            ) : (
              <User className="w-8 h-8" />
            )}
            {role === "chef" ? "Chef Login" : "Customer Login"}
          </CardTitle>
          <CardDescription className="text-center text-gray-600 mt-2">
            Welcome back! Please log in to{" "}
            {role === "chef"
              ? "manage your recipes"
              : "explore delicious meals"}
            .
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {/* Role Toggle */}
          <div className="flex justify-center mb-6">
            <ToggleGroup
              type="single"
              value={role}
              onValueChange={(value: "chef" | "customer") => setRole(value)}
              className="bg-green-50 p-1 rounded-lg"
            >
              <ToggleGroupItem
                value="chef"
                className="px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <ChefHat className="w-4 h-4" />
                Chef
              </ToggleGroupItem>
              <ToggleGroupItem
                value="customer"
                className="px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                Customer
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="flex items-center gap-2 text-gray-700"
              >
                <Mail className="w-4 h-4" />
                Email Address
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="bg-white/80 backdrop-blur-sm"
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="flex items-center gap-2 text-gray-700"
              >
                <Lock className="w-4 h-4" />
                Password
              </Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="bg-white/80 backdrop-blur-sm"
                required
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 transition-all duration-300"
            >
              Log in as {role === "chef" ? "Chef" : "Customer"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center p-6 bg-green-50/50 border-t border-white/20">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-green-600 hover:underline">
              Register here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
