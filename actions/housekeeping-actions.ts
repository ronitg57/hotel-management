"use server"

import { insertOne } from "@/lib/db-service"
import { revalidatePath } from "next/cache"

export async function submitHousekeepingRequest(formData: FormData) {
  try {
    const room = formData.get("room")
    const time = formData.get("time")
    const services = formData.getAll("services")
    const notes = formData.get("notes")

    // Validate the data
    if (!room || !time || services.length === 0) {
      return { success: false, message: "Please fill all required fields" }
    }

    await insertOne("housekeepingRequests", {
      room,
      time,
      services,
      notes,
      status: "Pending",
      requested: new Date().toLocaleTimeString(),
    })

    // Revalidate the housekeeping page to show the new request
    revalidatePath("/services/housekeeping")

    return { success: true, message: "Housekeeping request submitted successfully" }
  } catch (error) {
    console.error("Error submitting housekeeping request:", error)
    return { success: false, message: "Failed to submit request. Please try again." }
  }
}
