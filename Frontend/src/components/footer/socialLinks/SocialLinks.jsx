import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./SocialLinks.css";
import icon from "../../../assets/right-down.png";

const SocialLinks = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // 🔹 Trigger animation only when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect(); // stop observing after first trigger
          }
        });
      },
      { threshold: 0.4 } // triggers when 40% of section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Section 14a */}
      <div id="section14a" ref={sectionRef}>
        <h1 className={`reveal-title ${isVisible ? "active" : ""}`}>
          {["Unleash", "Your", "Potential", "at", "UAJK"].map((word, i) => (
            <span key={i} style={{ animationDelay: `${i * 0.3}s` }}>
              {word}
            </span>
          ))}
        </h1>

        <Link to="/admission" onClick={scrollToTop}>
          <button>Apply Now</button>
        </Link>
      </div>

      {/* Section 14b */}
      <div id="section14b">
        {[
          { name: "Facebook", url: "https://www.fb.com/OfficialUAJK/" },
          { name: "Twitter", url: "https://twitter.com/officialuajk" },
          { name: "YouTube", url: "https://www.youtube.com/@UAJKOfficial" },
          { name: "Email", url: "mailto:pro@ajku.edu.pk" },
        ].map((item, index) => (
          <a
            key={index}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="section14b-inner"
          >
            <h1>{item.name}</h1>
            <img src={icon} alt="icon" />
          </a>
        ))}
      </div>
    </>
  );
};

export default SocialLinks;
