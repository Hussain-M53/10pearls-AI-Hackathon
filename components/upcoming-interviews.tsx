"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"

const interviews = [
  {
    id: 1,
    candidate: {
      name: "Sarah Johnson",
      avatar: "/placeholder-user.jpg",
      initials: "SJ",
    },
    position: "Senior Frontend Developer",
    date: "2025-04-10",
    time: "10:00 AM",
    type: "Technical",
  },
  {
    id: 2,
    candidate: {
      name: "Michael Chen",
      avatar: "/placeholder-user.jpg",
      initials: "MC",
    },
    position: "Product Manager",
    date: "2025-04-10",
    time: "2:30 PM",
    type: "Behavioral",
  },
  {
    id: 3,
    candidate: {
      name: "Emily Rodriguez",
      avatar: "/placeholder-user.jpg",
      initials: "ER",
    },
    position: "UX Designer",
    date: "2025-04-11",
    time: "11:15 AM",
    type: "Portfolio",
  },
  {
    id: 4,
    candidate: {
      name: "David Kim",
      avatar: "/placeholder-user.jpg",
      initials: "DK",
    },
    position: "Backend Engineer",
    date: "2025-04-11",
    time: "4:00 PM",
    type: "Technical",
  },
]

export function UpcomingInterviews() {
  return (
    <div className="space-y-4">
      {interviews.map((interview) => (
        <div key={interview.id} className="flex items-center justify-between space-x-4 rounded-md border p-3">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={interview.candidate.avatar} alt={interview.candidate.name} />
              <AvatarFallback>{interview.candidate.initials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">{interview.candidate.name}</p>
              <p className="text-sm text-muted-foreground">{interview.position}</p>
              <div className="flex items-center pt-1">
                <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{interview.date}</span>
                <Clock className="ml-2 mr-1 h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{interview.time}</span>
              </div>
            </div>
          </div>
          <Badge
            variant={
              interview.type === "Technical" ? "default" : interview.type === "Behavioral" ? "outline" : "secondary"
            }
          >
            {interview.type}
          </Badge>
        </div>
      ))}
    </div>
  )
}
