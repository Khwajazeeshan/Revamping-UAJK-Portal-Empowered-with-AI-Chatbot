
import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import University from "../models/GeneralDetails.js";
import Event from "../models/Events.js"; // <-- import Event model
import Message from "../models/Messages.js"; // <-- import Message model
import Info from "../models/Info.js";
import OfficeData from "../models/OfficeData.js";
import StaffData from "../models/StaffData.js";
import AdmissionProcess from "../models/AdmissionProcess.js"; // <-- import AdmissionProcess model
import VirtualTour from "../models/VirtualTour.js"; // <-- import VirtualTour model
import Links from "../models/Links.js"; // <-- import Links model
import Transport from "../models/TransportInfo.js";
import Hostel from "../models/Hostel.js"


const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.1-8b-instant";

// Remove all local intent detection and formatting helpers
// Only moderation check and then always send full university document(s) to Groq

async function runDynamicDbQuery(message) {
    try {
        if (!message || !message.trim())
            return { reply: null, action: "no_db_action", params: {} };

        // Prevent generic greetings from triggering a DB search
        const greetings = ["hello", "hi", "hey", "salam", "assalamualaikum"];
        if (greetings.includes(message.trim().toLowerCase())) {
            return { reply: null, action: "no_db_action", params: {} };
        }

        // Moderation check (non-fatal)
        const moderationPrompt = `
You are a content moderation assistant. Analyze the following user message for any sexual, spam, abusive, or sensitive content.
If the message is inappropriate or violates community guidelines, reply ONLY with "BLOCKED".
If the message is safe, reply ONLY with "SAFE".

User message:
"${message}"
`.trim();

        const moderationPayload = {
            model: GROQ_MODEL,
            messages: [
                {
                    role: "system",
                    content: `
You are a content moderation assistant.

Guidelines:
1. Analyze the user's input and detect any unsafe, offensive, or disallowed content.
2. Focus only on the most important context required for moderation.
3. Keep your moderation summary or decision concise (no more than 1 clear lines).
4. Do not include extra explanations or unrelated text — only output moderation result.
`
                },
                { role: "user", content: moderationPrompt }
            ],
            temperature: 0.0
        };

        const axiosConfig = {
            headers: { Authorization: "Bearer " + (GROQ_API_KEY || ""), "Content-Type": "application/json" },
            timeout: 10000
        };

        try {
            if (GROQ_API_KEY) {
                const moderationRes = await axios.post(GROQ_ENDPOINT, moderationPayload, axiosConfig);
                const moderationReply = moderationRes?.data?.choices?.[0]?.message?.content?.trim();
                if (moderationReply && moderationReply.toUpperCase() === "BLOCKED") {
                    return {
                        reply: "Your message was blocked due to inappropriate or sensitive content. Please rephrase your query.",
                        action: "blocked",
                        params: {}
                    };
                }
            }
        } catch (merr) {
            console.warn("[DBINT] Moderation check failed (continuing):", merr?.message || merr);
        }

        const msgLower = message.toLowerCase();

        // --- LINKS HANDLER: STRICT RELEVANT MATCHING ---
        const linksKeywords = [
            "link", "links", "result", "results", "result link", "library", "digital library", "library link", "admission link", "apply link", "website link", "page link", "redirect", "url", "webpage", "portal", "online form", "official link", "prospectus"
        ];
        let linksDocs = [];
        let isLinksQuery = false;
        let matchedLinks = [];
        try {
            linksDocs = await Links.find({}, {}).lean();
            // Build a list of all link names and descriptions (lowercase)
            const allLinkNames = linksDocs.map(doc => doc.name?.toLowerCase() || "");
            const allDescriptions = linksDocs.map(doc => doc.description?.toLowerCase() || "");
            // Check if message contains any keyword or link name/description
            isLinksQuery =
                linksKeywords.some(kw => msgLower.includes(kw)) ||
                allLinkNames.some(name => name && msgLower.includes(name)) ||
                allDescriptions.some(desc => desc && msgLower.includes(desc));
            // STRICT: Only match if the link name or description is directly mentioned in the message
            matchedLinks = linksDocs.filter(doc => {
                const name = doc.name?.toLowerCase() || "";
                const desc = doc.description?.toLowerCase() || "";
                // Direct phrase match or strong partial match
                return (
                    msgLower.includes(name) ||
                    msgLower.includes(desc) ||
                    name.includes(msgLower) ||
                    desc.includes(msgLower) ||
                    linksKeywords.some(kw =>
                        (name.includes(kw) && msgLower.includes(kw)) ||
                        (desc.includes(kw) && msgLower.includes(kw))
                    )
                );
            });
        } catch (err) {
            console.error("[DBINT] Failed to read Links documents:", err?.message || err);
            linksDocs = [];
        }

        // Only show all links if user asks for "all links" or "show all links"
        const askAllLinks = /\ball links\b|\bshow all links\b/.test(msgLower);

        if (isLinksQuery && linksDocs.length > 0) {
            if (askAllLinks) {
                // User explicitly asked for all links
                let reply = "Here are all available links from UAJK:\n";
                reply += linksDocs.map(link =>
                    `• ${link.name}: ${link.description}\n  [${link.link}]`
                ).join("\n");
                return { reply, action: "links_data_groq", params: {} };
            } else if (matchedLinks.length > 0) {
                // Only show strictly matched links
                let reply = "Here is the relevant link" + (matchedLinks.length > 1 ? "s" : "") + " from UAJK:\n";
                reply += matchedLinks.map(link =>
                    `• ${link.name}: ${link.description}\n  [${link.link}]`
                ).join("\n");
                return { reply, action: "links_data_groq", params: {} };
            } else {
                // No specific match, but query is about links
                return { reply: "Sorry, no matching links information found.", action: "no_links_data", params: {} };
            }
        } else if (isLinksQuery && linksDocs.length === 0) {
            return { reply: "Sorry, no links information found.", action: "no_links_data", params: {} };
        }

        // AdmissionProcess-related query detection (simple keyword match)
        const admissionProcessKeywords = [
            "admission process", "admission requirement", "admission criteria", "eligibility", "how to apply", "application process", "admission steps", "admission procedure", "admission policy", "admission rules", "admission guideline", "admission instructions", "admission documents", "admission form", "admission deadline", "admission fee", "admission schedule", "admission information"
        ];
        const isAdmissionProcessQuery = admissionProcessKeywords.some(kw => msgLower.includes(kw)) || msgLower.includes("admissionprocess");

        if (isAdmissionProcessQuery) {
            // Fetch all admission process requirements and send to Groq
            let admissionProcesses = [];
            try {
                admissionProcesses = await AdmissionProcess.find({}, {}).lean();
                console.log("[DBINT] AdmissionProcess documents fetched from DB:", admissionProcesses);
            } catch (err) {
                console.error("[DBINT] Failed to read AdmissionProcess documents:", err?.message || err);
                admissionProcesses = [];
            }
            if (!Array.isArray(admissionProcesses) || admissionProcesses.length === 0) {
                console.warn("[DBINT] No AdmissionProcess documents found in DB.");
                return { reply: "Sorry, no admission process information found.", action: "no_admission_process_data", params: {} };
            }

            const prompt = `
You are the official assistant for the University of Azad Jammu & Kashmir (UAJK).
You MUST answer as the UAJK assistant and base your responses ONLY on the provided admission process data below.
Do NOT invent facts or claim affiliation with any other university.
Do NOT mix this data with any other university data (such as events, staff, departments, etc).

Here is the user's question:
"${message}"

Here is the university admission process data (as JSON array):
${JSON.stringify(admissionProcesses, null, 2)}

Instructions:
- Analyze the user's question and answer ONLY using the admission process data provided above.
- If the user asks for requirements, eligibility, documents, steps, deadlines, or related info, use the fields in the JSON.
- If nothing matches, reply: "Sorry, no matching admission process information found."
- Reply concisely and clearly.
`.trim();

            console.log("[DBINT] Prompt to be sent to Groq API (admission process):\n", prompt);

            const payload = {
                model: GROQ_MODEL,
                messages: [
                    {
                        role: "system",
                        content: `
You are a helpful university admission process assistant for UAJK.
Use only the provided JSON data to answer.

Guidelines:
1. Focus only on the most important and relevant admission information.
2. Keep your response concise and clear — maximum of 1 lines.
3. Do not invent or assume facts outside the provided JSON data.
4. Provide short, optimized, and direct answers only.
`
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],

                temperature: 0.0,
                max_tokens: 1500
            };

            console.log("[DBINT] Payload for Groq API (admission process):", JSON.stringify(payload, null, 2));

            try {
                const groqRes = await axios.post(GROQ_ENDPOINT, payload, axiosConfig);
                console.log("[DBINT] Groq API response (admission process):", groqRes?.data);
                const reply = groqRes?.data?.choices?.[0]?.message?.content?.trim() || "Sorry, no matching admission process information found.";
                return { reply, action: "admission_process_groq", params: {} };
            } catch (err) {
                console.error("[DBINT] Groq request failed (admission process):", err?.message || err);
                return { reply: null, action: "error", params: {}, error: "groq_request_failed" };
            }
        }

        // Event-related query detection (simple keyword match)
        const eventKeywords = [
            "event", "seminar", "workshop", "conference", "sports", "competition", "festival"
        ];
        const isEventQuery = eventKeywords.some(kw => msgLower.includes(kw));

        if (isEventQuery) {
            // Fetch all events and send to Groq
            let events = [];
            try {
                events = await Event.find({}, {}).lean();
                console.log("[DBINT] Event documents fetched from DB:", events);
            } catch (err) {
                console.error("[DBINT] Failed to read Event documents:", err?.message || err);
                events = [];
            }
            if (!Array.isArray(events) || events.length === 0) {
                console.warn("[DBINT] No event documents found in DB.");
                return { reply: "Sorry, no event information found.", action: "no_event_data", params: {} };
            }

            const prompt = `
You are the official assistant for the University of Azad Jammu & Kashmir (UAJK).
You MUST answer as the UAJK assistant and base your responses ONLY on the provided event data below.
Do NOT invent facts or claim affiliation with any other university.

Here is the user's question:
"${message}"

Here is the university event data (as JSON array):
${JSON.stringify(events, null, 2)}

Instructions:
- Analyze the user's question and answer ONLY using the event data provided above.
- If the user asks for event details, dates, organizers, participants, or highlights, use the fields in the JSON.
- If nothing matches, reply: "Sorry, no matching event information found."
- Reply concisely and clearly.
`.trim();

            console.log("[DBINT] Prompt to be sent to Groq API (event):\n", prompt);

            const payload = {
                model: GROQ_MODEL,
                messages: [
                    {
                        role: "system",
                        content: `
You are a helpful university event assistant for UAJK.
Use only the provided JSON data to answer.

Guidelines:
1. Focus only on the most important and relevant event details.
2. Keep your answer concise — no more than 1 lines.
3. Avoid unnecessary descriptions or long sentences.
4. Do not invent any events or details not found in the JSON data.
`
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],

                temperature: 0.0,
                max_tokens: 1500
            };

            console.log("[DBINT] Payload for Groq API (event):", JSON.stringify(payload, null, 2));

            try {
                const groqRes = await axios.post(GROQ_ENDPOINT, payload, axiosConfig);
                console.log("[DBINT] Groq API response (event):", groqRes?.data);
                const reply = groqRes?.data?.choices?.[0]?.message?.content?.trim() || "Sorry, no matching event information found.";
                return { reply, action: "event_info_groq", params: {} };
            } catch (err) {
                console.error("[DBINT] Groq request failed (event):", err?.message || err);
                return { reply: null, action: "error", params: {}, error: "groq_request_failed" };
            }
        }

        // OfficeData-related query detection (simple keyword match)
        const officeKeywords = [
            "office", "office name", "office head", "office contact", "office phone", "office email", "office fax", "office mobile", "department office", "administration office", "registrar", "controller", "directorate", "office information", "vice chancellor "
        ];
        const isOfficeQuery = officeKeywords.some(kw => msgLower.includes(kw));

        // Enhanced: Check if user message contains any office name or head name from OfficeData collection
        let offices = [];
        let officeNameMatch = false;
        try {
            offices = await OfficeData.find({}, {}).lean();
            const allOfficeNames = [];
            offices.forEach(doc => {
                if (doc.officeName) allOfficeNames.push(doc.officeName.toLowerCase());
                if (doc.head) allOfficeNames.push(doc.head.toLowerCase());
            });
            officeNameMatch = allOfficeNames.some(name => msgLower.includes(name));
        } catch (err) {
            console.error("[DBINT] Failed to read OfficeData documents:", err?.message || err);
            offices = [];
        }

        if (isOfficeQuery || officeNameMatch) {
            if (!Array.isArray(offices) || offices.length === 0) {
                console.warn("[DBINT] No OfficeData documents found in DB.");
                return { reply: "Sorry, no office information found.", action: "no_office_data", params: {} };
            }

            const prompt = `
You are the official assistant for the University of Azad Jammu & Kashmir (UAJK).
You MUST answer as the UAJK assistant and base your responses ONLY on the provided office data below.
Do NOT invent facts or claim affiliation with any other university.

Here is the user's question:
"${message}"

Here is the university office data (as JSON array):
${JSON.stringify(offices, null, 2)}

Instructions:
- Analyze the user's question and answer ONLY using the office data provided above.
- If the user asks for office names, heads, phone, fax, mobile, or email, use the fields in the JSON.
- If nothing matches, reply: "Sorry, no matching office information found."
- Reply concisely and clearly.
`.trim();

            console.log("[DBINT] Prompt to be sent to Groq API (office):\n", prompt);

            const payload = {
                model: GROQ_MODEL,
                messages: [
                    {
                        role: "system",
                        content: `
You are a helpful university office assistant for UAJK.
Use only the provided JSON data to answer.

Guidelines:
1. Provide only the most important and relevant office information.
2. Keep your answer concise — maximum 1 lines.
3. Avoid long or unnecessary explanations.
4. Never add or assume data not present in the JSON.
`
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],

                temperature: 0.0,
                max_tokens: 1500
            };

            console.log("[DBINT] Payload for Groq API (office):", JSON.stringify(payload, null, 2));

            try {
                const groqRes = await axios.post(GROQ_ENDPOINT, payload, axiosConfig);
                console.log("[DBINT] Groq API response (office):", groqRes?.data);
                const reply = groqRes?.data?.choices?.[0]?.message?.content?.trim() || "Sorry, no matching office information found.";
                return { reply, action: "office_data_groq", params: {} };
            } catch (err) {
                console.error("[DBINT] Groq request failed (office):", err?.message || err);
                return { reply: null, action: "error", params: {}, error: "groq_request_failed" };
            }
        }

        // Message-related query detection (simple keyword match)
        const messageKeywords = [
            "chancellor", "vc message", "chancellor message", "vision", "mission", "core values", "president message", "principal message", "dean message", "director message", "message from", "message of", "messages"
        ];
        const isMessageQuery = messageKeywords.some(kw => msgLower.includes(kw));

        if (isMessageQuery) {
            // Fetch all messages and send to Groq
            let messages = [];
            try {
                messages = await Message.find({}, {}).lean();
                console.log("[DBINT] Message documents fetched from DB:", messages);
            } catch (err) {
                console.error("[DBINT] Failed to read Message documents:", err?.message || err);
                messages = [];
            }
            if (!Array.isArray(messages) || messages.length === 0) {
                console.warn("[DBINT] No message documents found in DB.");
                return { reply: "Sorry, no message information found.", action: "no_message_data", params: {} };
            }

            const prompt = `
You are the official assistant for the University of Azad Jammu & Kashmir (UAJK).
You MUST answer as the UAJK assistant and base your responses ONLY on the provided official messages data below.
Do NOT invent facts or claim affiliation with any other university.

Here is the user's question:
"${message}"

Here is the university official messages data (as JSON array):
${JSON.stringify(messages, null, 2)}

Instructions:
- Analyze the user's question and answer ONLY using the official messages data provided above.
- If the user asks for messages from the chancellor, vice chancellor, vision, mission, or core values, use the fields in the JSON.
- If nothing matches, reply: "Sorry, no matching message information found."
- Reply concisely and clearly.
`.trim();

            console.log("[DBINT] Prompt to be sent to Groq API (messages):\n", prompt);

            const payload = {
                model: GROQ_MODEL,
                messages: [
                    {
                        role: "system",
                        content: `
You are a helpful university assistant for UAJK.
Use only the provided JSON data to answer.

Guidelines:
1. Focus only on the key and relevant university details.
2. Keep your response short and optimized — no more than 1 lines.
3. Avoid repeating, overexplaining, or adding extra details.
4. Never include data that isn't available in the provided JSON.
`
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],

                temperature: 0.0,
                max_tokens: 1500
            };

            console.log("[DBINT] Payload for Groq API (messages):", JSON.stringify(payload, null, 2));

            try {
                const groqRes = await axios.post(GROQ_ENDPOINT, payload, axiosConfig);
                console.log("[DBINT] Groq API response (messages):", groqRes?.data);
                const reply = groqRes?.data?.choices?.[0]?.message?.content?.trim() || "Sorry, no matching message information found.";
                return { reply, action: "message_info_groq", params: {} };
            } catch (err) {
                console.error("[DBINT] Groq request failed (messages):", err?.message || err);
                return { reply: null, action: "error", params: {}, error: "groq_request_failed" };
            }
        }

        // Project/info-related query detection (simple keyword match)
        const infoKeywords = [
            "project", "khawaja zeeshan", "zeeshan younas", "dr zaki hassan kazmi", "develop", "final year project", "fyp", "student project", "supervisor", "team member", "project info", "project information", "project details"
        ];
        const isInfoQuery = infoKeywords.some(kw => msgLower.includes(kw));

        // Enhanced: Check if user message contains any supervisor or team member name from Info collection
        let infos = [];
        let infoNameMatch = false;
        try {
            infos = await Info.find({}, {}).lean();
            // Build a list of all supervisor and team member names (lowercase)
            const allNames = [];
            infos.forEach(doc => {
                if (doc.supervisor) allNames.push(doc.supervisor.toLowerCase());
                if (Array.isArray(doc.team)) {
                    doc.team.forEach(member => {
                        if (member.name) allNames.push(member.name.toLowerCase());
                    });
                }
            });
            infoNameMatch = allNames.some(name => msgLower.includes(name));
        } catch (err) {
            console.error("[DBINT] Failed to read info (project) documents:", err?.message || err);
            infos = [];
        }

        if (isInfoQuery || infoNameMatch) {
            // Fetch all info (project) documents and send to Groq
            let infos = [];
            try {
                infos = await Info.find({}, {}).lean();
                console.log("[DBINT] Info (project) documents fetched from DB:", infos);
            } catch (err) {
                console.error("[DBINT] Failed to read info (project) documents:", err?.message || err);
                infos = [];
            }
            if (!Array.isArray(infos) || infos.length === 0) {
                console.warn("[DBINT] No info (project) documents found in DB.");
                return { reply: "Sorry, no project information found.", action: "no_info_data", params: {} };
            }

            const prompt = `
You are the official assistant for the University of Azad Jammu & Kashmir (UAJK).
You MUST answer as the UAJK assistant and base your responses ONLY on the provided student project data below.
Do NOT invent facts or claim affiliation with any other university.

Here is the user's question:
"${message}"

Here is the university student project data (as JSON array):
${JSON.stringify(infos, null, 2)}

Instructions:
- Analyze the user's question and answer ONLY using the student project data provided above.
- If the user asks for project names, years, descriptions, departments, supervisors, team members, or features, use the fields in the JSON.
- If nothing matches, reply: "Sorry, no matching project information found."
- Reply concisely and clearly.
`.trim();

            console.log("[DBINT] Prompt to be sent to Groq API (info):\n", prompt);

            const payload = {
                model: GROQ_MODEL,
                messages: [
                    {
                        role: "system",
                        content: `
You are a helpful university project assistant for UAJK.
Use only the provided JSON data to answer.

Guidelines:
1. Focus only on the most relevant and essential project information.
2. Keep the response concise — maximum 1 lines.
3. Avoid unnecessary details or long sentences.
4. Do not create or assume any data not found in the JSON.
`
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],

                temperature: 0.0,
                max_tokens: 1500
            };

            console.log("[DBINT] Payload for Groq API (info):", JSON.stringify(payload, null, 2));

            try {
                const groqRes = await axios.post(GROQ_ENDPOINT, payload, axiosConfig);
                console.log("[DBINT] Groq API response (info):", groqRes?.data);
                const reply = groqRes?.data?.choices?.[0]?.message?.content?.trim() || "Sorry, no matching project information found.";
                return { reply, action: "info_data_groq", params: {} };
            } catch (err) {
                console.error("[DBINT] Groq request failed (info):", err?.message || err);
                return { reply: null, action: "error", params: {}, error: "groq_request_failed" };
            }
        }

        // StaffData-related query detection (simple keyword match)
        const staffKeywords = [
            "staff", "staff member", "office staff", "staff contact", "staff phone", "staff email", "staff fax", "staff cell", "staff designation", "employee", "faculty", "teacher", "professor", "lecturer", "admin staff", "support staff"
        ];
        const isStaffQuery = staffKeywords.some(kw => msgLower.includes(kw));

        // Enhanced: Check if user message contains any office name or staff member name from StaffData collection
        let staffs = [];
        let staffNameMatch = false;
        try {
            staffs = await StaffData.find({}, {}).lean();
            const allStaffNames = [];
            staffs.forEach(doc => {
                if (doc.officeName) allStaffNames.push(doc.officeName.toLowerCase());
                if (Array.isArray(doc.staff)) {
                    doc.staff.forEach(member => {
                        if (member.name) allStaffNames.push(member.name.toLowerCase());
                    });
                }
            });
            staffNameMatch = allStaffNames.some(name => msgLower.includes(name));
        } catch (err) {
            console.error("[DBINT] Failed to read StaffData documents:", err?.message || err);
            staffs = [];
        }

        if (isStaffQuery || staffNameMatch) {
            if (!Array.isArray(staffs) || staffs.length === 0) {
                console.warn("[DBINT] No StaffData documents found in DB.");
                return { reply: "Sorry, no staff information found.", action: "no_staff_data", params: {} };
            }

            const prompt = `
You are the official assistant for the University of Azad Jammu & Kashmir (UAJK).
You MUST answer as the UAJK assistant and base your responses ONLY on the provided staff data below.
Do NOT invent facts or claim affiliation with any other university.

Here is the user's question:
"${message}"

Here is the university staff data (as JSON array):
${JSON.stringify(staffs, null, 2)}

Instructions:
- Analyze the user's question and answer ONLY using the staff data provided above.
- If the user asks for office names, staff names, designations, phone, fax, cell, or email, use the fields in the JSON.
- If nothing matches, reply: "Sorry, no matching staff information found."
- Reply concisely and clearly.
`.trim();

            console.log("[DBINT] Prompt to be sent to Groq API (staff):\n", prompt);

            const payload = {
                model: GROQ_MODEL,
                messages: [
                    {
                        role: "system",
                        content: `
You are a helpful university staff assistant for UAJK.
Use only the provided JSON data to answer.

Guidelines:
1. Provide only the most relevant staff information (name, role, or department).
2. Keep the response short and optimized — no more than 1 lines.
3. Avoid adding unnecessary or repetitive details.
4. Never include or assume data not present in the JSON.
`
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],

                temperature: 0.0,
                max_tokens: 1500
            };

            console.log("[DBINT] Payload for Groq API (staff):", JSON.stringify(payload, null, 2));

            try {
                const groqRes = await axios.post(GROQ_ENDPOINT, payload, axiosConfig);
                console.log("[DBINT] Groq API response (staff):", groqRes?.data);
                const reply = groqRes?.data?.choices?.[0]?.message?.content?.trim() || "Sorry, no matching staff information found.";
                return { reply, action: "staff_data_groq", params: {} };
            } catch (err) {
                console.error("[DBINT] Groq request failed (staff):", err?.message || err);
                return { reply: null, action: "error", params: {}, error: "groq_request_failed" };
            }
        }

        // Hostel-related query detection (simple keyword match)
        const hostelKeywords = [
            "hostel", "hostel fee", "boys hostel", "girls hostel", "accommodation", "student residence",
            "living facility", "campus hostel", "hostel room", "boarding", "residential facility"
        ];
        const isHostelQuery = hostelKeywords.some(kw => msgLower.includes(kw)) || msgLower.includes("hostelfacility");

        // Enhanced: Check if user message contains any hostelName or campusName from Hostel collection
        let hostels = [];
        let hostelTitleMatch = false;
        try {
            hostels = await Hostel.find({}, {}).lean();
            const allHostelTitles = [];
            hostels.forEach(doc => {
                if (doc.hostelName) allHostelTitles.push(doc.hostelName.toLowerCase());
                if (doc.campusName) allHostelTitles.push(doc.campusName.toLowerCase());
            });
            hostelTitleMatch = allHostelTitles.some(title => msgLower.includes(title));
        } catch (err) {
            console.error("[DBINT] Failed to read Hostel documents:", err?.message || err);
            hostels = [];
        }

        if (isHostelQuery || hostelTitleMatch) {
            if (!Array.isArray(hostels) || hostels.length === 0) {
                console.warn("[DBINT] No Hostel documents found in DB.");
                return { reply: "Sorry, no hostel information found.", action: "no_hostel_data", params: {} };
            }

            const prompt = `
You are the official assistant for the University of Azad Jammu & Kashmir (UAJK).
You MUST answer as the UAJK assistant and base your responses ONLY on the provided hostel facility data below.
Do NOT invent facts or claim affiliation with any other university.
Do NOT mix this data with other unrelated information.

Here is the user's question:
"${message}"

Here is the university hostel facility data (as JSON array):
${JSON.stringify(hostels, null, 2)}

Instructions:
- Analyze the user's question and answer ONLY using the hostel data provided above.
- If the user asks about hostel fees, facilities, gender types, or campus hostels, use the fields in the JSON.
- If nothing matches, reply: "Sorry, no matching hostel information found."
- Reply concisely and clearly.
`.trim();

            console.log("[DBINT] Prompt to be sent to Groq API (hostel):\n", prompt);

            const payload = {
                model: GROQ_MODEL,
                messages: [
                    {
                        role: "system",
                        content: `
You are a helpful university assistant for UAJK.
Use only the provided JSON data to answer hostel-related questions.

Guidelines:
1. Focus on hostel details like fee, gender, facilities, or campus name.
2. Keep the answer short — 1 to 2 lines maximum.
3. Do not include or invent information not found in the provided data.
`
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],

                temperature: 0.0,
                max_tokens: 1500
            };

            console.log("[DBINT] Payload for Groq API (hostel):", JSON.stringify(payload, null, 2));

            try {
                const groqRes = await axios.post(GROQ_ENDPOINT, payload, axiosConfig);
                console.log("[DBINT] Groq API response (hostel):", groqRes?.data);
                const reply = groqRes?.data?.choices?.[0]?.message?.content?.trim() || "Sorry, no matching hostel information found.";
                return { reply, action: "hostel_data_groq", params: {} };
            } catch (err) {
                console.error("[DBINT] Groq request failed (hostel):", err?.message || err);
                return { reply: null, action: "error", params: {}, error: "groq_request_failed" };
            }
        }


        // VirtualTour-related query detection (simple keyword match)
        const virtualTourKeywords = [
            "virtual tour", "3d tour", "campus tour", "virtual visit", "virtual walkthrough", "virtual campus", "virtual experience", "virtual view", "virtual reality tour", "online tour"
        ];
        const isVirtualTourQuery = virtualTourKeywords.some(kw => msgLower.includes(kw)) || msgLower.includes("virtualtour");

        // Enhanced: Check if user message contains any sectionTitle from VirtualTour collection
        let virtualTours = [];
        let virtualTourTitleMatch = false;
        try {
            virtualTours = await VirtualTour.find({}, {}).lean();
            const allSectionTitles = [];
            virtualTours.forEach(doc => {
                if (doc.sectionTitle) allSectionTitles.push(doc.sectionTitle.toLowerCase());
            });
            virtualTourTitleMatch = allSectionTitles.some(title => msgLower.includes(title));
        } catch (err) {
            console.error("[DBINT] Failed to read VirtualTour documents:", err?.message || err);
            virtualTours = [];
        }

        if (isVirtualTourQuery || virtualTourTitleMatch) {
            if (!Array.isArray(virtualTours) || virtualTours.length === 0) {
                console.warn("[DBINT] No VirtualTour documents found in DB.");
                return { reply: "Sorry, no virtual tour information found.", action: "no_virtualtour_data", params: {} };
            }

            const prompt = `
You are the official assistant for the University of Azad Jammu & Kashmir (UAJK).
You MUST answer as the UAJK assistant and base your responses ONLY on the provided virtual tour data below.
Do NOT invent facts or claim affiliation with any other university.
Do NOT mix this data with any other university data (such as events, staff, departments, etc).

Here is the user's question:
"${message}"

Here is the university virtual tour data (as JSON array):
${JSON.stringify(virtualTours, null, 2)}

Instructions:
- Analyze the user's question and answer ONLY using the virtual tour data provided above.
- If the user asks for virtual tour sections, descriptions, media, or related info, use the fields in the JSON.
- If nothing matches, reply: "Sorry, no matching virtual tour information found."
- Reply concisely and clearly.
`.trim();

            console.log("[DBINT] Prompt to be sent to Groq API (virtual tour):\n", prompt);

            const payload = {
                model: GROQ_MODEL,
                messages: [
                    {
                        role: "system",
                        content: `
You are a helpful university virtual tour assistant for UAJK.
Use only the provided JSON data to answer.

Guidelines:
1. Provide only the most important and relevant virtual tour details (like key locations, highlights, or features).  
2. Keep the answer short and optimized — no more than 1 lines.  
3. Avoid unnecessary descriptions or extra wording.  
4. Do not include or invent any information not present in the provided data.
`
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],

                temperature: 0.0,
                max_tokens: 1500
            };

            console.log("[DBINT] Payload for Groq API (virtual tour):", JSON.stringify(payload, null, 2));

            try {
                const groqRes = await axios.post(GROQ_ENDPOINT, payload, axiosConfig);
                console.log("[DBINT] Groq API response (virtual tour):", groqRes?.data);
                const reply = groqRes?.data?.choices?.[0]?.message?.content?.trim() || "Sorry, no matching virtual tour information found.";
                return { reply, action: "virtualtour_data_groq", params: {} };
            } catch (err) {
                console.error("[DBINT] Groq request failed (virtual tour):", err?.message || err);
                return { reply: null, action: "error", params: {}, error: "groq_request_failed" };
            }
        }

        // Transport-related query detection (simple keyword match)
        const transportKeywords = [
            "transport", "bus", "shuttle", "van", "university transport", "transportation", "Tranport route", "bus route", "bus timing", "bus schedule", "pickup", "drop", "bus stop", "Faculty transport", "Tranport Fee", "Bus Fee", "Tranport card", "Bus card"
        ];
        const isTransportQuery = transportKeywords.some(kw => msgLower.includes(kw));

        if (isTransportQuery) {
            let transports = [];
            try {
                transports = await Transport.find({}, {}).lean();
                console.log("[DBINT] Transport documents fetched from DB:", transports);
            } catch (err) {
                console.error("[DBINT] Failed to read Transport documents:", err?.message || err);
                transports = [];
            }

            if (!Array.isArray(transports) || transports.length === 0) {
                console.warn("[DBINT] No Transport documents found in DB.");
                return { reply: "Sorry, no transport information found.", action: "no_transport_data", params: {} };
            }

            const prompt = `
You are the official assistant for the University of Azad Jammu & Kashmir (UAJK).
You MUST answer as the UAJK assistant and base your responses ONLY on the provided transport data below.
Do NOT invent facts or claim affiliation with any other university.

Here is the user's question:
"${message}"

Here is the university transport data (as JSON array):
${JSON.stringify(transports, null, 2)}

Instructions:
- Analyze the user's question and answer ONLY using the transport data provided above.
- If the user asks for bus routes, timing, locations, or related info, use the fields in the JSON.
- If nothing matches, reply: "Sorry, no matching transport information found."
- Reply concisely and clearly.
`.trim();

            const payload = {
                model: GROQ_MODEL,
                messages: [
                    {
                        role: "system",
                        content: `
You are a helpful university transport assistant for UAJK.
Use only the provided JSON data to answer.

Guidelines:
1. Share only the most relevant transport information (routes, timings, or facilities).  
2. Keep your answer short and optimized — no more than 1 lines.  
3. Avoid unnecessary details or repetition.  
4. Do not include or assume any data not present in the JSON.
`
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],

                temperature: 0.0,
                max_tokens: 1500
            };

            try {
                const groqRes = await axios.post(GROQ_ENDPOINT, payload, axiosConfig);
                console.log("[DBINT] Groq API response (transport):", groqRes?.data);
                const reply = groqRes?.data?.choices?.[0]?.message?.content?.trim() || "Sorry, no matching transport information found.";
                return { reply, action: "transport_data_groq", params: {} };
            } catch (err) {
                console.error("[DBINT] Groq request failed (transport):", err?.message || err);
                return { reply: null, action: "error", params: {}, error: "groq_request_failed" };
            }
        }

        //         // Fetch all university documents (array) and send the whole array to Groq
        //         let fullDocs = [];
        //         try {
        //             fullDocs = await University.find({}, {}).lean();
        //             console.log("[DBINT] University documents fetched from DB:", fullDocs);
        //         } catch (dberr) {
        //             console.error("[DBINT] Failed to read University documents:", dberr?.message || dberr);
        //             fullDocs = [];
        //         }
        //         if (!Array.isArray(fullDocs) || fullDocs.length === 0) {
        //             console.warn("[DBINT] No university documents found in DB.");
        //             return { reply: null, action: "no_db_action", params: {} };
        //         }

        //         // Compose prompt for Groq using the entire university document(s)
        //         const prompt = `
        // You are the official assistant for the University of Azad Jammu & Kashmir (UAJK).
        // You MUST answer as the UAJK assistant and base your responses ONLY on the provided university data below.
        // Do NOT invent facts or claim affiliation with any other university.

        // Here is the user's question:
        // "${message}"

        // Here is the university data (as JSON array):
        // ${JSON.stringify(fullDocs, null, 2)}

        // Instructions:
        // - Analyze the user's question and answer ONLY using the university data provided above.
        // - If the user asks for overview, aims, programs, campus details, or any other info, use the fields in the JSON.
        // - If nothing matches, reply: "Sorry, no matching information found."
        // - Reply concisely and clearly.
        // `.trim();

        //         console.log("[DBINT] Prompt to be sent to Groq API:\n", prompt);

        //         const payload = {
        //             model: GROQ_MODEL,
        //             messages: [
        //                 { role: "system", content: "You are a helpful university assistant for UAJK. Use only the provided JSON data to answer." },
        //                 { role: "user", content: prompt }
        //             ],
        //             temperature: 0.0,
        //             max_tokens: 1500
        //         };

        //         console.log("[DBINT] Payload for Groq API:", JSON.stringify(payload, null, 2));

        //         try {
        //             const groqRes = await axios.post(GROQ_ENDPOINT, payload, axiosConfig);
        //             console.log("[DBINT] Groq API response:", groqRes?.data);
        //             const reply = groqRes?.data?.choices?.[0]?.message?.content?.trim() || "Sorry, no matching information found.";
        //             return { reply, action: "university_info_groq", params: {} };
        //         } catch (err) {
        //             console.error("[DBINT] Groq request failed:", err?.message || err);
        //             return { reply: null, action: "error", params: {}, error: "groq_request_failed" };
        //         }

    } catch (err) {
        console.error("runDynamicDbQuery unexpected error:", err?.message || err);
        if (err?.code === "ECONNREFUSED") {
            return { reply: null, action: "error", params: {}, error: "connection_refused" };
        }
        if (err?.code === "ECONNABORTED" || (err?.message || "").toLowerCase().includes("timeout")) {
            return { reply: null, action: "error", params: {}, error: "timeout" };
        }
        return { reply: null, action: "error", params: {}, error: "internal_error" };
    }

    // University-related query detection (simple keyword match)
    const universityKeywords = [
        "university", "uajk", "azad jammu and kashmir university", "campus", "department", "departments", "how many department", "how many students", "students", "how many programs", "programs",
        "faculty", "program", "admission", "overview", "mission", "vision", "aim", "goal",
        "fee", "structure", "location", "address", "ranking", "contact", "university info",
        "about university", "courses", "degree", "education", "facilities"
    ];

    const isUniversityQuery = universityKeywords.some(kw => msgLower.includes(kw));

    if (isUniversityQuery) {
        // Fetch all university documents (array) and send the whole array to Groq
        let fullDocs = [];
        try {
            fullDocs = await University.find({}, {}).lean();
            console.log("[DBINT] University documents fetched from DB:", fullDocs);
        } catch (dberr) {
            console.error("[DBINT] Failed to read University documents:", dberr?.message || dberr);
            fullDocs = [];
        }

        if (!Array.isArray(fullDocs) || fullDocs.length === 0) {
            console.warn("[DBINT] No university documents found in DB.");
            return { reply: null, action: "no_db_action", params: {} };
        }

        // Compose prompt for Groq using the entire university document(s)
        const prompt = `
You are the official assistant for the University of Azad Jammu & Kashmir (UAJK).
You MUST answer as the UAJK assistant and base your responses ONLY on the provided university data below.
Do NOT invent facts or claim affiliation with any other university.

Here is the user's question:
"${message}"

Here is the university data (as JSON array):
${JSON.stringify(fullDocs, null, 2)}

Instructions:
- Analyze the user's question and answer ONLY using the university data provided above.
- If the user asks for overview, aims, programs, campus details, or any other info, use the fields in the JSON.
- If nothing matches, reply: "Sorry, no matching information found."
- Reply concisely and clearly.
`.trim();

        console.log("[DBINT] Prompt to be sent to Groq API:\n", prompt);

        const payload = {
            model: GROQ_MODEL,
            messages: [
                {
                    role: "system",
                    content: `
You are a helpful university assistant for UAJK.
Use only the provided JSON data to answer.

Guidelines:
1. Provide only the most important and relevant information from the data.  
2. Keep the answer concise and optimized — no more than 1 lines.  
3. Avoid unnecessary details, repetition, or extra explanations.  
4. Never invent or assume any data not found in the JSON.
`
                },
                {
                    role: "user",
                    content: prompt
                }
            ],

            temperature: 0.0,
            max_tokens: 1500
        };

        console.log("[DBINT] Payload for Groq API:", JSON.stringify(payload, null, 2));

        try {
            const groqRes = await axios.post(GROQ_ENDPOINT, payload, axiosConfig);
            console.log("[DBINT] Groq API response:", groqRes?.data);
            const reply = groqRes?.data?.choices?.[0]?.message?.content?.trim() || "Sorry, no matching information found.";
            return { reply, action: "university_info_groq", params: {} };
        } catch (err) {
            console.error("[DBINT] Groq request failed:", err?.message || err);
            return { reply: null, action: "error", params: {}, error: "groq_request_failed" };
        }
    }

}


function healthCheck() {
    return { status: "ok", service: "chatbot-controller" };
}

// Only keep getUniversityDoc for other modules if needed
async function getUniversityDoc() {
    try {
        const uniDoc = await University.findOne({}, {}).lean();
        return uniDoc || null;
    } catch (err) {
        console.error("[DBINT] getUniversityDoc failed:", err?.message || err);
        return null;
    }
}

export default { runDynamicDbQuery, healthCheck, getUniversityDoc };
