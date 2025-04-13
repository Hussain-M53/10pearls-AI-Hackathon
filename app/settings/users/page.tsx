"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { ProtectedRoute } from "@/components/protected-route"
import type { UserRole } from "@/contexts/auth-context"

type User = {
  id: string
  name: string
  email: string
  role: UserRole
  avatar: string
  initials: string
  status: "active" | "invited" | "inactive"
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Admin User",
      email: "admin@example.com",
      role: "admin",
      avatar: "/placeholder-user.jpg",
      initials: "AU",
      status: "active",
    },
    {
      id: "2",
      name: "Manager User",
      email: "manager@example.com",
      role: "manager",
      avatar: "/placeholder-user.jpg",
      initials: "MU",
      status: "active",
    },
    {
      id: "3",
      name: "Employee User",
      email: "employee@example.com",
      role: "employee",
      avatar: "/placeholder-user.jpg",
      initials: "EU",
      status: "active",
    },
    {
      id: "4",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "manager",
      avatar: "/placeholder-user.jpg",
      initials: "JS",
      status: "active",
    },
    {
      id: "5",
      name: "Michael Johnson",
      email: "michael.johnson@example.com",
      role: "employee",
      avatar: "/placeholder-user.jpg",
      initials: "MJ",
      status: "invited",
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "employee" as UserRole,
  })

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleInvite = () => {
    if (newUser.name && newUser.email) {
      const newUserObj: User = {
        id: `user-${Date.now()}`,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        avatar: "",
        initials: newUser.name.substring(0, 2).toUpperCase(),
        status: "invited",
      }

      setUsers([...users, newUserObj])
      setNewUser({ name: "", email: "", role: "employee" })

      toast({
        title: "Invitation sent",
        description: `An invitation has been sent to ${newUser.email}.`,
      })
    }
  }

  const removeUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id))

    toast({
      title: "User removed",
      description: "The user has been removed successfully.",
    })
  }

  const updateRole = (id: string, role: UserRole) => {
    setUsers(users.map((user) => (user.id === id ? { ...user, role } : user)))

    toast({
      title: "Role updated",
      description: "The user's role has been updated successfully.",
    })
  }

  return (
    <ProtectedRoute requiredPermission="manage_users">
      <DashboardShell>
        <DashboardHeader heading="User Management" text="Manage users and their roles">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>Invite a new user to join the system.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Full name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="Email address"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={newUser.role}
                    onValueChange={(value) => setNewUser({ ...newUser, role: value as UserRole })}
                  >
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="employee">Employee</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleInvite}>Send Invitation</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </DashboardHeader>

        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>Manage your team members and their access to the system.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div className="relative max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="rounded-md border">
              <div className="grid grid-cols-5 p-4 text-sm font-medium text-muted-foreground">
                <div className="col-span-2">User</div>
                <div>Role</div>
                <div>Status</div>
                <div className="text-right">Actions</div>
              </div>
              <div className="divide-y">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="grid grid-cols-5 items-center p-4">
                    <div className="col-span-2 flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <div>
                      <Select
                        defaultValue={user.role}
                        onValueChange={(value) => updateRole(user.id, value as UserRole)}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                          <SelectItem value="employee">Employee</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Badge
                        variant={
                          user.status === "active" ? "default" : user.status === "invited" ? "outline" : "secondary"
                        }
                      >
                        {user.status === "active" ? "Active" : user.status === "invited" ? "Invited" : "Inactive"}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => removeUser(user.id)}>
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
      </DashboardShell>
    </ProtectedRoute>
  )
}
