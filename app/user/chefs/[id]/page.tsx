import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MessageSquare } from "lucide-react";

const chefs = [
  { id: "1", name: "Gordon Ramsay", specialty: "British Cuisine", rating: 4.9, img: "/images/gordon.jpg", bio: "World-renowned chef with a passion for perfection." },
  { id: "2", name: "Massimo Bottura", specialty: "Italian Cuisine", rating: 4.8, img: "/images/massimo.jpg", bio: "Master of Italian flavors and creativity." },
  { id: "3", name: "Dominique Crenn", specialty: "French Cuisine", rating: 4.7, img: "/images/crenn.jpg", bio: "First woman in America to earn three Michelin stars." },
];

const comments = {
  1: [
    { user: "Alice", text: "Amazing chef! His recipes are top-notch." },
    { user: "Bob", text: "Absolutely love his cooking style!" },
  ],
  2: [
    { user: "John", text: "A true master of Italian cuisine!" },
    { user: "Lisa", text: "Loved his latest dish, it was heavenly." },
  ],
  3: [
    { user: "Emma", text: "Her food is a work of art!" },
    { user: "David", text: "Simply the best in French cuisine!" },
  ],
};

// ✅ Server Component (Next.js App Router automatically makes `params` available)
export default async function ChefDetail({
    params,
  }: {
    params: Promise<{ id: string }>
  }) {
    const id = (await params).id
  const chef = chefs.find((c) => c.id === id);

  if (!chef) return notFound(); // Redirects to 404 page if chef doesn't exist

  return (
    <div className="container mx-auto py-6">
      <Button onClick={() => history.back()} className="mb-4">
        ← Back to Chefs
      </Button>
      <Card className="p-6 flex items-center space-x-6">
        <img src={chef.img} alt={chef.name} className="h-24 w-24 rounded-full object-cover" />
        <div>
          <h1 className="text-3xl font-bold">{chef.name}</h1>
          <p className="text-muted-foreground">{chef.specialty}</p>
          <p className="mt-2">{chef.bio}</p>
          <div className="flex items-center mt-2">
            <Star className="h-5 w-5 text-yellow-400" />
            <span className="text-lg ml-1">{chef.rating}</span>
          </div>
        </div>
      </Card>

      <h2 className="text-2xl font-semibold mt-6">User Comments</h2>
      <div className="mt-4 space-y-4">
        {comments[chef.id]?.map((comment, i) => (
          <Card key={i} className="p-4 flex items-start space-x-4">
            <MessageSquare className="h-6 w-6 text-muted-foreground" />
            <div>
              <h4 className="font-medium">{comment.user}</h4>
              <p className="text-muted-foreground">{comment.text}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
