"use server"

import { revalidatePath } from "next/cache"
import { connectToTenantDatabase } from "@/lib/mongodb";
import { z } from "zod"
import { CandidateModel } from "@/models/candidate";
import { ApplicationModel } from "@/models/application";
// Define candidate schema
const candidateSchema = z.object({
  id: z.string().optional(),
  userId: z.string(),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  location: z.string().optional(),
  headline: z.string().optional(),
  summary: z.string().optional(),
  skills: z.array(z.string()).optional(),
  experience: z
    .array(
      z.object({
        title: z.string(),
        company: z.string(),
        location: z.string().optional(),
        startDate: z.string(),
        endDate: z.string().optional(),
        current: z.boolean().optional(),
        description: z.string().optional(),
      }),
    )
    .optional(),
  education: z
    .array(
      z.object({
        institution: z.string(),
        degree: z.string(),
        field: z.string(),
        startDate: z.string(),
        endDate: z.string().optional(),
        current: z.boolean().optional(),
        description: z.string().optional(),
      }),
    )
    .optional(),
  certifications: z
    .array(
      z.object({
        name: z.string(),
        issuer: z.string(),
        issueDate: z.string(),
        expiryDate: z.string().optional(),
        credentialId: z.string().optional(),
        credentialUrl: z.string().optional(),
      }),
    )
    .optional(),
  resumeUrl: z.string().optional(),
  portfolioUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  tenantId: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export type Candidate = z.infer<typeof candidateSchema>


// Define application schema
const applicationSchema = z.object({
  id: z.string().optional(),
  candidateId: z.string(),
  jobId: z.string(),
  status: z.string(),
  appliedDate: z.date(),
  coverLetter: z.string().optional(),
  answers: z.record(z.string()).optional(),
  tenantId: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export type Application = z.infer<typeof applicationSchema>


export async function getCandidates(tenantId: string) {
  try {
    const db = await connectToTenantDatabase('10pearls');
    const candidates = await CandidateModel.find({ tenantId }).exec();
    return { success: true, data: candidates };
  } catch (error) {
    console.error("Failed to fetch candidates:", error);
    return { success: false, error: "Failed to fetch candidates" };
  }
}

export async function getCandidate(id: string, tenantId: string) {
  try {
    const db = await connectToTenantDatabase('10pearls');
    const candidate = await CandidateModel.findById(id).exec();
    if (!candidate) {
      return { success: false, error: "Candidate not found" };
    }
    return { success: true, data: candidate };
  } catch (error) {
    console.error("Failed to fetch candidate:", error);
    return { success: false, error: "Failed to fetch candidate" };
  }
}

export async function getCandidateByUserId(userId: string, tenantId: string) {
  try {
    const db = await connectToTenantDatabase('10pearls');
    const candidate = await CandidateModel.findOne({ userId, tenantId }).exec();
    if (!candidate) {
      return { success: false, error: "Candidate not found" };
    }
    return { success: true, data: candidate };
  } catch (error) {
    console.error("Failed to fetch candidate:", error);
    return { success: false, error: "Failed to fetch candidate" };
  }
}

export async function createCandidate(candidateData: Omit<Candidate, "id">) {
  try {
    const validatedData = candidateSchema.parse({
      ...candidateData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const db = await connectToTenantDatabase('10pearls');
    const candidate = new CandidateModel(validatedData);
    const result = await candidate.save();
    revalidatePath("/candidates");
    return { success: true, data: { ...validatedData, id: result.id } };
  } catch (error) {
    console.error("Failed to create candidate:", error);
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors };
    }
    return { success: false, error: "Failed to create candidate" };
  }
}

export async function updateCandidate(id: string, candidateData: Partial<Candidate>) {
  try {
    const db = await connectToTenantDatabase('10pearls');
    const candidate = await CandidateModel.findByIdAndUpdate(id, candidateData, { new: true }).exec();
    if (!candidate) {
      return { success: false, error: "Candidate not found" };
    }
    revalidatePath("/candidates");
    revalidatePath(`/candidates/${id}`);
    revalidatePath("/profile");
    return { success: true, data: candidate };
  } catch (error) {
    console.error("Failed to update candidate:", error);
    return { success: false, error: "Failed to update candidate" };
  }
}

export async function applyForJob(applicationData: Omit<Application, "id" | "appliedDate">) {
  try {
    const validatedData = applicationSchema.parse({
      ...applicationData,
      appliedDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const db = await connectToTenantDatabase('10pearls');
    const application = new ApplicationModel(validatedData);
    const result = await application.save();
    revalidatePath("/applications");
    revalidatePath("/jobs");
    return { success: true, data: { ...validatedData, id: result.id } };
  } catch (error) {
    console.error("Failed to apply for job:", error);
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors };
    }
    return { success: false, error: "Failed to apply for job" };
  }
}

export async function getApplications(tenantId: string, filters?: { candidateId?: string; jobId?: string }) {
  try {
    const db = await connectToTenantDatabase('10pearls');
    const query: Record<string, any> = { tenantId };
    if (filters?.candidateId) {
      query.candidateId = filters.candidateId;
    }
    if (filters?.jobId) {
      query.jobId = filters.jobId;
    }
    const applications = await ApplicationModel.find(query).exec();
    return { success: true, data: applications };
  } catch (error) {
    console.error("Failed to fetch applications:", error);
    return { success: false, error: "Failed to fetch applications" };
  }
}

// export async function updateApplicationStatus(id: string, status: string, tenantId: string) {
//   try {
//     const db = await getTenantDb(tenantId)

//     const result = await db.collection("applications").updateOne(
//       { _id: id },
//       {
//         $set: {
//           status,
//           updatedAt: new Date(),
//         },
//       },
//     )

//     if (result.matchedCount === 0) {
//       return { success: false, error: "Application not found" }
//     }

//     revalidatePath("/applications")
//     revalidatePath("/candidates")
//     return { success: true }
//   } catch (error) {
//     console.error("Failed to update application status:", error)
//     return { success: false, error: "Failed to update application status" }
//   }
// }
