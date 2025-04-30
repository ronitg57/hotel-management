import { HousekeepingList } from "@/components/housekeeping-list"
import { HousekeepingForm } from "@/components/housekeeping-form"

export default function HousekeepingPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-lavender-900">Housekeeping Requests</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HousekeepingForm />
        <HousekeepingList />
      </div>
    </div>
  )
}
