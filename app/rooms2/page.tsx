import { RoomList } from "@/components/room-list"
import { RoomFilters } from "@/components/room-filters"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export default function RoomsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-lavender-900">Room Management</h1>
        <Button className="bg-lavender-600 hover:bg-lavender-700">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Room
        </Button>
      </div>

      <RoomFilters />
      <RoomList />
    </div>
  )
}
