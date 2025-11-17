
import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import ChatbotData from "../models/chatbotmodel.js";
// import ListingItem from "../models/listingitemmodel.js";
import dbInteraction from "./controllerdatabaseinteraction.js"; // default import (CJS interop)
const GROQ_API_KEY = process.env.GROQ_API_KEY;

// Removed FAQ-specific helpers and matching:
// - tokenize, pickTopFaqs, buildFaqPrompt

function buildGeneralPrompt(message, projectTitle) {
  return `
You are the assistant for "${projectTitle}" (a university assistant).
Answer the user's question clearly and concisely in 3–6 sentences.
If specifics like program details, campus locations, admission steps, or university policies are unknown, explain how to find them on the official university site or contact offices.

User question:
${message}
`.trim();
}

// Centralized axios config used for all Groq calls
const groqAxiosConfig = () => ({
  headers: {
    Authorization: `Bearer ${GROQ_API_KEY || ""}`,
    "Content-Type": "application/json"
  },
  timeout: 15000 // 15s timeout
});

// Helper: Use Groq to classify if the user wants a university database interaction
async function classifyDatabaseIntent(message) {
  try {
    const endpoint = "https://api.groq.com/openai/v1/chat/completions";
    const payload = {
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `
You are an intent classifier and response optimizer for a university assistant.
Your tasks:
1. Identify the user's intent and decide the correct action using the list below:
   - "GET_OVERVIEW"
   - "LIST_PROGRAMS"
   - "LIST_CAMPUSES"
   - "SEARCH_CAMPUS:<campus name>"
   - "GET_AIMS"
   - "NO_DB_ACTION"
2. When providing any textual output or summary, extract and use only the most important and relevant information.
3. Always return or summarize results in no more than 1 concise, clear lines.

Examples:
User: Give me an overview of the university. => GET_OVERVIEW
User: What programs are available? => LIST_PROGRAMS
User: Tell me about Neelum Campus => SEARCH_CAMPUS:Neelum Campus
User: What are the aims and objectives? => GET_AIMS
User: How do I apply? => NO_DB_ACTION

If campus is mentioned, use SEARCH_CAMPUS:<campus name>.  
If not a DB action, reply NO_DB_ACTION.
`
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.1
    };

    const response = await axios.post(endpoint, payload, groqAxiosConfig());
    const content = response?.data?.choices?.[0]?.message?.content?.trim();
    return content || "NO_DB_ACTION";
  } catch (err) {
    console.error("[GROQ] classifyDatabaseIntent error:", err?.message || err);
    return "NO_DB_ACTION";
  }
}

// Helper: Enhance user question for DB query if not FAQ
async function enhanceForDbQuery(userQuestion) {
  try {
    const endpoint = "https://api.groq.com/openai/v1/chat/completions";
    const payload = {
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `
You are an assistant that rewrites user questions to make them clear, structured, and optimized for database search in a university context.

Guidelines:
1. Focus only on the most important and relevant parts of the user's query.
2. Rewrite the question in a way that is direct, database-friendly, and easy to match with stored data.
3. Keep the rewritten query short and concise (no more than 1 clear lines).
4. If the user asks about general guidance (how to apply, contact info) and no DB rewrite is needed, return the original question as is.

Example:
User: Tell me about the university.  
Output: "Get a brief overview of the University of Azad Jammu & Kashmir."
`
        },
        {
          role: "user",
          content: userQuestion
        }
      ],
      temperature: 0.2
    };

    const response = await axios.post(endpoint, payload, groqAxiosConfig());
    const content = response?.data?.choices?.[0]?.message?.content?.trim();
    return content || userQuestion;
  } catch (err) {
    console.error("[GROQ] enhanceForDbQuery error:", err?.message || err);
    // Safe fallback: return original question
    return userQuestion;
  }
}

// New: detect campus-related queries (broader patterns)
function isCampusQuery(message) {
  if (!message || typeof message !== "string") return false;
  const m = message.trim().toLowerCase();
  if (/\b(campuses|campus|how many campuses|number of campuses|which campus|where is|tell me about .*campus)\b/.test(m)) return true;
  return false;
}

// New: detect "how many campuses" or "number of campuses" (count only)
function isCampusCountQuery(message) {
  if (!message || typeof message !== "string") return false;
  const m = message.trim().toLowerCase();
  return /\b(how many campuses|number of campuses)\b/.test(m);
}

