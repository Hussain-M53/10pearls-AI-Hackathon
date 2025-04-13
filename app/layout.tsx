import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/auth-context"
import { TenantProvider } from "@/contexts/tenant-context"
import { getCurrentTenant } from "@/lib/multi-tenant"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ATS System",
  description: "A modern applicant tracking system",
    generator: 'v0.dev'
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const tenant = await getCurrentTenant()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <TenantProvider initialTenant={tenant}>
            <AuthProvider> <LayoutWrapper>{children}</LayoutWrapper></AuthProvider>
          </TenantProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'
import { LayoutWrapper } from "./layout-wrapper"
