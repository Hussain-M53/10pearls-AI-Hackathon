"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { useAuth } from "@/contexts/auth-context"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if ( !user) {
      router.push("/login")
    }
  }, [user, router])

  // if (loading) {
  //   return (
  //     <div className="flex h-screen w-full items-center justify-center">
  //       <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
  //     </div>
  //   )
  // }

  if (!user) {
    return null
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      {/* <SidebarInset> */}
        <div className="flex min-h-screen flex-col">
          <DashboardHeader heading="Dashboard"/>
          <main className="flex-1 p-6">{children}</main>
        </div>
      {/* </SidebarInset> */}
    </SidebarProvider>
  )
}
