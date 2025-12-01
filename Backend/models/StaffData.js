import mongoose from "mongoose";

const staffMemberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    designation: { type: String },
    phone: { type: String },
    fax: { type: String },
    cell: { type: String },
    email: { type: String }
});

const officeStaffSchema = new mongoose.Schema({
    officeName: { type: String, required: true },
    staff: [staffMemberSchema]
});

export default mongoose.model("StaffData", officeStaffSchema, "StaffData");
