"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"
import { useTheme } from "next-themes"
import { Check } from "lucide-react"

export function AppearanceSettings() {
  const { theme, setTheme } = useTheme()
  const [selectedTheme, setSelectedTheme] = useState(theme || "system")

  const handleThemeChange = (value: string) => {
    setSelectedTheme(value)
    setTheme(value)
  }

  const handleSave = () => {
    toast({
      title: "Appearance settings saved",
      description: "Your appearance preferences have been updated.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
          <CardDescription>Select your preferred theme for the application.</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedTheme}
            onValueChange={handleThemeChange}
            className="grid grid-cols-1 gap-4 sm:grid-cols-3"
          >
            <Label
              htmlFor="theme-light"
              className="relative flex cursor-pointer flex-col items-center rounded-md border bg-background p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
            >
              <RadioGroupItem value="light" id="theme-light" className="sr-only" />
              <div className="mb-4 rounded-md border p-2">
                <div className="space-y-2">
                  <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                  <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                </div>
              </div>
              <span className="text-center text-sm font-medium">Light</span>
              {selectedTheme === "light" && <Check className="absolute right-2 top-2 h-4 w-4 text-primary" />}
            </Label>
            <Label
              htmlFor="theme-dark"
              className="relative flex cursor-pointer flex-col items-center rounded-md border bg-background p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
            >
              <RadioGroupItem value="dark" id="theme-dark" className="sr-only" />
              <div className="mb-4 rounded-md border bg-slate-950 p-2">
                <div className="space-y-2">
                  <div className="h-2 w-[80px] rounded-lg bg-slate-800" />
                  <div className="h-2 w-[100px] rounded-lg bg-slate-800" />
                </div>
              </div>
              <span className="text-center text-sm font-medium">Dark</span>
              {selectedTheme === "dark" && <Check className="absolute right-2 top-2 h-4 w-4 text-primary" />}
            </Label>
            <Label
              htmlFor="theme-system"
              className="relative flex cursor-pointer flex-col items-center rounded-md border bg-background p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
            >
              <RadioGroupItem value="system" id="theme-system" className="sr-only" />
              <div className="mb-4 rounded-md border p-2">
                <div className="flex space-x-2">
                  <div className="space-y-2 flex-1">
                    <div className="h-2 w-[40px] rounded-lg bg-[#ecedef]" />
                    <div className="h-2 w-[55px] rounded-lg bg-[#ecedef]" />
                  </div>
                  <div className="space-y-2 flex-1 bg-slate-950 p-1 rounded-md">
                    <div className="h-2 w-[40px] rounded-lg bg-slate-800" />
                    <div className="h-2 w-[55px] rounded-lg bg-slate-800" />
                  </div>
                </div>
              </div>
              <span className="text-center text-sm font-medium">System</span>
              {selectedTheme === "system" && <Check className="absolute right-2 top-2 h-4 w-4 text-primary" />}
            </Label>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Density</CardTitle>
          <CardDescription>Adjust the density of the user interface.</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup defaultValue="comfortable" className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Label
              htmlFor="density-compact"
              className="relative flex cursor-pointer flex-col items-center rounded-md border bg-background p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
            >
              <RadioGroupItem value="compact" id="density-compact" className="sr-only" />
              <div className="mb-4 rounded-md border p-2">
                <div className="space-y-1">
                  <div className="h-1.5 w-[80px] rounded-lg bg-muted" />
                  <div className="h-1.5 w-[100px] rounded-lg bg-muted" />
                  <div className="h-1.5 w-[60px] rounded-lg bg-muted" />
                  <div className="h-1.5 w-[90px] rounded-lg bg-muted" />
                </div>
              </div>
              <span className="text-center text-sm font-medium">Compact</span>
            </Label>
            <Label
              htmlFor="density-comfortable"
              className="relative flex cursor-pointer flex-col items-center rounded-md border bg-background p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
            >
              <RadioGroupItem value="comfortable" id="density-comfortable" className="sr-only" />
              <div className="mb-4 rounded-md border p-2">
                <div className="space-y-2">
                  <div className="h-2 w-[80px] rounded-lg bg-muted" />
                  <div className="h-2 w-[100px] rounded-lg bg-muted" />
                  <div className="h-2 w-[60px] rounded-lg bg-muted" />
                  <div className="h-2 w-[90px] rounded-lg bg-muted" />
                </div>
              </div>
              <span className="text-center text-sm font-medium">Comfortable</span>
              <Check className="absolute right-2 top-2 h-4 w-4 text-primary" />
            </Label>
            <Label
              htmlFor="density-spacious"
              className="relative flex cursor-pointer flex-col items-center rounded-md border bg-background p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
            >
              <RadioGroupItem value="spacious" id="density-spacious" className="sr-only" />
              <div className="mb-4 rounded-md border p-2">
                <div className="space-y-3">
                  <div className="h-2.5 w-[80px] rounded-lg bg-muted" />
                  <div className="h-2.5 w-[100px] rounded-lg bg-muted" />
                  <div className="h-2.5 w-[60px] rounded-lg bg-muted" />
                  <div className="h-2.5 w-[90px] rounded-lg bg-muted" />
                </div>
              </div>
              <span className="text-center text-sm font-medium">Spacious</span>
            </Label>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dashboard Layout</CardTitle>
          <CardDescription>Choose your preferred dashboard layout.</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup defaultValue="default" className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Label
              htmlFor="layout-default"
              className="relative flex cursor-pointer flex-col items-center rounded-md border bg-background p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
            >
              <RadioGroupItem value="default" id="layout-default" className="sr-only" />
              <div className="mb-4 w-full rounded-md border p-2">
                <div className="space-y-2">
                  <div className="grid grid-cols-4 gap-2">
                    <div className="col-span-1 h-8 rounded-md bg-muted" />
                    <div className="col-span-1 h-8 rounded-md bg-muted" />
                    <div className="col-span-1 h-8 rounded-md bg-muted" />
                    <div className="col-span-1 h-8 rounded-md bg-muted" />
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    <div className="col-span-4 h-24 rounded-md bg-muted" />
                    <div className="col-span-3 h-24 rounded-md bg-muted" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="col-span-1 h-16 rounded-md bg-muted" />
                    <div className="col-span-1 h-16 rounded-md bg-muted" />
                  </div>
                </div>
              </div>
              <span className="text-center text-sm font-medium">Default</span>
              <Check className="absolute right-2 top-2 h-4 w-4 text-primary" />
            </Label>
            <Label
              htmlFor="layout-alternative"
              className="relative flex cursor-pointer flex-col items-center rounded-md border bg-background p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
            >
              <RadioGroupItem value="alternative" id="layout-alternative" className="sr-only" />
              <div className="mb-4 w-full rounded-md border p-2">
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="col-span-1 h-8 rounded-md bg-muted" />
                    <div className="col-span-1 h-8 rounded-md bg-muted" />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-1 h-24 rounded-md bg-muted" />
                    <div className="col-span-1 h-24 rounded-md bg-muted" />
                    <div className="col-span-1 h-24 rounded-md bg-muted" />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-1 h-16 rounded-md bg-muted" />
                    <div className="col-span-1 h-16 rounded-md bg-muted" />
                    <div className="col-span-1 h-16 rounded-md bg-muted" />
                  </div>
                </div>
              </div>
              <span className="text-center text-sm font-medium">Alternative</span>
            </Label>
          </RadioGroup>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave}>Save Appearance Settings</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
