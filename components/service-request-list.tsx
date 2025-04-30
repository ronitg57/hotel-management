import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, Clock, AlertTriangle } from "lucide-react"

export function ServiceRequestList() {
  // This would be replaced with actual data from your MongoDB database
  const requests = [
    {
      id: 1,
      room: "305",
      type: "Taxi / Transportation",
      details: "Need a taxi to the airport at 10:00 AM tomorrow",
      time: "10:00 AM, Apr 25, 2023",
      status: "Pending",
      priority: "Normal",
      requested: "04:30 PM",
    },
    {
      id: 2,
      room: "210",
      type: "Laundry Service",
      details: "Suit needs to be dry cleaned for tomorrow evening",
      time: "06:00 PM, Apr 24, 2023",
      status: "In Progress",
      priority: "Urgent",
      requested: "02:15 PM",
    },
    {
      id: 3,
      room: "118",
      type: "Maintenance",
      details: "Air conditioning not working properly",
      time: "ASAP",
      status: "Completed",
      priority: "Urgent",
      requested: "11:45 AM",
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Urgent":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      case "Normal":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
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
              <div className="flex gap-2">
                <Badge variant="outline" className={getPriorityColor(request.priority)}>
                  {request.priority === "Urgent" && <AlertTriangle className="h-3 w-3 mr-1" />}
                  {request.priority}
                </Badge>
                <Badge variant="outline" className={getStatusColor(request.status)}>
                  {request.status}
                </Badge>
              </div>
            </div>

            <div className="mb-3">
              <p className="text-sm font-medium text-gray-700">Service: {request.type}</p>
              <p className="text-sm text-gray-700 mt-1">{request.details}</p>
              <p className="text-sm font-medium text-gray-700 mt-2">Scheduled: {request.time}</p>
            </div>

            {(request.status === "Pending" || request.status === "In Progress") && (
              <div className="flex justify-end">
                <Button size="sm" className="bg-lavender-600 hover:bg-lavender-700">
                  <Check className="h-4 w-4 mr-1" />
                  {request.status === "Pending" ? "Accept Request" : "Mark Complete"}
                </Button>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
