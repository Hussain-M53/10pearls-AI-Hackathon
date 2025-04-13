"use server";
import { revalidatePath } from "next/cache";
import { connectToTenantDatabase } from "@/lib/mongodb";
import { z } from "zod";
import { InterviewModel } from "@/models/interview";
// Define interview schema
const interviewSchema = z.object({
  id: z.string().optional(),
  candidateId: z.string(),
  jobId: z.string(),
  interviewers: z.array(z.string()),
  scheduledDate: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  type: z.string(),
  status: z.string(),
  location: z.string().optional(),
  meetingLink: z.string().optional(),
  notes: z.string().optional(),
  transcript: z.string().optional(),
  feedback: z
    .array(
      z.object({
        interviewerId: z.string(),
        rating: z.number().min(1).max(5),
        strengths: z.string().optional(),
        weaknesses: z.string().optional(),
        comments: z.string().optional(),
        recommendation: z.string(),
        submittedAt: z.date().optional(),
      }),
    )
    .optional(),
  tenantId: z.string(),
  createdBy: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type Interview = z.infer<typeof interviewSchema>;
export type InterviewFeedback = NonNullable<Interview["feedback"]>[number];

// Define interview model

export async function getInterviews(
  tenantId: string,
  filters?: { candidateId?: string; jobId?: string; interviewerId?: string },
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
    if (filters?.interviewerId) {
      query.interviewers = filters.interviewerId;
    }
    const interviews = await InterviewModel.find(query).exec();
    return { success: true, data: interviews };
  } catch (error) {
    console.error("Failed to fetch interviews:", error);
    return { success: false, error: "Failed to fetch interviews" };
  }
}

export async function getInterview(id: string, tenantId: string) {
  try {
    const db = await connectToTenantDatabase('10pearls');
    const interview = await InterviewModel.findById(id).exec();
    if (!interview) {
      return { success: false, error: "Interview not found" };
    }
    return { success: true, data: interview };
  } catch (error) {
    console.error("Failed to fetch interview:", error);
    return { success: false, error: "Failed to fetch interview" };
  }
}

export async function scheduleInterview(interviewData: Omit<Interview, "id">) {
  try {
    const validatedData = interviewSchema.parse({
      ...interviewData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const db = await connectToTenantDatabase('10pearls');
    const interview = new InterviewModel(validatedData);
    const result = await interview.save();
    revalidatePath("/interviews");
    return { success: true, data: { ...validatedData, id: result.id } };
  } catch (error) {
    console.error("Failed to schedule interview:", error);
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors };
    }
    return { success: false, error: "Failed to schedule interview" };
  }
}

export async function updateInterview(id: string, interviewData: Partial<Interview>) {
  try {
    const db = await connectToTenantDatabase('10pearls');
    const interview = await InterviewModel.findByIdAndUpdate(id, interviewData, { new: true }).exec();
    if (!interview) {
      return { success: false, error: "Interview not found" };
    }
    revalidatePath("/interviews");
    revalidatePath(`/interviews/${id}`);
    return { success: true, data: interview };
  } catch (error) {
    console.error("Failed to update interview:", error);
    return { success: false, error: "Failed to update interview" };
  }
}

export async function cancelInterview(id: string, tenantId: string) {
  try {
    const db = await connectToTenantDatabase('10pearls');
    const result = await InterviewModel.updateOne(
      { _id: id },
      { $set: { status: "cancelled", updatedAt: new Date() } }
    ).exec();
    if (result.matchedCount === 0) {
      return { success: false, error: "Interview not found" };
    }
    revalidatePath("/interviews");
    revalidatePath(`/interviews/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Failed to cancel interview:", error);
    return { success: false, error: "Failed to cancel interview" };
  }
}

export async function submitFeedback(id: string, feedback: Omit<InterviewFeedback, "submittedAt">, tenantId: string) {
  try {
    const db = await connectToTenantDatabase('10pearls');
    const feedbackWithTimestamp = {
      ...feedback,
      submittedAt: new Date(),
    };
    const result = await InterviewModel.updateOne(
      { _id: id },
      { $push: { feedback: feedbackWithTimestamp }, $set: { updatedAt: new Date() } }
    ).exec();
    if (result.matchedCount === 0) {
      return { success: false, error: "Interview not found" };
    }
    revalidatePath("/interviews");
    revalidatePath(`/interviews/${id}`);
    revalidatePath("/feedback");
    return { success: true, data: feedbackWithTimestamp };
  } catch (error) {
    console.error("Failed to submit feedback:", error);
    return { success: false, error: "Failed to submit feedback" };
  }
}

export async function saveTranscript(id: string, transcript: string, tenantId: string) {
  try {
    const db = await connectToTenantDatabase('10pearls');
    const result = await InterviewModel.updateOne(
      { _id: id },
      { $set: { transcript, updatedAt: new Date() } }
    ).exec();
    if (result.matchedCount === 0) {
      return { success: false, error: "Interview not found" };
    }
    revalidatePath(`/interviews/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Failed to save transcript:", error);
    return { success: false, error: "Failed to save transcript" };
  }
}