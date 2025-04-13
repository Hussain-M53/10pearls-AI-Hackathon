"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Calendar, Mail, FileText, Globe, Database, MessageSquare } from "lucide-react"

export function IntegrationSettings() {
  const handleConnect = (service: string) => {
    toast({
      title: `Connected to ${service}`,
      description: `Your ${service} account has been successfully connected.`,
    })
  }

  const handleDisconnect = (service: string) => {
    toast({
      title: `Disconnected from ${service}`,
      description: `Your ${service} account has been disconnected.`,
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Calendar Integrations</CardTitle>
          <CardDescription>Connect your calendar to schedule interviews and manage events.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-4 rounded-md border p-4">
            <div className="flex items-center space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium">Google Calendar</h3>
                <p className="text-sm text-muted-foreground">Sync interviews with your Google Calendar</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => handleConnect("Google Calendar")}>
              Connect
            </Button>
          </div>
          <div className="flex items-center justify-between space-x-4 rounded-md border p-4">
            <div className="flex items-center space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium">Microsoft Outlook</h3>
                <p className="text-sm text-muted-foreground">Sync interviews with your Outlook Calendar</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => handleConnect("Microsoft Outlook")}>
              Connect
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Email Integrations</CardTitle>
          <CardDescription>Connect your email provider to send and receive emails.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-4 rounded-md border p-4">
            <div className="flex items-center space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
                <Mail className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="font-medium">Gmail</h3>
                <p className="text-sm text-muted-foreground">Send emails through your Gmail account</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => handleConnect("Gmail")}>
              Connect
            </Button>
          </div>
          <div className="flex items-center justify-between space-x-4 rounded-md border p-4">
            <div className="flex items-center space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium">Microsoft Outlook</h3>
                <p className="text-sm text-muted-foreground">Send emails through your Outlook account</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => handleConnect("Outlook")}>
              Connect
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Job Board Integrations</CardTitle>
          <CardDescription>Connect to job boards to automatically post your open positions.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-4 rounded-md border p-4">
            <div className="flex items-center space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <Globe className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-medium">LinkedIn</h3>
                <p className="text-sm text-muted-foreground">Post jobs to LinkedIn and import candidates</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => handleConnect("LinkedIn")}>
              Connect
            </Button>
          </div>
          <div className="flex items-center justify-between space-x-4 rounded-md border p-4">
            <div className="flex items-center space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium">Indeed</h3>
                <p className="text-sm text-muted-foreground">Post jobs to Indeed and import candidates</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => handleConnect("Indeed")}>
              Connect
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Other Integrations</CardTitle>
          <CardDescription>Connect to other services to enhance your recruitment process.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-4 rounded-md border p-4">
            <div className="flex items-center space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-medium">Resume Parser</h3>
                <p className="text-sm text-muted-foreground">Automatically extract data from resumes</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="resume-parser" defaultChecked />
              <Label htmlFor="resume-parser">Enabled</Label>
            </div>
          </div>
          <div className="flex items-center justify-between space-x-4 rounded-md border p-4">
            <div className="flex items-center space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900">
                <MessageSquare className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <h3 className="font-medium">Video Interviews</h3>
                <p className="text-sm text-muted-foreground">Integrate with video conferencing tools</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="video-interviews" />
              <Label htmlFor="video-interviews">Disabled</Label>
            </div>
          </div>
          <div className="flex items-center justify-between space-x-4 rounded-md border p-4">
            <div className="flex items-center space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-100 dark:bg-cyan-900">
                <Database className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
              </div>
              <div>
                <h3 className="font-medium">Background Checks</h3>
                <p className="text-sm text-muted-foreground">Integrate with background check providers</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="background-checks" />
              <Label htmlFor="background-checks">Disabled</Label>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() =>
              toast({ title: "Settings saved", description: "Your integration settings have been saved." })
            }
          >
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
