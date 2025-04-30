require("dotenv").config({ path: ".env.local" })
const { MongoClient } = require("mongodb")

const uri = process.env.MONGODB_URI
if (!uri) {
  console.error("Please define the MONGODB_URI environment variable")
  process.exit(1)
}

const client = new MongoClient(uri)

async function seedDatabase() {
  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db("hotel-management")

    // Clear existing collections
    await Promise.all([
      db.collection("rooms").deleteMany({}),
      db.collection("roomTypes").deleteMany({}),
      db.collection("reservations").deleteMany({}),
      db.collection("foodOrders").deleteMany({}),
      db.collection("housekeepingRequests").deleteMany({}),
      db.collection("serviceRequests").deleteMany({}),
      db.collection("invoices").deleteMany({}),
      db.collection("activities").deleteMany({}),
      db.collection("dashboardStats").deleteMany({}),
      db.collection("revenue").deleteMany({}),
      db.collection("menuItems").deleteMany({}),
    ])

    console.log("Cleared existing collections")

    // Seed room types
    const roomTypes = [
      { type: "Standard", color: "#8A4FD1" },
      { type: "Deluxe", color: "#7B2CBF" },
      { type: "Suite", color: "#6A0DAD" },
      { type: "Executive", color: "#4B0082" },
    ]
    await db.collection("roomTypes").insertMany(roomTypes)
    console.log("Room types seeded successfully")

    // Seed rooms
    const rooms = [
      {
        number: "101",
        type: "Standard",
        floor: "1st",
        status: "Available",
        price: "₹3,500",
        amenities: ["Wi-Fi", "TV", "AC"],
      },
      {
        number: "102",
        type: "Standard",
        floor: "1st",
        status: "Occupied",
        price: "₹3,500",
        amenities: ["Wi-Fi", "TV", "AC"],
      },
      {
        number: "103",
        type: "Standard",
        floor: "1st",
        status: "Cleaning",
        price: "₹3,500",
        amenities: ["Wi-Fi", "TV", "AC"],
      },
      {
        number: "104",
        type: "Standard",
        floor: "1st",
        status: "Available",
        price: "₹3,500",
        amenities: ["Wi-Fi", "TV", "AC"],
      },
      {
        number: "105",
        type: "Standard",
        floor: "1st",
        status: "Occupied",
        price: "₹3,500",
        amenities: ["Wi-Fi", "TV", "AC"],
      },
      {
        number: "201",
        type: "Deluxe",
        floor: "2nd",
        status: "Available",
        price: "₹5,500",
        amenities: ["Wi-Fi", "TV", "AC", "Mini Bar"],
      },
      {
        number: "202",
        type: "Deluxe",
        floor: "2nd",
        status: "Cleaning",
        price: "₹5,500",
        amenities: ["Wi-Fi", "TV", "AC", "Mini Bar"],
      },
      {
        number: "203",
        type: "Deluxe",
        floor: "2nd",
        status: "Occupied",
        price: "₹5,500",
        amenities: ["Wi-Fi", "TV", "AC", "Mini Bar"],
      },
      {
        number: "204",
        type: "Deluxe",
        floor: "2nd",
        status: "Available",
        price: "₹5,500",
        amenities: ["Wi-Fi", "TV", "AC", "Mini Bar"],
      },
      {
        number: "205",
        type: "Deluxe",
        floor: "2nd",
        status: "Occupied",
        price: "₹5,500",
        amenities: ["Wi-Fi", "TV", "AC", "Mini Bar"],
      },
      {
        number: "301",
        type: "Suite",
        floor: "3rd",
        status: "Available",
        price: "₹8,500",
        amenities: ["Wi-Fi", "TV", "AC", "Mini Bar", "Jacuzzi"],
      },
      {
        number: "302",
        type: "Suite",
        floor: "3rd",
        status: "Occupied",
        price: "₹8,500",
        amenities: ["Wi-Fi", "TV", "AC", "Mini Bar", "Jacuzzi"],
      },
      {
        number: "303",
        type: "Suite",
        floor: "3rd",
        status: "Available",
        price: "₹8,500",
        amenities: ["Wi-Fi", "TV", "AC", "Mini Bar", "Jacuzzi"],
      },
      {
        number: "304",
        type: "Suite",
        floor: "3rd",
        status: "Maintenance",
        price: "₹8,500",
        amenities: ["Wi-Fi", "TV", "AC", "Mini Bar", "Jacuzzi"],
      },
      {
        number: "401",
        type: "Executive",
        floor: "4th",
        status: "Available",
        price: "₹12,500",
        amenities: ["Wi-Fi", "TV", "AC", "Mini Bar", "Jacuzzi", "Kitchen"],
      },
      {
        number: "402",
        type: "Executive",
        floor: "4th",
        status: "Occupied",
        price: "₹12,500",
        amenities: ["Wi-Fi", "TV", "AC", "Mini Bar", "Jacuzzi", "Kitchen"],
      },
      {
        number: "403",
        type: "Executive",
        floor: "4th",
        status: "Available",
        price: "₹12,500",
        amenities: ["Wi-Fi", "TV", "AC", "Mini Bar", "Jacuzzi", "Kitchen"],
      },
    ]
    await db.collection("rooms").insertMany(rooms)
    console.log("Rooms seeded successfully")

    // Seed reservations
    const reservations = [
      {
        guest: "John Smith",
        roomType: "Deluxe",
        roomNumber: "203",
        checkIn: new Date("2023-04-15"),
        checkOut: new Date("2023-04-18"),
        status: "Confirmed",
        payment: "Paid",
        specialRequests: "Late check-in",
        createdAt: new Date(),
      },
      {
        guest: "Emma Wilson",
        roomType: "Suite",
        roomNumber: "302",
        checkIn: new Date("2023-04-20"),
        checkOut: new Date("2023-04-25"),
        status: "Pending",
        payment: "Partial",
        specialRequests: "Extra pillows",
        createdAt: new Date(),
      },
      {
        guest: "Michael Brown",
        roomType: "Standard",
        roomNumber: "105",
        checkIn: new Date("2023-04-22"),
        checkOut: new Date("2023-04-24"),
        status: "Confirmed",
        payment: "Paid",
        createdAt: new Date(),
      },
      {
        guest: "Sarah Davis",
        roomType: "Executive",
        roomNumber: "402",
        checkIn: new Date("2023-05-01"),
        checkOut: new Date("2023-05-05"),
        status: "Confirmed",
        payment: "Unpaid",
        specialRequests: "Airport pickup",
        createdAt: new Date(),
      },
      {
        guest: "Robert Johnson",
        roomType: "Deluxe",
        checkIn: new Date("2023-05-10"),
        checkOut: new Date("2023-05-15"),
        status: "Pending",
        payment: "Unpaid",
        createdAt: new Date(),
      },
    ]
    await db.collection("reservations").insertMany(reservations)
    console.log("Reservations seeded successfully")

    // Seed food orders
    const foodOrders = [
      {
        room: "203",
        items: [
          { name: "Continental Breakfast", price: "₹450", quantity: 2 },
          { name: "Orange Juice", price: "₹120", quantity: 2 },
        ],
        total: "₹1,140",
        status: "Pending",
        time: "08:15 AM",
        createdAt: new Date(),
      },
      {
        room: "302",
        items: [
          { name: "Club Sandwich", price: "₹420", quantity: 1 },
          { name: "French Fries", price: "₹180", quantity: 1 },
          { name: "Coke", price: "₹90", quantity: 2 },
        ],
        total: "₹780",
        status: "Preparing",
        time: "12:30 PM",
        createdAt: new Date(),
      },
      {
        room: "402",
        items: [
          { name: "Filet Mignon", price: "₹950", quantity: 1 },
          { name: "Red Wine", price: "₹350", quantity: 1 },
        ],
        total: "₹1,300",
        status: "Delivered",
        time: "07:45 PM",
        createdAt: new Date(),
      },
      {
        room: "105",
        items: [
          { name: "Ice Cream", price: "₹180", quantity: 1 },
          { name: "Chocolate Cake", price: "₹250", quantity: 1 },
        ],
        total: "₹430",
        status: "Completed",
        time: "09:20 PM",
        createdAt: new Date(),
      },
    ]
    await db.collection("foodOrders").insertMany(foodOrders)
    console.log("Food orders seeded successfully")

    // Seed housekeeping requests
    const housekeepingRequests = [
      {
        room: "102",
        time: "Morning (8AM - 12PM)",
        services: ["Room Cleaning", "Fresh Towels"],
        status: "Pending",
        requested: "10:15 AM",
        createdAt: new Date(),
      },
      {
        room: "205",
        time: "Afternoon (12PM - 4PM)",
        services: ["Bedding Change", "Restock Amenities"],
        status: "In Progress",
        requested: "11:30 AM",
        createdAt: new Date(),
      },
      {
        room: "304",
        time: "Evening (4PM - 8PM)",
        services: ["Room Cleaning"],
        status: "Completed",
        requested: "09:45 AM",
        createdAt: new Date(),
      },
    ]
    await db.collection("housekeepingRequests").insertMany(housekeepingRequests)
    console.log("Housekeeping requests seeded successfully")

    // Seed service requests
    const serviceRequests = [
      {
        room: "302",
        type: "Taxi / Transportation",
        details: "Need a taxi to the airport at 10:00 AM tomorrow",
        time: "10:00 AM, Apr 25, 2023",
        status: "Pending",
        priority: "Normal",
        requested: "04:30 PM",
        createdAt: new Date(),
      },
      {
        room: "203",
        type: "Laundry Service",
        details: "Suit needs to be dry cleaned for tomorrow evening",
        time: "06:00 PM, Apr 24, 2023",
        status: "In Progress",
        priority: "Urgent",
        requested: "02:15 PM",
        createdAt: new Date(),
      },
      {
        room: "105",
        type: "Maintenance",
        details: "Air conditioning not working properly",
        time: "ASAP",
        status: "Completed",
        priority: "Urgent",
        requested: "11:45 AM",
        createdAt: new Date(),
      },
    ]
    await db.collection("serviceRequests").insertMany(serviceRequests)
    console.log("Service requests seeded successfully")

    // Seed invoices
    const invoices = [
      {
        id: "INV-001",
        guest: "John Smith",
        room: "203",
        checkIn: "2023-04-15",
        checkOut: "2023-04-18",
        amount: "₹16,500",
        status: "Paid",
        createdAt: new Date(),
      },
      {
        id: "INV-002",
        guest: "Emma Wilson",
        room: "302",
        checkIn: "2023-04-20",
        checkOut: "2023-04-25",
        amount: "₹42,500",
        status: "Pending",
        createdAt: new Date(),
      },
      {
        id: "INV-003",
        guest: "Michael Brown",
        room: "105",
        checkIn: "2023-04-22",
        checkOut: "2023-04-24",
        amount: "₹7,000",
        status: "Paid",
        createdAt: new Date(),
      },
      {
        id: "INV-004",
        guest: "Sarah Davis",
        room: "402",
        checkIn: "2023-05-01",
        checkOut: "2023-05-05",
        amount: "₹50,000",
        status: "Unpaid",
        createdAt: new Date(),
      },
    ]
    await db.collection("invoices").insertMany(invoices)
    console.log("Invoices seeded successfully")

    // Seed activities
    const activities = [
      {
        user: "John Smith",
        action: "checked in",
        details: "Room 302",
        time: "10 minutes ago",
        avatar: "JS",
        type: "check-in",
        createdAt: new Date(),
      },
      {
        user: "Emma Wilson",
        action: "ordered food",
        details: "Room service",
        time: "25 minutes ago",
        avatar: "EW",
        type: "food",
        createdAt: new Date(),
      },
      {
        user: "Michael Brown",
        action: "requested",
        details: "Housekeeping",
        time: "1 hour ago",
        avatar: "MB",
        type: "housekeeping",
        createdAt: new Date(),
      },
      {
        user: "Sarah Davis",
        action: "checked out",
        details: "Room 215",
        time: "2 hours ago",
        avatar: "SD",
        type: "check-out",
        createdAt: new Date(),
      },
      {
        user: "Robert Johnson",
        action: "made reservation",
        details: "Suite 401",
        time: "3 hours ago",
        avatar: "RJ",
        type: "reservation",
        createdAt: new Date(),
      },
    ]
    await db.collection("activities").insertMany(activities)
    console.log("Activities seeded successfully")

    // Seed dashboard stats
    const dashboardStats = [
      {
        title: "Total Guests",
        value: "128",
        change: "+8% from last month",
        icon: "Users",
        createdAt: new Date(),
      },
      {
        title: "Room Occupancy",
        value: "85%",
        change: "+12% from last month",
        icon: "Hotel",
        createdAt: new Date(),
      },
      {
        title: "Food Orders",
        value: "42",
        change: "+5% from yesterday",
        icon: "Utensils",
        createdAt: new Date(),
      },
      {
        title: "Revenue",
        value: "₹7,50,000",
        change: "+18% from last month",
        icon: "CreditCard",
        createdAt: new Date(),
      },
    ]
    await db.collection("dashboardStats").insertMany(dashboardStats)
    console.log("Dashboard stats seeded successfully")

    // Seed revenue data
    const revenueData = [
      {
        period: "monthly",
        data: [
          { name: "Jan", total: 450000 },
          { name: "Feb", total: 550000 },
          { name: "Mar", total: 650000 },
          { name: "Apr", total: 750000 },
          { name: "May", total: 850000 },
          { name: "Jun", total: 950000 },
          { name: "Jul", total: 1050000 },
          { name: "Aug", total: 950000 },
          { name: "Sep", total: 850000 },
          { name: "Oct", total: 750000 },
          { name: "Nov", total: 650000 },
          { name: "Dec", total: 550000 },
        ],
        totalRevenue: "₹90,00,000",
        createdAt: new Date(),
      },
      {
        period: "weekly",
        data: [
          { name: "Mon", total: 95000 },
          { name: "Tue", total: 125000 },
          { name: "Wed", total: 175000 },
          { name: "Thu", total: 185000 },
          { name: "Fri", total: 225000 },
          { name: "Sat", total: 265000 },
          { name: "Sun", total: 215000 },
        ],
        totalRevenue: "₹12,85,000",
        createdAt: new Date(),
      },
    ]
    await db.collection("revenue").insertMany(revenueData)
    console.log("Revenue data seeded successfully")

    // Seed menu items
    const menuItems = [
      // Breakfast
      {
        id: 1,
        name: "Continental Breakfast",
        price: "₹450",
        description: "Assorted pastries, fruits, and coffee",
        category: "breakfast",
      },
      {
        id: 2,
        name: "American Breakfast",
        price: "₹550",
        description: "Eggs, bacon, toast, and coffee",
        category: "breakfast",
      },
      {
        id: 3,
        name: "Vegetarian Breakfast",
        price: "₹480",
        description: "Avocado toast, fruits, and tea",
        category: "breakfast",
      },

      // Lunch
      {
        id: 4,
        name: "Caesar Salad",
        price: "₹350",
        description: "Romaine lettuce, croutons, parmesan",
        category: "lunch",
      },
      { id: 5, name: "Club Sandwich", price: "₹420", description: "Turkey, bacon, lettuce, tomato", category: "lunch" },
      {
        id: 6,
        name: "Pasta Primavera",
        price: "₹480",
        description: "Seasonal vegetables and pasta",
        category: "lunch",
      },

      // Dinner
      {
        id: 7,
        name: "Grilled Salmon",
        price: "₹750",
        description: "With asparagus and lemon butter",
        category: "dinner",
      },
      {
        id: 8,
        name: "Filet Mignon",
        price: "₹950",
        description: "With mashed potatoes and vegetables",
        category: "dinner",
      },
      { id: 9, name: "Vegetable Curry", price: "₹550", description: "Served with basmati rice", category: "dinner" },

      // Desserts
      {
        id: 10,
        name: "Chocolate Cake",
        price: "₹250",
        description: "Rich chocolate cake with ganache",
        category: "desserts",
      },
      {
        id: 11,
        name: "Cheesecake",
        price: "₹280",
        description: "New York style with berry compote",
        category: "desserts",
      },
      {
        id: 12,
        name: "Ice Cream",
        price: "₹180",
        description: "Vanilla, chocolate, or strawberry",
        category: "desserts",
      },
    ]
    await db.collection("menuItems").insertMany(menuItems)
    console.log("Menu items seeded successfully")

    console.log("Database seeded successfully")
  } catch (error) {
    console.error("Error seeding database:", error)
  } finally {
    await client.close()
    console.log("MongoDB connection closed")
  }
}

seedDatabase()
