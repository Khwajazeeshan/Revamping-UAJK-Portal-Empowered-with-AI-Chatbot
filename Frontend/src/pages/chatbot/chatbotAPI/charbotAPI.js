// import API from "../../utils/axios";
// import { API_BASE_URL } from "../../../config/apiconfig";

export const sendMessageToBot = async (message) => {
    // Replace with your actual backend URL
    const API_BASE_URL = "http://localhost:5000"; // Example URL
    const response = await fetch(`${API_BASE_URL}/api/chatbot/message`, {
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