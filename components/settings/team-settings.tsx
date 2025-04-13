"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Search, Trash2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type TeamMember = {
  id: string
  name: string
  email: string
  role: string
  avatar: string
  initials: string
  status: "active" | "invited" | "inactive"
}

type Role = {
  id: string
  name: string
  permissions: string[]
}

export function TeamSettings() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Admin",
      avatar: "/placeholder-user.jpg",
      initials: "JD",
      status: "active",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "Recruiter",
      avatar: "/placeholder-user.jpg",
      initials: "JS",
      status: "active",
    },
    {
      id: "3",
      name: "Michael Johnson",
      email: "michael.johnson@example.com",
      role: "Hiring Manager",
      avatar: "/placeholder-user.jpg",
      initials: "MJ",
      status: "active",
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      role: "Interviewer",
      avatar: "/placeholder-user.jpg",
      initials: "ED",
      status: "invited",
    },
  ])

  const [roles, setRoles] = useState<Role[]>([
    {
      id: "admin",
      name: "Admin",
      permissions: ["manage_team", "manage_jobs", "manage_candidates", "manage_settings", "view_analytics"],
    },
    {
      id: "recruiter",
      name: "Recruiter",
      permissions: ["manage_jobs", "manage_candidates", "view_analytics"],
    },
    {
      id: "hiring_manager",
      name: "Hiring Manager",
      permissions: ["manage_jobs", "manage_candidates", "view_analytics"],
    },
    {
      id: "interviewer",
      name: "Interviewer",
      permissions: ["view_candidates"],
    },
  ])

  const [newMember, setNewMember] = useState({
    email: "",
    role: "interviewer",
  })

  const [searchQuery, setSearchQuery] = useState("")

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleInvite = () => {
    const role = roles.find((r) => r.id === newMember.role)

    if (newMember.email && role) {
      const newTeamMember: TeamMember = {
        id: `member-${Date.now()}`,
        name: newMember.email.split("@")[0],
        email: newMember.email,
        role: role.name,
        avatar: "",
        initials: newMember.email.substring(0, 2).toUpperCase(),
        status: "invited",
      }

      setTeamMembers([...teamMembers, newTeamMember])
      setNewMember({ email: "", role: "interviewer" })

      toast({
        title: "Invitation sent",
        description: `An invitation has been sent to ${newMember.email}.`,
      })
    }
  }

  const removeTeamMember = (id: string) => {
    setTeamMembers(teamMembers.filter((member) => member.id !== id))

    toast({
      title: "Team member removed",
      description: "The team member has been removed successfully.",
    })
  }

  const updateRole = (id: string, roleId: string) => {
    const role = roles.find((r) => r.id === roleId)

    if (role) {
      setTeamMembers(teamMembers.map((member) => (member.id === id ? { ...member, role: role.name } : member)))
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="members" className="space-y-4">
        <TabsList>
          <TabsTrigger value="members">Team Members</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
        </TabsList>

        <TabsContent value="members">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Manage your team members and their access to the system.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                <div className="relative max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search team members..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Invite Team Member
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Invite Team Member</DialogTitle>
                      <DialogDescription>Send an invitation to a new team member.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          placeholder="Email address"
                          value={newMember.email}
                          onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Select
                          value={newMember.role}
                          onValueChange={(value) => setNewMember({ ...newMember, role: value })}
                        >
                          <SelectTrigger id="role">
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                          <SelectContent>
                            {roles.map((role) => (
                              <SelectItem key={role.id} value={role.id}>
                                {role.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleInvite}>Send Invitation</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="rounded-md border">
                <div className="grid grid-cols-5 p-4 text-sm font-medium text-muted-foreground">
                  <div className="col-span-2">User</div>
                  <div>Role</div>
                  <div>Status</div>
                  <div className="text-right">Actions</div>
                </div>
                <div className="divide-y">
                  {filteredMembers.map((member) => (
                    <div key={member.id} className="grid grid-cols-5 items-center p-4">
                      <div className="col-span-2 flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                        </div>
                      </div>
                      <div>
                        <Select
                          defaultValue={roles.find((role) => role.name === member.role)?.id}
                          onValueChange={(value) => updateRole(member.id, value)}
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {roles.map((role) => (
                              <SelectItem key={role.id} value={role.id}>
                                {role.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Badge
                          variant={
                            member.status === "active"
                              ? "default"
                              : member.status === "invited"
                                ? "outline"
                                : "secondary"
                          }
                        >
                          {member.status === "active" ? "Active" : member.status === "invited" ? "Invited" : "Inactive"}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => removeTeamMember(member.id)}>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles">
          <Card>
            <CardHeader>
              <CardTitle>Roles & Permissions</CardTitle>
              <CardDescription>Configure roles and their associated permissions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {roles.map((role) => (
                <div key={role.id} className="rounded-md border p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{role.name}</h3>
                      <p className="text-sm text-muted-foreground">{role.permissions.length} permissions</p>
                    </div>
                    {role.id !== "admin" && (
                      <Button variant="outline" size="sm">
                        Edit Role
                      </Button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {role.permissions.map((permission) => (
                      <Badge key={permission} variant="secondary">
                        {permission.replace("_", " ")}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Create New Role
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
