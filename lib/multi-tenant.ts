import { cookies } from "next/headers";
import { connectToSharedDatabase } from "@/lib/mongodb";
import { TenantModel } from "@/models/tenant";
import { Tenant } from "@/types/tenant"; // define your interface here

export async function getCurrentTenant(): Promise<Tenant | null> {
  const cookieStore = cookies();
  const tenantId = (await cookieStore).get("tenantId")?.value;

  if (!tenantId) return null;

  try {
    await connectToSharedDatabase();
    const tenant = await TenantModel.findOne({ id: tenantId });
    return tenant ? (tenant.toObject() as Tenant) : null;
  } catch (error) {
    console.error("Error fetching tenant:", error);
    return null;
  }
}

export async function getTenantBySubdomain(subdomain: string): Promise<Tenant | null> {
  try {
    await connectToSharedDatabase();
    const tenant = await TenantModel.findOne({ subdomain });
    return tenant ? (tenant.toObject() as Tenant) : null;
  } catch (error) {
    console.error("Error fetching tenant by subdomain:", error);
    return null;
  }
}

export async function getTenantByCustomDomain(domain: string): Promise<Tenant | null> {
  try {
    await connectToSharedDatabase();
    const tenant = await TenantModel.findOne({ customDomain: domain });
    return tenant ? (tenant.toObject() as Tenant) : null;
  } catch (error) {
    console.error("Error fetching tenant by custom domain:", error);
    return null;
  }
}

export async function setCurrentTenant(tenantId: string) {
  (await cookies()).set("tenantId", tenantId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}
