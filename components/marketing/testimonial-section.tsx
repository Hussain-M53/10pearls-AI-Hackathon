"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { QuoteIcon } from "lucide-react"

export function TestimonialSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const testimonials = [
    {
      quote:
        "TalentTrack has completely transformed our hiring process. We've reduced our time-to-hire by 45% and improved the quality of our candidates.",
      name: "Sarah Johnson",
      title: "Head of HR, TechCorp",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SJ",
    },
    {
      quote:
        "The analytics and reporting features have given us insights we never had before. We can now make data-driven decisions about our recruitment strategy.",
      name: "Michael Chen",
      title: "CEO, GrowthStartup",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MC",
    },
    {
      quote:
        "As a small business, we needed an ATS that was easy to use but powerful enough to handle our growing needs. TalentTrack has been the perfect solution.",
      name: "Emily Rodriguez",
      title: "Founder, DesignStudio",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "ER",
    },
    {
      quote:
        "The customer support team at TalentTrack is exceptional. They've been there every step of the way as we've scaled our hiring process.",
      name: "David Kim",
      title: "Recruitment Manager, Enterprise Inc.",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "DK",
    },
  ]

  return (
    <section ref={ref} className="py-20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Trusted by companies worldwide</h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
            See what our customers have to say about how TalentTrack has transformed their hiring process.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <QuoteIcon className="h-8 w-8 text-muted-foreground/50 mb-4" />
                  <p className="mb-6 text-muted-foreground">{testimonial.quote}</p>
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-4">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
