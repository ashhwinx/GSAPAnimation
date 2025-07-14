import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const GSAPShowcase = () => {
  const sectionsRef = useRef([]);
  const cursorRef = useRef(null);

  useEffect(() => {
    sectionsRef.current.forEach((section, index) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        delay: index * 0.2
      });
    });

    gsap.to('.rotate-text', {
      scrollTrigger: {
        trigger: '.rotate-text',
        scrub: true
      },
      rotation: 360,
      ease: 'none'
    });

    gsap.fromTo('.glitch-text',
      { x: -5 },
      {
        x: 5,
        repeat: -1,
        yoyo: true,
        duration: 0.05,
        ease: 'power1.inOut'
      }
    );

    gsap.to('.bg-animate', {
      backgroundPosition: '200% center',
      duration: 3,
      repeat: -1,
      ease: 'linear'
    });

    document.addEventListener('mousemove', (e) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: 'power2.out'
      });
    });
  }, []);

  return (
    <div className="relative overflow-x-hidden text-white bg-black min-h-screen p-10">
      <div ref={cursorRef} className="fixed top-0 left-0 w-6 h-6 bg-pink-500 rounded-full pointer-events-none mix-blend-difference z-50" />

      <h1 className="text-5xl font-bold text-center glitch-text">GenZ GSAP Animations ✨</h1>

      <div className="mt-20 space-y-20">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            ref={(el) => (sectionsRef.current[i] = el)}
            className="p-10 bg-white/10 rounded-xl text-center text-2xl font-semibold"
          >
            Animation #{i + 1}
          </div>
        ))}
      </div>

      <div className="rotate-text mt-40 text-center text-4xl font-extrabold text-pink-400">
        Scroll to Rotate Me!
      </div>

      <div className="bg-animate mt-40 h-32 w-full bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 bg-[length:400%_100%] rounded-xl"></div>
    </div>
  );
};

export default GSAPShowcase;
