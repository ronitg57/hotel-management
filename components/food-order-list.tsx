import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"

export function FoodOrderList() {
  // This would be replaced with actual data from your MongoDB database
  const orders = [
    {
      id: 1,
      room: "201",
      items: ["Continental Breakfast", "Orange Juice"],
      time: "08:15 AM",
      status: "Pending",
      total: "₹190",
    },
    {
      id: 2,
      room: "305",
      items: ["Club Sandwich", "French Fries", "Coke"],
      time: "12:30 PM",
      status: "Preparing",
      total: "₹220",
    },
    {
      id: 3,
      room: "402",
      items: ["Filet Mignon", "Red Wine"],
      time: "07:45 PM",
      status: "Delivered",
      total: "₹450",
    },
    {
      id: 4,
      room: "103",
      items: ["Ice Cream", "Chocolate Cake"],
      time: "09:20 PM",
      status: "Completed",
      total: "₹140",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "Preparing":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "Delivered":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "Completed":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  return (
    <Card className="border-lavender-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-lavender-900">Active Orders</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="p-4 border border-lavender-100 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium text-lavender-900">Room {order.room}</h3>
                <p className="text-sm text-gray-600">{order.time}</p>
              </div>
              <Badge variant="outline" className={getStatusColor(order.status)}>
                {order.status}
              </Badge>
            </div>

            <ul className="mb-3 space-y-1">
              {order.items.map((item, index) => (
                <li key={index} className="text-sm text-gray-700">
                  • {item}
                </li>
              ))}
            </ul>

            <div className="flex justify-between items-center">
              <p className="font-semibold text-lavender-900">Total: {order.total}</p>

              {(order.status === "Pending" || order.status === "Preparing") && (
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="h-8 border-green-500 text-green-600 hover:bg-green-50">
                    <Check className="h-4 w-4 mr-1" />
                    {order.status === "Pending" ? "Accept" : "Delivered"}
                  </Button>

                  {order.status === "Pending" && (
                    <Button size="sm" variant="outline" className="h-8 border-red-500 text-red-600 hover:bg-red-50">
                      <X className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
