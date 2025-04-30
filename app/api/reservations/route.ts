import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("hotel-management")

    const reservations = await db.collection("reservations").find({}).toArray()

    return NextResponse.json({ reservations }, { status: 200 })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch reservations" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise
    const db = client.db("hotel-management")

    const data = await request.json()

    // Validate the data here
    if (!data.guest || !data.roomType || !data.checkIn || !data.checkOut) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const result = await db.collection("reservations").insertOne({
      guest: data.guest,
      roomType: data.roomType,
      checkIn: new Date(data.checkIn),
      checkOut: new Date(data.checkOut),
      status: data.status || "Pending",
      payment: data.payment || "Unpaid",
      specialRequests: data.specialRequests || "",
      createdAt: new Date(),
    })

    return NextResponse.json(
      {
        message: "Reservation created successfully",
        reservationId: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to create reservation" }, { status: 500 })
  }
}
