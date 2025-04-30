"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useRouter } from "next/navigation"

interface BookingFormProps {
  room: {
    _id: string
    number: string
    type: string
    price: string
  }
}

export function BookingForm({ room }: BookingFormProps) {
  const router = useRouter()
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    adults: "2",
    children: "0",
    checkIn: null as Date | null,
    checkOut: null as Date | null,
    specialRequests: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormState({
      ...formState,
      [name]: value,
    })
  }

  const handleDateChange = (name: "checkIn" | "checkOut", date: Date | null) => {
    setFormState({
      ...formState,
      [name]: date,
    })
  }

  const calculateTotalPrice = () => {
    if (!formState.checkIn || !formState.checkOut) return "0"

    const checkIn = new Date(formState.checkIn)
    const checkOut = new Date(formState.checkOut)
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))

    const pricePerNight = Number.parseInt(room.price.replace(/[^\d]/g, ""))
    const totalPrice = pricePerNight * nights

    return `₹${totalPrice.toLocaleString()}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Store a flag in session storage to indicate we're coming from a valid booking
    sessionStorage.setItem("hasBookingData", "true")

    // Simulate API call
    setTimeout(() => {
      // Redirect to confirmation page
      router.push("/booking/confirmation")
    }, 1500)
  }

  return (
    <Card className="border-lavender-200 dark:border-gray-700 sticky top-6">
      <CardHeader className="bg-lavender-50 dark:bg-gray-800 border-b border-lavender-100 dark:border-gray-700">
        <CardTitle className="text-lg font-semibold text-lavender-900 dark:text-lavender-100">Book This Room</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formState.firstName}
                onChange={handleChange}
                required
                className="border-lavender-200 dark:border-gray-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formState.lastName}
                onChange={handleChange}
                required
                className="border-lavender-200 dark:border-gray-700"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
              required
              className="border-lavender-200 dark:border-gray-700"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              value={formState.phone}
              onChange={handleChange}
              required
              className="border-lavender-200 dark:border-gray-700"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="adults">Adults</Label>
              <Select value={formState.adults} onValueChange={(value) => handleSelectChange("adults", value)}>
                <SelectTrigger id="adults" className="border-lavender-200 dark:border-gray-700">
                  <SelectValue placeholder="Adults" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="children">Children</Label>
              <Select value={formState.children} onValueChange={(value) => handleSelectChange("children", value)}>
                <SelectTrigger id="children" className="border-lavender-200 dark:border-gray-700">
                  <SelectValue placeholder="Children" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0</SelectItem>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Check-in Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal border-lavender-200 dark:border-gray-700"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formState.checkIn ? format(formState.checkIn, "PPP") : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formState.checkIn}
                  onSelect={(date) => handleDateChange("checkIn", date)}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>Check-out Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal border-lavender-200 dark:border-gray-700"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formState.checkOut ? format(formState.checkOut, "PPP") : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formState.checkOut}
                  onSelect={(date) => handleDateChange("checkOut", date)}
                  initialFocus
                  disabled={(date) => !formState.checkIn || date <= formState.checkIn}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialRequests">Special Requests</Label>
            <Textarea
              id="specialRequests"
              name="specialRequests"
              value={formState.specialRequests}
              onChange={handleChange}
              className="border-lavender-200 dark:border-gray-700 min-h-[80px]"
              placeholder="Let us know if you have any special requests"
            />
          </div>

          {formState.checkIn && formState.checkOut && (
            <div className="bg-lavender-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700 dark:text-gray-300">Room Type:</span>
                <span className="font-medium text-lavender-900 dark:text-lavender-100">{room.type}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700 dark:text-gray-300">Room Number:</span>
                <span className="font-medium text-lavender-900 dark:text-lavender-100">{room.number}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700 dark:text-gray-300">Price per night:</span>
                <span className="font-medium text-lavender-900 dark:text-lavender-100">{room.price}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-lavender-200 dark:border-gray-700">
                <span className="font-medium text-lavender-900 dark:text-lavender-100">Total:</span>
                <span className="font-bold text-lavender-600 dark:text-lavender-300">{calculateTotalPrice()}</span>
              </div>
            </div>
          )}

          <Button
            type="submit"
            className="bg-lavender-600 hover:bg-lavender-700 w-full"
            disabled={isSubmitting || !formState.checkIn || !formState.checkOut}
          >
            {isSubmitting ? "Processing..." : "Book Now"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
