"use client"

import { useState } from "react"
import { addDays, format, startOfWeek, addWeeks, subWeeks } from "date-fns"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

interface Event {
  id: string
  title: string
  date: Date
  startTime: string
  endTime: string
  type: "interview" | "meeting" | "other"
}

interface CalendarViewProps {
  events?: Event[]
  onEventClick?: (event: Event) => void
  onDateSelect?: (date: Date) => void
}

export function CalendarView({ events = [], onEventClick, onDateSelect }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [view, setView] = useState<"week" | "month">("week")

  // Generate week days
  const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 })
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(startOfCurrentWeek, i))

  // Filter events for the selected week
  const weekEvents = events.filter((event) => {
    const eventDate = new Date(event.date)
    return weekDays.some(
      (day) =>
        eventDate.getDate() === day.getDate() &&
        eventDate.getMonth() === day.getMonth() &&
        eventDate.getFullYear() === day.getFullYear(),
    )
  })

  // Group events by day
  const eventsByDay = weekDays.map((day) => {
    return {
      date: day,
      events: weekEvents.filter((event) => {
        const eventDate = new Date(event.date)
        return (
          eventDate.getDate() === day.getDate() &&
          eventDate.getMonth() === day.getMonth() &&
          eventDate.getFullYear() === day.getFullYear()
        )
      }),
    }
  })

  const handlePrevWeek = () => {
    setCurrentDate(subWeeks(currentDate, 1))
  }

  const handleNextWeek = () => {
    setCurrentDate(addWeeks(currentDate, 1))
  }

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    setCurrentDate(date || new Date())
    if (date && onDateSelect) {
      onDateSelect(date)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Calendar</CardTitle>
        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={selectedDate} onSelect={handleDateSelect} initialFocus />
            </PopoverContent>
          </Popover>
          <div className="flex items-center space-x-1">
            <Button variant="outline" size="icon" onClick={handlePrevWeek}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleNextWeek}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1">
          {weekDays.map((day, i) => (
            <div key={i} className="flex flex-col">
              <div className="text-center py-2 font-medium">
                {format(day, "EEE")}
                <div
                  className={cn(
                    "mx-auto flex h-8 w-8 items-center justify-center rounded-full text-sm",
                    selectedDate &&
                      day.getDate() === selectedDate.getDate() &&
                      day.getMonth() === selectedDate.getMonth() &&
                      "bg-primary text-primary-foreground",
                  )}
                >
                  {format(day, "d")}
                </div>
              </div>
              <div className="min-h-[200px] border rounded-md p-1">
                {eventsByDay[i].events.map((event) => (
                  <div
                    key={event.id}
                    className={cn(
                      "mb-1 rounded-md p-1 text-xs cursor-pointer",
                      event.type === "interview" && "bg-blue-100 text-blue-800",
                      event.type === "meeting" && "bg-green-100 text-green-800",
                      event.type === "other" && "bg-gray-100 text-gray-800",
                    )}
                    onClick={() => onEventClick && onEventClick(event)}
                  >
                    <div className="font-medium">{event.title}</div>
                    <div>
                      {event.startTime} - {event.endTime}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
