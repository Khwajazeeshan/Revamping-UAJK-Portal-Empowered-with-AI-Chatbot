import mongoose from "mongoose";

const transportSchema = new mongoose.Schema({
    transportFee: { type: Number, required: true }, // 8000 per semester
    buses: {
        separateForGirlsAndBoys: { type: Boolean, default: true },
        routes: [
            {
                time: { type: String, required: true },
                from: { type: String, required: true },
                to: { type: String, required: true }
            }
        ],
        cityRoutes: [{ type: String }]
    },
    requirements: {
        mustPayFee: { type: Boolean, default: true },
        getBusCardFrom: { type: String, default: "University DSA’s Office" }
    },
    facilityForFaculty: { type: Boolean, default: true }
}, { collection: "TransportInfo" });

const TransportInfo = mongoose.model("TransportInfo", transportSchema);
export default TransportInfo;
