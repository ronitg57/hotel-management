"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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

export function RoomShowcase() {
  const [roomTypes, setRoomTypes] = useState<Record<string, Room[]>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRooms() {
      try {
        const response = await fetch("/api/rooms")
        if (!response.ok) {
          throw new Error("Failed to fetch rooms")
        }
        const data = await response.json()

        // Group rooms by type and only get available rooms
        const availableRooms = data.rooms.filter((room: Room) => room.status === "Available")
        const groupedRooms = availableRooms.reduce((acc: Record<string, Room[]>, room: Room) => {
          if (!acc[room.type]) {
            acc[room.type] = []
          }
          acc[room.type].push(room)
          return acc
        }, {})

        setRoomTypes(groupedRooms)
      } catch (error) {
        console.error("Error fetching rooms:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRooms()
  }, [])

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
      <div className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-lavender-900 dark:text-lavender-100 mb-4">Our Rooms</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Loading room information...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
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
        </div>
      </div>
    )
  }

  // Get one room from each type to display
  const featuredRooms = Object.entries(roomTypes)
    .map(([type, rooms]) => rooms[0])
    .slice(0, 3)

  return (
    <div className="bg-gray-50 dark:bg-gray-800 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-lavender-900 dark:text-lavender-100 mb-4">Our Rooms</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Choose from our selection of luxurious rooms and suites designed for your comfort and relaxation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRooms.map((room) => (
            <Card key={room._id} className="border-lavender-200 dark:border-gray-700 overflow-hidden">
              <div className="relative h-64">
                <Image
                  src={`/placeholder.svg?height=600&width=800&text=${room.type}`}
                  alt={`${room.type} Room`}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-lavender-900 dark:text-lavender-100 mb-2">
                  {room.type} Room
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Experience luxury and comfort in our spacious {room.type.toLowerCase()} room with modern amenities.
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
                  <Button asChild className="bg-lavender-600 hover:bg-lavender-700">
                    <Link href={`/rooms/${room._id}`}>View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" className="border-lavender-600 text-lavender-600">
            <Link href="/rooms">View All Rooms</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
