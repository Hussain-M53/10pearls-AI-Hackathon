"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import Link from "next/link"

interface JobCandidatesProps {
  jobId: number
}

const candidates = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    avatar: "/placeholder-user.jpg",
    initials: "SJ",
    stage: "Interview",
    appliedDate: "2025-03-28",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@example.com",
    avatar: "/placeholder-user.jpg",
    initials: "MC",
    stage: "Screening",
    appliedDate: "2025-03-30",
    rating: 3.5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.rodriguez@example.com",
    avatar: "/placeholder-user.jpg",
    initials: "ER",
    stage: "Assessment",
    appliedDate: "2025-04-01",
    rating: 4.0,
  },
  {
    id: 4,
    name: "David Kim",
    email: "david.kim@example.com",
    avatar: "/placeholder-user.jpg",
    initials: "DK",
    stage: "Applied",
    appliedDate: "2025-04-03",
    rating: null,
  },
]

export function JobCandidates({ jobId }: JobCandidatesProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <div className="grid grid-cols-6 p-4 text-sm font-medium text-muted-foreground">
          <div className="col-span-2">Candidate</div>
          <div>Stage</div>
          <div>Applied</div>
          <div>Rating</div>
          <div className="text-right">Actions</div>
        </div>
        <div className="divide-y">
          {candidates.map((candidate) => (
            <div key={candidate.id} className="grid grid-cols-6 items-center p-4">
              <div className="col-span-2 flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={candidate.avatar} alt={candidate.name} />
                  <AvatarFallback>{candidate.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{candidate.name}</p>
                  <p className="text-sm text-muted-foreground">{candidate.email}</p>
                </div>
              </div>
              <div>
                <Badge
                  variant={
                    candidate.stage === "Applied"
                      ? "outline"
                      : candidate.stage === "Screening"
                        ? "secondary"
                        : candidate.stage === "Interview"
                          ? "default"
                          : "destructive"
                  }
                >
                  {candidate.stage}
                </Badge>
              </div>
              <div className="text-muted-foreground">{candidate.appliedDate}</div>
              <div>
                {candidate.rating ? (
                  <div className="flex items-center">
                    {candidate.rating}
                    <span className="text-yellow-400 ml-1">★</span>
                  </div>
                ) : (
                  <span className="text-muted-foreground">N/A</span>
                )}
              </div>
              <div className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href={`/candidates/${candidate.id}`}>View Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Schedule Interview</DropdownMenuItem>
                    <DropdownMenuItem>Send Email</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Move to Next Stage</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Reject</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
