import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ImgWithTxtAIChatbot.css";

gsap.registerPlugin(ScrollTrigger);

const ImgWithTxtAIChatbot = ({ heading, imageUrl, sectionContent, bgColor, onChatNowClick }) => {
  const h1Ref = useRef(null);

  useEffect(() => {
    const h1 = h1Ref.current;
    if (h1) {
      const words = h1.textContent.split(" ");
      h1.innerHTML = words.map((word) => `<span>${word}</span>`).join(" ");
      gsap.set(h1.querySelectorAll("span"), { opacity: 0, x: -25 });
      gsap.to(h1.querySelectorAll("span"), {
        opacity: 1,
        x: 0,
        stagger: 0.15,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: h1,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }
  }, []);

  return (
    <div style={{ background: bgColor }}>
      <div id="sectionAIa">
        <div className="sectionAIa-left">
          <h1 ref={h1Ref}>{heading}</h1>
          <button className="chat-btn" onClick={onChatNowClick}>Ask AI</button>
        </div>
        <div className="sectionAIa-right">
          <div
            className="sectionAIa-right-center"
            style={{
              backgroundImage: `url(${imageUrl})`,
              filter: "drop-shadow(0 0 25px rgba(13, 102, 245, 0.77))"
            }}
          ></div>


        </div>
      </div>

      <div id="sectionAIb">
        <div className="sectionAIb-right">
          {sectionContent.map((content, index) => (
            <div className="rightAIb-content" key={index}>
              <h3>{content.title}</h3>
              <p>{content.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImgWithTxtAIChatbot;
