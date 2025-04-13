"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function NotificationSettings() {
  const handleSave = () => {
    toast({
      title: "Notification settings saved",
      description: "Your notification preferences have been updated.",
    })
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="email" className="space-y-4">
        <TabsList>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="in-app">In-App</TabsTrigger>
          <TabsTrigger value="mobile">Mobile</TabsTrigger>
        </TabsList>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Configure which email notifications you want to receive.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Candidates</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-new-application">New Application</Label>
                      <p className="text-sm text-muted-foreground">Receive an email when a new candidate applies</p>
                    </div>
                    <Switch id="email-new-application" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-candidate-stage">Candidate Stage Change</Label>
                      <p className="text-sm text-muted-foreground">Receive an email when a candidate changes stage</p>
                    </div>
                    <Switch id="email-candidate-stage" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-candidate-feedback">New Feedback</Label>
                      <p className="text-sm text-muted-foreground">Receive an email when new feedback is submitted</p>
                    </div>
                    <Switch id="email-candidate-feedback" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Interviews</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-interview-scheduled">Interview Scheduled</Label>
                      <p className="text-sm text-muted-foreground">Receive an email when an interview is scheduled</p>
                    </div>
                    <Switch id="email-interview-scheduled" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-interview-reminder">Interview Reminder</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive a reminder email before scheduled interviews
                      </p>
                    </div>
                    <Switch id="email-interview-reminder" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Jobs</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-job-created">Job Created</Label>
                      <p className="text-sm text-muted-foreground">Receive an email when a new job is created</p>
                    </div>
                    <Switch id="email-job-created" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-job-updated">Job Updated</Label>
                      <p className="text-sm text-muted-foreground">Receive an email when a job is updated</p>
                    </div>
                    <Switch id="email-job-updated" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Team</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-team-member-added">Team Member Added</Label>
                      <p className="text-sm text-muted-foreground">Receive an email when a new team member is added</p>
                    </div>
                    <Switch id="email-team-member-added" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-team-member-removed">Team Member Removed</Label>
                      <p className="text-sm text-muted-foreground">Receive an email when a team member is removed</p>
                    </div>
                    <Switch id="email-team-member-removed" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>Save Email Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="in-app">
          <Card>
            <CardHeader>
              <CardTitle>In-App Notifications</CardTitle>
              <CardDescription>Configure which notifications you want to see in the application.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Candidates</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="in-app-new-application">New Application</Label>
                      <p className="text-sm text-muted-foreground">Show notification when a new candidate applies</p>
                    </div>
                    <Switch id="in-app-new-application" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="in-app-candidate-stage">Candidate Stage Change</Label>
                      <p className="text-sm text-muted-foreground">Show notification when a candidate changes stage</p>
                    </div>
                    <Switch id="in-app-candidate-stage" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="in-app-candidate-feedback">New Feedback</Label>
                      <p className="text-sm text-muted-foreground">Show notification when new feedback is submitted</p>
                    </div>
                    <Switch id="in-app-candidate-feedback" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Interviews</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="in-app-interview-scheduled">Interview Scheduled</Label>
                      <p className="text-sm text-muted-foreground">Show notification when an interview is scheduled</p>
                    </div>
                    <Switch id="in-app-interview-scheduled" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="in-app-interview-reminder">Interview Reminder</Label>
                      <p className="text-sm text-muted-foreground">
                        Show reminder notification before scheduled interviews
                      </p>
                    </div>
                    <Switch id="in-app-interview-reminder" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Jobs</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="in-app-job-created">Job Created</Label>
                      <p className="text-sm text-muted-foreground">Show notification when a new job is created</p>
                    </div>
                    <Switch id="in-app-job-created" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="in-app-job-updated">Job Updated</Label>
                      <p className="text-sm text-muted-foreground">Show notification when a job is updated</p>
                    </div>
                    <Switch id="in-app-job-updated" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>Save In-App Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="mobile">
          <Card>
            <CardHeader>
              <CardTitle>Mobile Notifications</CardTitle>
              <CardDescription>
                Configure which notifications you want to receive on your mobile device.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Push Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="mobile-enable-push">Enable Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Allow push notifications on your mobile device</p>
                    </div>
                    <Switch id="mobile-enable-push" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Candidates</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="mobile-new-application">New Application</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive a push notification when a new candidate applies
                      </p>
                    </div>
                    <Switch id="mobile-new-application" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="mobile-candidate-stage">Candidate Stage Change</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive a push notification when a candidate changes stage
                      </p>
                    </div>
                    <Switch id="mobile-candidate-stage" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Interviews</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="mobile-interview-scheduled">Interview Scheduled</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive a push notification when an interview is scheduled
                      </p>
                    </div>
                    <Switch id="mobile-interview-scheduled" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="mobile-interview-reminder">Interview Reminder</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive a push notification reminder before scheduled interviews
                      </p>
                    </div>
                    <Switch id="mobile-interview-reminder" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>Save Mobile Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
