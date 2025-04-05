"use client";
import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  ChefHat,
  User,
  MapPin,
  Phone,
  Mail,
  Lock,
  Briefcase,
  BookOpen,
} from "lucide-react";

const RegisterPage: React.FC = () => {
  const [role, setRole] = useState<"chef" | "customer">();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    role: role,
    name: "",
    email: "",
    password: "",
    specialty: "",
    exp: "",
    bio: "",
    address: "",
    phone: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: formData.role,
          name: formData.name,
          email: formData.email,
          password: formData.password,
          specialty: formData.specialty,
          exp: formData.exp,
          bio: formData.bio,
          address: formData.address,
          phone: formData.phone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Registration successful - you might want to redirect to login page
      // or automatically log the user in
      window.location.href = "/login";
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false);
    }

    console.log(formData);
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
            {role === "chef" ? "Chef Registration" : "Customer Registration"}
          </CardTitle>
          <CardDescription className="text-center text-gray-600 mt-2">
            Join Cloud Chef and{" "}
            {role === "chef"
              ? "share your culinary skills"
              : "explore delicious meals"}
            !
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6">
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
            {/* Common Fields */}
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="flex items-center gap-2 text-gray-700"
              >
                <User className="w-4 h-4" />
                Full Name
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="bg-white/80 backdrop-blur-sm"
                required
              />
            </div>

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
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="bg-white/80 backdrop-blur-sm"
                required
              />
            </div>

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
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="bg-white/80 backdrop-blur-sm"
                required
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="address"
                className="flex items-center gap-2 text-gray-700"
              >
                <MapPin className="w-4 h-4" />
                Address
              </Label>
              <Input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                className="bg-white/80 backdrop-blur-sm"
                required
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="flex items-center gap-2 text-gray-700"
              >
                <Phone className="w-4 h-4" />
                Phone Number
              </Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="bg-white/80 backdrop-blur-sm"
                required
              />
            </div>
            {/* Role-Specific Fields */}
            {role === "chef" && (
              <>
                <div className="space-y-2">
                  <Label
                    htmlFor="specialty"
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <Briefcase className="w-4 h-4" />
                    Specialty
                  </Label>
                  <Input
                    type="text"
                    id="specialty"
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleChange}
                    placeholder="e.g., Italian, Vegan, etc."
                    className="bg-white/80 backdrop-blur-sm"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="exp"
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <BookOpen className="w-4 h-4" />
                    Years of Experience
                  </Label>
                  <Input
                    type="number"
                    id="exp"
                    name="exp"
                    value={formData.exp}
                    onChange={handleChange}
                    placeholder="Enter years of exp"
                    className="bg-white/80 backdrop-blur-sm"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="bio"
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <BookOpen className="w-4 h-4" />
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Tell us about yourself"
                    rows={4}
                    className="bg-white/80 backdrop-blur-sm"
                    required
                  />
                </div>
              </>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700 transition-all duration-300"
            >
              {isLoading
                ? "Registering..."
                : `Register as ${role === "chef" ? "Chef" : "Customer"}`}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center p-6 bg-green-50/50 border-t border-white/20">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-green-600 hover:underline">
              Login here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterPage;
