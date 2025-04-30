import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <div className="relative bg-lavender-900 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url('/placeholder.svg?height=1080&width=1920')" }}
      ></div>

      <div className="container mx-auto px-4 py-24 md:py-36 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Experience Luxury and Comfort at Lavender Luxury Hotel
          </h1>
          <p className="text-xl mb-8">
            Discover the perfect blend of elegance, comfort, and exceptional service in the heart of the city.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-lavender-600 hover:bg-lavender-700">
              <Link href="/booking">Book Your Stay</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="/rooms">Explore Rooms</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
