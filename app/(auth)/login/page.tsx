"use client";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
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
import { Mail, Lock, ChefHat } from "lucide-react";
import { redirect } from "next/navigation";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
          console.log("error:", result.error);
    }

    if (session?.user.role === "chef") {
      redirect("/chef/dashboard");
    } else {
      redirect("/user/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl overflow-hidden">
        <CardHeader className="bg-green-600/10 p-6 border-b border-white/20">
          <div className="flex items-center gap-4">
            <div>
              <CardTitle className="text-2xl font-bold text-green-800 flex items-center gap-2">
                <ChefHat className="w-6 h-6" />
                Login
              </CardTitle>
              <CardDescription className="text-gray-600">
                Welcome back to your Journey
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
              Login
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
    </div>
  );
};

export default LoginPage;
