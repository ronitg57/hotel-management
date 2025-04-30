import { BillingList } from "@/components/billing-list"
import { BillingFilters } from "@/components/billing-filters"
import { Button } from "@/components/ui/button"
import { PlusCircle, Printer } from "lucide-react"

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-lavender-900">Billing Management</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="border-lavender-600 text-lavender-600">
            <Printer className="mr-2 h-4 w-4" />
            Print Invoices
          </Button>
          <Button className="bg-lavender-600 hover:bg-lavender-700">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Invoice
          </Button>
        </div>
      </div>

      <BillingFilters />
      <BillingList />
    </div>
  )
}
