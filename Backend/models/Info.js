import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    projectName: { type: String, required: true },
    year: { type: Number, required: true },
    description: { type: String },
    department: { type: String, default: "CS&IT" },
    supervisor: { type: String, required: true },
    team: [
        {
            name: { type: String, required: true },
            role: { type: String, required: true },
            semester: { type: String },
            specialization: { type: String }
        }
    ],
    features: [{ type: String }],
}, { collection: "Info" }); // <-- Explicitly set collection name

const Info = mongoose.model("Info", projectSchema);
export default Info;
