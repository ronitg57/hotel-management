import { NextResponse } from "next/server"
import { findAll, insertOne } from "@/lib/db-service"

export async function GET() {
  try {
    const requests = await findAll("housekeepingRequests", {}, { sort: { createdAt: -1 } })
    return NextResponse.json({ requests }, { status: 200 })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch housekeeping requests" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate the data
    if (!data.room || !data.time || !data.services || data.services.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const result = await insertOne("housekeepingRequests", {
      ...data,
      status: "Pending",
      requested: new Date().toLocaleTimeString(),
    })

    return NextResponse.json(
      {
        message: "Housekeeping request created successfully",
        requestId: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to create housekeeping request" }, { status: 500 })
  }
}
