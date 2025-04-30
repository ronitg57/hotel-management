# Lavender Luxury Hotel Management System

A modern hotel management system built with Next.js and MongoDB.

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB database (local or Atlas)

### Environment Setup

Create a `.env.local` file in the root directory with the following variables:

\`\`\`
MONGODB_URI=your_mongodb_connection_string
\`\`\`

### Installation

1. Install dependencies:

\`\`\`bash
npm install
\`\`\`

2. Seed the database with initial data:

\`\`\`bash
npm run seed
\`\`\`

3. Run the development server:

\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Database Structure

The application uses MongoDB with the following collections:

- `rooms`: Hotel room information
- `roomTypes`: Types of rooms available
- `reservations`: Guest reservations
- `foodOrders`: Room service and food orders
- `housekeepingRequests`: Housekeeping service requests
- `serviceRequests`: Other service requests
- `invoices`: Billing information
- `activities`: Recent activities log
- `dashboardStats`: Statistics for the dashboard
- `revenue`: Revenue data for charts
- `menuItems`: Food menu items

## Features

- Dashboard with real-time statistics
- Room management
- Reservation system
- Food ordering system
- Housekeeping request management
- Service request handling
- Billing and invoicing
- Activity tracking

## Tech Stack

- Next.js 14
- MongoDB
- Tailwind CSS
- shadcn/ui components
- Recharts for data visualization
- TypeScript
\`\`\`

Let's also update the server actions for housekeeping requests to use our database service:
