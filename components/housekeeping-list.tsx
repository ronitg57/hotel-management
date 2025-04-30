import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, Clock } from "lucide-react"

export function HousekeepingList() {
  // This would be replaced with actual data from your MongoDB database
  const requests = [
    {
      id: 1,
      room: "102",
      time: "Morning (8AM - 12PM)",
      services: ["Room Cleaning", "Fresh Towels"],
      status: "Pending",
      requested: "10:15 AM",
    },
    {
      id: 2,
      room: "215",
      time: "Afternoon (12PM - 4PM)",
      services: ["Bedding Change", "Restock Amenities"],
      status: "In Progress",
      requested: "11:30 AM",
    },
    {
      id: 3,
      room: "304",
      time: "Evening (4PM - 8PM)",
      services: ["Room Cleaning"],
      status: "Completed",
      requested: "09:45 AM",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "In Progress":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "Completed":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  return (
    <Card className="border-lavender-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-lavender-900">Active Requests</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {requests.map((request) => (
          <div key={request.id} className="p-4 border border-lavender-100 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium text-lavender-900">Room {request.room}</h3>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-3 w-3 mr-1" />
                  {request.requested}
                </div>
              </div>
              <Badge variant="outline" className={getStatusColor(request.status)}>
                {request.status}
              </Badge>
            </div>

            <div className="mb-3">
              <p className="text-sm font-medium text-gray-700">Preferred Time: {request.time}</p>
              <div className="mt-1">
                <p className="text-sm font-medium text-gray-700">Services:</p>
                <ul className="mt-1 space-y-1">
                  {request.services.map((service, index) => (
                    <li key={index} className="text-sm text-gray-700">
                      • {service}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {(request.status === "Pending" || request.status === "In Progress") && (
              <div className="flex justify-end">
                <Button size="sm" className="bg-lavender-600 hover:bg-lavender-700">
                  <Check className="h-4 w-4 mr-1" />
                  {request.status === "Pending" ? "Start Service" : "Mark Complete"}
                </Button>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
