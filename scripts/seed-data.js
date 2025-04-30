import { MongoClient } from "mongodb"
import dotenv from "dotenv"

dotenv.config()

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)

async function seedDatabase() {
  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db("hotel-management")

    // Clear existing collections
    await db.collection("rooms").deleteMany({})
    await db.collection("reservations").deleteMany({})

    // Seed rooms
    const rooms = [
      { number: "101", type: "Standard", floor: "1st", status: "Available", price: "$120" },
      { number: "102", type: "Standard", floor: "1st", status: "Occupied", price: "$120" },
      { number: "201", type: "Deluxe", floor: "2nd", status: "Available", price: "$180" },
      { number: "202", type: "Deluxe", floor: "2nd", status: "Cleaning", price: "$180" },
      { number: "301", type: "Suite", floor: "3rd", status: "Available", price: "$250" },
      { number: "401", type: "Executive", floor: "4th", status: "Maintenance", price: "$350" },
    ]

    await db.collection("rooms").insertMany(rooms)
    console.log("Rooms seeded successfully")

    // Seed reservations
    const reservations = [
      {
        guest: "John Smith",
        roomType: "Deluxe",
        checkIn: new Date("2023-04-15"),
        checkOut: new Date("2023-04-18"),
        status: "Confirmed",
        payment: "Paid",
      },
      {
        guest: "Emma Wilson",
        roomType: "Suite",
        checkIn: new Date("2023-04-20"),
        checkOut: new Date("2023-04-25"),
        status: "Pending",
        payment: "Partial",
      },
    ]

    await db.collection("reservations").insertMany(reservations)
    console.log("Reservations seeded successfully")

    console.log("Database seeded successfully")
  } catch (error) {
    console.error("Error seeding database:", error)
  } finally {
    await client.close()
  }
}

seedDatabase()
