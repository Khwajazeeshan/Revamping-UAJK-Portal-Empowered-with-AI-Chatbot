import React, { useState, useEffect } from 'react';
import './Hero.css';
import arrow from '../../../../assets/arrow.png';

const Hero = ({ nextSectionRef }) => {
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const [showH4, setShowH4] = useState(false);

    // ⏳ Show h4 after h1 animation completes (~2s)
    useEffect(() => {
        if (iframeLoaded) {
            const timer = setTimeout(() => setShowH4(true));
            return () => clearTimeout(timer);
        }
    }, [iframeLoaded]);

    return (
        <div id="section1">
            {/* 🔹 Blue Loading Screen with Spinner */}
            {!iframeLoaded && (
                <div className="iframe-loading-screen">
                    <div className="loader-circle"></div>
                    <h2>Loading...</h2>
                </div>
            )}

            {/* Iframe */}
            <iframe
                src="https://my.spline.design/untitled-21a376867fb7690f2b8b8f396d3bccd0/"
                frameBorder="0"
                width="107%"
                height="107%"
                onLoad={() => setIframeLoaded(true)}
            ></iframe>

            {/* Content (after iframe load) */}
            {iframeLoaded && (
                <div className="bottom-section1">
                    <h1>
                        <span>University</span>
                        <span>of</span>
                        <span>Azad</span>
                        <span>Jammu</span>
                        <span>&</span>
                        <span>Kashmir</span>
                    </h1>

                    {showH4 && (
                        <div className="bottom-section1-inner">
                            <h4>
                                <span>Welcome</span>
                                <span>to</span>
                                <span>the</span>
                                <span>whole</span>
                                <span>new</span>
                                <span>world</span>
                                <span>of</span>
                                <span>opportunities!</span>
                            </h4>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Hero;
