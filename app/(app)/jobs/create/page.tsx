"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "@/components/ui/use-toast"
import { createJob } from "@/app/actions/job-actions"
import { ProtectedRoute } from "@/components/protected-route"
import { Loader2, Plus, Trash } from "lucide-react"

export default function CreateJobPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [saving, setSaving] = useState(false)
  const [jobData, setJobData] = useState({
    title: "",
    department: "",
    location: "",
    type: "full-time",
    status: "draft",
    description: "",
    requirements: [""],
    responsibilities: [""],
    salary: "",
    closingDate: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setJobData({ ...jobData, [field]: value })
  }

  const handleArrayInputChange = (field: string, index: number, value: string) => {
    const newArray = [...jobData[field as keyof typeof jobData]] as string[]
    newArray[index] = value
    setJobData({ ...jobData, [field]: newArray })
  }

  const addArrayItem = (field: string) => {
    const newArray = [...jobData[field as keyof typeof jobData]] as string[]
    newArray.push("")
    setJobData({ ...jobData, [field]: newArray })
  }

  const removeArrayItem = (field: string, index: number) => {
    const newArray = [...jobData[field as keyof typeof jobData]] as string[]
    newArray.splice(index, 1)
    setJobData({ ...jobData, [field]: newArray })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user?.id || !user?.tenantId) return

    setSaving(true)
    try {
      // Filter out empty requirements and responsibilities
      const filteredRequirements = jobData.requirements.filter((item) => item.trim() !== "")
      const filteredResponsibilities = jobData.responsibilities.filter((item) => item.trim() !== "")

      const result = await createJob({
        ...jobData,
        requirements: filteredRequirements,
        responsibilities: filteredResponsibilities,
        postedDate: jobData.status === "open" ? new Date().toISOString() : undefined,
        tenantId: user.tenantId,
        createdBy: user.id,
      })

      if (result.success) {
        toast({
          title: "Job created",
          description: "The job has been created successfully.",
        })
        router.push("/jobs")
      } else {
        toast({
          title: "Error",
          description: "Failed to create job. Please check the form and try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error creating job:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <ProtectedRoute permissions={["manage_jobs"]}>
      <DashboardShell>
        <DashboardHeader heading="Create Job" text="Create a new job listing" />

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    value={jobData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="e.g., Senior Frontend Developer"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={jobData.department}
                      onChange={(e) => handleInputChange("department", e.target.value)}
                      placeholder="e.g., Engineering"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={jobData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      placeholder="e.g., New York, NY or Remote"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="type">Job Type</Label>
                    <Select value={jobData.type} onValueChange={(value) => handleInputChange("type", value)}>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                        <SelectItem value="temporary">Temporary</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={jobData.status} onValueChange={(value) => handleInputChange("status", value)}>
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select job status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="paused">Paused</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="salary">Salary Range (Optional)</Label>
                    <Input
                      id="salary"
                      value={jobData.salary}
                      onChange={(e) => handleInputChange("salary", e.target.value)}
                      placeholder="e.g., $80,000 - $100,000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="closingDate">Closing Date (Optional)</Label>
                    <Input
                      id="closingDate"
                      type="date"
                      value={jobData.closingDate}
                      onChange={(e) => handleInputChange("closingDate", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Job Description</Label>
                  <Textarea
                    id="description"
                    value={jobData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Describe the job role, responsibilities, and other details"
                    className="min-h-[150px]"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {jobData.requirements.map((requirement, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={requirement}
                      onChange={(e) => handleArrayInputChange("requirements", index, e.target.value)}
                      placeholder={`Requirement ${index + 1}`}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeArrayItem("requirements", index)}
                      disabled={jobData.requirements.length <= 1}
                    >
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Remove requirement</span>
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("requirements")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Requirement
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Responsibilities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {jobData.responsibilities.map((responsibility, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={responsibility}
                      onChange={(e) => handleArrayInputChange("responsibilities", index, e.target.value)}
                      placeholder={`Responsibility ${index + 1}`}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeArrayItem("responsibilities", index)}
                      disabled={jobData.responsibilities.length <= 1}
                    >
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Remove responsibility</span>
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("responsibilities")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Responsibility
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
                <div className="flex gap-2">
                  <Button type="submit" disabled={saving}>
                    {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create Job
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </form>
      </DashboardShell>
    </ProtectedRoute>
  )
}
