import { Wifi, Coffee, Utensils, Dumbbell, Car, Clock } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Wifi,
      title: "Free High-Speed WiFi",
      description: "Stay connected with complimentary high-speed internet access throughout the hotel.",
    },
    {
      icon: Coffee,
      title: "Complimentary Breakfast",
      description: "Start your day with our delicious breakfast buffet included with your stay.",
    },
    {
      icon: Utensils,
      title: "Fine Dining Restaurant",
      description: "Enjoy exquisite cuisine at our in-house restaurant featuring local and international dishes.",
    },
    {
      icon: Dumbbell,
      title: "Fitness Center & Spa",
      description: "Maintain your fitness routine or indulge in relaxing spa treatments during your stay.",
    },
    {
      icon: Car,
      title: "Airport Transfers",
      description: "Convenient airport pickup and drop-off services available for all our guests.",
    },
    {
      icon: Clock,
      title: "24/7 Concierge",
      description: "Our dedicated staff is available around the clock to assist with any requests.",
    },
  ]

  return (
    <div className="bg-white dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-lavender-900 dark:text-lavender-100 mb-4">
            Hotel Features & Amenities
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover the exceptional amenities and services that make your stay at Lavender Luxury Hotel truly
            memorable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-lavender-50 dark:bg-gray-800 p-6 rounded-lg">
              <div className="w-12 h-12 bg-lavender-100 dark:bg-lavender-900 rounded-full flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-lavender-600 dark:text-lavender-300" />
              </div>
              <h3 className="text-xl font-semibold text-lavender-900 dark:text-lavender-100 mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
