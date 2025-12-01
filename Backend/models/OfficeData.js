import mongoose from "mongoose";

const officeSchema = new mongoose.Schema({
    officeName: { type: String, required: true },
    head: { type: String, required: true },
    phone: { type: String },
    fax: { type: String },
    mobile: { type: String },
    email: { type: String }
}, { collection: "OfficeData" }); // Explicitly set collection name

const OfficeData = mongoose.model("OfficeData", officeSchema);

export default OfficeData;
