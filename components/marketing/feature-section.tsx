"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import {
  BarChart3,
  Briefcase,
  Calendar,
  CheckCircle2,
  FileText,
  Globe,
  Lock,
  MessageSquare,
  Search,
  Shield,
  Users,
  Zap,
} from "lucide-react"

export function FeatureSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const features = [
    {
      icon: <Briefcase className="h-10 w-10 text-secondary" />,
      title: "Job Management",
      description: "Create, publish, and manage job postings across multiple platforms from a single dashboard.",
    },
    {
      icon: <Users className="h-10 w-10 text-secondary" />,
      title: "Candidate Tracking",
      description: "Organize and track candidates through every stage of your recruitment pipeline.",
    },
    {
      icon: <Calendar className="h-10 w-10 text-secondary" />,
      title: "Interview Scheduling",
      description: "Seamlessly schedule and manage interviews with calendar integrations and automated reminders.",
    },
    {
      icon: <FileText className="h-10 w-10 text-secondary" />,
      title: "Customizable Workflows",
      description: "Design recruitment workflows that match your company's unique hiring processes.",
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-secondary" />,
      title: "Team Collaboration",
      description: "Collaborate with your hiring team through comments, ratings, and shared candidate profiles.",
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-secondary" />,
      title: "Analytics & Reporting",
      description: "Gain insights into your hiring process with comprehensive analytics and customizable reports.",
    },
    {
      icon: <Globe className="h-10 w-10 text-secondary" />,
      title: "Multi-channel Sourcing",
      description: "Source candidates from job boards, social media, referrals, and your career site.",
    },
    {
      icon: <Search className="h-10 w-10 text-secondary" />,
      title: "AI-Powered Matching",
      description: "Use AI to match candidates with jobs based on skills, experience, and cultural fit.",
    },
    {
      icon: <Lock className="h-10 w-10 text-secondary" />,
      title: "Role-Based Access",
      description: "Control who can access what with customizable permissions for different team members.",
    },
    {
      icon: <Shield className="h-10 w-10 text-secondary" />,
      title: "GDPR Compliance",
      description: "Stay compliant with data protection regulations with built-in privacy features.",
    },
    {
      icon: <Zap className="h-10 w-10 text-secondary" />,
      title: "Automation Tools",
      description: "Automate repetitive tasks like email responses, status updates, and candidate scoring.",
    },
    {
      icon: <CheckCircle2 className="h-10 w-10 text-secondary" />,
      title: "Onboarding Integration",
      description: "Seamlessly transition from candidate to employee with onboarding integrations.",
    },
  ]

  return (
    <section ref={ref} id="features" className="py-20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Everything you need to streamline your hiring
          </h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
            TalentTrack ATS provides all the tools you need to find, evaluate, and hire the best talent for your
            company.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="relative overflow-hidden rounded-lg border bg-background p-6"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="mt-2 text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
