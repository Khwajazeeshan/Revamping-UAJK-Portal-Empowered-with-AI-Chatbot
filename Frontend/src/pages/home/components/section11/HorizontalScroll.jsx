import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./HorizontalScroll.css";

import event1 from "../../../../assets/Events/cs-tn.jpg";
import event3 from "../../../../assets/Events/itd.jpg";
import event2 from "../../../../assets/Events/islrealf.jpg";
import event4 from "../../../../assets/Events/event4.jpg";
import event5 from "../../../../assets/Events/pecv.jpg";
import event6 from "../../../../assets/Events/sportsday-1.jpg";

import { useState } from 'react'
import Chatbot from '../../../chatbot/chatbot'

gsap.registerPlugin(ScrollTrigger);

const HorizontalScroll = () => {

  const [chatOpen, setChatOpen] = useState(false); // chatbot state
  const handleToggleChat = () => setChatOpen((prev) => !prev);
  const handleOpenChat = () => setChatOpen(true);
  const h1Ref = useRef(null);
  const scrollTriggerRefs = useRef([]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    // Horizontal scroll
    if (window.innerWidth > 768) {
      const horizontal = ScrollTrigger.create({
        trigger: "#section11",
        start: "top top",
        end: "top -150%",
        scrub: 2,
        pin: true,
        animation: gsap.to("#section11 .event-card-container", {
          x: "-150%",
        }),
      });

      scrollTriggerRefs.current.push(horizontal);
    }

    // h1 animation
    const spans = h1Ref.current?.querySelectorAll(".word");

    if (spans?.length) {
      gsap.set(spans, { opacity: 0, y: 20 });

      const textAnim = ScrollTrigger.create({
        trigger: h1Ref.current,
        start: "top 90%",
        toggleActions: "play none none reverse",
        animation: gsap.to(spans, {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
        }),
      });

      scrollTriggerRefs.current.push(textAnim);
    }

    return () => {
      scrollTriggerRefs.current.forEach(t => t.kill());
    };
  }, []);



  const events = [
    { img: event1, title: "Strengthening Cyber Education", path: "/event1" },
    { img: event3, title: "Honoring our Educators at the Institute of Languages", path: "/event2" },
    { img: event2, title: "Deserving Students From The University Have Been Awarded Scholarships", path: "/event3" },
    { img: event4, title: "77th Foundation Day with Sham-e-Saqafat Kashmir", path: "/event4" },
    { img: event5, title: "PEC Praises UAJK'S Engineering Programs During Re-Accreditation Visit", path: "/event5" },
    { img: event6, title: "UAJK Concludes Successful Sports Championship with Grand Closing Ceremony", path: "/event6" },
  ];

  return (
    <div>
      <div id="section11">
        <div className="event-container">
          <h1 ref={h1Ref}>
            Current Event
          </h1>

          <div className="event-card-container">
            {events.map((item, index) => (
              <Link key={index} to={item.path} onClick={scrollToTop}>
                <div className="event-card">
                  <img src={item.img} alt={item.title} />
                  <h4>{item.title}</h4>
                </div>
              </Link>
            ))}
          </div>

        </div>

      </div>
      <div>
        <Chatbot open={chatOpen} onToggle={handleToggleChat} />
      </div>
    </div>

  );
};

export default HorizontalScroll;
