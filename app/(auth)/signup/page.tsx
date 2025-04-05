"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ChefHat, User, MapPin, Phone, Mail, Lock, Briefcase, BookOpen, ArrowLeft } from "lucide-react";
const RegisterPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<"chef" | "customer">();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
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
    if (!selectedRole) return;
    setIsLoading(true);

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: selectedRole,
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
    {!selectedRole ? (
      <div className="w-full max-w-2xl flex gap-6">
        {/* Chef Card */}
        <Card className="w-1/2 bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl cursor-pointer hover:shadow-xl transition-shadow">
          <CardHeader className="p-6" onClick={() => setSelectedRole("chef")}>
            <ChefHat className="w-12 h-12 mx-auto text-green-600" />
            <CardTitle className="text-2xl font-bold text-green-800 text-center mt-4">
              Register as Chef
            </CardTitle>
            <CardDescription className="text-center text-gray-600 mt-2">
              Share your culinary skills and connect with food lovers
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
              Register as Customer
            </CardTitle>
            <CardDescription className="text-center text-gray-600 mt-2">
              Discover amazing chefs and enjoy delicious meals
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
                {selectedRole === "chef" ? "Chef Registration" : "Customer Registration"}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {selectedRole === "chef"
                  ? "Please fill in your professional details"
                  : "Please fill in your information"}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Common Fields */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-gray-700">
                <User className="w-4 h-4" />
                Full Name
              </Label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-gray-700">
                <Mail className="w-4 h-4" />
                Email Address
              </Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
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
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-gray-700">
                <MapPin className="w-4 h-4" />
                Address
              </Label>
              <Input
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-gray-700">
                <Phone className="w-4 h-4" />
                Phone Number
              </Label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />
            </div>

            {/* Chef-specific Fields */}
            {selectedRole === "chef" && (
              <>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-gray-700">
                    <Briefcase className="w-4 h-4" />
                    Specialty
                  </Label>
                  <Input
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleChange}
                    placeholder="e.g., Italian, Vegan, etc."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-gray-700">
                    <BookOpen className="w-4 h-4" />
                    Years of Experience
                  </Label>
                  <Input
                    type="number"
                    name="exp"
                    value={formData.exp}
                    onChange={handleChange}
                    placeholder="Enter years of experience"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-gray-700">
                    <BookOpen className="w-4 h-4" />
                    Bio
                  </Label>
                  <Textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Tell us about yourself"
                    rows={4}
                    required
                  />
                </div>
              </>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {isLoading ? "Registering..." : "Complete Registration"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center p-6 bg-green-50/50">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-green-600 hover:underline">
              Login here
            </Link>
          </p>
        </CardFooter>
      </Card>
    )}
  </div>
  );
};

export default RegisterPage;
