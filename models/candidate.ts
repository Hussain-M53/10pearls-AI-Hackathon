import mongoose from "mongoose";
const candidateSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    location: { type: String },
    headline: { type: String },
    summary: { type: String },
    skills: { type: [String] },
    experience: { type: [{ title: String, company: String, location: String, startDate: String, endDate: String, current: Boolean, description: String }] },
    education: { type: [{ institution: String, degree: String, field: String, startDate: String, endDate: String, current: Boolean, description: String }] },
    certifications: { type: [{ name: String, issuer: String, issueDate: String, expiryDate: String, credentialId: String, credentialUrl: String }] },
    resumeUrl: { type: String },
    portfolioUrl: { type: String },
    linkedinUrl: { type: String },
    githubUrl: { type: String },
    tenantId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
  
  export const CandidateModel = mongoose.model("Candidate", candidateSchema);
  