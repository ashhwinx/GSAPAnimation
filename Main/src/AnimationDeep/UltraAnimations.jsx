import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const UltraAnimations = () => {
  const containerRef = useRef();

  useGSAP(() => {
    /* 1. ZOOM BLOOM POP */
    gsap.to(".zoom-bloom", {
      scale: 1.2,
      boxShadow: "0 0 40px rgba(236, 72, 153, 0.8)",
      duration: 0.8,
      scrollTrigger: {
        trigger: ".zoom-bloom",
        start: "top 75%",
        toggleActions: "play none none none"
      }
    });

    /* 2. HOVER HALO FLICK */
    const haloItems = gsap.utils.toArray(".halo-flick");
    haloItems.forEach(item => {
      item.addEventListener("mouseenter", () => {
        gsap.to(item, {
          boxShadow: "0 0 30px #8b5cf6",
          duration: 0.3,
          yoyo: true,
          repeat: 1
        });
      });
    });

    /* 3. SCROLL SYNC SURGE */
    gsap.to(".scroll-surge", {
      y: -100,
      scrollTrigger: {
        trigger: ".scroll-surge",
        scrub: 1,
        start: "top bottom",
        end: "bottom top"
      }
    });

    /* 4. Z-DEPTH HOVER RISE */
    gsap.utils.toArray(".z-depth").forEach(item => {
      item.addEventListener("mousemove", (e) => {
        const rect = item.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        gsap.to(item, {
          transformPerspective: 1000,
          rotationY: (x - 0.5) * 20,
          rotationX: (0.5 - y) * 20,
          z: 50,
          ease: "power2.out",
          duration: 0.5
        });
      });
      
      item.addEventListener("mouseleave", () => {
        gsap.to(item, {
          rotationY: 0,
          rotationX: 0,
          z: 0,
          duration: 1,
          ease: "elastic.out(1, 0.5)"
        });
      });
    });

    /* 5. KINETIC ZOOM PULSE */
    gsap.to(".kinetic-pulse", {
      scale: 1.1,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    /* 6. HOVER SNAP STRETCH */
    gsap.utils.toArray(".snap-stretch").forEach(item => {
      item.addEventListener("mouseenter", () => {
        gsap.to(item, {
          scaleX: 1.2,
          duration: 0.3,
          ease: "back.out(2)"
        });
      });
      item.addEventListener("mouseleave", () => {
        gsap.to(item, {
          scaleX: 1,
          duration: 0.5,
          ease: "elastic.out(1, 0.5)"
        });
      });
    });

    /* 7. SCROLLMORPH SWIPE */
    gsap.to(".scrollmorph", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1.5,
      scrollTrigger: {
        trigger: ".scrollmorph",
        start: "top 70%",
        toggleActions: "play none none none"
      }
    });

    /* 8. LENSZOOM REVEAL */
    gsap.to(".lenszoom", {
      scale: 1.3,
      filter: "blur(0px)",
      duration: 1.2,
      scrollTrigger: {
        trigger: ".lenszoom",
        start: "top 80%",
        scrub: 1
      }
    });

    /* 9. GLOWON HOVER SLIDE */
    gsap.utils.toArray(".glow-slide").forEach(item => {
      const glow = item.querySelector(".glow-effect");
      item.addEventListener("mousemove", (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        gsap.to(glow, {
          left: x,
          opacity: 1,
          duration: 0.3
        });
      });
      item.addEventListener("mouseleave", () => {
        gsap.to(glow, {
          opacity: 0,
          duration: 0.5
        });
      });
    });

    /* 10. BLURTRAIL SCROLL LIFT */
    gsap.to(".blurtrail", {
      y: -50,
      filter: "blur(0px)",
      duration: 1,
      scrollTrigger: {
        trigger: ".blurtrail",
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* 1. ZOOM BLOOM POP */}
      <section className="py-20 flex justify-center">
        <div className="zoom-bloom w-32 h-32 bg-pink-600 rounded-full flex items-center justify-center text-xl font-bold">
          POP!
        </div>
      </section>

      {/* 2. HOVER HALO FLICK */}
      <section className="py-20 flex justify-center gap-8">
        {[1, 2, 3].map(item => (
          <div key={item} className="halo-flick w-24 h-24 bg-purple-600 rounded-lg flex items-center justify-center cursor-pointer">
            {item}
          </div>
        ))}
      </section>

      {/* 3. SCROLL SYNC SURGE */}
      <section className="py-20 h-[150vh] flex items-center justify-center relative">
        <div className="scroll-surge w-64 h-64 bg-cyan-500 rounded-xl flex items-center justify-center text-2xl font-bold">
          SCROLL ME
        </div>
      </section>

      {/* 4. Z-DEPTH HOVER RISE */}
      <section className="py-20 grid grid-cols-3 gap-6 w-3/4 mx-auto">
        {[1, 2, 3, 4, 5, 6].map(item => (
          <div key={item} className="z-depth bg-gray-800 p-6 rounded-lg cursor-pointer transition-all duration-300">
            Card {item}
          </div>
        ))}
      </section>

      {/* 5. KINETIC ZOOM PULSE */}
      <section className="py-20 flex justify-center">
        <div className="kinetic-pulse w-32 h-32 bg-gradient-to-r from-amber-400 to-red-500 rounded-full flex items-center justify-center">
          PULSE
        </div>
      </section>

      {/* 6. HOVER SNAP STRETCH */}
      <section className="py-20 flex justify-center gap-8">
        {["S", "T", "R", "E", "T", "C", "H"].map((letter, i) => (
          <div key={i} className="snap-stretch text-4xl font-bold bg-blue-500 px-4 py-2 rounded cursor-pointer">
            {letter}
          </div>
        ))}
      </section>

      {/* 7. SCROLLMORPH SWIPE */}
      <section className="py-20">
        <div className="scrollmorph w-full h-64 bg-gradient-to-r from-emerald-400 to-teal-600 clip-path-morph rounded-xl flex items-center justify-center text-3xl font-bold">
          SWIPE IN
        </div>
      </section>

      {/* 8. LENSZOOM REVEAL */}
      <section className="py-20 flex justify-center">
        <div className="lenszoom w-64 h-64 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center text-2xl font-bold filter blur-md">
          ZOOM
        </div>
      </section>

      {/* 9. GLOWON HOVER SLIDE */}
      <section className="py-20 flex justify-center">
        <div className="glow-slide relative w-64 h-20 bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer">
          <span className="relative z-10">HOVER TO GLOW</span>
          <div className="glow-effect absolute w-32 h-32 bg-blue-400 rounded-full opacity-0 filter blur-xl pointer-events-none"></div>
        </div>
      </section>

      {/* 10. BLURTRAIL SCROLL LIFT */}
      <section className="py-20 flex justify-center">
        <div className="blurtrail w-64 h-64 bg-gradient-to-tr from-rose-500 to-pink-600 rounded-xl flex items-center justify-center text-2xl font-bold filter blur-md">
          LIFT UP
        </div>
      </section>

      {/* Spacer */}
      <div className="h-screen"></div>
    </div>
  );
};

export default UltraAnimations;