"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wifi, Coffee, Tv, Bath } from "lucide-react"

interface Room {
  _id: string
  number: string
  type: string
  floor: string
  status: string
  price: string
  amenities: string[]
}

export function RoomsList() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    type: "all",
    status: "Available",
  })

  useEffect(() => {
    async function fetchRooms() {
      try {
        const response = await fetch("/api/rooms")
        if (!response.ok) {
          throw new Error("Failed to fetch rooms")
        }
        const data = await response.json()
        setRooms(data.rooms)
      } catch (error) {
        console.error("Error fetching rooms:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRooms()
  }, [])

  const filteredRooms = rooms.filter((room) => {
    if (filters.type !== "all" && room.type !== filters.type) return false
    if (filters.status !== "all" && room.status !== filters.status) return false
    return true
  })

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wi-fi":
        return <Wifi className="h-4 w-4" />
      case "tv":
        return <Tv className="h-4 w-4" />
      case "ac":
        return <Bath className="h-4 w-4" />
      default:
        return <Coffee className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="border-lavender-200 dark:border-gray-700 animate-pulse">
            <div className="h-64 bg-lavender-100 dark:bg-gray-700 rounded-t-lg"></div>
            <CardContent className="p-6">
              <div className="h-6 bg-lavender-100 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-lavender-100 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-lavender-100 dark:bg-gray-700 rounded w-full mb-4"></div>
              <div className="h-10 bg-lavender-100 dark:bg-gray-700 rounded mt-6"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="mt-8">
      {filteredRooms.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-lavender-900 dark:text-lavender-100 mb-2">No rooms found</h3>
          <p className="text-gray-600 dark:text-gray-400">Try changing your filters to see more results.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => (
            <Card key={room._id} className="border-lavender-200 dark:border-gray-700 overflow-hidden">
              <div className="relative h-64">
                <Image
                  src={`/placeholder.svg?height=600&width=800&text=${room.type}`}
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
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-lavender-900 dark:text-lavender-100">{room.type} Room</h3>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Room {room.number}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {room.floor} Floor • {room.amenities.length} Amenities
                </p>

                <div className="flex items-center gap-4 mb-6">
                  {room.amenities.slice(0, 3).map((amenity, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      {getAmenityIcon(amenity)}
                      <span className="ml-1">{amenity}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-lavender-600 dark:text-lavender-300 font-semibold">
                    {room.price} <span className="text-sm font-normal">/ night</span>
                  </div>
                  <Button
                    asChild
                    className="bg-lavender-600 hover:bg-lavender-700"
                    disabled={room.status !== "Available"}
                  >
                    <Link href={room.status === "Available" ? `/rooms/${room._id}` : "#"}>
                      {room.status === "Available" ? "Book Now" : "Not Available"}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
