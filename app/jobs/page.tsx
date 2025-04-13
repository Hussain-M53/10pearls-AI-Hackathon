"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { JobsList } from "@/components/jobs-list"
import { Plus } from "lucide-react"
import Link from "next/link"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/contexts/auth-context"

export default function JobsPage() {
  const { hasPermission } = useAuth()
  const canCreateJobs = hasPermission("manage_jobs")

  return (
    <ProtectedRoute>
      <DashboardShell>
        <DashboardHeader heading="Jobs" text="Manage your open positions">
          {canCreateJobs && (
            <Button asChild>
              <Link href="/jobs/new">
                <Plus className="mr-2 h-4 w-4" />
                Add Job
              </Link>
            </Button>
          )}
        </DashboardHeader>
        <JobsList />
      </DashboardShell>
    </ProtectedRoute>
  )
}
