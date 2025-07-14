import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const MoreGsapAnimations = () => {
  const containerRef = useRef();

  useGSAP(() => {
    // 1. Bounce Animation
    gsap.from(".bounce", {
      y: -100,
      duration: 1,
      ease: "bounce.out",
      scrollTrigger: {
        trigger: ".bounce",
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    // 2. Typewriter Effect
    const textElements = gsap.utils.toArray('.typewriter');
    textElements.forEach(text => {
      const chars = text.textContent.split('');
      text.textContent = '';
      
      chars.forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.opacity = 0;
        text.appendChild(span);
        
        gsap.to(span, {
          opacity: 1,
          duration: 0.05,
          delay: i * 0.05,
          scrollTrigger: {
            trigger: text,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        });
      });
    });

    // 3. Wave Effect
    gsap.from(".wave", {
      y: (i) => i % 2 === 0 ? -30 : 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      scrollTrigger: {
        trigger: ".wave-container",
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    // 4. Gradient Color Change
    gsap.to(".gradient-change", {
      background: "linear-gradient(45deg, #ec4899, #8b5cf6)",
      duration: 2,
      scrollTrigger: {
        trigger: ".gradient-change",
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    // 5. 3D Flip Card
    gsap.from(".flip-card", {
      rotationX: 180,
      opacity: 0,
      duration: 1.5,
      scrollTrigger: {
        trigger: ".flip-card",
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    // 6. Blur In
    gsap.from(".blur-in", {
      filter: "blur(10px)",
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: ".blur-in",
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    // 7. Jelly Effect
    gsap.to(".jelly", {
      keyframes: [
        { scale: 1.2, duration: 0.3 },
        { scale: 0.9, duration: 0.2 },
        { scale: 1.1, duration: 0.2 },
        { scale: 1, duration: 0.1 }
      ],
      scrollTrigger: {
        trigger: ".jelly",
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    // 8. Border Grow
    gsap.from(".border-grow", {
      scale: 0.9,
      borderWidth: 0,
      duration: 1,
      scrollTrigger: {
        trigger: ".border-grow",
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    // 9. Floating Elements
    gsap.to(".float", {
      y: -20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // 10. Split Text Animation
    const splitTextElements = gsap.utils.toArray('.split-text');
    splitTextElements.forEach(text => {
      const chars = text.textContent.split('');
      text.textContent = '';
      
      chars.forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.display = 'inline-block';
        text.appendChild(span);
        
        gsap.from(span, {
          y: 50,
          opacity: 0,
          rotation: 20,
          duration: 0.5,
          delay: i * 0.05,
          scrollTrigger: {
            trigger: text,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        });
      });
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-center mb-12">10 More GSAP Animations</h1>
      
      {/* 1. Bounce Animation */}
      <div className="flex justify-center mb-20">
        <div className="bounce h-32 w-32 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
          Bounce!
        </div>
      </div>
      
      {/* 2. Typewriter Effect */}
      <div className="flex justify-center mb-20">
        <div className="typewriter text-3xl font-mono">
          This text types itself!
        </div>
      </div>
      
      {/* 3. Wave Effect */}
      <div className="wave-container flex justify-center gap-4 mb-20">
        {['W', 'A', 'V', 'E'].map((letter, i) => (
          <div key={i} className="wave text-5xl font-bold bg-purple-500 text-white w-16 h-16 flex items-center justify-center rounded-lg">
            {letter}
          </div>
        ))}
      </div>
      
      {/* 4. Gradient Color Change */}
      <div className="flex justify-center mb-20">
        <div className="gradient-change h-40 w-64 rounded-lg flex items-center justify-center text-white text-xl font-bold bg-blue-500">
          Gradient Change
        </div>
      </div>
      
      {/* 5. 3D Flip Card */}
      <div className="flex justify-center mb-20">
        <div className="flip-card h-48 w-64 bg-rose-500 rounded-lg flex items-center justify-center text-white text-xl font-bold shadow-xl">
          Flip Card
        </div>
      </div>
      
      {/* 6. Blur In */}
      <div className="flex justify-center mb-20">
        <div className="blur-in text-4xl font-bold bg-green-500 text-white px-8 py-4 rounded-lg">
          Blur In Effect
        </div>
      </div>
      
      {/* 7. Jelly Effect */}
      <div className="flex justify-center mb-20">
        <div className="jelly h-32 w-32 bg-yellow-500 rounded-lg flex items-center justify-center text-white text-xl font-bold">
          Jelly!
        </div>
      </div>
      
      {/* 8. Border Grow */}
      <div className="flex justify-center mb-20">
        <div className="border-grow h-32 w-64 border-4 border-pink-500 rounded-lg flex items-center justify-center text-xl font-bold">
          Growing Border
        </div>
      </div>
      
      {/* 9. Floating Elements */}
      <div className="flex justify-center mb-20">
        <div className="float h-24 w-24 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
          Float
        </div>
      </div>
      
      {/* 10. Split Text Animation */}
      <div className="flex justify-center mb-20">
        <div className="split-text text-4xl font-bold">
          Split Text Effect
        </div>
      </div>
    </div>
  );
};

export default MoreGsapAnimations;