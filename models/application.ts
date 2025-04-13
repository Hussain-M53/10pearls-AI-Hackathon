import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    candidateId: { type: String, required: true },
    jobId: { type: String, required: true },
    status: { type: String, default: "applied" },
    appliedDate: { type: Date, default: Date.now },
    coverLetter: { type: String },
    answers: { type: mongoose.Schema.Types.Mixed },
    tenantId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
  
  export const ApplicationModel = mongoose.model("Application", applicationSchema);
  