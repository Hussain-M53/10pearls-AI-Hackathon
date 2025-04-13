"use server";
import { revalidatePath } from "next/cache";
import { connectToTenantDatabase } from "@/lib/mongodb";
import { z } from "zod";
import { FeedbackModel } from "@/models/feedback";
// Define feedback schema
const feedbackSchema = z.object({
  id: z.string().optional(),
  candidateId: z.string(),
  jobId: z.string(),
  interviewId: z.string().optional(),
  reviewerId: z.string(),
  type: z.string(), // 'interview', 'assessment', 'general'
  rating: z.number().min(1).max(5),
  strengths: z.string().optional(),
  weaknesses: z.string().optional(),
  comments: z.string(),
  recommendation: z.string(), // 'hire', 'reject', 'consider'
  tenantId: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type Feedback = z.infer<typeof feedbackSchema>;



export async function getFeedback(
  tenantId: string,
  filters?: { candidateId?: string; jobId?: string; reviewerId?: string; interviewId?: string },
) {
  try {
    const db = await connectToTenantDatabase('10pearls');
    const query: Record<string, any> = { tenantId };
    if (filters?.candidateId) {
      query.candidateId = filters.candidateId;
    }
    if (filters?.jobId) {
      query.jobId = filters.jobId;
    }
    if (filters?.reviewerId) {
      query.reviewerId = filters.reviewerId;
    }
    if (filters?.interviewId) {
      query.interviewId = filters.interviewId;
    }
    const feedback = await FeedbackModel.find(query).exec();
    return { success: true, data: feedback };
  } catch (error) {
    console.error("Failed to fetch feedback:", error);
    return { success: false, error: "Failed to fetch feedback" };
  }
}

export async function submitFeedback(feedbackData: Omit<Feedback, "id">) {
  try {
    const validatedData = feedbackSchema.parse({
      ...feedbackData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const db = await connectToTenantDatabase('10pearls');
    const feedback = new FeedbackModel(validatedData);
    const result = await feedback.save();
    revalidatePath("/feedback");
    revalidatePath(`/candidates/${validatedData.candidateId}`);
    if (validatedData.interviewId) {
      revalidatePath(`/interviews/${validatedData.interviewId}`);
    }
    return { success: true, data: { ...validatedData, id: result.id } };
  } catch (error) {
    console.error("Failed to submit feedback:", error);
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors };
    }
    return { success: false, error: "Failed to submit feedback" };
  }
}

export async function updateFeedback(id: string, feedbackData: Partial<Feedback>) {
  try {
    const db = await connectToTenantDatabase('10pearls');
    const feedback = await FeedbackModel.findByIdAndUpdate(id, feedbackData, { new: true }).exec();
    if (!feedback) {
      return { success: false, error: "Feedback not found" };
    }
    revalidatePath("/feedback");
    if (feedbackData.candidateId) {
      revalidatePath(`/candidates/${feedbackData.candidateId}`);
    }
    if (feedbackData.interviewId) {
      revalidatePath(`/interviews/${feedbackData.interviewId}`);
    }
    return { success: true, data: feedback };
  } catch (error) {
    console.error("Failed to update feedback:", error);
    return { success: false, error: "Failed to update feedback" };
  }
}

export async function deleteFeedback(id: string, tenantId: string) {
  try {
    const db = await connectToTenantDatabase('10pearls');
    const result = await FeedbackModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      return { success: false, error: "Feedback not found" };
    }
    revalidatePath("/feedback");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete feedback:", error);
    return { success: false, error: "Failed to delete feedback" };
  }
}