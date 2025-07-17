import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

function MouseMoving() {
  const cursorRef = useRef(null);
  const labelRef = useRef(null);
  const [hoverText, setHoverText] = useState("");

  const cards = [
    { label: "Webflow SEO" },
    { label: "Link Building" },
    { label: "Global SEO" },
    { label: "24/7 Support" },
    { label: "Ongoing Support" },
  ];

  useEffect(() => {
    const move = (e) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out",
      });

      gsap.to(labelRef.current, {
        x: e.clientX + 20,
        y: e.clientY - 10,
        duration: 0.15,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="w-full h-screen bg-gray-100 cursor-none relative p-10">
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="w-5 h-5 bg-pink-500 rounded fixed top-0 left-0 pointer-events-none z-50"
      ></div>

      {/* Tooltip always follows cursor */}
      <div
        ref={labelRef}
        className={`fixed top-4 left-1 z-50 text-white text-xs px-3 py-2 rounded pointer-events-none transition-opacity duration-200 bg-black ${
          hoverText ? "opacity-100" : "opacity-0"
        }`}
      >
        {hoverText || ""}
      </div>

      {/* Cards */}
      <div className="flex flex-wrap gap-4">
        {cards.map((card, index) => (
          <div
            key={index}
            onMouseEnter={() => setHoverText(card.label)}
            onMouseLeave={() => setHoverText("")}
            className="bg-white shadow-md rounded-lg px-6 py-4 text-gray-800 text-base font-medium transition-all hover:bg-pink-100"
          >
            
            {card.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MouseMoving;