"use client"

import { useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ConfirmationPage() {
  const router = useRouter()

  // Generate a random booking reference
  const bookingRef = `BK${Math.floor(100000 + Math.random() * 900000)}`

  // If someone navigates directly to this page without going through the booking form,
  // redirect them to the booking page
  useEffect(() => {
    const hasBookingData = sessionStorage.getItem("hasBookingData")
    if (!hasBookingData) {
      router.push("/booking")
    } else {
      // Clear the flag after successful navigation
      sessionStorage.removeItem("hasBookingData")
    }
  }, [router])

  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="border-lavender-200 max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>

          <h1 className="text-3xl font-bold text-lavender-900 mb-4">Booking Confirmed!</h1>
          <p className="text-gray-700 mb-6">
            Thank you for choosing Lavender Luxury Hotel. Your booking has been confirmed and we look forward to
            welcoming you.
          </p>

          <div className="bg-lavender-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold text-lavender-800 mb-4">Booking Reference</h2>
            <p className="text-3xl font-bold text-lavender-600 mb-2">{bookingRef}</p>
            <p className="text-sm text-gray-600">
              Please save this reference number. You'll need it for check-in and any inquiries about your reservation.
            </p>
          </div>

          <p className="text-gray-700 mb-8">
            A confirmation email has been sent to your email address with all the details of your booking. If you have
            any questions or need to make changes to your reservation, please contact our reservations team.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline" className="border-lavender-600 text-lavender-600">
              <Link href="/">Return to Homepage</Link>
            </Button>
            <Button asChild className="bg-lavender-600 hover:bg-lavender-700">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
