import { FoodOrderList } from "@/components/food-order-list"
import { FoodMenu } from "@/components/food-menu"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export default function FoodOrderPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-lavender-900">Food Orders</h1>
        <Button className="bg-lavender-600 hover:bg-lavender-700">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Order
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FoodMenu />
        <FoodOrderList />
      </div>
    </div>
  )
}
