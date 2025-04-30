"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { submitHousekeepingRequest } from "@/actions/housekeeping-actions"
import { useToast } from "@/hooks/use-toast"

export function HousekeepingForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)

    try {
      const result = await submitHousekeepingRequest(formData)

      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
          variant: "default",
        })

        // Reset the form
        const form = document.getElementById("housekeeping-form") as HTMLFormElement
        form.reset()
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="border-lavender-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-lavender-900">Request Housekeeping</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="housekeeping-form" action={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="room">Room Number</Label>
              <Input id="room" name="room" placeholder="Enter room number" className="border-lavender-200" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Preferred Time</Label>
              <Select name="time">
                <SelectTrigger id="time" className="border-lavender-200">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning (8AM - 12PM)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (12PM - 4PM)</SelectItem>
                  <SelectItem value="evening">Evening (4PM - 8PM)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Services Needed</Label>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="cleaning" name="services" value="Room Cleaning" />
                <Label htmlFor="cleaning" className="font-normal">
                  Room Cleaning
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="towels" name="services" value="Fresh Towels" />
                <Label htmlFor="towels" className="font-normal">
                  Fresh Towels
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="bedding" name="services" value="Bedding Change" />
                <Label htmlFor="bedding" className="font-normal">
                  Bedding Change
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="amenities" name="services" value="Restock Amenities" />
                <Label htmlFor="amenities" className="font-normal">
                  Restock Amenities
                </Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Special Instructions</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Any special requests or instructions..."
              className="border-lavender-200 min-h-[100px]"
            />
          </div>

          <Button type="submit" className="w-full bg-lavender-600 hover:bg-lavender-700" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
