"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Mail, Lock, ChefHat, User, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<"chef" | "customer">();
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
      console.log("error:", result.error);
    } else {
      router.push(selectedRole === "chef" ? "/chef/dashboard" : "/user/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      {!selectedRole ? (
        <div className="w-full max-w-2xl flex gap-6">
          {/* Chef Card */}
          <Card className="w-1/2 bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl cursor-pointer hover:shadow-xl transition-shadow">
            <CardHeader className="p-6" onClick={() => setSelectedRole("chef")}>
              <ChefHat className="w-12 h-12 mx-auto text-green-600" />
              <CardTitle className="text-2xl font-bold text-green-800 text-center mt-4">
                Login as Chef
              </CardTitle>
              <CardDescription className="text-center text-gray-600 mt-2">
                Access your professional kitchen dashboard
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-center p-6">
              <Button className="bg-green-600 hover:bg-green-700">Select Chef</Button>
            </CardFooter>
          </Card>

          {/* Customer Card */}
          <Card className="w-1/2 bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl cursor-pointer hover:shadow-xl transition-shadow">
            <CardHeader className="p-6" onClick={() => setSelectedRole("customer")}>
              <User className="w-12 h-12 mx-auto text-green-600" />
              <CardTitle className="text-2xl font-bold text-green-800 text-center mt-4">
                Login as Customer
              </CardTitle>
              <CardDescription className="text-center text-gray-600 mt-2">
                Discover and order delicious meals
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-center p-6">
              <Button className="bg-green-600 hover:bg-green-700">Select Customer</Button>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <Card className="w-full max-w-md bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl overflow-hidden">
          <CardHeader className="bg-green-600/10 p-6 border-b border-white/20">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-green-800 hover:bg-green-100"
                onClick={() => setSelectedRole(undefined)}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <CardTitle className="text-2xl font-bold text-green-800 flex items-center gap-2">
                  {selectedRole === "chef" ? <ChefHat className="w-6 h-6" /> : <User className="w-6 h-6" />}
                  {selectedRole === "chef" ? "Chef Login" : "Customer Login"}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {selectedRole === "chef"
                    ? "Welcome back to your professional dashboard"
                    : "Welcome back to your food journey"}
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-gray-700">
                  <Mail className="w-4 h-4" />
                  Email Address
                </Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-gray-700">
                  <Lock className="w-4 h-4" />
                  Password
                </Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Login as {selectedRole === "chef" ? "Chef" : "Customer"}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex justify-center p-6 bg-green-50/50">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-green-600 hover:underline">
                Register here
              </Link>
            </p>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default LoginPage;