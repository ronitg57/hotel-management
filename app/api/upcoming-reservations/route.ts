import { NextResponse } from "next/server"
import { findAll } from "@/lib/db-service"

export async function GET() {
  try {
    const today = new Date()
    const reservations = await findAll(
      "reservations",
      { checkIn: { $gte: today.toISOString() } },
      { sort: { checkIn: 1 }, limit: 3 },
    )

    return NextResponse.json({ reservations }, { status: 200 })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch upcoming reservations" }, { status: 500 })
  }
}
