import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function ServiceRequestForm() {
  return (
    <Card className="border-lavender-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-lavender-900">Request Service</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="room">Room Number</Label>
              <Input id="room" placeholder="Enter room number" className="border-lavender-200" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="service-type">Service Type</Label>
              <Select>
                <SelectTrigger id="service-type" className="border-lavender-200">
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="taxi">Taxi / Transportation</SelectItem>
                  <SelectItem value="laundry">Laundry Service</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="concierge">Concierge Assistance</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Preferred Time</Label>
            <div className="grid grid-cols-2 gap-4">
              <Input type="time" id="time" className="border-lavender-200" />
              <Input type="date" id="date" className="border-lavender-200" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Priority</Label>
            <RadioGroup defaultValue="normal" className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="normal" id="normal" />
                <Label htmlFor="normal" className="font-normal">
                  Normal
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="urgent" id="urgent" />
                <Label htmlFor="urgent" className="font-normal">
                  Urgent
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="details">Service Details</Label>
            <Textarea
              id="details"
              placeholder="Please provide details about your request..."
              className="border-lavender-200 min-h-[100px]"
            />
          </div>

          <Button className="w-full bg-lavender-600 hover:bg-lavender-700">Submit Request</Button>
        </form>
      </CardContent>
    </Card>
  )
}
