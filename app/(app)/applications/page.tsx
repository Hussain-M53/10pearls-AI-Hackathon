"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { getApplications } from "@/app/actions/candidate-actions"
import { ProtectedRoute } from "@/components/protected-route"
import { Loader2, Search } from "lucide-react"

export default function ApplicationsPage() {
  const { user } = useAuth()
  const [applications, setApplications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    const fetchApplications = async () => {
      if (!user?.id || !user?.tenantId) return

      try {
        const result = await getApplications(user.tenantId, { candidateId: user.id })
        if (result.success) {
          setApplications(result.data || [])
        }
      } catch (error) {
        console.error("Error fetching applications:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchApplications()
  }, [user?.id, user?.tenantId])

  const filteredApplications = applications.filter((application) => {
    const matchesSearch =
      application.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      application.companyName?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || application.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "applied":
        return <Badge>Applied</Badge>
      case "reviewing":
        return <Badge variant="secondary">Reviewing</Badge>
      case "interviewed":
        return <Badge variant="warning">Interviewed</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      case "hired":
        return <Badge variant="success">Hired</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <ProtectedRoute>
      <DashboardShell>
        <DashboardHeader heading="My Applications" text="Track the status of your job applications" />

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search applications..."
                className="pl-8 w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="reviewing">Reviewing</SelectItem>
                <SelectItem value="interviewed">Interviewed</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="hired">Hired</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Job Applications</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex h-[200px] items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : filteredApplications.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                  No applications found. Browse open positions and apply to see your applications here.
                </div>
              ) : (
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 p-4 text-sm font-medium text-muted-foreground">
                    <div className="col-span-2">Position</div>
                    <div>Applied Date</div>
                    <div>Status</div>
                    <div className="text-right">Actions</div>
                  </div>
                  <div className="divide-y">
                    {filteredApplications.map((application) => (
                      <div key={application.id} className="grid grid-cols-5 items-center p-4">
                        <div className="col-span-2">
                          <p className="font-medium">{application.jobTitle || "Position"}</p>
                          <p className="text-sm text-muted-foreground">{application.companyName || "Company"}</p>
                        </div>
                        <div>{new Date(application.appliedDate).toLocaleDateString()}</div>
                        <div>{getStatusBadge(application.status)}</div>
                        <div className="text-right">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/jobs/${application.jobId}`}>View Job</Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DashboardShell>
    </ProtectedRoute>
  )
}
