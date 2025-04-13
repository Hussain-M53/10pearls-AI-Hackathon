"use client"

import { Button } from "@/components/ui/button"

import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileSettings } from "@/components/settings/profile-settings"
import { AccountSettings } from "@/components/settings/account-settings"
import { CompanySettings } from "@/components/settings/company-settings"
import { EmailTemplates } from "@/components/settings/email-templates"
import { StageSettings } from "@/components/settings/stage-settings"
import { TeamSettings } from "@/components/settings/team-settings"
import { IntegrationSettings } from "@/components/settings/integration-settings"
import { NotificationSettings } from "@/components/settings/notification-settings"
import { AppearanceSettings } from "@/components/settings/appearance-settings"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"

export default function SettingsPage() {
  const { hasPermission } = useAuth()
  const canManageUsers = hasPermission("manage_users")

  return (
    <ProtectedRoute>
      <DashboardShell>
        <DashboardHeader heading="Settings" text="Manage your ATS preferences and configurations">
          {canManageUsers && (
            <Link href="/settings/users">
              <Button>Manage Users</Button>
            </Link>
          )}
        </DashboardHeader>
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-9 h-auto">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="company">Company</TabsTrigger>
            <TabsTrigger value="email">Email Templates</TabsTrigger>
            <TabsTrigger value="stages">Stages</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <ProfileSettings />
          </TabsContent>
          <TabsContent value="account">
            <AccountSettings />
          </TabsContent>
          <TabsContent value="company">
            <CompanySettings />
          </TabsContent>
          <TabsContent value="email">
            <EmailTemplates />
          </TabsContent>
          <TabsContent value="stages">
            <StageSettings />
          </TabsContent>
          <TabsContent value="team">
            <TeamSettings />
          </TabsContent>
          <TabsContent value="integrations">
            <IntegrationSettings />
          </TabsContent>
          <TabsContent value="notifications">
            <NotificationSettings />
          </TabsContent>
          <TabsContent value="appearance">
            <AppearanceSettings />
          </TabsContent>
        </Tabs>
      </DashboardShell>
    </ProtectedRoute>
  )
}
