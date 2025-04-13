import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    department: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true },
    status: { type: String, enum: ["open", "closed", "draft"], default: "draft" },
    description: { type: String, required: true, min: 10 },
    requirements: { type: [String], required: true },
    responsibilities: { type: [String], required: true },
    salary: { type: String },
    postedDate: { type: Date },
    closingDate: { type: Date },
    tenantId: { type: String, required: true },
    createdBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
  
  export const JobModel = mongoose.model("Job", jobSchema);