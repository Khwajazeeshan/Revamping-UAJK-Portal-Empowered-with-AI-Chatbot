import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Section2.css';

const Section2 = ({ subheading, heading, bgclr, subheadingSize, headingSize }) => {
    const h1Ref = useRef(null);
    const h2Ref = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const h1 = h1Ref.current;
        if (h1) {
            // Split heading into words
            let clutter = "";
            h1.textContent.split(" ").forEach((word) => {
                clutter += `<span>${word}</span> `;
            });
            h1.innerHTML = clutter;

            const spans = h1.querySelectorAll("span");

            gsap.set(spans, { opacity: 0, x: -40 });

            gsap.to(spans, {
                scrollTrigger: {
                    trigger: h1.parentNode,
                    start: "top 80%",
                    end: "bottom 60%",
                    toggleActions: "play none none reverse",
                },
                x: 0,
                opacity: 1,
                ease: "power2.out",
                stagger: 0.1,
                duration: 0.1,
            });
        }
    }, []);

    return (
        <div id="section2" style={{ background: bgclr }}>
            <h2 ref={h2Ref} className="responsive-subheading" style={{ fontSize: subheadingSize }}>{subheading}</h2>
            <h1 ref={h1Ref} className="responsive-heading" style={{ fontSize: headingSize }}>{heading}</h1>
        </div>

    );
};

export default Section2;
