import { RoomsList } from "@/components/customer/rooms-list"
import { RoomsFilter } from "@/components/customer/rooms-filter"

export default function RoomsPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-lavender-900 mb-8">Our Rooms</h1>
      <RoomsFilter />
      <RoomsList />
    </div>
  )
}
