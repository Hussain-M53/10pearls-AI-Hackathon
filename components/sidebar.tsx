"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { BarChart3, Briefcase, Calendar, FileText, LayoutDashboard, Settings, Users, X } from "lucide-react"
import { useSidebar } from "@/components/sidebar-provider"
import { useAuth } from "@/contexts/auth-context"

export function Sidebar() {
  const pathname = usePathname()
  const { isOpen, toggleSidebar } = useSidebar()
  const { user, hasPermission } = useAuth()

  // Don't render sidebar on auth pages
  if (
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/forgot-password" ||
    pathname?.startsWith("/reset-password")
  ) {
    return null
  }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden" onClick={toggleSidebar} />
      )}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-72 border-r bg-background transition-transform md:translate-x-0 md:static md:z-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 md:hidden">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold inline-block">TalentTrack ATS</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>
        <div className="space-y-4 py-4">
          <div className="px-4 py-2">
            <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">Overview</h2>
            <div className="space-y-1">
              <Button
                asChild
                variant={pathname === "/dashboard" ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  pathname === "/dashboard" && "bg-primary text-primary-foreground",
                )}
              >
                <Link href="/dashboard">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
              {hasPermission("view_analytics") && (
                <Button
                  asChild
                  variant={pathname?.startsWith("/analytics") ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    pathname?.startsWith("/analytics") && "bg-primary text-primary-foreground",
                  )}
                >
                  <Link href="/analytics">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Analytics
                  </Link>
                </Button>
              )}
            </div>
          </div>
          <div className="px-4 py-2">
            <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">Recruitment</h2>
            <div className="space-y-1">
              {(hasPermission("manage_jobs") || hasPermission("view_jobs")) && (
                <Button
                  asChild
                  variant={pathname?.startsWith("/jobs") ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    pathname?.startsWith("/jobs") && "bg-primary text-primary-foreground",
                  )}
                >
                  <Link href="/jobs">
                    <Briefcase className="mr-2 h-4 w-4" />
                    Jobs
                  </Link>
                </Button>
              )}
              {(hasPermission("manage_candidates") || hasPermission("view_candidates")) && (
                <Button
                  asChild
                  variant={pathname?.startsWith("/candidates") ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    pathname?.startsWith("/candidates") && "bg-primary text-primary-foreground",
                  )}
                >
                  <Link href="/candidates">
                    <Users className="mr-2 h-4 w-4" />
                    Candidates
                  </Link>
                </Button>
              )}
              {(hasPermission("manage_interviews") || hasPermission("manage_assigned_interviews")) && (
                <Button
                  asChild
                  variant={pathname?.startsWith("/interviews") ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    pathname?.startsWith("/interviews") && "bg-primary text-primary-foreground",
                  )}
                >
                  <Link href="/interviews">
                    <Calendar className="mr-2 h-4 w-4" />
                    Interviews
                  </Link>
                </Button>
              )}
              <Button
                asChild
                variant={pathname?.startsWith("/feedback") ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  pathname?.startsWith("/feedback") && "bg-primary text-primary-foreground",
                )}
              >
                <Link href="/feedback">
                  <FileText className="mr-2 h-4 w-4" />
                  Feedback
                </Link>
              </Button>
            </div>
          </div>
          <div className="px-4 py-2">
            <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">Settings</h2>
            <div className="space-y-1">
              <Button
                asChild
                variant={pathname?.startsWith("/settings") ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  pathname?.startsWith("/settings") && "bg-primary text-primary-foreground",
                )}
              >
                <Link href="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </Button>
              {hasPermission("manage_users") && (
                <Button
                  asChild
                  variant={pathname === "/settings/users" ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start pl-8",
                    pathname === "/settings/users" && "bg-primary text-primary-foreground",
                  )}
                >
                  <Link href="/settings/users">
                    <Users className="mr-2 h-4 w-4" />
                    Manage Users
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
