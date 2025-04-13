"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CtaSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 bg-secondary text-secondary-foreground">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center space-y-8"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Ready to transform your hiring process?
          </h2>
          <p className="text-xl max-w-3xl mx-auto">
            Join thousands of companies that use TalentTrack ATS to find, evaluate, and hire the best talent.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="default" className="bg-primary hover:bg-primary/90" asChild>
              <Link href="/register">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-white hover:bg-secondary-foreground/10"
              asChild
            >
              <Link href="/demo">Request Demo</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
