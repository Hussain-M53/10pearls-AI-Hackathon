"use client"

import { usePathname } from "next/navigation"
import { BarChart3, Briefcase, Calendar, FileText, Home, MessageSquare, Settings, Users } from "lucide-react"

import { useAuth } from "@/contexts/auth-context"
import {
  Sidebar,
  SidebarRail,
} from "@/components/ui/sidebar"
import { UserNav } from "@/components/user-nav"

export function AppSidebar() {
  const pathname = usePathname()
  const { user } = useAuth()

  // Define navigation items based on user role
  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
      role: ["admin", "recruiter", "interviewer", "candidate"],
    },
    {
      title: "Jobs",
      href: "/jobs",
      icon: Briefcase,
      role: ["admin", "recruiter", "interviewer"],
    },
    {
      title: "Applications",
      href: "/applications",
      icon: FileText,
      role: ["candidate"],
    },
    {
      title: "Candidates",
      href: "/candidates",
      icon: Users,
      role: ["admin", "recruiter", "interviewer"],
    },
    {
      title: "Interviews",
      href: "/interviews",
      icon: Calendar,
      role: ["admin", "recruiter", "interviewer", "candidate"],
    },
    {
      title: "Feedback",
      href: "/feedback",
      icon: MessageSquare,
      role: ["admin", "recruiter", "interviewer"],
    },
    {
      title: "Reports",
      href: "/reports",
      icon: BarChart3,
      role: ["admin", "recruiter"],
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
      role: ["admin", "recruiter"],
    },
  ]

  // Filter navigation items based on user role
  const filteredNavItems = navItems.filter((item) => user?.role && item.role.includes(user.role))

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
            ATS
          </div>
          <span className="text-lg font-semibold">ATS System</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href || pathname?.startsWith(`${item.href}/`)}
                    tooltip={item.title}
                  >
                    <a href={item.href}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <UserNav />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
