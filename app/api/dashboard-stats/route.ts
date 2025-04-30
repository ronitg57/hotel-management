import { NextResponse } from "next/server"
import { findAll } from "@/lib/db-service"

export async function GET() {
  try {
    const stats = await findAll("dashboardStats")
    return NextResponse.json({ stats }, { status: 200 })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch dashboard stats" }, { status: 500 })
  }
}
