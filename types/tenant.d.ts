export interface Tenant {
    id: string; // Unique identifier for the tenant
    name: string; // Tenant or organization name
    subdomain: string; // e.g., "company1" for company1.example.com
    customDomain?: string; // Optional custom domain
    plan: "free" | "starter" | "professional" | "enterprise"; // Tenant subscription plan
    createdAt: Date;
    updatedAt: Date;
  }
  