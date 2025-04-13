"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const stats = [
    { value: "93%", label: "Faster hiring process" },
    { value: "10x", label: "More qualified candidates" },
    { value: "42%", label: "Reduced hiring costs" },
    { value: "1000+", label: "Companies trust us" },
  ]

  return (
    <section ref={ref} className="py-16 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center text-center"
            >
              <div className="text-3xl font-bold sm:text-4xl md:text-5xl text-primary">{stat.value}</div>
              <div className="mt-2 text-sm font-medium text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
