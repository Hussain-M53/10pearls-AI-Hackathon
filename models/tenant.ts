import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  subdomain: { type: String, required: true },
  customDomain: { type: String },
  plan: {
    type: String,
    enum: ["free", "starter", "professional", "enterprise"],
    default: "free",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Prevent OverwriteModelError
export const TenantModel = mongoose.models.Tenant || mongoose.model("Tenant", tenantSchema);
