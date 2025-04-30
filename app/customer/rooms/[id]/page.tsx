import { RoomDetails } from "@/components/customer/room-details"
import { BookingForm } from "@/components/customer/booking-form"
import { notFound } from "next/navigation"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function generateStaticParams() {
  const client = await clientPromise
  const db = client.db("hotel-management")
  const rooms = await db.collection("rooms").find({}).toArray()

  return rooms.map((room) => ({
    id: room._id.toString(),
  }))
}

async function getRoomById(id: string) {
  try {
    const client = await clientPromise
    const db = client.db("hotel-management")

    const room = await db.collection("rooms").findOne({ _id: new ObjectId(id) })

    if (!room) {
      return null
    }

    return {
      ...room,
      _id: room._id.toString(),
    }
  } catch (error) {
    console.error("Error fetching room:", error)
    return null
  }
}

export default async function RoomPage({ params }: { params: { id: string } }) {
  const room = await getRoomById(params.id)

  if (!room) {
    notFound()
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RoomDetails room={room} />
        </div>
        <div>
          <BookingForm room={room} />
        </div>
      </div>
    </div>
  )
}
