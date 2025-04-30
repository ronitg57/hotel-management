import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Edit, Trash2, Eye } from "lucide-react"

export function ReservationList() {
  // This would be replaced with actual data from your MongoDB database
  const reservations = [
    {
      id: 1,
      guest: "John Smith",
      roomType: "Deluxe",
      checkIn: "2023-04-15",
      checkOut: "2023-04-18",
      status: "Confirmed",
      payment: "Paid",
    },
    {
      id: 2,
      guest: "Emma Wilson",
      roomType: "Suite",
      checkIn: "2023-04-20",
      checkOut: "2023-04-25",
      status: "Pending",
      payment: "Partial",
    },
    {
      id: 3,
      guest: "Michael Brown",
      roomType: "Standard",
      checkIn: "2023-04-22",
      checkOut: "2023-04-24",
      status: "Confirmed",
      payment: "Paid",
    },
    {
      id: 4,
      guest: "Sarah Davis",
      roomType: "Executive",
      checkIn: "2023-05-01",
      checkOut: "2023-05-05",
      status: "Cancelled",
      payment: "Refunded",
    },
    {
      id: 5,
      guest: "Robert Johnson",
      roomType: "Deluxe",
      checkIn: "2023-05-10",
      checkOut: "2023-05-15",
      status: "Confirmed",
      payment: "Unpaid",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "Pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "Cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  const getPaymentColor = (payment: string) => {
    switch (payment) {
      case "Paid":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "Partial":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "Unpaid":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      case "Refunded":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  return (
    <Card className="border-lavender-200">
      <Table>
        <TableHeader>
          <TableRow className="bg-lavender-50">
            <TableHead>Guest</TableHead>
            <TableHead>Room Type</TableHead>
            <TableHead>Check In</TableHead>
            <TableHead>Check Out</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservations.map((reservation) => (
            <TableRow key={reservation.id}>
              <TableCell className="font-medium">{reservation.guest}</TableCell>
              <TableCell>{reservation.roomType}</TableCell>
              <TableCell>{reservation.checkIn}</TableCell>
              <TableCell>{reservation.checkOut}</TableCell>
              <TableCell>
                <Badge variant="outline" className={getStatusColor(reservation.status)}>
                  {reservation.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={getPaymentColor(reservation.payment)}>
                  {reservation.payment}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Eye className="h-4 w-4 text-lavender-600" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4 text-lavender-600" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
