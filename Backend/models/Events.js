import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },             // e.g. "Strengthening Cyber Education"
  description: { type: String, required: true },       // full detail or summary
  date: { type: Date },                                // if event date available
  campus: { type: String },                            // e.g. "King Abdullah Campus"
  organizers: [{ type: String }],                      // departments or collaborators
  chiefGuests: [{ type: String }],                     // e.g. "Mishal Hussain Malik"
  dignitaries: [{ type: String }],                     // other important guests
  faculty: [{ type: String }],                         // professors, directors, etc.
  students: [{ type: String }],                        // student leaders / participants
  highlights: [{ type: String }],                      // e.g. "Souvenir presented", "Cultural performances"
  categories: [{ type: String }],                      // e.g. ["Education", "Culture", "Sports"]
}, { timestamps: true });

const Event = mongoose.model("Event", eventSchema);
export default Event;
