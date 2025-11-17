import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./QLinks.css";

gsap.registerPlugin(ScrollTrigger);

const QLinks = () => {
    const h1Ref = useRef(null);

    useEffect(() => {
        const h1 = h1Ref.current;
        if (h1) {
            const words = h1.textContent.split(" ");
            h1.innerHTML = words.map(word => `<span>${word}</span>`).join(" ");

            gsap.set(h1.querySelectorAll("span"), { opacity: 0, x: -25 });

            gsap.to(h1.querySelectorAll("span"), {
                opacity: 1,
                x: 0,
                stagger: 0.15,
                duration: 0.9,
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
        <div className="quick-links476">
            <h1 ref={h1Ref}>Quick Links</h1>

            <div className="btn-grid476">
                {/* --- Internal Links --- */}
                <NavLink to="/messages" className="btn476">
                    <span>Messages</span>
                </NavLink>

                <NavLink to="/news" className="btn476">
                    <span>Latest News</span>
                </NavLink>

                <NavLink to="/event" className="btn476">
                    <span>Events</span>
                </NavLink>

                {/* --- External Links --- */}
                <a href="http://www.digitallibrary.edu.pk/ajk%20uni.html" target="_blank" rel="noopener noreferrer" className="btn476">
                    <span>Digital Library</span>
                </a>

                <a href="https://ajku.edu.pk/new/results/" target="_blank" rel="noopener noreferrer" className="btn476">
                    <span>Results</span>
                </a>

                <a href="https://www.hec.gov.pk/english/scholarshipsgrants/Pages/NationalScholarships.aspx" target="_blank" rel="noopener noreferrer" className="btn476">
                    <span>Scholarships</span>
                </a>

                <a href="https://ajku.edu.pk/new/downloads/" target="_blank" rel="noopener noreferrer" className="btn476">
                    <span>Downloads</span>
                </a>

                <a href="https://ajku.edu.pk/new/?sdm_process_download=1&download_id=17654" target="_blank" rel="noopener noreferrer" className="btn476">
                    <span>Prospectus</span>
                </a>

                <a href="https://drive.google.com/file/d/10ZFQ70R9zA64-Y41JM9DN-8HHshocMpd/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="btn476">
                    <span>Annual Report</span>
                </a>

                <a href="https://ajku.edu.pk/new/online-roll-number-and-practical-slip/" target="_blank" rel="noopener noreferrer" className="btn476">
                    <span>Roll No Slips</span>
                </a>

                <a href="https://ugat.ajku.edu.pk/" target="_blank" rel="noopener noreferrer" className="btn476">
                    <span>UGAT</span>
                </a>

                <a href="https://umis.ajku.edu.pk/frmTlogin.aspx" target="_blank" rel="noopener noreferrer" className="btn476">
                    <span>Faculty Portal</span>
                </a>
            </div>
        </div>
    );
};

export default QLinks;
