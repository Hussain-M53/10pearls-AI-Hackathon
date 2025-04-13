import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
    candidateId: { type: String, required: true },
    jobId: { type: String, required: true },
    interviewers: { type: [String], required: true },
    scheduledDate: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    type: { type: String, required: true },
    status: { type: String, default: "scheduled" },
    location: { type: String },
    meetingLink: { type: String },
    notes: { type: String },
    transcript: { type: String },
    feedback: {
      type: [
        {
          interviewerId: { type: String, required: true },
          rating: { type: Number, min: 1, max: 5 },
          strengths: { type: String },
          weaknesses: { type: String },
          comments: { type: String },
          recommendation: { type: String, required: true },
          submittedAt: { type: Date },
        },
      ],
    },
    tenantId: { type: String, required: true },
    createdBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
  
  export const InterviewModel = mongoose.model("Interview", interviewSchema);
  