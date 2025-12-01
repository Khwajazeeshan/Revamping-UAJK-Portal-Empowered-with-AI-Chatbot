import React from "react";
import "../styles/chatbot.css";

const ChatbotButton = ({ onClick, isOpen }) => (
    <button
        className={`chatbot-float-btn ${isOpen ? "open" : ""}`}
        onClick={onClick}
        title={isOpen ? "Close Chat" : "Chat with us!"}
    >
        <i className={`fas ${isOpen ? "fa-times" : "fa-comments"}`}></i>
    </button>
);

export default ChatbotButton;
