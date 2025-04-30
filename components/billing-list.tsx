import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Eye, Download, CreditCard } from "lucide-react"

export function BillingList() {
  // This would be replaced with actual data from your MongoDB database
  const invoices = [
    {
      id: "INV-001",
      guest: "John Smith",
      room: "201",
      checkIn: "2023-04-15",
      checkOut: "2023-04-18",
      amount: "₹540",
      status: "Paid",
    },
    {
      id: "INV-002",
      guest: "Emma Wilson",
      room: "305",
      checkIn: "2023-04-20",
      checkOut: "2023-04-25",
      amount: "₹1,250",
      status: "Pending",
    },
    {
      id: "INV-003",
      guest: "Michael Brown",
      room: "102",
      checkIn: "2023-04-22",
      checkOut: "2023-04-24",
      amount: "₹240",
      status: "Paid",
    },
    {
      id: "INV-004",
      guest: "Sarah Davis",
      room: "401",
      checkIn: "2023-05-01",
      checkOut: "2023-05-05",
      amount: "₹1,400",
      status: "Refunded",
    },
    {
      id: "INV-005",
      guest: "Robert Johnson",
      room: "203",
      checkIn: "2023-05-10",
      checkOut: "2023-05-15",
      amount: "₹900",
      status: "Unpaid",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "Pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "Unpaid":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      case "Refunded":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  return (
    <Card className="border-lavender-200">
      <Table>
        <TableHeader>
          <TableRow className="bg-lavender-50">
            <TableHead>Invoice ID</TableHead>
            <TableHead>Guest</TableHead>
            <TableHead>Room</TableHead>
            <TableHead>Check In/Out</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">{invoice.id}</TableCell>
              <TableCell>{invoice.guest}</TableCell>
              <TableCell>{invoice.room}</TableCell>
              <TableCell>
                {invoice.checkIn} to {invoice.checkOut}
              </TableCell>
              <TableCell>{invoice.amount}</TableCell>
              <TableCell>
                <Badge variant="outline" className={getStatusColor(invoice.status)}>
                  {invoice.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Eye className="h-4 w-4 text-lavender-600" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="h-4 w-4 text-lavender-600" />
                  </Button>
                  {invoice.status === "Unpaid" && (
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <CreditCard className="h-4 w-4 text-green-600" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
