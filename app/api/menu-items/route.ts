import { NextResponse } from "next/server"
import { findAll } from "@/lib/db-service"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")

    const query = category ? { category } : {}
    const menuItems = await findAll("menuItems", query)

    return NextResponse.json({ menuItems }, { status: 200 })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch menu items" }, { status: 500 })
  }
}
