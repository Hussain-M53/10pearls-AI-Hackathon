"use client"

import { useState, useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "@/components/ui/use-toast"
import { getCandidateByUserId, updateCandidate, createCandidate } from "@/app/actions/candidate-actions"
import { ProtectedRoute } from "@/components/protected-route"
import { Loader2, Plus, Trash, Upload } from "lucide-react"

export default function CandidateProfilePage() {
  const { user } = useAuth()
  const [candidate, setCandidate] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("personal")

  // Form state
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    headline: "",
    summary: "",
  })

  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState("")

  const [experiences, setExperiences] = useState<any[]>([])
  const [newExperience, setNewExperience] = useState({
    title: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  })

  const [education, setEducation] = useState<any[]>([])
  const [newEducation, setNewEducation] = useState({
    institution: "",
    degree: "",
    field: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  })

  const [links, setLinks] = useState({
    resumeUrl: "",
    portfolioUrl: "",
    linkedinUrl: "",
    githubUrl: "",
  })

  useEffect(() => {
    const fetchCandidate = async () => {
      if (!user?.id || !user?.tenantId) return

      try {
        const result = await getCandidateByUserId(user.id, user.tenantId)
        if (result.success) {
          setCandidate(result.data)

          // Initialize form state with candidate data
          setPersonalInfo({
            firstName: result.data.firstName || "",
            lastName: result.data.lastName || "",
            email: result.data.email || user.email || "",
            phone: result.data.phone || "",
            location: result.data.location || "",
            headline: result.data.headline || "",
            summary: result.data.summary || "",
          })

          setSkills(result.data.skills || [])
          setExperiences(result.data.experience || [])
          setEducation(result.data.education || [])
          setLinks({
            resumeUrl: result.data.resumeUrl || "",
            portfolioUrl: result.data.portfolioUrl || "",
            linkedinUrl: result.data.linkedinUrl || "",
            githubUrl: result.data.githubUrl || "",
          })
        } else {
          // Create a new candidate profile if none exists
          setPersonalInfo({
            firstName: "",
            lastName: "",
            email: user.email || "",
            phone: "",
            location: "",
            headline: "",
            summary: "",
          })
        }
      } catch (error) {
        console.error("Error fetching candidate profile:", error)
        toast({
          title: "Error",
          description: "Failed to load your profile. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchCandidate()
  }, [user?.id, user?.tenantId, user?.email])

  const handleSaveProfile = async () => {
    if (!user?.id || !user?.tenantId) return

    setSaving(true)
    try {
      const candidateData = {
        userId: user.id,
        tenantId: user.tenantId,
        ...personalInfo,
        skills,
        experience: experiences,
        education,
        ...links,
      }

      let result
      if (candidate) {
        result = await updateCandidate(candidate.id, candidateData)
      } else {
        result = await createCandidate(candidateData)
      }

      if (result.success) {
        setCandidate(result.data)
        toast({
          title: "Profile saved",
          description: "Your profile has been updated successfully.",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to save your profile. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error saving profile:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  const addExperience = () => {
    if (newExperience.title && newExperience.company) {
      setExperiences([...experiences, { ...newExperience, id: Date.now().toString() }])
      setNewExperience({
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      })
    }
  }

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter((exp) => exp.id !== id))
  }

  const addEducation = () => {
    if (newEducation.institution && newEducation.degree) {
      setEducation([...education, { ...newEducation, id: Date.now().toString() }])
      setNewEducation({
        institution: "",
        degree: "",
        field: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      })
    }
  }

  const removeEducation = (id: string) => {
    setEducation(education.filter((edu) => edu.id !== id))
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

  return (
    <ProtectedRoute>
      <DashboardShell>
        <DashboardHeader heading="Candidate Profile" text="Manage your professional profile and application materials">
          <Button onClick={handleSaveProfile} disabled={saving}>
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Profile
          </Button>
        </DashboardHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your basic information and contact details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={personalInfo.firstName}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, firstName: e.target.value })}
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={personalInfo.lastName}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, lastName: e.target.value })}
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={personalInfo.email}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={personalInfo.phone}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={personalInfo.location}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                    placeholder="City, State, Country"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="headline">Professional Headline</Label>
                  <Input
                    id="headline"
                    value={personalInfo.headline}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, headline: e.target.value })}
                    placeholder="e.g., Senior Software Engineer with 5+ years of experience"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="summary">Professional Summary</Label>
                  <Textarea
                    id="summary"
                    value={personalInfo.summary}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, summary: e.target.value })}
                    placeholder="Write a brief summary of your professional background and career goals"
                    className="min-h-[150px]"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Links & Documents</CardTitle>
                <CardDescription>Add your resume and professional profiles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="resumeUrl">Resume</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="resumeUrl"
                      value={links.resumeUrl}
                      onChange={(e) => setLinks({ ...links, resumeUrl: e.target.value })}
                      placeholder="Upload or enter URL to your resume"
                      className="flex-1"
                    />
                    <Button variant="outline" size="icon">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="portfolioUrl">Portfolio Website</Label>
                  <Input
                    id="portfolioUrl"
                    value={links.portfolioUrl}
                    onChange={(e) => setLinks({ ...links, portfolioUrl: e.target.value })}
                    placeholder="https://yourportfolio.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedinUrl">LinkedIn Profile</Label>
                  <Input
                    id="linkedinUrl"
                    value={links.linkedinUrl}
                    onChange={(e) => setLinks({ ...links, linkedinUrl: e.target.value })}
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="githubUrl">GitHub Profile</Label>
                  <Input
                    id="githubUrl"
                    value={links.githubUrl}
                    onChange={(e) => setLinks({ ...links, githubUrl: e.target.value })}
                    placeholder="https://github.com/yourusername"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
                <CardDescription>Add your technical and professional skills</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-1 rounded-full p-0.5 hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Trash className="h-3 w-3" />
                        <span className="sr-only">Remove {skill}</span>
                      </button>
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill (e.g., JavaScript, Project Management)"
                    className="flex-1"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addSkill()
                      }
                    }}
                  />
                  <Button type="button" onClick={addSkill} size="sm">
                    <Plus className="mr-1 h-4 w-4" />
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experience" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Work Experience</CardTitle>
                <CardDescription>Add your professional experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {experiences.map((exp, index) => (
                  <div key={exp.id} className="rounded-lg border p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{exp.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {exp.company} {exp.location && `• ${exp.location}`}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeExperience(exp.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Remove experience</span>
                      </Button>
                    </div>
                    {exp.description && <p className="mt-2 text-sm">{exp.description}</p>}
                  </div>
                ))}

                <div className="rounded-lg border p-4">
                  <h3 className="mb-4 font-medium">Add New Experience</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="jobTitle">Job Title</Label>
                        <Input
                          id="jobTitle"
                          value={newExperience.title}
                          onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
                          placeholder="e.g., Software Engineer"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          value={newExperience.company}
                          onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                          placeholder="e.g., Acme Inc."
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="jobLocation">Location</Label>
                      <Input
                        id="jobLocation"
                        value={newExperience.location}
                        onChange={(e) => setNewExperience({ ...newExperience, location: e.target.value })}
                        placeholder="e.g., New York, NY (Optional)"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input
                          id="startDate"
                          type="month"
                          value={newExperience.startDate}
                          onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="endDate">End Date</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            id="endDate"
                            type="month"
                            value={newExperience.endDate}
                            onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
                            disabled={newExperience.current}
                          />
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id="currentJob"
                              checked={newExperience.current}
                              onChange={(e) =>
                                setNewExperience({ ...newExperience, current: e.target.checked, endDate: "" })
                              }
                              className="h-4 w-4 rounded border-gray-300"
                            />
                            <Label htmlFor="currentJob" className="text-sm">
                              Current
                            </Label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="jobDescription">Description</Label>
                      <Textarea
                        id="jobDescription"
                        value={newExperience.description}
                        onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                        placeholder="Describe your responsibilities and achievements"
                      />
                    </div>

                    <Button type="button" onClick={addExperience}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Experience
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="education" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
                <CardDescription>Add your educational background</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {education.map((edu, index) => (
                  <div key={edu.id} className="rounded-lg border p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{edu.degree}</h3>
                        <p className="text-sm">{edu.field}</p>
                        <p className="text-sm text-muted-foreground">{edu.institution}</p>
                        <p className="text-sm text-muted-foreground">
                          {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeEducation(edu.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Remove education</span>
                      </Button>
                    </div>
                    {edu.description && <p className="mt-2 text-sm">{edu.description}</p>}
                  </div>
                ))}

                <div className="rounded-lg border p-4">
                  <h3 className="mb-4 font-medium">Add New Education</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="institution">Institution</Label>
                      <Input
                        id="institution"
                        value={newEducation.institution}
                        onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                        placeholder="e.g., University of California"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="degree">Degree</Label>
                        <Input
                          id="degree"
                          value={newEducation.degree}
                          onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                          placeholder="e.g., Bachelor of Science"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="field">Field of Study</Label>
                        <Input
                          id="field"
                          value={newEducation.field}
                          onChange={(e) => setNewEducation({ ...newEducation, field: e.target.value })}
                          placeholder="e.g., Computer Science"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="eduStartDate">Start Date</Label>
                        <Input
                          id="eduStartDate"
                          type="month"
                          value={newEducation.startDate}
                          onChange={(e) => setNewEducation({ ...newEducation, startDate: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="eduEndDate">End Date</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            id="eduEndDate"
                            type="month"
                            value={newEducation.endDate}
                            onChange={(e) => setNewEducation({ ...newEducation, endDate: e.target.value })}
                            disabled={newEducation.current}
                          />
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id="currentEducation"
                              checked={newEducation.current}
                              onChange={(e) =>
                                setNewEducation({ ...newEducation, current: e.target.checked, endDate: "" })
                              }
                              className="h-4 w-4 rounded border-gray-300"
                            />
                            <Label htmlFor="currentEducation" className="text-sm">
                              Current
                            </Label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="eduDescription">Description</Label>
                      <Textarea
                        id="eduDescription"
                        value={newEducation.description}
                        onChange={(e) => setNewEducation({ ...newEducation, description: e.target.value })}
                        placeholder="Additional information about your education (Optional)"
                      />
                    </div>

                    <Button type="button" onClick={addEducation}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Education
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DashboardShell>
    </ProtectedRoute>
  )
}
