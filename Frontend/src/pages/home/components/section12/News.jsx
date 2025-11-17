import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import "./News.css";

import news1 from "../../../../assets/Events/event4.jpg";
import news2 from "../../../../assets/News/news2.jpg";
import news3 from "../../../../assets/News/news3.jpg";
import news4 from "../../../../assets/News/news4.jpg";

import { useState } from 'react'
import Chatbot from '../../../chatbot/chatbot'




const newsData = [
    { link: '/event4', img: news1, category: 'Visit', date: 'Sep 19, 2024', title: '77th Foundation Day with Sham-e-Saqafat Kashmir' },
    { link: '/news2', img: news2, category: 'Meeting', date: 'Sep 19, 2024', title: '103rd BASR Meeting – Fostering High-Quality Research' },
    { link: '/event2', img: news3, category: 'Event', date: 'Sep 19, 2024', title: 'Honoring our Educators at the Institute of Languages' },
    { link: '/event6', img: news4, category: 'Sports', date: 'Sep 19, 2024', title: 'UAJK Concludes Successful Sports Championship with Grand Closing Ceremony' },
];

const News = () => {

    const [chatOpen, setChatOpen] = useState(false); // chatbot state
    const handleToggleChat = () => setChatOpen((prev) => !prev);
    const handleOpenChat = () => setChatOpen(true);

    const titlesRef = useRef([]);
    const mainTitleRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Animate main title
        if (mainTitleRef.current) {
            const words = mainTitleRef.current.textContent.split(" ");
            mainTitleRef.current.innerHTML = words.map(word => `<span>${word}</span>`).join(" ");
            gsap.set(mainTitleRef.current.querySelectorAll("span"), { opacity: 0, y: 30 });
            gsap.to(mainTitleRef.current.querySelectorAll("span"), {
                opacity: 1,
                y: 0,
                stagger: 0.2,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: mainTitleRef.current,
                    start: "top 90%",
                }
            });
        }

        // Animate news titles
        titlesRef.current.forEach((el) => {
            if (el) {
                const words = el.textContent.split(" ");
                el.innerHTML = words.map(word => `<span>${word}</span>`).join(" ");
                gsap.set(el.querySelectorAll("span"), { opacity: 0, y: 20 });
                gsap.to(el.querySelectorAll("span"), {
                    opacity: 1,
                    y: 0,
                    stagger: 0.1,
                    duration: 0.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                });
            }
        });
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <div id="section12">
            <h1 ref={mainTitleRef}>Latest News</h1>
            {newsData.map((news, i) => (
                <Link key={i} to={news.link} onClick={scrollToTop}>
                    <div className="section12-inner">
                        <div className="section12-inner-left">
                            <img src={news.img} alt={news.title} />
                        </div>
                        <div className="section12-inner-right">
                            <h4>{news.category} / {news.date}</h4>
                            <h1 ref={el => titlesRef.current[i] = el}>{news.title}</h1>
                        </div>
                    </div>
                </Link>
            ))}
            <Chatbot open={chatOpen} onToggle={handleToggleChat} />
        </div>
    );
};

export default News;
