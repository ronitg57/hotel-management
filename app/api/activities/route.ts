import { NextResponse } from "next/server"
import { findAll } from "@/lib/db-service"

export async function GET() {
  try {
    const activities = await findAll("activities", {}, { sort: { createdAt: -1 }, limit: 5 })
    return NextResponse.json({ activities }, { status: 200 })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch activities" }, { status: 500 })
  }
}
