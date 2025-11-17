import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ImgWithTxt.css";
import { NavLink } from "react-router-dom";
gsap.registerPlugin(ScrollTrigger);
const ImgWithTxt = ({ heading, imageUrl, section9bContent, bgColor, showButton = true }) => {
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
    <div id="section9-wrapper" style={{ background: bgColor }}>
      <div id="section9a">
        <div className="section9a-left">
          <h1 ref={h1Ref}>{heading}</h1>
          {showButton && (
            <NavLink to="/virtual-tour">
              <button className="nav-tour">Virtual Tour</button>
            </NavLink>
          )}
        </div>
        <div className="section9a-right">
          <div
            className="section9a-right-center"
            style={{ backgroundImage: `url(${imageUrl})`,   filter: "drop-shadow(0 0 25px rgba(13, 20, 228, 0.77))" }}
            
          ></div>
        </div>
      </div>

      <div id="section9b">
        <div className="section9b-right">
          {section9bContent.map((content, index) => (
            <div className="right9b-content" key={index}>
              <h3>{content.title}</h3>
              <p>{content.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImgWithTxt;

