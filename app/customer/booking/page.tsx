"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useRouter } from "next/navigation"

export default function BookingPage() {
  const router = useRouter()
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    roomType: "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // Redirect to confirmation page
      router.push("/booking/confirmation")
    }, 1500)
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-lavender-900 mb-2">Book Your Stay</h1>
      <p className="text-gray-600 mb-8">Fill out the form below to make a reservation at Lavender Luxury Hotel</p>

      <Card className="border-lavender-200 max-w-4xl mx-auto">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formState.firstName}
                  onChange={handleChange}
                  required
                  className="border-lavender-200"
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
                  className="border-lavender-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="border-lavender-200"
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
                  className="border-lavender-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="roomType">Room Type</Label>
                <Select value={formState.roomType} onValueChange={(value) => handleSelectChange("roomType", value)}>
                  <SelectTrigger id="roomType" className="border-lavender-200">
                    <SelectValue placeholder="Select room type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard Room (₹3,500/night)</SelectItem>
                    <SelectItem value="deluxe">Deluxe Room (₹5,500/night)</SelectItem>
                    <SelectItem value="suite">Suite (₹8,500/night)</SelectItem>
                    <SelectItem value="executive">Executive Suite (₹12,500/night)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="adults">Adults</Label>
                  <Select value={formState.adults} onValueChange={(value) => handleSelectChange("adults", value)}>
                    <SelectTrigger id="adults" className="border-lavender-200">
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
                    <SelectTrigger id="children" className="border-lavender-200">
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Check-in Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal border-lavender-200"
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
                      className="w-full justify-start text-left font-normal border-lavender-200"
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialRequests">Special Requests</Label>
              <Textarea
                id="specialRequests"
                name="specialRequests"
                value={formState.specialRequests}
                onChange={handleChange}
                className="border-lavender-200 min-h-[100px]"
                placeholder="Let us know if you have any special requests or requirements"
              />
            </div>

            <Button
              type="submit"
              className="bg-lavender-600 hover:bg-lavender-700 w-full"
              disabled={isSubmitting || !formState.roomType || !formState.checkIn || !formState.checkOut}
            >
              {isSubmitting ? "Processing..." : "Book Now"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
