import React, { useEffect, useRef, useState } from "react";
import "./HeroBanner.css";

const HeroBanner = ({ pageTitle, subTitle }) => {
  const [isVisible, setIsVisible] = useState(false);
  const bannerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setIsVisible(true);
      },
      { threshold: 0.4 }
    );

    if (bannerRef.current) observer.observe(bannerRef.current);
    return () => observer.disconnect();
  }, []);

  const words = subTitle.split(" ");

  return (
    <div
      className="hero-banner"
      style={{
        backgroundImage: 'url("/assets/1.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      ref={bannerRef}
    >
      <div className="hero-content">
        <h4>{pageTitle}</h4>
        <h2 className={`reveal-subtitle ${isVisible ? "visible" : ""}`}>
          {words.map((word, i) => (
            <span key={i} style={{ animationDelay: `${i * 0.25}s` }}>
              {word}
            </span>
          ))}
        </h2>
      </div>
    </div>
  );
};

export default HeroBanner;
