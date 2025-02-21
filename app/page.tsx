import { Button } from '@/components/ui/button';
import { ChefHat, UtensilsCrossed } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-16">
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-2">
            <ChefHat className="h-8 w-8" />
            <span className="text-2xl font-bold">CloudChef</span>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/register">Sign Up</Link>
            </Button>
          </div>
        </nav>

        <main className="flex flex-col items-center text-center">
          <h1 className="text-5xl font-bold mb-6">
            Discover Authentic Homemade Food
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl">
            Connect with talented local chefs and enjoy delicious, home-cooked meals delivered right to your door.
          </p>

          <div className="flex gap-6 mb-16">
            <Button size="lg" className="gap-2" asChild>
              <Link href="/user/dashboard">
                Order Food
                <UtensilsCrossed className="h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="gap-2" asChild>
              <Link href="/chef/dashboard">
                Become a Chef
                <ChefHat className="h-5 w-5" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Fresh & Authentic</h3>
              <p className="text-muted-foreground">
                Enjoy real homemade food cooked with love and care by local chefs.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Support Local</h3>
              <p className="text-muted-foreground">
                Help local chefs grow their business while enjoying great food.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Easy Ordering</h3>
              <p className="text-muted-foreground">
                Browse menus, place orders, and track delivery in real-time.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}