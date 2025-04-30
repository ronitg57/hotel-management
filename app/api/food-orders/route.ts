import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("hotel-management")

    const orders = await db.collection("foodOrders").find({}).toArray()

    return NextResponse.json({ orders }, { status: 200 })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch food orders" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise
    const db = client.db("hotel-management")

    const data = await request.json()

    // Validate the data here
    if (!data.room || !data.items || data.items.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const result = await db.collection("foodOrders").insertOne({
      room: data.room,
      items: data.items,
      total: data.total,
      status: "Pending",
      notes: data.notes || "",
      createdAt: new Date(),
    })

    return NextResponse.json(
      {
        message: "Food order created successfully",
        orderId: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to create food order" }, { status: 500 })
  }
}
