import { ServiceRequestList } from "@/components/service-request-list"
import { ServiceRequestForm } from "@/components/service-request-form"

export default function ServiceRequestsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-lavender-900">Service Requests</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ServiceRequestForm />
        <ServiceRequestList />
      </div>
    </div>
  )
}
