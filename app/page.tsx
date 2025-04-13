import { HeroSection } from "@/components/marketing/hero-section"
import { FeatureSection } from "@/components/marketing/feature-section"
import { PricingSection } from "@/components/marketing/pricing-section"
import { TestimonialSection } from "@/components/marketing/testimonial-section"
import { IntegrationSection } from "@/components/marketing/integration-section"
import { FaqSection } from "@/components/marketing/faq-section"
import { CtaSection } from "@/components/marketing/cta-section"
import { StatsSection } from "@/components/marketing/stats-section"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen mt-10">
      <HeroSection />
      <StatsSection />
      <FeatureSection />
      <PricingSection />
      <TestimonialSection />
      <IntegrationSection />
      <FaqSection />
      <CtaSection />
    </div>
  )
}
