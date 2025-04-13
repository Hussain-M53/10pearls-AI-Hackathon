"use client"

import { useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])
  const position = useTransform(scrollYProgress, (pos) => {
    return pos === 1 ? "relative" : "fixed"
  })

  return (
    <div ref={ref} className="relative h-screen">
      <motion.div
        style={{ opacity, scale, position }}
        className="inset-0 w-full h-full flex flex-col items-center justify-center text-center px-4 sm:px-6"
      >
        <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm mb-6">
          <span className="font-medium text-primary">New Feature</span>{" "}
          <span className="text-muted-foreground">AI-Powered Candidate Matching</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl max-w-3xl mb-6">
          Hire the <span className="text-secondary">best talent</span> faster with TalentTrack
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8 mb-8">
          The modern applicant tracking system that streamlines your hiring process. Find, evaluate, and hire top
          candidates with ease.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/register">
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/demo">Request Demo</Link>
          </Button>
        </div>
        <div className="mt-12 w-full max-w-5xl">
          <div className="relative rounded-xl border bg-background shadow-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none h-32 bottom-0 top-auto" />
            <img
              src="/hero-section.png?height=720&width=1280"
              alt="TalentTrack ATS Dashboard"
              className="w-full h-auto"
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
