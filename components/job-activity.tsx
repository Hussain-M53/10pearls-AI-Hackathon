"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface JobActivityProps {
  jobId: number
}

const activities = [
  {
    id: 1,
    user: {
      name: "Alex Thompson",
      avatar: "/placeholder-user.jpg",
      initials: "AT",
    },
    action: "moved",
    subject: "Sarah Johnson",
    details: "from Screening to Interview",
    timestamp: "2025-04-08 10:30 AM",
  },
  {
    id: 2,
    user: {
      name: "Maria Garcia",
      avatar: "/placeholder-user.jpg",
      initials: "MG",
    },
    action: "added feedback for",
    subject: "Michael Chen",
    details: "Screening call completed",
    timestamp: "2025-04-07 3:45 PM",
  },
  {
    id: 3,
    user: {
      name: "John Smith",
      avatar: "/placeholder-user.jpg",
      initials: "JS",
    },
    action: "scheduled interview with",
    subject: "Emily Rodriguez",
    details: "Technical interview on April 11",
    timestamp: "2025-04-07 11:20 AM",
  },
  {
    id: 4,
    user: {
      name: "Lisa Wong",
      avatar: "/placeholder-user.jpg",
      initials: "LW",
    },
    action: "updated job description",
    subject: "",
    details: "Added new requirements",
    timestamp: "2025-04-06 2:15 PM",
  },
  {
    id: 5,
    user: {
      name: "Robert Davis",
      avatar: "/placeholder-user.jpg",
      initials: "RD",
    },
    action: "added",
    subject: "David Kim",
    details: "to the candidate pool",
    timestamp: "2025-04-05 9:30 AM",
  },
]

export function JobActivity({ jobId }: JobActivityProps) {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start space-x-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
            <AvatarFallback>{activity.user.initials}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="font-medium">{activity.user.name}</span> {activity.action}{" "}
              {activity.subject && <span className="font-medium">{activity.subject}</span>} {activity.details}
            </p>
            <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
