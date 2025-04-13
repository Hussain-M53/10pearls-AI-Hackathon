"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { CheckCircle2 } from "lucide-react"

export function PricingSection() {
  const [annual, setAnnual] = useState(true)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small businesses just getting started with hiring.",
      monthlyPrice: 49,
      annualPrice: 39,
      features: [
        "Up to 5 active job postings",
        "Up to 3 team members",
        "Basic candidate tracking",
        "Email templates",
        "Job board integrations",
        "Basic reporting",
        "Email support",
      ],
      popular: false,
    },
    {
      name: "Professional",
      description: "Ideal for growing companies with regular hiring needs.",
      monthlyPrice: 99,
      annualPrice: 79,
      features: [
        "Up to 15 active job postings",
        "Up to 10 team members",
        "Advanced candidate tracking",
        "Custom workflows",
        "Interview scheduling",
        "Advanced reporting",
        "API access",
        "Priority email support",
        "Candidate assessment tools",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For large organizations with complex hiring processes.",
      monthlyPrice: 249,
      annualPrice: 199,
      features: [
        "Unlimited job postings",
        "Unlimited team members",
        "Advanced candidate tracking",
        "Custom workflows",
        "Interview scheduling",
        "Advanced reporting & analytics",
        "API access",
        "Dedicated account manager",
        "Candidate assessment tools",
        "Custom integrations",
        "SSO & advanced security",
        "SLA guarantees",
      ],
      popular: false,
    },
  ]

  return (
    <section ref={ref} id="pricing" className="py-20 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Simple, transparent pricing</h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the plan that's right for your business. All plans include a 14-day free trial.
          </p>
          <div className="flex items-center justify-center mt-8 space-x-2">
            <Label htmlFor="pricing-toggle" className={annual ? "text-muted-foreground" : "font-medium"}>
              Monthly
            </Label>
            <Switch
              id="pricing-toggle"
              checked={annual}
              onCheckedChange={setAnnual}
              aria-label="Toggle annual billing"
            />
            <Label htmlFor="pricing-toggle" className={!annual ? "text-muted-foreground" : "font-medium"}>
              Annual <span className="text-sm text-secondary">(Save 20%)</span>
            </Label>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-lg border ${
                plan.popular ? "border-primary shadow-lg" : "bg-background"
              } p-8`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <div className="h-20 w-20 translate-x-1/2 -translate-y-1/2 rotate-45 bg-primary" />
                  <span className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 rotate-45 text-xs font-medium text-primary-foreground px-3 py-1">
                    Popular
                  </span>
                </div>
              )}
              <div>
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className="mt-2 text-muted-foreground">{plan.description}</p>
                <div className="mt-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">${annual ? plan.annualPrice : plan.monthlyPrice}</span>
                    <span className="ml-1 text-muted-foreground">/month</span>
                  </div>
                  {annual && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      Billed annually (${plan.annualPrice * 12}/year)
                    </p>
                  )}
                </div>
                <Button className="mt-6 w-full" variant={plan.popular ? "default" : "outline"} asChild>
                  <Link href="/register">Start Free Trial</Link>
                </Button>
              </div>
              <div className="mt-8">
                <h4 className="text-sm font-medium">What's included:</h4>
                <ul className="mt-4 space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <CheckCircle2 className="mr-2 h-5 w-5 text-secondary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <h3 className="text-xl font-bold">Need a custom plan?</h3>
          <p className="mt-2 text-muted-foreground">
            Contact our sales team for a custom plan tailored to your specific needs.
          </p>
          <Button className="mt-6" variant="outline" asChild>
            <Link href="/contact">Contact Sales</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
