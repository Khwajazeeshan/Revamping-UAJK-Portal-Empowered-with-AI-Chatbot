import mongoose from "mongoose";

const admissionRequirementSchema = new mongoose.Schema({
  requirement: { type: String, required: true },   // e.g. High school diploma
  description: { type: String },                   // extra details if needed
  required: { type: Boolean, default: true },      // whether mandatory or optional
  program: { type: String, default: "General" }    // specific program name if applicable
}, { timestamps: true });

export default mongoose.model("AdmissionProcess", admissionRequirementSchema);
