"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const templateTypes = [
  { id: "application-received", name: "Application Received" },
  { id: "interview-invitation", name: "Interview Invitation" },
  { id: "assessment-invitation", name: "Assessment Invitation" },
  { id: "offer-letter", name: "Offer Letter" },
  { id: "rejection", name: "Rejection" },
]

export function EmailTemplates() {
  const [activeTemplate, setActiveTemplate] = useState("application-received")
  const [templates, setTemplates] = useState({
    "application-received": {
      subject: "Thank you for your application to {{company_name}}",
      body: `Dear {{candidate_name}},

Thank you for applying for the {{job_title}} position at {{company_name}}. We appreciate your interest in joining our team.

We are currently reviewing your application and will be in touch soon if your qualifications match our requirements for the role.

In the meantime, please feel free to explore our website to learn more about our company culture and values.

Best regards,
{{recruiter_name}}
{{company_name}}`,
    },
    "interview-invitation": {
      subject: "Interview Invitation: {{job_title}} at {{company_name}}",
      body: `Dear {{candidate_name}},

We were impressed by your application for the {{job_title}} position and would like to invite you for an interview.

Please use the link below to select a time that works best for you:
{{interview_scheduling_link}}

The interview will be approximately {{interview_duration}} minutes long and will be conducted {{interview_format}}.

If you have any questions before the interview, please don't hesitate to reach out.

We look forward to speaking with you!

Best regards,
{{recruiter_name}}
{{company_name}}`,
    },
    "assessment-invitation": {
      subject: "Assessment Invitation: {{job_title}} at {{company_name}}",
      body: `Dear {{candidate_name}},

As part of our selection process for the {{job_title}} position, we would like to invite you to complete an assessment.

Please use the link below to access the assessment:
{{assessment_link}}

You will have {{assessment_duration}} to complete the assessment, and it should take approximately {{assessment_estimated_time}} to finish.

The deadline to complete this assessment is {{assessment_deadline}}.

If you have any technical issues or questions, please contact us.

Best regards,
{{recruiter_name}}
{{company_name}}`,
    },
    "offer-letter": {
      subject: "Your Offer from {{company_name}}",
      body: `Dear {{candidate_name}},

We are delighted to offer you the position of {{job_title}} at {{company_name}}!

Based on your experience and qualifications, we are offering you a starting salary of {{salary}} per year, with the following benefits:
- {{benefit_1}}
- {{benefit_2}}
- {{benefit_3}}

Your tentative start date would be {{start_date}}.

Please review the attached formal offer letter for complete details about your compensation package, benefits, and company policies.

To accept this offer, please sign the attached document and return it by {{offer_deadline}}.

We are excited about the possibility of you joining our team and look forward to your positive response.

Best regards,
{{hiring_manager_name}}
{{company_name}}`,
    },
    rejection: {
      subject: "Update on your application to {{company_name}}",
      body: `Dear {{candidate_name}},

Thank you for your interest in the {{job_title}} position at {{company_name}} and for taking the time to apply.

After careful consideration of your application, we regret to inform you that we have decided to move forward with other candidates whose qualifications more closely match our current needs.

We appreciate your interest in our company and encourage you to apply for future positions that align with your skills and experience.

We wish you the best in your job search and professional endeavors.

Best regards,
{{recruiter_name}}
{{company_name}}`,
    },
  })

  const handleSave = () => {
    toast({
      title: "Templates saved",
      description: "Your email templates have been saved successfully.",
    })
  }

  const handleTemplateChange = (templateId: string) => {
    setActiveTemplate(templateId)
  }

  const updateTemplate = (field: string, value: string) => {
    setTemplates({
      ...templates,
      [activeTemplate]: {
        ...templates[activeTemplate as keyof typeof templates],
        [field]: value,
      },
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Email Templates</CardTitle>
          <CardDescription>Customize the email templates used throughout the recruitment process.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
            <div className="md:w-1/3">
              <Label>Template Type</Label>
              <Select value={activeTemplate} onValueChange={handleTemplateChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select template type" />
                </SelectTrigger>
                <SelectContent>
                  {templateTypes.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="mt-4 text-sm text-muted-foreground">
                <p className="mb-2 font-medium">Available Variables:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>{"{{candidate_name}}"}</li>
                  <li>{"{{company_name}}"}</li>
                  <li>{"{{job_title}}"}</li>
                  <li>{"{{recruiter_name}}"}</li>
                  <li>{"{{interview_scheduling_link}}"}</li>
                  <li>{"{{assessment_link}}"}</li>
                  <li>{"{{start_date}}"}</li>
                </ul>
              </div>
            </div>
            <div className="space-y-4 md:w-2/3">
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={templates[activeTemplate as keyof typeof templates].subject}
                  onChange={(e) => updateTemplate("subject", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="body">Email Body</Label>
                <Textarea
                  id="body"
                  value={templates[activeTemplate as keyof typeof templates].body}
                  onChange={(e) => updateTemplate("body", e.target.value)}
                  className="min-h-[300px]"
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave}>Save Templates</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
