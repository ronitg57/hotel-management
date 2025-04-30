import { Hotel, Calendar, Utensils, Brush, Car, CreditCard } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function QuickActions() {
  const actions = [
    {
      title: "New Reservation",
      icon: Calendar,
      color: "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300",
      path: "/reservations",
    },
    {
      title: "Check In Guest",
      icon: Hotel,
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
      path: "/rooms",
    },
    {
      title: "Food Order",
      icon: Utensils,
      color: "bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300",
      path: "/services/food",
    },
    {
      title: "Housekeeping",
      icon: Brush,
      color: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300",
      path: "/services/housekeeping",
    },
    {
      title: "Service Request",
      icon: Car,
      color: "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300",
      path: "/services/requests",
    },
    {
      title: "Create Invoice",
      icon: CreditCard,
      color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300",
      path: "/billing",
    },
  ]

  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-3">
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {actions.map((action) => (
            <Link key={action.title} href={action.path}>
              <Button
                variant="outline"
                className="h-auto w-full flex flex-col items-center justify-center p-6 gap-3 border-lavender-200 dark:border-gray-800 hover:bg-lavender-50 dark:hover:bg-gray-900 hover:border-lavender-300 dark:hover:border-gray-700"
              >
                <div className={`p-3 rounded-full ${action.color}`}>
                  <action.icon className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium text-center text-lavender-900 dark:text-lavender-100">
                  {action.title}
                </span>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
