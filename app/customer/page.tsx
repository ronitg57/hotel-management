import { HeroSection } from "@/components/customer/hero-section"
import { FeaturesSection } from "@/components/customer/features-section"
import { RoomShowcase } from "@/components/customer/room-showcase"
import { TestimonialsSection } from "@/components/customer/testimonials-section"
import { CTASection } from "@/components/customer/cta-section"

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <RoomShowcase />
      <TestimonialsSection />
      <CTASection />
    </div>
  )
}
