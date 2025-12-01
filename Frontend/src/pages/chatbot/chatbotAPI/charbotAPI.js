// import API from "../../utils/axios";
// import { API_BASE_URL } from "../../../config/apiconfig";

export const sendMessageToBot = async (message) => {
    const server = import.meta.env.VITE_SERVER || "http://localhost:5000";
    const response = await fetch(`${server}/api/chatbot/message`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
    });
    const data = await response.json();
    console.log("Response from chatbot API:", data); // Debugging line
    return data;
};