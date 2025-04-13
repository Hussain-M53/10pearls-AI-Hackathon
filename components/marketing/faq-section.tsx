"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FaqSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const faqs = [
    {
      question: "How long is the free trial?",
      answer:
        "Our free trial lasts for 14 days. During this period, you'll have access to all features of the plan you select. No credit card is required to start your trial.",
    },
    {
      question: "Can I change plans later?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. When you upgrade, you'll be charged the prorated difference. When you downgrade, the new rate will apply at the start of your next billing cycle.",
    },
    {
      question: "Is there a limit to the number of candidates I can track?",
      answer:
        "No, there's no limit to the number of candidates you can track in any of our plans. The plan differences relate to the number of active job postings, team members, and available features.",
    },
    {
      question: "Do you offer discounts for nonprofits or educational institutions?",
      answer:
        "Yes, we offer special pricing for nonprofits, educational institutions, and startups. Please contact our sales team for more information.",
    },
    {
      question: "Can I import candidates from my existing ATS?",
      answer:
        "Yes, we offer data migration services to help you import candidates from your existing ATS. Our team will work with you to ensure a smooth transition.",
    },
    {
      question: "Is TalentTrack GDPR compliant?",
      answer:
        "Yes, TalentTrack is fully GDPR compliant. We provide tools to help you manage candidate data in accordance with GDPR requirements, including data retention policies and candidate consent management.",
    },
    {
      question: "What kind of support do you offer?",
      answer:
        "All plans include email support. The Professional plan includes priority email support, while the Enterprise plan includes a dedicated account manager and SLA guarantees.",
    },
    {
      question: "Can I customize the application form for different jobs?",
      answer:
        "Yes, you can create custom application forms for each job posting. You can add custom fields, screening questions, and even assessment tests.",
    },
  ]

  return (
    <section ref={ref} className="py-20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Frequently asked questions</h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
            Find answers to common questions about TalentTrack ATS.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
