import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { useGSAP } from '@gsap/react'; // Added this import

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin, useGSAP); // Added useGSAP to registerPlugin

const PremiumAnimations = () => {
  const containerRef = useRef();
  const cursorRef = useRef();

  // 1. NEON DRIFT REVEAL
  useGSAP(() => {
    gsap.to(".neon-drift", {
      backgroundPositionX: "100%",
      duration: 10,
      repeat: -1,
      ease: "none",
    });
  });

  // 2. GLITCH PULSE TEXT
  useGSAP(() => {
    gsap.to(".glitch-pulse", {
      keyframes: [
        { text: "ERROR_404", duration: 0.1 },
        { text: "GLITCH_MODE", duration: 0.1 },
        { text: "DESIGN_PULSE", duration: 0.3 },
      ],
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });
  });

  // 3. LIQUID SWIPE TRANSITION
  useGSAP(() => {
    gsap.from(".liquid-swipe", {
      clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
      duration: 1.5,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".liquid-swipe",
        start: "top 80%"
      }
    });
  });

  // 4. MAGNETIC HOVER LIFT
  useGSAP(() => {
    const magneticItems = gsap.utils.toArray(".magnetic-hover");
    
    magneticItems.forEach((item) => {
      item.addEventListener("mousemove", (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        gsap.to(item, {
          x: (x - rect.width/2) * 0.2,
          y: (y - rect.height/2) * 0.2,
          duration: 0.8,
          ease: "power2.out"
        });
      });
      
      item.addEventListener("mouseleave", () => {
        gsap.to(item, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)"
        });
      });
    });
  });



  // 5. RETRO WAVE LOADER
  useGSAP(() => {
    gsap.to(".retro-wave", {
      x: "+=100%",
      duration: 2,
      repeat: -1,
      ease: "none",
    });
  });

  // 6. TEXT SCRAMBLE TYPOBURST
  useGSAP(() => {
    gsap.to(".text-scramble", {
      text: {
        value: "ANIMATION_MASTER",
        scramble: true,
        chars: "!@#$%^&*",
        speed: 0.3
      },
      duration: 3,
      scrollTrigger: {
        trigger: ".text-scramble",
        start: "top 80%"
      }
    });
  });

  // 7. PARALLAX ZOOM SCROLL
  useGSAP(() => {
    gsap.to(".parallax-zoom", {
      scale: 1.2,
      scrollTrigger: {
        trigger: ".parallax-zoom",
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });
  });

  // 8. FLOATING GLASS CARDS
  useGSAP(() => {
    gsap.to(".floating-glass", {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  });

  // 9. INFINITE SLIDE GLIMMER
  useGSAP(() => {
    gsap.to(".infinite-glimmer", {
      backgroundPositionX: "100%",
      duration: 3,
      repeat: -1,
      ease: "linear"
    });
  });

  // 10. SPARK TRAIL CURSOR (using useEffect since it's cursor-related)
  useEffect(() => {
    const handleMouseMove = (e) => {
      gsap.to(cursorRef.current, {
        x: e.clientX - 15,
        y: e.clientY - 15,
        duration: 0.3,
        ease: "power2.out"
      });
      
      // Create spark
      const spark = document.createElement("div");
      spark.className = "absolute w-1 h-1 bg-yellow-400 rounded-full pointer-events-none";
      spark.style.left = `${e.clientX}px`;
      spark.style.top = `${e.clientY}px`;
      document.body.appendChild(spark);
      
      gsap.to(spark, {
        scale: 3,
        opacity: 0,
        duration: 0.8,
        onComplete: () => spark.remove()
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Cursor Element */}
      <div ref={cursorRef} className="fixed w-8 h-8 border-2 border-yellow-400 rounded-full pointer-events-none z-50 mix-blend-difference"></div>

      <div className="container mx-auto px-4 py-20">
        {/* 1. NEON DRIFT REVEAL */}
        <section className="py-20">
          <h2 className="neon-drift text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-[length:200%_100%]">
            NEON DRIFT
          </h2>
        </section>

        {/* 2. GLITCH PULSE TEXT */}
        <section className="py-20">
          <div className="glitch-pulse text-5xl font-mono text-center text-purple-400">GLITCH_EFFECT</div>
        </section>

        {/* 3. LIQUID SWIPE TRANSITION */}
        <section className="py-20">
          <div className="liquid-swipe w-full h-64 bg-gradient-to-r from-blue-500 to-teal-400 rounded-xl overflow-hidden relative">
            <div className="absolute inset-0  flex items-center justify-center text-3xl font-bold">
              LIQUID SWIPE
            </div>
          </div>
        </section>

        {/* 4. MAGNETIC HOVER LIFT */}
        <section className="py-10 flex justify-center">
          <button className="magnetic-hover m-20  px-8 py-4 bg-pink-600 rounded-lg text-xl font-bold transform transition-all duration-300">
            HOVER ME
          </button>
        </section>

        {/* 5. RETRO WAVE LOADER */}
        <section className="py-20 overflow-hidden">
          <div className="retro-wave w-64 h-2 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"></div>
        </section>

        {/* 6. TEXT SCRAMBLE TYPOBURST */}
        <section className="py-20 text-center">
          <div className="text-scramble text-4xl font-mono inline-block">LOADING...</div>
        </section>

        {/* 7. PARALLAX ZOOM SCROLL */}
        <section className="py-20 h-[150vh] flex items-center justify-center">
          <div className="parallax-zoom w-64 h-64 bg-gradient-to-br from-amber-400 to-red-500 rounded-xl shadow-2xl flex items-center justify-center text-xl font-bold">
            ZOOM ON SCROLL
          </div>
        </section>

        {/* 8. FLOATING GLASS CARDS */}
        <section className="py-20 grid grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="floating-glass bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
              <h3 className="text-xl font-bold">Glass Card {item}</h3>
              <p className="mt-2 text-white/80">Floating effect</p>
            </div>
          ))}
        </section>

        {/* 9. INFINITE SLIDE GLIMMER */}
        <section className="py-20">
          <div className="infinite-glimmer w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent bg-[length:200%_100%]"></div>
        </section>
      </div>
    </div>
  );
};

export default PremiumAnimations;