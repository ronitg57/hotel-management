import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <div className="bg-lavender-600 text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Experience Lavender Luxury?</h2>
        <p className="text-lavender-100 max-w-2xl mx-auto mb-8">
          Book your stay today and enjoy exclusive rates, complimentary breakfast, and special amenities when you book
          directly through our website.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="bg-white text-lavender-600 hover:bg-lavender-50">
            <Link href="/booking">Book Now</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
