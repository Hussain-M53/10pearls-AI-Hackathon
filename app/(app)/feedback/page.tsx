"use client"

import { useState, useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/auth-context"
import { getFeedback } from "@/app/actions/feedback-actions"
import { ProtectedRoute } from "@/components/protected-route"
import { Loader2, Search } from "lucide-react"

export default function FeedbackPage() {
  const { user } = useAuth()
  const [feedback, setFeedback] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [recommendationFilter, setRecommendationFilter] = useState("all")

  useEffect(() => {
    const fetchFeedback = async () => {
      if (!user?.tenantId) return

      try {
        let filters = {}
        if (user.role === "employee") {
          filters = { reviewerId: user.id }
        }

        const result = await getFeedback(user.tenantId, filters)
        if (result.success) {
          setFeedback(result.data || [])
        }
      } catch (error) {
        console.error("Error fetching feedback:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeedback()
  }, [user?.tenantId, user?.id, user?.role])

  const filteredFeedback = feedback.filter((item) => {
    const matchesSearch =
      item.candidateName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.comments?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesRecommendation = recommendationFilter === "all" || item.recommendation === recommendationFilter

    return matchesSearch && matchesRecommendation
  })

  const getRecommendationBadge = (recommendation: string) => {
    switch (recommendation) {
      case "hire":
        return <Badge variant="secondary">Hire</Badge>
      case "consider":
        return <Badge variant="outline">Consider</Badge>
      case "reject":
        return <Badge variant="destructive">Reject</Badge>
      default:
        return <Badge>{recommendation}</Badge>
    }
  }

  return (
    <ProtectedRoute>
      <DashboardShell>
        <DashboardHeader heading="Candidate Feedback" text="Review and manage candidate feedback">
          {user?.role === "admin" && <Button variant="outline">Export Feedback</Button>}
        </DashboardHeader>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search feedback..."
                className="pl-8 w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select value={recommendationFilter} onValueChange={setRecommendationFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by recommendation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Recommendations</SelectItem>
                <SelectItem value="hire">Hire</SelectItem>
                <SelectItem value="consider">Consider</SelectItem>
                <SelectItem value="reject">Reject</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Feedback Summary</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex h-[200px] items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : filteredFeedback.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                  No feedback found. Submit feedback for candidates to see it here.
                </div>
              ) : (
                <div className="rounded-md border">
                  <div className="grid grid-cols-6 p-4 text-sm font-medium text-muted-foreground">
                    <div className="col-span-2">Candidate</div>
                    <div>Position</div>
                    <div>Rating</div>
                    <div>Recommendation</div>
                    <div className="text-right">Actions</div>
                  </div>
                  <div className="divide-y">
                    {filteredFeedback.map((item) => (
                      <div key={item.id} className="grid grid-cols-6 items-center p-4">
                        <div className="col-span-2 flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src="/placeholder-user.jpg" alt="Candidate" />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{item.candidateName || "Candidate"}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(item.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="truncate">{item.jobTitle || "Position"}</div>
                        <div>
                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <svg
                                key={i}
                                className={`h-4 w-4 ${i < item.rating ? "text-yellow-400" : "text-gray-300"}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 15.585l-7.07 3.707 1.35-7.87L.587 7.11l7.89-1.146L10 0l2.523 5.964 7.89 1.146-5.693 5.312 1.35 7.87L10 15.585z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            ))}
                          </div>
                        </div>
                        <div>{getRecommendationBadge(item.recommendation)}</div>
                        <div className="text-right">
                          <Button variant="outline" size="sm" asChild>
                            <a href={`/feedback/${item.id}`}>View Details</a>
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
