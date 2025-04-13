"use client"

import { useState } from "react"
import Link from "next/link"
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
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MoreHorizontal } from "lucide-react"

const candidates = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    avatar: "/placeholder-user.jpg",
    initials: "SJ",
    position: "Senior Frontend Developer",
    stage: "Interview",
    appliedDate: "2025-03-28",
    tags: ["React", "TypeScript", "Next.js"],
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@example.com",
    avatar: "/placeholder-user.jpg",
    initials: "MC",
    position: "Product Manager",
    stage: "Screening",
    appliedDate: "2025-03-30",
    tags: ["Product Strategy", "Agile", "UX"],
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.rodriguez@example.com",
    avatar: "/placeholder-user.jpg",
    initials: "ER",
    position: "UX Designer",
    stage: "Assessment",
    appliedDate: "2025-04-01",
    tags: ["Figma", "UI/UX", "Prototyping"],
  },
  {
    id: 4,
    name: "David Kim",
    email: "david.kim@example.com",
    avatar: "/placeholder-user.jpg",
    initials: "DK",
    position: "Backend Engineer",
    stage: "Applied",
    appliedDate: "2025-04-03",
    tags: ["Node.js", "Python", "AWS"],
  },
  {
    id: 5,
    name: "Jessica Taylor",
    email: "jessica.taylor@example.com",
    avatar: "/placeholder-user.jpg",
    initials: "JT",
    position: "Marketing Specialist",
    stage: "Offer",
    appliedDate: "2025-03-15",
    tags: ["Digital Marketing", "SEO", "Content Strategy"],
  },
  {
    id: 6,
    name: "Robert Wilson",
    email: "robert.wilson@example.com",
    avatar: "/placeholder-user.jpg",
    initials: "RW",
    position: "DevOps Engineer",
    stage: "Rejected",
    appliedDate: "2025-03-20",
    tags: ["Docker", "Kubernetes", "CI/CD"],
  },
]

export function CandidatesList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [stageFilter, setStageFilter] = useState("all")

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesStage = stageFilter === "all" || candidate.stage.toLowerCase() === stageFilter.toLowerCase()

    return matchesSearch && matchesStage
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search candidates..."
          className="max-w-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Select value={stageFilter} onValueChange={setStageFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stages</SelectItem>
            <SelectItem value="applied">Applied</SelectItem>
            <SelectItem value="screening">Screening</SelectItem>
            <SelectItem value="interview">Interview</SelectItem>
            <SelectItem value="assessment">Assessment</SelectItem>
            <SelectItem value="offer">Offer</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-md border">
        <div className="grid grid-cols-6 p-4 text-sm font-medium text-muted-foreground">
          <div className="col-span-2">Candidate</div>
          <div>Position</div>
          <div>Stage</div>
          <div>Applied</div>
          <div className="text-right">Actions</div>
        </div>
        <div className="divide-y">
          {filteredCandidates.map((candidate) => (
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
              <div className="truncate">{candidate.position}</div>
              <div>
                <Badge
                  variant={
                    candidate.stage === "Applied"
                      ? "outline"
                      : candidate.stage === "Screening"
                        ? "secondary"
                        : candidate.stage === "Interview"
                          ? "default"
                          : candidate.stage === "Assessment"
                            ? "destructive"
                            : candidate.stage === "Offer"
                              ? "success"
                              : "outline"
                  }
                >
                  {candidate.stage}
                </Badge>
              </div>
              <div className="text-muted-foreground">{candidate.appliedDate}</div>
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
