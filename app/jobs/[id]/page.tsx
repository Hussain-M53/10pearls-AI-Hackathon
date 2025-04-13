import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { JobCandidates } from "@/components/job-candidates"
import { JobDescription } from "@/components/job-description"
import { JobActivity } from "@/components/job-activity"
import { ArrowLeft, Edit, Users } from "lucide-react"
import Link from "next/link"

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the job details based on the ID
  const job = {
    id: Number.parseInt(params.id),
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    status: "Active",
    applicants: 24,
    posted: "2 weeks ago",
    salary: "$120,000 - $150,000",
    description: "We are looking for an experienced Frontend Developer to join our team...",
    requirements: [
      "5+ years of experience with React",
      "Strong TypeScript skills",
      "Experience with Next.js",
      "Understanding of UI/UX principles",
      "Experience with state management libraries",
    ],
    responsibilities: [
      "Develop new user-facing features",
      "Build reusable components and libraries",
      "Optimize applications for maximum speed and scalability",
      "Collaborate with backend developers and designers",
      "Participate in code reviews and mentor junior developers",
    ],
  }

  return (
    <DashboardShell>
      <div className="flex items-center mb-4">
        <Button variant="ghost" size="icon" asChild className="mr-2">
          <Link href="/jobs">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <DashboardHeader heading={job.title} text={`${job.department} • ${job.location}`}>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href={`/jobs/${job.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button>
            <Button asChild>
              <Link href={`/jobs/${job.id}/candidates`}>
                <Users className="mr-2 h-4 w-4" />
                View Candidates
              </Link>
            </Button>
          </div>
        </DashboardHeader>
      </div>
      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-5">
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
            <CardDescription>Complete information about this position</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="description">
              <TabsList className="mb-4">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="candidates">Candidates</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>
              <TabsContent value="description">
                <JobDescription job={job} />
              </TabsContent>
              <TabsContent value="candidates">
                <JobCandidates jobId={job.id} />
              </TabsContent>
              <TabsContent value="activity">
                <JobActivity jobId={job.id} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Job Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium">Status</p>
              <Badge
                className="mt-1"
                variant={job.status === "Active" ? "default" : job.status === "Draft" ? "outline" : "secondary"}
              >
                {job.status}
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium">Job Type</p>
              <p className="text-sm">{job.type}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Location</p>
              <p className="text-sm">{job.location}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Department</p>
              <p className="text-sm">{job.department}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Salary Range</p>
              <p className="text-sm">{job.salary}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Posted</p>
              <p className="text-sm">{job.posted}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Applicants</p>
              <p className="text-sm">{job.applicants} candidates</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
