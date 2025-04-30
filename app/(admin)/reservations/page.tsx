import { ReservationList } from "@/components/reservation-list"
import { ReservationFilters } from "@/components/reservation-filters"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export default function ReservationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-lavender-900">Reservation Management</h1>
        <Button className="bg-lavender-600 hover:bg-lavender-700">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Reservation
        </Button>
      </div>

      <ReservationFilters />
      <ReservationList />
    </div>
  )
}
