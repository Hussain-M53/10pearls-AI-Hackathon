"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "@/components/ui/use-toast"
import { getInterview, saveTranscript, submitFeedback } from "@/app/actions/interview-actions"
import { ProtectedRoute } from "@/components/protected-route"
import { Loader2, Save } from "lucide-react"

export default function InterviewDetailsPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const [interview, setInterview] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [transcript, setTranscript] = useState("")
  const [feedback, setFeedback] = useState({
    rating: 3,
    strengths: "",
    weaknesses: "",
    comments: "",
    recommendation: "consider",
  })
  const [submitting, setSubmitting] = useState(false)
  const [savingTranscript, setSavingTranscript] = useState(false)

  useEffect(() => {
    const fetchInterview = async () => {
      if (!id || !user?.tenantId) return

      try {
        const result = await getInterview(id as string, user.tenantId)
        if (result.success) {
          setInterview(result.data)
          if (result.data.transcript) {
            setTranscript(result.data.transcript)
          }
        } else {
          toast({
            title: "Error",
            description: result.error || "Failed to fetch interview details",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Error fetching interview:", error)
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchInterview()
  }, [id, user?.tenantId])

  const handleSaveTranscript = async () => {
    if (!id || !user?.tenantId) return

    setSavingTranscript(true)
    try {
      const result = await saveTranscript(id as string, transcript, user.tenantId)
      if (result.success) {
        toast({
          title: "Success",
          description: "Interview transcript saved successfully",
        })
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to save transcript",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error saving transcript:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setSavingTranscript(false)
    }
  }

  const handleSubmitFeedback = async () => {
    if (!id || !user?.tenantId || !user?.id) return

    setSubmitting(true)
    try {
      const result = await submitFeedback(
        id as string,
        {
          interviewerId: user.id,
          ...feedback,
        },
        user.tenantId,
      )

      if (result.success) {
        toast({
          title: "Success",
          description: "Feedback submitted successfully",
        })

        // Update local state to show the new feedback
        setInterview((prev) => ({
          ...prev,
          feedback: [...(prev.feedback || []), result.data],
        }))

        // Reset form
        setFeedback({
          rating: 3,
          strengths: "",
          weaknesses: "",
          comments: "",
          recommendation: "consider",
        })
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to submit feedback",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error submitting feedback:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <ProtectedRoute>
        <DashboardShell>
          <div className="flex h-[200px] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </DashboardShell>
      </ProtectedRoute>
    )
  }

  if (!interview) {
    return (
      <ProtectedRoute>
        <DashboardShell>
          <DashboardHeader heading="Interview Not Found" text="The requested interview could not be found." />
        </DashboardShell>
      </ProtectedRoute>
    )
  }

  const hasSubmittedFeedback = interview.feedback?.some((f: any) => f.interviewerId === user?.id)

  return (
    <ProtectedRoute>
      <DashboardShell>
        <DashboardHeader
          heading={`Interview: ${interview.type}`}
          text={`Scheduled for ${new Date(interview.scheduledDate).toLocaleDateString()} at ${interview.startTime}`}
        >
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
        </DashboardHeader>

        <div className="grid gap-6 md:grid-cols-7">
          <div className="md:col-span-5">
            <Tabs defaultValue="details">
              <TabsList>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="transcript">Transcript</TabsTrigger>
                <TabsTrigger value="feedback">Feedback</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Interview Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <h3 className="text-sm font-medium">Type</h3>
                        <p>{interview.type}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">Status</h3>
                        <p>{interview.status}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">Date</h3>
                        <p>{new Date(interview.scheduledDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">Time</h3>
                        <p>
                          {interview.startTime} - {interview.endTime}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">Location</h3>
                        <p>{interview.location || "Not specified"}</p>
                      </div>
                      {interview.meetingLink && (
                        <div>
                          <h3 className="text-sm font-medium">Meeting Link</h3>
                          <a
                            href={interview.meetingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            Join Meeting
                          </a>
                        </div>
                      )}
                    </div>

                    {interview.notes && (
                      <div>
                        <h3 className="text-sm font-medium">Notes</h3>
                        <p className="whitespace-pre-wrap">{interview.notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Candidate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src="/placeholder-user.jpg" alt="Candidate" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">John Doe</p>
                          <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Position</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div>
                        <p className="font-medium">Senior Frontend Developer</p>
                        <p className="text-sm text-muted-foreground">Engineering Department</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Interviewers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {interview.interviewers?.map((interviewer: string, index: number) => (
                        <div key={index} className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src="/placeholder-user.jpg" alt="Interviewer" />
                            <AvatarFallback>IN</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">Interviewer {index + 1}</p>
                            <p className="text-sm text-muted-foreground">{interviewer}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="transcript">
                <Card>
                  <CardHeader>
                    <CardTitle>Interview Transcript</CardTitle>
                    <CardDescription>
                      Record or paste the interview transcript here for future reference.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={transcript}
                      onChange={(e) => setTranscript(e.target.value)}
                      placeholder="Enter interview transcript..."
                      className="min-h-[300px]"
                    />
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveTranscript} disabled={savingTranscript}>
                      {savingTranscript && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      <Save className="mr-2 h-4 w-4" />
                      Save Transcript
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="feedback">
                <div className="space-y-6">
                  {interview.feedback && interview.feedback.length > 0 ? (
                    <div className="space-y-4">
                      {interview.feedback.map((item: any, index: number) => (
                        <Card key={index}>
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle>Feedback from {item.interviewerId}</CardTitle>
                              <Badge>{item.recommendation}</Badge>
                            </div>
                            <CardDescription>
                              Submitted on {new Date(item.submittedAt).toLocaleString()}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div>
                              <h3 className="text-sm font-medium">Rating</h3>
                              <div className="flex items-center">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <svg
                                    key={i}
                                    className={`h-5 w-5 ${i < item.rating ? "text-yellow-400" : "text-gray-300"}`}
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

                            {item.strengths && (
                              <div>
                                <h3 className="text-sm font-medium">Strengths</h3>
                                <p className="whitespace-pre-wrap">{item.strengths}</p>
                              </div>
                            )}

                            {item.weaknesses && (
                              <div>
                                <h3 className="text-sm font-medium">Areas for Improvement</h3>
                                <p className="whitespace-pre-wrap">{item.weaknesses}</p>
                              </div>
                            )}

                            <div>
                              <h3 className="text-sm font-medium">Comments</h3>
                              <p className="whitespace-pre-wrap">{item.comments}</p>
                            </div>

                            <div>
                              <h3 className="text-sm font-medium">Recommendation</h3>
                              <p className="capitalize">{item.recommendation}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="py-6 text-center text-muted-foreground">
                        No feedback has been submitted yet.
                      </CardContent>
                    </Card>
                  )}

                  {!hasSubmittedFeedback && interview.status === "completed" && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Submit Your Feedback</CardTitle>
                        <CardDescription>
                          Provide your assessment of the candidate's performance during the interview.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium mb-2">Rating</h3>
                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <button
                                key={i}
                                type="button"
                                onClick={() => setFeedback({ ...feedback, rating: i + 1 })}
                                className="focus:outline-none"
                              >
                                <svg
                                  className={`h-6 w-6 ${i < feedback.rating ? "text-yellow-400" : "text-gray-300"}`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 15.585l-7.07 3.707 1.35-7.87L.587 7.11l7.89-1.146L10 0l2.523 5.964 7.89 1.146-5.693 5.312 1.35 7.87L10 15.585z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label htmlFor="strengths" className="text-sm font-medium">
                            Strengths
                          </label>
                          <Textarea
                            id="strengths"
                            value={feedback.strengths}
                            onChange={(e) => setFeedback({ ...feedback, strengths: e.target.value })}
                            placeholder="Candidate's strengths..."
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <label htmlFor="weaknesses" className="text-sm font-medium">
                            Areas for Improvement
                          </label>
                          <Textarea
                            id="weaknesses"
                            value={feedback.weaknesses}
                            onChange={(e) => setFeedback({ ...feedback, weaknesses: e.target.value })}
                            placeholder="Areas where the candidate could improve..."
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <label htmlFor="comments" className="text-sm font-medium">
                            Comments
                          </label>
                          <Textarea
                            id="comments"
                            value={feedback.comments}
                            onChange={(e) => setFeedback({ ...feedback, comments: e.target.value })}
                            placeholder="Additional comments about the candidate..."
                            className="mt-1"
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="recommendation" className="text-sm font-medium">
                            Recommendation
                          </label>
                          <select
                            id="recommendation"
                            value={feedback.recommendation}
                            onChange={(e) => setFeedback({ ...feedback, recommendation: e.target.value })}
                            className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          >
                            <option value="hire">Hire</option>
                            <option value="consider">Consider</option>
                            <option value="reject">Reject</option>
                          </select>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button onClick={handleSubmitFeedback} disabled={submitting || !feedback.comments}>
                          {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          Submit Feedback
                        </Button>
                      </CardFooter>
                    </Card>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Interview Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium">Current Status</h3>
                  <Badge
                    className="mt-1"
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

                <div>
                  <h3 className="text-sm font-medium">Date</h3>
                  <p>{new Date(interview.scheduledDate).toLocaleDateString()}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium">Time</h3>
                  <p>
                    {interview.startTime} - {interview.endTime}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium">Duration</h3>
                  <p>60 minutes</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium">Feedback Status</h3>
                  <p>
                    {interview.feedback?.length || 0} of {interview.interviewers?.length || 1} submitted
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-2">
                {interview.status === "scheduled" && (
                  <>
                    <Button className="w-full" variant="outline">
                      Reschedule
                    </Button>
                    <Button className="w-full" variant="destructive">
                      Cancel Interview
                    </Button>
                  </>
                )}

                {interview.status === "scheduled" && <Button className="w-full">Mark as Completed</Button>}
              </CardFooter>
            </Card>
          </div>
        </div>
      </DashboardShell>
    </ProtectedRoute>
  )
}
