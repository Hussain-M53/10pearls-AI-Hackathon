"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { CandidatesList } from "@/components/candidates-list"
import { Plus } from "lucide-react"
import Link from "next/link"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/contexts/auth-context"

export default function CandidatesPage() {
  const { hasPermission } = useAuth()
  const canCreateCandidates = hasPermission("manage_candidates")

  return (
    <ProtectedRoute>
      <DashboardShell>
        <DashboardHeader heading="Candidates" text="Manage your candidate pool">
          {canCreateCandidates && (
            <Button asChild>
              <Link href="/candidates/new">
                <Plus className="mr-2 h-4 w-4" />
                Add Candidate
              </Link>
            </Button>
          )}
        </DashboardHeader>
        <CandidatesList />
      </DashboardShell>
    </ProtectedRoute>
  )
}
