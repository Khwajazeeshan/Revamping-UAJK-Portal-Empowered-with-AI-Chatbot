import React, { useRef, useState } from "react";
import Hero from "./components/Hero/Hero";
import Section2 from "./components/section2/section2";
import ScrollingVideo from "./components/section3/ScrollingVideo";
import Section7 from "./components/section7/Section7";
import ImgWithTxt from "./components/section9/ImgWithTxt";
import ImgWithTxtAIChatbot from "./components/section13/ImgWithTxtAIChatbot";
import QLinks from "./components/qLinks/QLinks";
import Chatbot from "../chatbot/chatbot";
import "./Home.css";

const Home = () => {
  const nextSectionRef = useRef(null);
  const [chatOpen, setChatOpen] = useState(false); // chatbot state

  const handleToggleChat = () => setChatOpen((prev) => !prev);
  const handleOpenChat = () => setChatOpen(true);

  const section9bContent = [
    {
      title: "Immersive 3D Campus Exploration",
      description:
        "The 3D Virtual Tour allows users to explore the UAJK campus interactively. It offers realistic navigation through departments, classrooms, labs, and libraries with detailed visuals and smooth controls.",
    },
    {
      title: "Accessible Anytime, Anywhere",
      description:
        "Students, faculty, and visitors can experience the entire university remotely—no physical presence required. The tour is available 24/7, providing a convenient way to discover campus life from any device.",
    },
  ];

  const aiChatbotContent = [
    {
      title: "Smart Assistance 24/7",
      description:
        "Our AI Chatbot helps students and visitors instantly with admissions, faculty info, and campus queries.",
    },

    {
      title: "Role-based Interaction",
      description:
        "Provides personalized responses for students, faculty, and guests using intelligent AI logic.",
    },
  ];

  return (
    <div id="main1">
      {/* 🔹 Hero handles its own loading */}
      <Hero nextSectionRef={nextSectionRef} />

      <Section2
        subheading="A Beacon of Excellence"
        heading="Ranked No. 1 in Azad Jammu & Kashmir and 35th in Pakistan, UAJK stands as a beacon of excellence and innovation. The university provides an extraordinary educational experience that merges rigorous academic standards with groundbreaking technology."
        subheadingSize="3rem"
        headingSize="3rem"
      />
      <QLinks />
      <Section7 />

      {/* 🔹 Chatbot Section */}
      <ImgWithTxtAIChatbot
        heading="AI Chatbot Assistance"
        imageUrl="/assets/ImgWithTxt/AI-Chatbot.jpg"
        sectionContent={aiChatbotContent}
        bgColor="linear-gradient(90deg, #153fb1ff 0%, #16165aff 100%)"
        onChatNowClick={handleOpenChat}
      />

      {/* 🔹 Virtual Tour Section */}
      <ImgWithTxt
        heading="Immersive 3D Virtual Tour"
        imageUrl="/assets/ImgWithTxt/Virtual-Tour.jpg"
        section9bContent={section9bContent}
        bgColor="linear-gradient(90deg, #16165a 0%, #153fb1 100%)"
        showButton={true}
      />

      <ScrollingVideo />

      {/* 🔹 Chatbot toggle */}
      <Chatbot open={chatOpen} onToggle={handleToggleChat} />
    </div>
  );
};

export default Home;
