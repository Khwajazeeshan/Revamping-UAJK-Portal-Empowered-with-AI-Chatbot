import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    type: { type: String, required: true },    // e.g. "Chancellor", "Vice Chancellor", "Vision", "Mission", "Core Values"
    title: { type: String },                   // Title of the message
    content: { type: String, required: true }, // Full message text
    author: { type: String },                  // Person's name if available
    designation: { type: String },             // e.g. Chancellor / Vice Chancellor / President
}, { timestamps: true, collection: "Messages" });

const Message = mongoose.model("Message", messageSchema);
export default Message;
