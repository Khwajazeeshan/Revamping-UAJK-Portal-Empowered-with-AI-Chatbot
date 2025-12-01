import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './TitleWithTxt.css';

gsap.registerPlugin(ScrollTrigger);

const TitleWithTxt = ({ title, sections }) => {
    const titleRef = useRef(null);

    useEffect(() => {
        const h2 = titleRef.current;
        if (!h2) return;

        // Split title into words
        const words = h2.textContent.split(' ');
        h2.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ');

        gsap.set('.word', { opacity: 0, y: 30 });

        gsap.to('.word', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.2,
            scrollTrigger: {
                trigger: h2,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
            },
        });
    }, []);

    return (
        <div className="title-txt">
            <div className="title-txt-content">
                <div className="title-container">
                    <h2 ref={titleRef}>{title}</h2>
                </div>
                <div className="txt-container">
                    {sections.map((section, index) => (
                        <div className="txt-content" key={index}>
                            <h4>{section.heading}</h4>
                            <p>{section.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TitleWithTxt;
