import { NextResponse } from "next/server"
import { getCurrentTenant } from "@/lib/multi-tenant"

export async function GET() {
  try {
    const tenant = await getCurrentTenant()

    return NextResponse.json({ tenant })
  } catch (error) {
    console.error("Error fetching tenant:", error)
    return NextResponse.json({ error: "Failed to fetch tenant" }, { status: 500 })
  }
}