// New: format campuses list from uniDoc into a full readable reply
function formatCampusesReply(uniDoc) {
  if (!uniDoc) return "Sorry, no campus information available.";
  const campuses = Array.isArray(uniDoc.campuses) ? uniDoc.campuses : [];
  if (!campuses.length) return "No campus information available.";
  const lines = [];
  lines.push(`Total campuses: ${campuses.length}`);
  campuses.forEach((c, i) => {
    lines.push(`${i + 1}) ${c.name || "Unknown"} - ${c.location || "Unknown location"}`);
    if (c.description) lines.push(`   Description: ${c.description}`);
    if (Array.isArray(c.features) && c.features.length) lines.push(`   Features: ${c.features.join(", ")}`);
    else lines.push(`   Features: none listed`);
  });
  return lines.join("\n");
}

// Main handler for incoming messages
export async function sendMessageToBot(req, res) {
  console.log("[GROQ] Received request to send message to bot");
  const { message } = req.body;

  if (!GROQ_API_KEY) {
    console.error("[GROQ] API key not configured");
    return res.status(500).json({ error: "GROQ API key not configured." });
  }

  if (!message || !message.trim()) {
    console.warn("[GROQ] No message provided in request body");
    return res.status(400).json({ error: "Message is required." });
  }

  try {
    // Load projectInfo title from DB (no FAQ loading anymore)
    const doc = await ChatbotData.findOne({}, { "projectInfo.title": 1 }).lean();
    const projectTitle = doc?.projectInfo?.title || "University Assistant";

    // Removed: exact FAQ match and FAQ shortlist/Groq matching
    // (FAQ logic removed per request)

    // 4) Database interaction intent detection (use controllerdatabaseinteraction.js)
    try {
      // Always call runDynamicDbQuery for any DB-related question
      const dbResult = await dbInteraction.runDynamicDbQuery(message);
      if (
        dbResult &&
        typeof dbResult.reply === "string" &&
        dbResult.reply.trim() &&
        dbResult.action &&
        dbResult.action !== "no_db_action"
      ) {
        console.log("[GROQ] Database interaction result:", dbResult.action);
        // Always send the API/DB response to frontend, not direct DB data
        return res.json({
          reply: dbResult.reply,
          source: "db",
          dbAction: dbResult.action,
          dbParams: dbResult.params
        });
      }
    } catch (err) {
      console.error("[GROQ] dbInteraction failed:", err?.message || err);
      // continue to fallback general chat
    }

    // 5) Fallback: general chat
    const generalPrompt = buildGeneralPrompt(message, projectTitle);
    try {
      // NEW: fetch authoritative university doc to include in system message
      let uniDocForSystem = null;
      try {
        uniDocForSystem = await dbInteraction.getUniversityDoc?.();
      } catch (e) {
        console.warn("[GROQ] Failed to fetch university doc for system message:", e?.message || e);
      }

      const uniName = uniDocForSystem?.name || "University of Azad Jammu & Kashmir (UAJK)";
      const systemIdentity = `
You are the official assistant for ${uniName}.
You must answer as the ${uniName} assistant and base your responses ONLY on the provided university data. 
Do NOT claim to represent or be from any other university.
If a question cannot be answered from the supplied data, reply: "I don't have that information about ${uniName}." 
Do not invent programs, campuses, or policies beyond the supplied data.
`.trim();

      const messages = [
        { role: "system", content: systemIdentity },
        // If we have the university JSON, provide it as authoritative context (do not allow hallucination)
        ...(uniDocForSystem ? [{ role: "system", content: `University data (use ONLY this):\n${JSON.stringify(uniDocForSystem, null, 2)}` }] : []),
        { role: "user", content: generalPrompt }
      ];

      const endpoint = "https://api.groq.com/openai/v1/chat/completions";
      const payload = {
        model: "llama-3.1-8b-instant",
        messages: [
          ...messages,
          {
            role: "system",
            content: `
You are a university assistant that generates optimized responses based on user queries and provided data.

Guidelines:
1. Analyze both the query and the given data.
2. Select only the most important and relevant information to answer.
3. Respond in an enhanced, natural tone — but keep it short (maximum 1 clear lines).
4. Do not include unnecessary details or long explanations.
`
          }
        ],
        temperature: 0.3
      };

      console.log("[GROQ] Sending general chat request to Groq API (with identity system message)");
      const response = await axios.post(endpoint, payload, groqAxiosConfig());
      const reply = response?.data?.choices?.[0]?.message?.content?.trim() || "No reply received.";
      console.log("[GROQ] General chat reply:", reply);
      return res.json({ reply, source: "groq" });
    } catch (err) {
      console.error("[GROQ] General chat failed:", err?.message || err);
      // Final safe fallback response (avoid throwing)
      return res.status(503).json({ error: "Service temporarily unavailable. Please try again later." });
    }
  } catch (error) {
    console.error("[GROQ] Unexpected handler error:", error?.message || error);
    return res.status(500).json({ error: "Internal server error." });
  }
}

