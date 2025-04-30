import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("hotel-management")

    const rooms = await db.collection("rooms").find({}).toArray()

    return NextResponse.json({ rooms }, { status: 200 })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch rooms" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise
    const db = client.db("hotel-management")

    const data = await request.json()

    // Validate the data here
    if (!data.number || !data.type || !data.price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const result = await db.collection("rooms").insertOne({
      number: data.number,
      type: data.type,
      floor: data.floor,
      status: data.status || "Available",
      price: data.price,
      amenities: data.amenities || [],
      createdAt: new Date(),
    })

    return NextResponse.json(
      {
        message: "Room created successfully",
        roomId: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to create room" }, { status: 500 })
  }
}
