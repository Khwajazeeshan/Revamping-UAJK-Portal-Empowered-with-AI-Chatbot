import mongoose from "mongoose";

const hostelSchema = new mongoose.Schema({
    campusName: { type: String, required: true },                  // e.g. "King Abdullah Campus"
    hostelName: { type: String, required: true },                  // e.g. "King Abdullah Campus Hostel"
    genderType: { type: String, enum: ["Boys", "Girls", "Both"], default: "Both" },
    feePerSemester: { type: Number, required: true },              // e.g. 18500
    roomCapacity: { type: Number, default: 2 },                    // e.g. 2 students per room
    facilities: { type: [String], required: true },                // List of facilities
    environment: { type: String },                                 // e.g. "Clean and peaceful environment"
    mediaType: { type: String, enum: ["text", "image", "video", "360-view"], default: "text" },
    mediaUrl: { type: String },                                    // Link to hostel virtual tour or images
}, { timestamps: true });

export default mongoose.model("Hostel", hostelSchema);
