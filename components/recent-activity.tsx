"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const activities = [
  {
    id: 1,
    user: {
      name: "Alex Thompson",
      avatar: "/placeholder-user.jpg",
      initials: "AT",
    },
    action: "moved",
    subject: "James Wilson",
    details: "from Applied to Screening",
    timestamp: "10 minutes ago",
  },
  {
    id: 2,
    user: {
      name: "Maria Garcia",
      avatar: "/placeholder-user.jpg",
      initials: "MG",
    },
    action: "added feedback for",
    subject: "Sarah Johnson",
    details: "Technical Interview",
    timestamp: "1 hour ago",
  },
  {
    id: 3,
    user: {
      name: "John Smith",
      avatar: "/placeholder-user.jpg",
      initials: "JS",
    },
    action: "scheduled interview with",
    subject: "Michael Chen",
    details: "for Product Manager position",
    timestamp: "2 hours ago",
  },
  {
    id: 4,
    user: {
      name: "Lisa Wong",
      avatar: "/placeholder-user.jpg",
      initials: "LW",
    },
    action: "created new job posting",
    subject: "Senior Backend Developer",
    details: "Engineering department",
    timestamp: "3 hours ago",
  },
  {
    id: 5,
    user: {
      name: "Robert Davis",
      avatar: "/placeholder-user.jpg",
      initials: "RD",
    },
    action: "sent offer to",
    subject: "Emily Rodriguez",
    details: "for UX Designer position",
    timestamp: "5 hours ago",
  },
]

export function RecentActivity() {
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
              <span className="font-medium">{activity.subject}</span> {activity.details}
            </p>
            <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
