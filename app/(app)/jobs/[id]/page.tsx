"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "@/components/ui/use-toast"
import { getJob, updateJob, deleteJob } from "@/app/actions/job-actions"
import { getApplications, applyForJob } from "@/app/actions/candidate-actions"
import { ProtectedRoute } from "@/components/protected-route"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Loader2, Edit, Trash, Calendar, Users, FileText } from "lucide-react"

export default function JobDetailsPage() {
  const { id } = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [job, setJob] = useState<any>(null)
  const [applications, setApplications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [applying, setApplying] = useState(false)
  const [hasApplied, setHasApplied] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const fetchJobAndApplications = async () => {
      if (!id || !user?.tenantId) return

      try {
        const jobResult = await getJob(id as string, user.tenantId)
        if (jobResult.success) {
          setJob(jobResult.data)
        } else {
          toast({
            title: "Error",
            description: jobResult.error || "Failed to fetch job details",
            variant: "destructive",
          })
          router.push("/jobs")
          return
        }

        // If user is a candidate, check if they've already applied
        if (user.role === "candidate") {
          const applicationsResult = await getApplications(user.tenantId, {
            candidateId: user.id,
            jobId: id as string,
          })

          if (applicationsResult.success && applicationsResult.data.length > 0) {
            setHasApplied(true)
          }
        } else {
          // For employers, fetch all applications for this job
          const applicationsResult = await getApplications(user.tenantId, { jobId: id as string })
          if (applicationsResult.success) {
            setApplications(applicationsResult.data || [])
          }
        }
      } catch (error) {
        console.error("Error fetching job details:", error)
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchJobAndApplications()
  }, [id, user?.tenantId, user?.id, user?.role, router])

  const handleApply = async () => {
    if (!id || !user?.id || !user?.tenantId) return

    setApplying(true)
    try {
      const result = await applyForJob({
        candidateId: user.id,
        jobId: id as string,
        status: "applied",
        tenantId: user.tenantId,
      })

      if (result.success) {
        setHasApplied(true)
        toast({
          title: "Application submitted",
          description: "Your application has been submitted successfully.",
        })
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to submit application",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error applying for job:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setApplying(false)
    }
  }

  const handleStatusChange = async (status: string) => {
    if (!id || !user?.tenantId) return

    try {
      const result = await updateJob(id as string, {
        status,
        tenantId: user.tenantId,
      })

      if (result.success) {
        setJob({ ...job, status })
        toast({
          title: "Status updated",
          description: `Job status has been updated to ${status}.`,
        })
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to update job status",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating job status:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    }
  }

  const handleDeleteJob = async () => {
    if (!id || !user?.tenantId) return

    setDeleting(true)
    try {
      const result = await deleteJob(id as string, user.tenantId)

      if (result.success) {
        toast({
          title: "Job deleted",
          description: "The job has been deleted successfully.",
        })
        router.push("/jobs")
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to delete job",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting job:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setDeleting(false)
    }
  }

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

  if (!job) {
    return (
      <ProtectedRoute>
        <DashboardShell>
          <DashboardHeader heading="Job Not Found" text="The requested job could not be found." />
        </DashboardShell>
      </ProtectedRoute>
    )
  }

  const isEmployer = user?.role === "admin" || user?.role === "manager" || user?.role === "employee"
  const canEdit = user?.role === "admin" || user?.role === "manager"

  return (
    <ProtectedRoute>
      <DashboardShell>
        <DashboardHeader heading={job.title} text={`${job.department} • ${job.location}`}>
          <div className="flex items-center gap-2">
            {getStatusBadge(job.status)}
            {user?.role === "candidate" && job.status === "open" && (
              <Button onClick={handleApply} disabled={applying || hasApplied}>
                {applying ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : hasApplied ? "Applied" : "Apply Now"}
              </Button>
            )}
            {canEdit && (
              <>
                <Button variant="outline" asChild>
                  <a href={`/jobs/${id}/edit`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </a>
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the job and all associated
                        applications.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteJob} disabled={deleting}>
                        {deleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            )}
          </div>
        </DashboardHeader>

        <div className="grid gap-6 md:grid-cols-7">
          <div className="md:col-span-5">
            <Tabs defaultValue="details">
              <TabsList>
                <TabsTrigger value="details">Details</TabsTrigger>
                {isEmployer && <TabsTrigger value="applications">Applications</TabsTrigger>}
                {isEmployer && <TabsTrigger value="interviews">Interviews</TabsTrigger>}
              </TabsList>

              <TabsContent value="details" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Job Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      <p className="whitespace-pre-wrap">{job.description}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2">
                      {job.requirements?.map((requirement: string, index: number) => (
                        <li key={index}>{requirement}</li>
                      )) || <li>No specific requirements listed.</li>}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Responsibilities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2">
                      {job.responsibilities?.map((responsibility: string, index: number) => (
                        <li key={index}>{responsibility}</li>
                      )) || <li>No specific responsibilities listed.</li>}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              {isEmployer && (
                <TabsContent value="applications" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Applications</CardTitle>
                      <CardDescription>
                        {applications.length} application{applications.length !== 1 ? "s" : ""} received
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {applications.length === 0 ? (
                        <div className="text-center py-4 text-muted-foreground">
                          No applications have been received yet.
                        </div>
                      ) : (
                        <div className="rounded-md border">
                          <div className="grid grid-cols-4 p-4 text-sm font-medium text-muted-foreground">
                            <div className="col-span-2">Candidate</div>
                            <div>Status</div>
                            <div className="text-right">Actions</div>
                          </div>
                          <div className="divide-y">
                            {applications.map((application) => (
                              <div key={application.id} className="grid grid-cols-4 items-center p-4">
                                <div className="col-span-2">
                                  <p className="font-medium">{application.candidateName || "Candidate"}</p>
                                  <p className="text-sm text-muted-foreground">
                                    Applied: {new Date(application.appliedDate).toLocaleDateString()}
                                  </p>
                                </div>
                                <div>
                                  <Badge
                                    variant={
                                      application.status === "applied"
                                        ? "default"
                                        : application.status === "reviewing"
                                          ? "secondary"
                                          : application.status === "interviewed"
                                            ? "warning"
                                            : application.status === "rejected"
                                              ? "destructive"
                                              : application.status === "hired"
                                                ? "success"
                                                : "outline"
                                    }
                                  >
                                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                  </Badge>
                                </div>
                                <div className="text-right">
                                  <Button variant="outline" size="sm" asChild>
                                    <a href={`/candidates/${application.candidateId}`}>View Profile</a>
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              )}

              {isEmployer && (
                <TabsContent value="interviews" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Scheduled Interviews</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-4 text-muted-foreground">
                        No interviews scheduled for this position yet.
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" asChild>
                        <a href="/interviews/schedule">
                          <Calendar className="mr-2 h-4 w-4" />
                          Schedule Interview
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              )}
            </Tabs>
          </div>

          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium">Department</h3>
                  <p>{job.department}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Location</h3>
                  <p>{job.location}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Job Type</h3>
                  <p className="capitalize">{job.type}</p>
                </div>
                {job.salary && (
                  <div>
                    <h3 className="text-sm font-medium">Salary Range</h3>
                    <p>{job.salary}</p>
                  </div>
                )}
                <div>
                  <h3 className="text-sm font-medium">Posted Date</h3>
                  <p>{new Date(job.postedDate || job.createdAt).toLocaleDateString()}</p>
                </div>
                {job.closingDate && (
                  <div>
                    <h3 className="text-sm font-medium">Closing Date</h3>
                    <p>{new Date(job.closingDate).toLocaleDateString()}</p>
                  </div>
                )}
                <div>
                  <h3 className="text-sm font-medium">Status</h3>
                  <div className="mt-1">{getStatusBadge(job.status)}</div>
                </div>
              </CardContent>
              {canEdit && (
                <CardFooter className="flex flex-col items-start gap-2">
                  {job.status === "draft" && (
                    <Button className="w-full" onClick={() => handleStatusChange("open")}>
                      Publish Job
                    </Button>
                  )}
                  {job.status === "open" && (
                    <Button className="w-full" variant="outline" onClick={() => handleStatusChange("paused")}>
                      Pause Job
                    </Button>
                  )}
                  {job.status === "paused" && (
                    <Button className="w-full" onClick={() => handleStatusChange("open")}>
                      Resume Job
                    </Button>
                  )}
                  {(job.status === "open" || job.status === "paused") && (
                    <Button className="w-full" variant="destructive" onClick={() => handleStatusChange("closed")}>
                      Close Job
                    </Button>
                  )}
                </CardFooter>
              )}
            </Card>

            {isEmployer && (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href={`/jobs/${id}/applications`}>
                      <FileText className="mr-2 h-4 w-4" />
                      View All Applications
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href={`/jobs/${id}/candidates`}>
                      <Users className="mr-2 h-4 w-4" />
                      Manage Candidates
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="/interviews/schedule">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Interviews
                    </a>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </DashboardShell>
    </ProtectedRoute>
  )
}
