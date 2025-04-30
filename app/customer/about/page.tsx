import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-lavender-900 mb-8">About Lavender Luxury</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-semibold text-lavender-800 mb-4">Our Story</h2>
          <p className="text-gray-700 mb-4">
            Lavender Luxury Hotel was established in 2010 with a vision to provide exceptional hospitality experiences
            in the heart of the city. What started as a boutique hotel has now grown into a renowned luxury destination
            for travelers from around the world.
          </p>
          <p className="text-gray-700 mb-4">
            Our commitment to personalized service, attention to detail, and creating memorable experiences has earned
            us numerous accolades and the loyalty of our guests who return year after year.
          </p>
          <p className="text-gray-700">
            Today, Lavender Luxury stands as a symbol of elegance, comfort, and world-class hospitality, continuing our
            tradition of excellence while embracing modern innovations to enhance the guest experience.
          </p>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image
            src="/placeholder.svg?height=800&width=600"
            alt="Lavender Luxury Hotel"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-semibold text-lavender-800 mb-6 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-lavender-50 p-6 rounded-lg">
            <h3 className="text-xl font-medium text-lavender-700 mb-3">Excellence</h3>
            <p className="text-gray-700">
              We strive for excellence in every aspect of our service, from the moment you book until the end of your
              stay.
            </p>
          </div>
          <div className="bg-lavender-50 p-6 rounded-lg">
            <h3 className="text-xl font-medium text-lavender-700 mb-3">Personalization</h3>
            <p className="text-gray-700">
              We believe in creating personalized experiences that cater to the unique preferences of each guest.
            </p>
          </div>
          <div className="bg-lavender-50 p-6 rounded-lg">
            <h3 className="text-xl font-medium text-lavender-700 mb-3">Sustainability</h3>
            <p className="text-gray-700">
              We are committed to sustainable practices that minimize our environmental impact while maximizing comfort.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-semibold text-lavender-800 mb-4">Experience Lavender Luxury</h2>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          We invite you to experience the perfect blend of luxury, comfort, and personalized service that defines
          Lavender Luxury Hotel. Book your stay today and discover why our guests keep coming back.
        </p>
        <Button asChild className="bg-lavender-600 hover:bg-lavender-700">
          <Link href="/rooms">View Our Rooms</Link>
        </Button>
      </div>
    </div>
  )
}
