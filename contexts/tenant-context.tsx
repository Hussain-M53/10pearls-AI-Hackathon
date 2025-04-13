"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { Tenant } from "@/types/tenant"; 

interface TenantContextType {
  tenant: Tenant | null
  loading: boolean
  setTenant: (tenant: Tenant | null) => void
}

const TenantContext = createContext<TenantContextType | undefined>(undefined)

export function TenantProvider({
  children,
  initialTenant = null,
}: {
  children: React.ReactNode
  initialTenant?: Tenant | null
}) {
  const [tenant, setTenant] = useState<Tenant | null>(initialTenant)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function loadTenant() {
      try {
        const response = await fetch("/api/tenant")
        if (response.ok) {
          const data = await response.json()
          setTenant(data.tenant)
        }
      } catch (error) {
        console.error("Error loading tenant:", error)
      } finally {
        setLoading(false)
      }
    }

    if (!initialTenant) {
      loadTenant()
    } else {
      setLoading(false)
    }
  }, [initialTenant])

  return <TenantContext.Provider value={{ tenant, loading, setTenant }}>{children}</TenantContext.Provider>
}

export function useTenant() {
  const context = useContext(TenantContext)
  if (context === undefined) {
    throw new Error("useTenant must be used within a TenantProvider")
  }
  return context
}
