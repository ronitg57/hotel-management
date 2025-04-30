import { NextResponse } from "next/server"
import { findAll, countDocuments } from "@/lib/db-service"

export async function GET() {
  try {
    const roomTypes = await findAll("roomTypes")

    // Get actual counts for each room type
    for (const roomType of roomTypes) {
      const total = await countDocuments("rooms", { type: roomType.type })
      const occupied = await countDocuments("rooms", { type: roomType.type, status: "Occupied" })

      roomType.total = total
      roomType.occupied = occupied
    }

    return NextResponse.json({ roomTypes }, { status: 200 })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch room occupancy data" }, { status: 500 })
  }
}
