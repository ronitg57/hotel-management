import { NextResponse } from "next/server"
import { findAll, insertOne } from "@/lib/db-service"

export async function GET() {
  try {
    const requests = await findAll("serviceRequests", {}, { sort: { createdAt: -1 } })
    return NextResponse.json({ requests }, { status: 200 })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch service requests" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate the data
    if (!data.room || !data.type || !data.details) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const result = await insertOne("serviceRequests", {
      ...data,
      status: "Pending",
      requested: new Date().toLocaleTimeString(),
    })

    return NextResponse.json(
      {
        message: "Service request created successfully",
        requestId: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to create service request" }, { status: 500 })
  }
}
