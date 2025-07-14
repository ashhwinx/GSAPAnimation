import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register plugins
gsap.registerPlugin(ScrollTrigger);

const SmoothGsapAnimations = () => {
  const containerRef = useRef();

  useGSAP(() => {
    // 1. FADE UP ANIMATION
    gsap.utils.toArray('.fade-up').forEach((el) => {
      gsap.from(el, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
    });

    // 2. ROTATING ELEMENTS
    gsap.to('.rotate-3d', {
      rotationY: 360,
      duration: 8,
      repeat: -1,
      ease: "none",
      scrollTrigger: {
        trigger: '.rotate-3d',
        start: "top center"
      }
    });

    // 3. STAGGERED GRID
    gsap.from('.stagger-item', {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.15,
      scrollTrigger: {
        trigger: '.stagger-container',
        start: "top 70%"
      }
    });

    // 4. COLOR CHANGE ON SCROLL
    gsap.to('.color-change', {
      backgroundColor: "#8b5cf6",
      duration: 2,
      scrollTrigger: {
        trigger: '.color-change',
        scrub: 1
      }
    });

    // 5. PARALLAX EFFECT
    gsap.to('.parallax-layer', {
      yPercent: -30,
      ease: "none",
      scrollTrigger: {
        trigger: '.parallax-container',
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-5xl font-bold text-center mb-20 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
        Smooth GSAP Animations
      </h1>

      {/* 1. FADE UP */}
      <div className="flex justify-center mb-20">
        <div className="fade-up w-64 h-64 bg-indigo-500 rounded-lg flex items-center justify-center text-white text-xl font-bold">
          Fades Up
        </div>
      </div>

      {/* 2. 3D ROTATION */}
      <div className="flex justify-center mb-20">
        <div className="rotate-3d w-32 h-32 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg shadow-xl flex items-center justify-center text-white font-bold">
          3D Rotate
        </div>
      </div>

      {/* 3. STAGGERED GRID */}
      <div className="stagger-container grid grid-cols-3 gap-4 mb-20">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div 
            key={item}
            className="stagger-item h-32 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold"
          >
            Item {item}
          </div>
        ))}
      </div>

      {/* 4. COLOR CHANGE */}
      <div className="flex justify-center mb-20">
        <div className="color-change w-64 h-64 bg-pink-500 rounded-lg flex items-center justify-center text-white text-xl font-bold">
          Color Shift
        </div>
      </div>

      {/* 5. PARALLAX */}
      <div className="parallax-container h-96 mb-20 relative overflow-hidden bg-gray-200 rounded-lg">
        <div className="parallax-layer absolute w-full h-full bg-purple-500 flex items-center justify-center text-white text-2xl">
          Parallax Layer
        </div>
      </div>

      {/* Safe spacer */}
      <div className="h-screen"></div>
    </div>
  );
};

export default SmoothGsapAnimations;