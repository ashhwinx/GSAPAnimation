import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, useGSAP);

const GsapAnimations = () => {
  const containerRef = useRef();
  const boxRefs = useRef([]);
  const textRefs = useRef([]);
  const cardRefs = useRef([]);
  
  // Add elements to ref arrays
  const addToBoxRefs = (el) => {
    if (el && !boxRefs.current.includes(el)) {
      boxRefs.current.push(el);
    }
  };
  
  const addToTextRefs = (el) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };
  
  const addToCardRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  useGSAP(() => {
    // Animation 1: Fade in boxes
    boxRefs.current.forEach((box, index) => {
      gsap.from(box, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        scrollTrigger: {
          trigger: box,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
    });

    // Animation 2: Text reveal
    textRefs.current.forEach((text, index) => {
      gsap.from(text, {
        opacity: 0,
        x: index % 2 === 0 ? -50 : 50,
        duration: 0.8,
        scrollTrigger: {
          trigger: text,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
    });

    // Animation 3: Card flip
    cardRefs.current.forEach((card, index) => {
      gsap.from(card, {
        rotationY: 90,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
    });

    // Animation 4: Scale up on scroll
    gsap.to(".scale-up", {
      scale: 1.2,
      scrollTrigger: {
        trigger: ".scale-up",
        start: "top 80%",
        end: "top 30%",
        scrub: true
      }
    });

    // Animation 5: Rotate on scroll
    gsap.to(".rotate", {
      rotation: 360,
      scrollTrigger: {
        trigger: ".rotate",
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // Animation 6: Parallax effect
    gsap.to(".parallax", {
      yPercent: -30,
      scrollTrigger: {
        trigger: ".parallax-container",
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // Animation 7: Color change
    gsap.to(".color-change", {
      backgroundColor: "#4F46E5",
      scrollTrigger: {
        trigger: ".color-change",
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    // Animation 8: Staggered animation
    gsap.from(".stagger-item", {
      opacity: 0,
      y: 50,
      duration: 0.5,
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".stagger-container",
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    // Animation 9: Path drawing
    const paths = document.querySelectorAll(".draw path");
    paths.forEach(path => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
      
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 2,
        scrollTrigger: {
          trigger: path,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
    });

    // Animation 10: Complex timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".timeline-container",
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });
    
    tl.from(".timeline-item-1", { x: -100, opacity: 0, duration: 0.5 })
      .from(".timeline-item-2", { y: 50, opacity: 0, duration: 0.5 }, "-=0.25")
      .from(".timeline-item-3", { rotation: 90, opacity: 0, duration: 0.5 }, "-=0.25");

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-12">GSAP Animations with React & Tailwind</h1>
      
      {/* Animation 1: Fade in boxes */}
      <div className="grid grid-cols-3 gap-4 mb-20">
        {[1, 2, 3].map((item) => (
          <div 
            key={`box-${item}`}
            ref={addToBoxRefs}
            className="h-40 bg-indigo-500 rounded-lg flex items-center justify-center text-white text-xl font-bold"
          >
            Box {item}
          </div>
        ))}
      </div>
      
      {/* Animation 2: Text reveal */}
      <div className="space-y-12 mb-20">
        {[1, 2, 3].map((item) => (
          <p 
            key={`text-${item}`}
            ref={addToTextRefs}
            className={`text-2xl ${item % 2 === 0 ? 'text-right' : 'text-left'}`}
          >
            This text slides in from {item % 2 === 0 ? 'right' : 'left'}
          </p>
        ))}
      </div>
      
      {/* Animation 3: Card flip */}
      <div className="grid grid-cols-3 gap-4 mb-20">
        {[1, 2, 3].map((item) => (
          <div 
            key={`card-${item}`}
            ref={addToCardRefs}
            className="h-48 bg-amber-500 rounded-lg flex items-center justify-center text-white text-xl font-bold"
          >
            Card {item}
          </div>
        ))}
      </div>
      
      {/* Animation 4: Scale up */}
      <div className="flex justify-center mb-20">
        <div className="scale-up h-40 w-40 bg-emerald-500 rounded-lg flex items-center justify-center text-white text-xl font-bold">
          Scale Up
        </div>
      </div>
      
      {/* Animation 5: Rotate */}
      <div className="flex justify-center mb-20">
        <div className="rotate h-40 w-40 bg-rose-500 rounded-lg flex items-center justify-center text-white text-xl font-bold">
          Rotate
        </div>
      </div>
      
      {/* Animation 6: Parallax */}
      <div className="parallax-container h-64 mb-20 relative overflow-hidden">
        <div className="parallax h-96 w-full bg-purple-500 flex items-center justify-center text-white text-xl font-bold">
          Parallax Effect
        </div>
      </div>
      
      {/* Animation 7: Color change */}
      <div className="flex justify-center mb-20">
        <div className="color-change h-40 w-40 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xl font-bold">
          Color Change
        </div>
      </div>
      
      {/* Animation 8: Staggered */}
      <div className="stagger-container grid grid-cols-3 gap-4 mb-20">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div 
            key={`stagger-${item}`}
            className="stagger-item h-32 bg-cyan-500 rounded-lg flex items-center justify-center text-white text-xl font-bold"
          >
            Item {item}
          </div>
        ))}
      </div>
      
      {/* Animation 9: Path drawing */}
      <div className="flex justify-center mb-20">
        <svg className="draw w-64 h-64" viewBox="0 0 100 100">
          <path 
            fill="none" 
            stroke="#3B82F6" 
            strokeWidth="2" 
            d="M10,50 Q25,10 40,50 T70,50 T100,50" 
          />
        </svg>
      </div>
      
      {/* Animation 10: Timeline */}
      <div className="timeline-container space-y-8 mb-20">
        <div className="timeline-item-1 h-20 bg-fuchsia-500 rounded-lg flex items-center justify-center text-white text-xl font-bold">
          Timeline Item 1
        </div>
        <div className="timeline-item-2 h-20 bg-fuchsia-600 rounded-lg flex items-center justify-center text-white text-xl font-bold">
          Timeline Item 2
        </div>
        <div className="timeline-item-3 h-20 bg-fuchsia-700 rounded-lg flex items-center justify-center text-white text-xl font-bold">
          Timeline Item 3
        </div>
      </div>
      
      {/* Add more sections here to create 100 animations */}
      <div className="h-screen flex items-center justify-center">
        <p className="text-2xl">Scroll up to see all animations again!</p>
      </div>
    </div>
  );
};

export default GsapAnimations;