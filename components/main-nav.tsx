"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/user-nav"
import { MenuIcon } from "lucide-react"
import { useSidebar } from "@/components/sidebar-provider"

export function MainNav() {
  const pathname = usePathname()
  const { toggleSidebar } = useSidebar()

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="flex h-16 items-center px-4">
        <Button variant="ghost" size="icon" className="mr-2 md:hidden" onClick={toggleSidebar}>
          <MenuIcon className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold inline-block">TalentTrack ATS</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 mx-6">
          <Link
            href="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/" ? "text-primary" : "text-muted-foreground",
            )}
          >
            Dashboard
          </Link>
          <Link
            href="/jobs"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname?.startsWith("/jobs") ? "text-primary" : "text-muted-foreground",
            )}
          >
            Jobs
          </Link>
          <Link
            href="/candidates"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname?.startsWith("/candidates") ? "text-primary" : "text-muted-foreground",
            )}
          >
            Candidates
          </Link>
          <Link
            href="/interviews"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname?.startsWith("/interviews") ? "text-primary" : "text-muted-foreground",
            )}
          >
            Interviews
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  )
}
