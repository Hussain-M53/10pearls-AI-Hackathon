"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

export function IntegrationSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const integrations = [
    { name: "Google Workspace", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Microsoft 365", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Slack", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Zoom", logo: "/placeholder.svg?height=60&width=120" },
    { name: "LinkedIn", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Indeed", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Glassdoor", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Workday", logo: "/placeholder.svg?height=60&width=120" },
  ]

  return (
    <section ref={ref} className="py-20 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Seamless integrations</h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
            TalentTrack integrates with the tools you already use, making your hiring process even more efficient.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4">
          {integrations.map((integration, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="flex items-center justify-center p-6 rounded-lg border bg-background"
            >
              <img
                src={integration.logo || "/placeholder.svg"}
                alt={integration.name}
                className="h-12 w-auto object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
