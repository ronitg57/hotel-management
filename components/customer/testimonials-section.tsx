import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Priya Sharma",
      avatar: "PS",
      role: "Business Traveler",
      content:
        "The service at Lavender Luxury Hotel exceeded all my expectations. The staff was incredibly attentive and the room was immaculate. I'll definitely be returning on my next business trip.",
      rating: 5,
    },
    {
      name: "Raj Patel",
      avatar: "RP",
      role: "Family Vacation",
      content:
        "We had a wonderful family stay at this hotel. The rooms were spacious, the amenities were excellent, and the location was perfect for exploring the city. Highly recommended!",
      rating: 5,
    },
    {
      name: "Ananya Gupta",
      avatar: "AG",
      role: "Couple's Retreat",
      content:
        "My partner and I had a romantic weekend at Lavender Luxury, and it was absolutely perfect. The spa services were exceptional, and the restaurant offered delicious cuisine.",
      rating: 4,
    },
  ]

  return (
    <div className="bg-white dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-lavender-900 dark:text-lavender-100 mb-4">What Our Guests Say</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what guests have to say about their experience at Lavender Luxury
            Hotel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-lavender-200 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3 border border-lavender-200 dark:border-gray-700">
                      <AvatarImage src="/placeholder.svg" alt={testimonial.name} />
                      <AvatarFallback className="bg-lavender-100 text-lavender-800 dark:bg-lavender-900 dark:text-lavender-200">
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-lavender-900 dark:text-lavender-100">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
