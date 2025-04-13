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
import { getJobs } from "@/app/actions/job-actions"
import { ProtectedRoute } from "@/components/protected-route"
import { Loader2, Plus, Search } from "lucide-react"

export default function JobsPage() {
  const { user } = useAuth()
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [departmentFilter, setDepartmentFilter] = useState("all")

  useEffect(() => {
    const fetchJobs = async () => {
      if (!user?.tenantId) return

      try {
        const result = await getJobs(user.tenantId)
        if (result.success) {
          setJobs(result.data || [])
        }
      } catch (error) {
        console.error("Error fetching jobs:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [user?.tenantId])

  const departments = Array.from(new Set(jobs.map((job) => job.department))).filter(Boolean)

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || job.status === statusFilter
    const matchesDepartment = departmentFilter === "all" || job.department === departmentFilter

    return matchesSearch && matchesStatus && matchesDepartment
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge variant="success">Open</Badge>
      case "closed":
        return <Badge variant="destructive">Closed</Badge>
      case "draft":
        return <Badge variant="secondary">Draft</Badge>
      case "paused":
        return <Badge variant="warning">Paused</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <ProtectedRoute>
      <DashboardShell>
        <DashboardHeader heading="Jobs" text="Manage job listings and openings">
          {(user?.role === "admin" || user?.role === "manager") && (
            <Button asChild>
              <Link href="/jobs/create">
                <Plus className="mr-2 h-4 w-4" />
                Create Job
              </Link>
            </Button>
          )}
        </DashboardHeader>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs..."
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
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
              </SelectContent>
            </Select>

            {departments.length > 0 && (
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((department) => (
                    <SelectItem key={department} value={department}>
                      {department}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Job Listings</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex h-[200px] items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : filteredJobs.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                  No jobs found. {user?.role !== "candidate" && "Create a job to get started."}
                </div>
              ) : (
                <div className="rounded-md border">
                  <div className="grid grid-cols-6 p-4 text-sm font-medium text-muted-foreground">
                    <div className="col-span-2">Title</div>
                    <div>Department</div>
                    <div>Location</div>
                    <div>Status</div>
                    <div className="text-right">Actions</div>
                  </div>
                  <div className="divide-y">
                    {filteredJobs.map((job) => (
                      <div key={job.id} className="grid grid-cols-6 items-center p-4">
                        <div className="col-span-2">
                          <p className="font-medium">{job.title}</p>
                          <p className="text-sm text-muted-foreground">
                            Posted: {new Date(job.postedDate || job.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div>{job.department}</div>
                        <div>{job.location}</div>
                        <div>{getStatusBadge(job.status)}</div>
                        <div className="text-right">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/jobs/${job.id}`}>View Details</Link>
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
