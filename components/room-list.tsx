"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Edit, Trash2 } from "lucide-react"

interface Room {
  _id: string
  number: string
  type: string
  floor: string
  status: string
  price: string
}

export function RoomList() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRooms() {
      try {
        const response = await fetch("/api/rooms")

        if (!response.ok) {
          throw new Error("Failed to fetch rooms")
        }

        const data = await response.json()
        setRooms(data.rooms)
      } catch (err) {
        setError("Error loading rooms. Please try again.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchRooms()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "Occupied":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      case "Cleaning":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "Maintenance":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  if (loading) {
    return <div className="flex justify-center p-8">Loading rooms...</div>
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>
  }

  return (
    <Card className="border-lavender-200">
      <Table>
        <TableHeader>
          <TableRow className="bg-lavender-50">
            <TableHead>Room No.</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Floor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Price/Night</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rooms.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8">
                No rooms found. Add your first room to get started.
              </TableCell>
            </TableRow>
          ) : (
            rooms.map((room) => (
              <TableRow key={room._id}>
                <TableCell className="font-medium">{room.number}</TableCell>
                <TableCell>{room.type}</TableCell>
                <TableCell>{room.floor}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(room.status)}>
                    {room.status}
                  </Badge>
                </TableCell>
                <TableCell>{room.price}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4 text-lavender-600" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  )
}
