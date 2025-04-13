"use server";
import { revalidatePath } from "next/cache";
import { connectToTenantDatabase } from "@/lib/mongodb";
import { z } from "zod";
import { JobModel } from "@/models/job";

// Define job schema
const jobSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, "Title must be at least 2 characters"),
  department: z.string().min(2, "Department must be at least 2 characters"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  type: z.string(),
  status: z.string(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  requirements: z.array(z.string()),
  responsibilities: z.array(z.string()),
  salary: z.string().optional(),
  postedDate: z.string().optional(),
  closingDate: z.string().optional(),
  tenantId: z.string(),
  createdBy: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type Job = z.infer<typeof jobSchema>;

export async function getJobs(tenantId: string) {
  try {
    const db = await connectToTenantDatabase('10pearls');
    const jobs = await JobModel.find({ tenantId }).exec();
    return { success: true, data: jobs };
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
    return { success: false, error: "Failed to fetch jobs" };
  }
}

export async function getJob(id: string, tenantId: string) {
  try {
    const db = await connectToTenantDatabase('10pearls');
    const job = await JobModel.findById(id).exec();
    if (!job) {
      return { success: false, error: "Job not found" };
    }
    return { success: true, data: job };
  } catch (error) {
    console.error("Failed to fetch job:", error);
    return { success: false, error: "Failed to fetch job" };
  }
}

export async function createJob(jobData: Omit<Job, "id">) {
  try {
    const validatedData = jobSchema.parse({
      ...jobData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const db = await connectToTenantDatabase('10pearls');
    const job = new JobModel(validatedData);
    const result = await job.save();
    revalidatePath("/jobs");
    return { success: true, data: { ...validatedData, id: result.id } };
  } catch (error) {
    console.error("Failed to create job:", error);
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors };
    }
    return { success: false, error: "Failed to create job" };
  }
}

export async function updateJob(id: string, jobData: Partial<Job>) {
  try {
    const db = await connectToTenantDatabase('10pearls');
    const job = await JobModel.findByIdAndUpdate(id, jobData, { new: true }).exec();
    if (!job) {
      return { success: false, error: "Job not found" };
    }
    revalidatePath("/jobs");
    revalidatePath(`/jobs/${id}`);
    return { success: true, data: job };
  } catch (error) {
    console.error("Failed to update job:", error);
    return { success: false, error: "Failed to update job" };
  }
}

export async function deleteJob(id: string, tenantId: string) {
  try {
    const db = await connectToTenantDatabase('10pearls');
    const result = await JobModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      return { success: false, error: "Job not found" };
    }
    revalidatePath("/jobs");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete job:", error);
    return { success: false, error: "Failed to delete job" };
  }
}