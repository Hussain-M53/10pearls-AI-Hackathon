"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { useTenant } from "@/contexts/tenant-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const plans = [
  {
    value: "free",
    label: "Free",
  },
  {
    value: "starter",
    label: "Starter",
  },
  {
    value: "professional",
    label: "Professional",
  },
  {
    value: "enterprise",
    label: "Enterprise",
  },
]

export default function TenantSettingsPage() {
  const { tenant, setTenant } = useTenant()
  const router = useRouter()
  
  const [name, setName] = useState(tenant?.name || "")
  const [subdomain, setSubdomain] = useState(tenant?.subdomain || "")
  const [customDomain, setCustomDomain] = useState(tenant?.customDomain || "")
  const [plan, setPlan] = useState(tenant?.plan || "free")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [open, setOpen] = useState(false)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch("/api/tenant", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          subdomain,
          customDomain,
          plan,
        }),
      })
      
      if (response.ok) {
        const data = await response.json()
        setTenant(data.tenant)
        router.refresh()
      }
    } catch (error) {
      console.error("Error updating tenant:", error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tenant Settings</h1>
        <p className="text-muted-foreground">
          Manage your organization's tenant settings.
        </p>
      </div>
      
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Tenant Information</CardTitle>
            <CardDescription>
              Update your organization's tenant information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space


Let's create a loading state for the tenant settings page:

\
