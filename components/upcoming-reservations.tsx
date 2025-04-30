"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User } from "lucide-react"
import type { Reservation } from "@/models"

export function UpcomingReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchReservations() {
      try {
        const response = await fetch("/api/upcoming-reservations")
        if (!response.ok) {
          throw new Error("Failed to fetch reservations")
        }
        const data = await response.json()
        setReservations(data.reservations)
      } catch (error) {
        console.error("Error fetching reservations:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchReservations()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const getPaymentColor = (payment: string) => {
    switch (payment) {
      case "Paid":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Partial":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Unpaid":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  if (loading) {
    return (
      <Card className="dashboard-card">
        <CardHeader className="pb-3">
          <CardTitle>Upcoming Reservations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-4 border border-lavender-100 dark:border-gray-800 rounded-lg animate-pulse">
              <div className="flex justify-between items-start mb-3">
                <div className="h-5 w-32 bg-lavender-50 dark:bg-gray-800 rounded"></div>
                <div className="h-5 w-20 bg-lavender-50 dark:bg-gray-800 rounded"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-3/4 bg-lavender-50 dark:bg-gray-800 rounded"></div>
                <div className="h-4 w-1/2 bg-lavender-50 dark:bg-gray-800 rounded"></div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-3">
        <CardTitle>Upcoming Reservations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {reservations.length === 0 ? (
          <div className="text-center py-8 text-lavender-600 dark:text-lavender-400">
            No upcoming reservations found
          </div>
        ) : (
          reservations.map((reservation) => (
            <div
              key={reservation._id}
              className="p-4 border border-lavender-100 dark:border-gray-800 rounded-lg hover:bg-lavender-50 dark:hover:bg-gray-900 transition-colors"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-lavender-600 dark:text-lavender-400" />
                  <span className="font-medium text-lavender-900 dark:text-lavender-100">{reservation.guest}</span>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className={getStatusColor(reservation.status)}>
                    {reservation.status}
                  </Badge>
                  <Badge variant="outline" className={getPaymentColor(reservation.payment)}>
                    {reservation.payment}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-lavender-600 dark:text-lavender-400" />
                  <span className="text-sm text-lavender-800 dark:text-lavender-200">
                    Check In:{" "}
                    {typeof reservation.checkIn === "string"
                      ? reservation.checkIn
                      : new Date(reservation.checkIn).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-lavender-600 dark:text-lavender-400" />
                  <span className="text-sm text-lavender-800 dark:text-lavender-200">
                    Check Out:{" "}
                    {typeof reservation.checkOut === "string"
                      ? reservation.checkOut
                      : new Date(reservation.checkOut).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-4 w-4 text-lavender-600 dark:text-lavender-400" />
                <span className="text-sm text-lavender-800 dark:text-lavender-200">
                  Room: {reservation.roomNumber || ""} - {reservation.roomType}
                </span>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 border-lavender-300 text-lavender-700 dark:border-lavender-700 dark:text-lavender-300"
                >
                  Details
                </Button>
                <Button size="sm" className="h-8 bg-lavender-600 hover:bg-lavender-700 text-white">
                  Check In
                </Button>
              </div>
            </div>
          ))
        )}

        <Button
          variant="outline"
          className="w-full border-lavender-300 text-lavender-700 dark:border-lavender-700 dark:text-lavender-300"
        >
          View All Reservations
        </Button>
      </CardContent>
    </Card>
  )
}
