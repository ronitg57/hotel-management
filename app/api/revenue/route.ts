import { NextResponse } from "next/server"
import { findAll } from "@/lib/db-service"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get("period") || "monthly"

    const revenueData = await findAll("revenue", { period })
    return NextResponse.json({ revenueData: revenueData[0] || null }, { status: 200 })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch revenue data" }, { status: 500 })
  }
}
