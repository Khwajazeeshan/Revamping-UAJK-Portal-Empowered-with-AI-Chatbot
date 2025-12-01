import mongoose from "mongoose";

const virtualTourSchema = new mongoose.Schema({
    sectionTitle: { type: String, required: true },        // e.g. "Explore King Abdullah Campus"
    content: { type: String, required: true },             // description text
    campusType: { type: String, enum: ["Main Campus", "King Abdullah Campus", "Model Campus"], required: true },
    department: { type: String, default: null },           // e.g. "Computer Science Department"
    areaType: { type: String, enum: ["Building", "Classroom", "Library", "Lab", "Ground", "Auditorium", "Cafeteria"], default: "Building" },
    mediaType: { type: String, enum: ["text", "image", "video", "360-view"], default: "text" },
    mediaUrl: { type: String },
}, { timestamps: true });

export default mongoose.model("VirtualTour", virtualTourSchema);
