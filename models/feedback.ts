import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    candidateId: { type: String, required: true },
    jobId: { type: String, required: true },
    interviewId: { type: String },
    reviewerId: { type: String },
    type: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
    strengths: { type: String },
    weaknesses: { type: String },
    comments: { type: String, required: true },
    recommendation: { type: String, required: true },
    tenantId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
  
  export const FeedbackModel = mongoose.model("Feedback", feedbackSchema);