import mongoose from "mongoose";

const universitySchema = new mongoose.Schema({
    name: { type: String, required: true },   
    motto: { type: String },                  
    introduction: { type: String },           
    excellence: { type: String },             // ✅ New field added

    aimsAndObjectives: [{ type: String }],    

    programs: [{
        faculty: { type: String },            
        description: { type: String },        
    }],

    campuses: [{
        name: { type: String, required: true },
        location: { type: String },           
        description: { type: String },        
        features: [{ type: String }],         
    }],

    totalPrograms: { type: Number, default: 0 },
    totalStudents: { type: Number, default: 0 },

}, { timestamps: true, collection: "University" });

const University = mongoose.model("University", universitySchema);
export default University;
