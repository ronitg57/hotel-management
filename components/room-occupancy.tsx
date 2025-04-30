"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface RoomType {
  _id?: string
  type: string
  total: number
  occupied: number
  color: string
}

export function RoomOccupancy() {
  const { theme } = useTheme()
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([])
  const [loading, setLoading] = useState(true)
  const [totalRooms, setTotalRooms] = useState(0)
  const [totalOccupied, setTotalOccupied] = useState(0)

  useEffect(() => {
    async function fetchRoomOccupancy() {
      try {
        const response = await fetch("/api/room-occupancy")
        if (!response.ok) {
          throw new Error("Failed to fetch room occupancy")
        }
        const data = await response.json()

        // Add colors based on theme
        const roomTypesWithColors = data.roomTypes.map((room: RoomType, index: number) => {
          const colors = [
            { light: "#8A4FD1", dark: "#9370DB" },
            { light: "#7B2CBF", dark: "#BA83CA" },
            { light: "#6A0DAD", dark: "#C9A0DC" },
            { light: "#4B0082", dark: "#D8BFD8" },
          ]
          return {
            ...room,
            color: theme === "dark" ? colors[index % colors.length].dark : colors[index % colors.length].light,
          }
        })

        setRoomTypes(roomTypesWithColors)

        // Calculate totals
        const total = roomTypesWithColors.reduce((sum, room) => sum + room.total, 0)
        const occupied = roomTypesWithColors.reduce((sum, room) => sum + room.occupied, 0)
        setTotalRooms(total)
        setTotalOccupied(occupied)
      } catch (error) {
        console.error("Error fetching room occupancy:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRoomOccupancy()
  }, [theme])

  if (loading) {
    return (
      <Card className="dashboard-card">
        <CardHeader className="pb-3">
          <CardTitle>Room Occupancy</CardTitle>
          <CardDescription>Current room status by type</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="h-4 w-24 bg-lavender-50 dark:bg-gray-800 rounded animate-pulse"></div>
                <div className="h-4 w-16 bg-lavender-50 dark:bg-gray-800 rounded animate-pulse"></div>
              </div>
              <div className="h-2 bg-lavender-50 dark:bg-gray-800 rounded animate-pulse"></div>
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-3">
        <CardTitle>Room Occupancy</CardTitle>
        <CardDescription>Current room status by type</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {roomTypes.map((room) => {
          const percentage = Math.round((room.occupied / room.total) * 100) || 0

          return (
            <div key={room._id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: room.color }}></div>
                  <span className="text-sm font-medium text-lavender-900 dark:text-lavender-100">{room.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-lavender-900 dark:text-lavender-100">
                    {room.occupied}/{room.total}
                  </span>
                  <span className="text-xs text-lavender-600 dark:text-lavender-300">({percentage}%)</span>
                </div>
              </div>
              <Progress
                value={percentage}
                className="h-2"
                indicatorClassName="bg-gradient-to-r from-lavender-400 to-lavender-600"
              />
            </div>
          )
        })}

        <div className="pt-4 mt-4 border-t border-lavender-100 dark:border-gray-800">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-lavender-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-2xl font-bold text-lavender-900 dark:text-lavender-100">
                {totalOccupied}/{totalRooms}
              </div>
              <div className="text-sm text-lavender-600 dark:text-lavender-300">Total Rooms Occupied</div>
            </div>
            <div className="bg-lavender-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-2xl font-bold text-lavender-900 dark:text-lavender-100">
                {totalRooms > 0 ? Math.round((totalOccupied / totalRooms) * 100) : 0}%
              </div>
              <div className="text-sm text-lavender-600 dark:text-lavender-300">Overall Occupancy</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
