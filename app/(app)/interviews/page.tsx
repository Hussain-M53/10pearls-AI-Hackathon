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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarView } from "@/components/calendar/calendar-view"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/auth-context"
import { getInterviews } from "@/app/actions/interview-actions"
import { ProtectedRoute } from "@/components/protected-route"
import { Plus, Search } from "lucide-react"

export default function InterviewsPage() {
  const { user } = useAuth()
  const [interviews, setInterviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [view, setView] = useState("list")

  useEffect(() => {
    const fetchInterviews = async () => {
      if (!user?.tenantId) return

      try {
        let filters = {}
        if (user.role === "candidate") {
          filters = { candidateId: user.id }
        } else if (user.role === "employee") {
          filters = { interviewerId: user.id }
        }

        const result = await getInterviews(user.tenantId, filters)
        if (result.success) {
          setInterviews(result.data || [])
        }
      } catch (error) {
        console.error("Error fetching interviews:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchInterviews()
  }, [user?.tenantId, user?.id, user?.role])

  const filteredInterviews = interviews.filter((interview) => {
    const matchesSearch =
      interview.candidateName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      interview.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      interview.type?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || interview.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const calendarEvents = interviews.map((interview) => ({
    id: interview.id,
    title: `${interview.type} - ${interview.candidateName || "Candidate"}`,
    start: new Date(`${interview.scheduledDate}T${interview.startTime}`),
    end: new Date(`${interview.scheduledDate}T${interview.endTime}`),
    candidateId: interview.candidateId,
    jobId: interview.jobId,
  }))

  return (
    <ProtectedRoute>
      <DashboardShell>
        <DashboardHeader heading="Interviews" text="Schedule and manage candidate interviews">
          {(user?.role === "admin" || user?.role === "manager") && (
            <Button asChild>
              <Link href="/interviews/schedule">
                <Plus className="mr-2 h-4 w-4" />
                Schedule Interview
              </Link>
            </Button>
          )}
        </DashboardHeader>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search interviews..."
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
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Tabs value={view} onValueChange={setView} className="w-[400px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="list">List View</TabsTrigger>
                <TabsTrigger value="calendar">Calendar View</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {view === "list" ? (
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Interviews</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-4">Loading interviews...</div>
                ) : filteredInterviews.length === 0 ? (
                  <div className="text-center py-4 text-muted-foreground">
                    No interviews found. {user?.role !== "candidate" && "Schedule an interview to get started."}
                  </div>
                ) : (
                  <div className="rounded-md border">
                    <div className="grid grid-cols-6 p-4 text-sm font-medium text-muted-foreground">
                      <div className="col-span-2">Candidate</div>
                      <div>Position</div>
                      <div>Date & Time</div>
                      <div>Status</div>
                      <div className="text-right">Actions</div>
                    </div>
                    <div className="divide-y">
                      {filteredInterviews.map((interview) => (
                        <div key={interview.id} className="grid grid-cols-6 items-center p-4">
                          <div className="col-span-2 flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src="/placeholder-user.jpg" alt="Candidate" />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{interview.candidateName || "Candidate"}</p>
                              <p className="text-sm text-muted-foreground">{interview.type}</p>
                            </div>
                          </div>
                          <div className="truncate">{interview.jobTitle || "Position"}</div>
                          <div>
                            <p>{new Date(interview.scheduledDate).toLocaleDateString()}</p>
                            <p className="text-sm text-muted-foreground">{interview.startTime}</p>
                          </div>
                          <div>
                            <Badge
                              variant={
                                interview.status === "scheduled"
                                  ? "default"
                                  : interview.status === "completed"
                                    ? "success"
                                    : interview.status === "cancelled"
                                      ? "destructive"
                                      : "secondary"
                              }
                            >
                              {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/interviews/${interview.id}`}>View Details</Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <CalendarView events={calendarEvents} />
          )}
        </div>
      </DashboardShell>
    </ProtectedRoute>
  )
}
