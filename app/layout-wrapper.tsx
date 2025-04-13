"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { MarketingHeader } from "@/components/marketing/marketing-header"
import { MarketingFooter } from "@/components/marketing/marketing-footer"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Check if the current path is the root path
  const isRootPath = pathname === "/"

  // If it's the root path, wrap with marketing layout
  if (isRootPath) {
    return (
      <div className="flex min-h-screen flex-col">
        <MarketingHeader />
        <main className="flex-1">{children}</main>
        <MarketingFooter />
      </div>
    )
  }

  // Otherwise, just render the children
  return <>{children}</>
}
