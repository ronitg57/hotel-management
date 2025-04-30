import { DashboardStats } from "@/components/dashboard-stats"
import { RecentActivities } from "@/components/recent-activities"
import { QuickActions } from "@/components/quick-actions"
import { RoomOccupancy } from "@/components/room-occupancy"
import { RevenueChart } from "@/components/revenue-chart"
import { UpcomingReservations } from "@/components/upcoming-reservations"
import { Button } from "@/components/ui/button"
import { PlusCircle, RefreshCw } from "lucide-react"

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold text-lavender-900 dark:text-lavender-100">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="h-9 gap-1 border-lavender-300 text-lavender-700 dark:border-lavender-700 dark:text-lavender-300"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </Button>
          <Button className="h-9 gap-1 bg-lavender-600 hover:bg-lavender-700 text-white">
            <PlusCircle className="h-4 w-4" />
            <span>New Reservation</span>
          </Button>
        </div>
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RevenueChart />
        <RoomOccupancy />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <UpcomingReservations />
        <RecentActivities />
      </div>

      <QuickActions />
    </div>
  )
}
