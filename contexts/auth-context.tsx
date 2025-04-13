"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

export type UserRole = "admin" | "manager" | "employee" | "candidate"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  tenantId?: string // For multi-tenant support
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string, tenantId?: string) => Promise<void>
  loginWithMicrosoft: (tenantId?: string) => Promise<void>
  logout: () => Promise<void>
  register: (name: string, email: string, password: string, role?: UserRole, tenantId?: string) => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>
  isAuthenticated: boolean
  hasPermission: (permission: string) => boolean
  currentTenant: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Define permissions for each role
const rolePermissions: Record<UserRole, string[]> = {
  admin: [
    "manage_users",
    "create_user",
    "assign_roles",
    "manage_jobs",
    "manage_candidates",
    "manage_interviews",
    "view_analytics",
    "manage_settings",
  ],
  manager: ["manage_jobs", "manage_candidates", "manage_interviews", "view_analytics", "view_team"],
  employee: ["view_jobs", "view_candidates", "manage_assigned_interviews"],
  candidate: ["view_jobs", "apply_jobs", "view_own_profile", "view_own_applications", "view_own_interviews"],
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentTenant, setCurrentTenant] = useState<string | null>(null)
  const router = useRouter()

  // Extract tenant from hostname
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname
      const tenantMatch = hostname.match(/^([^.]+)\.jobnest\.com$/)
      if (tenantMatch) {
        setCurrentTenant(tenantMatch[1])
      }
    }
  }, [])

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, this would be an API call to validate the session
        const storedUser = localStorage.getItem("ats_user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Authentication error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Update the login function to handle tenant
  const login = async (email: string, password: string, tenantId?: string) => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call to authenticate
      // Simulating authentication for demo purposes
      if (email === "admin@example.com" && password === "password") {
        const user: User = {
          id: "1",
          name: "Admin User",
          email: "admin@example.com",
          role: "admin",
          avatar: "/placeholder-user.jpg",
          tenantId: tenantId || currentTenant || "default",
        }
        setUser(user)
        localStorage.setItem("ats_user", JSON.stringify(user))
        router.push("/dashboard")
        toast({
          title: "Login successful",
          description: "Welcome back, Admin User!",
        })
      } else if (email === "manager@example.com" && password === "password") {
        const user: User = {
          id: "2",
          name: "Manager User",
          email: "manager@example.com",
          role: "manager",
          avatar: "/placeholder-user.jpg",
          tenantId: tenantId || currentTenant || "default",
        }
        setUser(user)
        localStorage.setItem("ats_user", JSON.stringify(user))
        router.push("/dashboard")
        toast({
          title: "Login successful",
          description: "Welcome back, Manager User!",
        })
      } else if (email === "employee@example.com" && password === "password") {
        const user: User = {
          id: "3",
          name: "Employee User",
          email: "employee@example.com",
          role: "employee",
          avatar: "/placeholder-user.jpg",
          tenantId: tenantId || currentTenant || "default",
        }
        setUser(user)
        localStorage.setItem("ats_user", JSON.stringify(user))
        router.push("/dashboard")
        toast({
          title: "Login successful",
          description: "Welcome back, Employee User!",
        })
      } else if (email === "candidate@example.com" && password === "password") {
        const user: User = {
          id: "4",
          name: "Candidate User",
          email: "candidate@example.com",
          role: "candidate",
          avatar: "/placeholder-user.jpg",
          tenantId: tenantId || currentTenant || "default",
        }
        setUser(user)
        localStorage.setItem("ats_user", JSON.stringify(user))
        router.push("/dashboard")
        toast({
          title: "Login successful",
          description: "Welcome back, Candidate User!",
        })
      } else {
        throw new Error("Invalid email or password")
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "An error occurred during login",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithMicrosoft = async (tenantId?: string) => {
    setIsLoading(true)
    try {
      // In a real app, this would redirect to Microsoft OAuth
      // Simulating Microsoft authentication for demo purposes
      setTimeout(() => {
        const user: User = {
          id: "4",
          name: "Microsoft User",
          email: "microsoft.user@example.com",
          role: "employee",
          avatar: "/placeholder-user.jpg",
          tenantId: tenantId || currentTenant || "default",
        }
        setUser(user)
        localStorage.setItem("ats_user", JSON.stringify(user))
        router.push("/dashboard")
        toast({
          title: "Microsoft login successful",
          description: "Welcome, Microsoft User!",
        })
        setIsLoading(false)
      }, 1500)
    } catch (error) {
      setIsLoading(false)
      toast({
        title: "Microsoft login failed",
        description: error instanceof Error ? error.message : "An error occurred during Microsoft login",
        variant: "destructive",
      })
    }
  }

  const logout = async () => {
    // In a real app, this would be an API call to invalidate the session
    setUser(null)
    localStorage.removeItem("ats_user")
    router.push("/login")
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
  }

  const register = async (
    name: string,
    email: string,
    password: string,
    role: UserRole = "employee",
    tenantId?: string,
  ) => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call to register
      // Simulating registration for demo purposes
      setTimeout(() => {
        const user: User = {
          id: Date.now().toString(),
          name,
          email,
          role,
          tenantId: tenantId || currentTenant || "default",
        }
        setUser(user)
        localStorage.setItem("ats_user", JSON.stringify(user))
        router.push("/dashboard")
        toast({
          title: "Registration successful",
          description: `Welcome, ${name}!`,
        })
        setIsLoading(false)
      }, 1500)
    } catch (error) {
      setIsLoading(false)
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "An error occurred during registration",
        variant: "destructive",
      })
    }
  }

  const resetPassword = async (email: string) => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call to send a reset email
      // Simulating password reset for demo purposes
      setTimeout(() => {
        toast({
          title: "Password reset email sent",
          description: "Check your email for instructions to reset your password.",
        })
        setIsLoading(false)
        router.push("/login")
      }, 1500)
    } catch (error) {
      setIsLoading(false)
      toast({
        title: "Password reset failed",
        description: error instanceof Error ? error.message : "An error occurred during password reset",
        variant: "destructive",
      })
    }
  }

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call to update the password
      // Simulating password update for demo purposes
      setTimeout(() => {
        toast({
          title: "Password updated",
          description: "Your password has been successfully updated.",
        })
        setIsLoading(false)
      }, 1500)
    } catch (error) {
      setIsLoading(false)
      toast({
        title: "Password update failed",
        description: error instanceof Error ? error.message : "An error occurred during password update",
        variant: "destructive",
      })
    }
  }

  const hasPermission = (permission: string) => {
    if (!user) return false
    return rolePermissions[user.role].includes(permission)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        loginWithMicrosoft,
        logout,
        register,
        resetPassword,
        updatePassword,
        isAuthenticated: !!user,
        hasPermission,
        currentTenant,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
