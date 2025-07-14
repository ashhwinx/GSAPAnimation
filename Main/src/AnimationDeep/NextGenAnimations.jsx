import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { useGSAP } from '@gsap/react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin, useGSAP);

const NextGenAnimations = () => {
  const containerRef = useRef();

  useGSAP(() => {
    /* 1. PRISM FADE SPLIT */
    gsap.from(".prism-split", {
      opacity: 0,
      y: 40,
      stagger: 0.1,
      duration: 1,
      scrollTrigger: {
        trigger: ".prism-container",
        start: "top 70%"
      }
    });

    /* 2. WAVY MORPH ENTRY */
    gsap.from(".wavy-morph", {
      clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      duration: 1.8,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".wavy-morph",
        start: "top 80%"
      }
    });

    /* 3. SCROLL SNAP GLOW */
    gsap.to(".snap-glow", {
      boxShadow: "0 0 30px #3b82f6",
      scrollTrigger: {
        trigger: ".snap-glow",
        scrub: true,
        start: "top 80%",
        end: "top 30%"
      }
    });

    /* 4. CYBER FLICKER FLASH */
    const cyberFlash = () => {
      gsap.to(".cyber-flicker", {
        opacity: 0.3,
        duration: 0.05,
        repeat: 8,
        yoyo: true,
        onComplete: () => {
          gsap.to(".cyber-flicker", { opacity: 1, duration: 0.5 });
        }
      });
    };
    ScrollTrigger.create({
      trigger: ".cyber-flicker",
      start: "top 70%",
      onEnter: cyberFlash
    });

    /* 5. ELASTIC POP GRID */
    gsap.from(".elastic-pop", {
      scale: 0,
      duration: 1,
      ease: "elastic.out(1, 0.5)",
      stagger: 0.1,
      scrollTrigger: {
        trigger: ".elastic-grid",
        start: "top 70%"
      }
    });

    /* 6. AURORA SWIPE MASK */
    gsap.to(".aurora-mask", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1.5,
      scrollTrigger: {
        trigger: ".aurora-mask",
        start: "top 80%"
      }
    });

    /* 7. PULSE RING DROP */
    const createPulse = () => {
      const pulse = document.createElement("div");
      pulse.className = "absolute w-4 h-4 border-2 border-cyan-400 rounded-full pointer-events-none";
      pulse.style.left = "50%";
      pulse.style.top = "50%";
      document.querySelector(".pulse-container").appendChild(pulse);
      
      gsap.to(pulse, {
        scale: 15,
        opacity: 0,
        duration: 1.5,
        onComplete: () => pulse.remove()
      });
    };
    ScrollTrigger.create({
      trigger: ".pulse-trigger",
      start: "top 70%",
      onEnter: createPulse
    });

    /* 8. TYPO SLIDE CASCADE */
    gsap.from(".typo-slide", {
      y: 100,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      scrollTrigger: {
        trigger: ".typo-container",
        start: "top 70%"
      }
    });

    /* 9. HOLO BLUR SHINE */
    gsap.to(".holo-shine", {
      backdropFilter: "blur(10px)",
      duration: 1,
      scrollTrigger: {
        trigger: ".holo-shine",
        start: "top 70%",
        scrub: true
      }
    });

    /* 10. GRAVITY LIFT REVEAL */
    gsap.from(".gravity-lift", {
      y: 200,
      rotate: 5,
      duration: 1.5,
      ease: "back.out(1.5)",
      scrollTrigger: {
        trigger: ".gravity-lift",
        start: "top 80%"
      }
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* 1. PRISM FADE SPLIT */}
      <section className="prism-container py-20">
        <div className="flex justify-center gap-4">
          {["P", "R", "I", "S", "M"].map((letter, i) => (
            <div key={i} className="prism-split text-6xl font-bold bg-gradient-to-br from-purple-500 to-cyan-400 w-16 h-16 flex items-center justify-center rounded-lg">
              {letter}
            </div>
          ))}
        </div>
      </section>

      {/* 2. WAVY MORPH ENTRY */}
      <section className="py-20">
        <div className="wavy-morph w-full h-64 bg-gradient-to-r from-pink-500 to-orange-400 rounded-xl overflow-hidden flex items-center justify-center text-3xl font-bold">
          WAVY ENTRY
        </div>
      </section>

      {/* 3. SCROLL SNAP GLOW */}
      <section className="py-20 flex justify-center">
        <div className="snap-glow w-32 h-32 bg-blue-500 rounded-lg flex items-center justify-center">
          GLOW
        </div>
      </section>

      {/* 4. CYBER FLICKER FLASH */}
      <section className="py-20 flex justify-center">
        <div className="cyber-flicker text-5xl font-mono bg-black px-6 py-3 border-2 border-green-400">
          CYBER MODE
        </div>
      </section>

      {/* 5. ELASTIC POP GRID */}
      <section className="elastic-grid py-20 grid grid-cols-3 gap-4 w-64 mx-auto">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="elastic-pop w-16 h-16 bg-purple-500 rounded-lg flex items-center justify-center">
            {item}
          </div>
        ))}
      </section>

      {/* 6. AURORA SWIPE MASK */}
      <section className="py-20">
        <div className="aurora-mask w-full h-64 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 clip-path-mask rounded-xl flex items-center justify-center text-3xl font-bold">
          AURORA EFFECT
        </div>
      </section>

      {/* 7. PULSE RING DROP */}
      <section className="pulse-trigger py-20">
        <div className="pulse-container relative w-32 h-32 mx-auto bg-gray-800 rounded-full flex items-center justify-center">
          <div className="text-xl">PULSE</div>
        </div>
      </section>

      {/* 8. TYPO SLIDE CASCADE */}
      <section className="typo-container py-20 text-center">
        <div className="inline-block overflow-hidden">
          {"TYPOGRAPHY".split("").map((char, i) => (
            <span key={i} className="typo-slide inline-block text-5xl font-bold mx-1">
              {char}
            </span>
          ))}
        </div>
      </section>

      {/* 9. HOLO BLUR SHINE */}
      <section className="py-20 flex justify-center">
        <div className="holo-shine w-64 h-64 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center text-2xl">
          HOLO EFFECT
        </div>
      </section>

      {/* 10. GRAVITY LIFT REVEAL */}
      <section className="py-20 flex justify-center">
        <div className="gravity-lift w-64 h-64 bg-gradient-to-br from-amber-400 to-red-500 rounded-xl shadow-2xl flex items-center justify-center text-xl font-bold">
          GRAVITY LIFT
        </div>
      </section>

      {/* Spacer */}
      <div className="h-screen"></div>
    </div>
  );
};

export default NextGenAnimations;