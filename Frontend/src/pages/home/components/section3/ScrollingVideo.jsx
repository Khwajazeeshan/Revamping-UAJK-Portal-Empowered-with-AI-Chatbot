import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ScrollingVideo.css";

gsap.registerPlugin(ScrollTrigger);

const ScrollingVideo = () => {
  const canvasRef = useRef(null);
  const images = useRef([]);
  const frameCount = 556;
  const imageSeq = { frame: 0 };

  const getFilePath = (index) =>
    `/assets/section1/frame_${String(index + 1).padStart(4, "0")}.jpeg`;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // ✅ safety check
    const context = canvas.getContext("2d");

    // ✅ Preload all images
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = getFilePath(i);
      img.onload = () => {
        images.current[i] = img;
        if (i === 0) render(); // render first frame
      };
      img.onerror = () => console.error("Error loading:", img.src);
    }

    // ✅ Canvas resize function
    const resizeCanvas = () => {
      const scaleFactor = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * scaleFactor;
      canvas.height = height * scaleFactor;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(1, 0, 0, 1, 0, 0); // reset scale
      context.scale(scaleFactor, scaleFactor);
      render();
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // ✅ GSAP scroll animation
    gsap.to(imageSeq, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        scrub: 2,
        trigger: "#section3",
        start: "top top",
        end: "700% top",
        pin: true,
      },
      onUpdate: render,
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // ✅ Safe render function
  const render = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    const img = images.current[imageSeq.frame];

    if (img && img.complete) scaleImage(img, context);
  };

  // ✅ Scale image nicely
  const scaleImage = (img, ctx) => {
    const canvas = ctx.canvas;
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShiftX = (canvas.width - img.width * ratio) / 2;
    const centerShiftY = (canvas.height - img.height * ratio) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShiftX,
      centerShiftY,
      img.width * ratio,
      img.height * ratio
    );
  };

  return (
    <div id="section3">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default ScrollingVideo;
