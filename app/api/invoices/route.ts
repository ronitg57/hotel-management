import { NextResponse } from "next/server"
import { findAll, insertOne } from "@/lib/db-service"

export async function GET() {
  try {
    const invoices = await findAll("invoices", {}, { sort: { createdAt: -1 } })
    return NextResponse.json({ invoices }, { status: 200 })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch invoices" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate the data
    if (!data.guest || !data.room || !data.amount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Generate invoice ID
    const invoiceCount = await findAll("invoices")
    const invoiceId = `INV-${(invoiceCount.length + 1).toString().padStart(3, "0")}`

    const result = await insertOne("invoices", {
      ...data,
      id: invoiceId,
      status: data.status || "Pending",
    })

    return NextResponse.json(
      {
        message: "Invoice created successfully",
        invoiceId: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to create invoice" }, { status: 500 })
  }
}
