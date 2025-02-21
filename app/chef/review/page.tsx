"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MessageCircle } from "lucide-react";

interface Review {
  id: string;
  customer: string;
  rating: number;
  comment: string;
  response?: string;
}

const reviewsData: Review[] = [
  { id: "1", customer: "Alice Johnson", rating: 5, comment: "Fantastic food! Will order again." },
  { id: "2", customer: "Michael Smith", rating: 4, comment: "Tasty, but delivery was a bit late." },
  { id: "3", customer: "Emma Brown", rating: 3, comment: "Good, but could use more seasoning." },
];

const ChefReviewsManagement: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(reviewsData);
  const [responses, setResponses] = useState<{ [key: string]: string }>({});

  const handleResponseChange = (id: string, response: string) => {
    setResponses((prev) => ({ ...prev, [id]: response }));
  };

  const submitResponse = (id: string) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === id ? { ...review, response: responses[id] } : review
      )
    );
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 text-center">Reviews & Ratings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <Card key={review.id} className="bg-white shadow-md rounded-lg p-4">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">{review.customer}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`w-5 h-5 ${index < review.rating ? "text-yellow-500" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-3">&quot;{review.comment}&quot;</p>
              {review.response ? (
                <p className="text-green-600 font-medium">Response: {review.response}</p>
              ) : (
                <div className="mt-3">
                  <textarea
                    className="w-full border rounded-md p-2 text-sm"
                    placeholder="Write a response..."
                    value={responses[review.id] || ""}
                    onChange={(e) => handleResponseChange(review.id, e.target.value)}
                  />
                  <Button
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 mt-2 flex items-center"
                    onClick={() => submitResponse(review.id)}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" /> Respond
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ChefReviewsManagement;