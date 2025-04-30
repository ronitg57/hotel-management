import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Wifi, Coffee, Tv, Bath, Check } from "lucide-react"

interface RoomProps {
  room: {
    _id: string
    number: string
    type: string
    floor: string
    status: string
    price: string
    amenities: string[]
  }
}

export function RoomDetails({ room }: RoomProps) {
  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wi-fi":
        return <Wifi className="h-5 w-5" />
      case "tv":
        return <Tv className="h-5 w-5" />
      case "ac":
        return <Bath className="h-5 w-5" />
      default:
        return <Coffee className="h-5 w-5" />
    }
  }

  const roomDescriptions = {
    Standard:
      "Our Standard Room offers a comfortable and cozy space for travelers seeking quality accommodation at a great value. Each room features essential amenities to ensure a pleasant stay.",
    Deluxe:
      "The Deluxe Room provides additional space and enhanced amenities for guests looking for extra comfort. Enjoy the stylish decor and premium furnishings during your stay.",
    Suite:
      "Experience luxury in our spacious Suite, featuring a separate living area and bedroom. Perfect for longer stays or travelers who desire more space and premium amenities.",
    Executive:
      "Our most luxurious accommodation, the Executive Suite offers the ultimate in comfort and style with premium amenities, expansive living spaces, and exceptional views.",
  }

  const roomFeatures = {
    Standard: ["Queen-sized bed", "32-inch flat-screen TV", "Work desk", "Tea/coffee making facilities"],
    Deluxe: ["King-sized bed", "40-inch flat-screen TV", "Sitting area", "Mini refrigerator", "Premium toiletries"],
    Suite: [
      "King-sized bed",
      "Separate living room",
      "50-inch flat-screen TV",
      "Kitchenette",
      "Dining area",
      "Premium toiletries",
    ],
    Executive: [
      "King-sized bed",
      "Spacious living room",
      "55-inch flat-screen TV",
      "Full kitchen",
      "Dining area",
      "Jacuzzi bathtub",
      "Premium toiletries",
    ],
  }

  return (
    <div>
      <div className="relative h-[400px] rounded-lg overflow-hidden mb-8">
        <Image
          src={`/placeholder.svg?height=800&width=1200&text=${room.type}`}
          alt={`${room.type} Room ${room.number}`}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 right-4">
          <Badge
            className={`${
              room.status === "Available"
                ? "bg-green-100 text-green-800 hover:bg-green-100"
                : "bg-red-100 text-red-800 hover:bg-red-100"
            }`}
          >
            {room.status}
          </Badge>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-lavender-900 dark:text-lavender-100">{room.type} Room</h1>
          <div className="text-2xl font-semibold text-lavender-600 dark:text-lavender-300">
            {room.price} <span className="text-sm font-normal">/ night</span>
          </div>
        </div>

        <div className="flex items-center text-gray-600 dark:text-gray-400 mb-6">
          <span>Room {room.number}</span>
          <span className="mx-2">•</span>
          <span>{room.floor} Floor</span>
        </div>

        <p className="text-gray-700 dark:text-gray-300 mb-6">
          {roomDescriptions[room.type as keyof typeof roomDescriptions] || "A comfortable room with modern amenities."}
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-lavender-900 dark:text-lavender-100 mb-4">Room Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(roomFeatures[room.type as keyof typeof roomFeatures] || []).map((feature, index) => (
            <div key={index} className="flex items-center">
              <Check className="h-5 w-5 text-lavender-600 dark:text-lavender-300 mr-2" />
              <span className="text-gray-700 dark:text-gray-300">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-lavender-900 dark:text-lavender-100 mb-4">Amenities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {room.amenities.map((amenity, index) => (
            <div key={index} className="flex items-center">
              <div className="mr-3 text-lavender-600 dark:text-lavender-300">{getAmenityIcon(amenity)}</div>
              <span className="text-gray-700 dark:text-gray-300">{amenity}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
