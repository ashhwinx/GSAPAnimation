import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const ScrollAnimation = () => {
  const headingRef = useRef(null);
  const svg1Ref = useRef(null);
  const svg2Ref = useRef(null);

  useEffect(() => {
    // Split text into spans
    const splitText = () => {
      const text = headingRef.current;
      if (!text) return;
      
      const textContent = text.textContent;
      const letters = textContent.split('');
      
      text.innerHTML = letters.map(letter => 
        letter === ' ' ? '<span>&nbsp;</span>' : `<span>${letter}</span>`
      ).join('');
    };

    splitText();

    // SVG rotation animation
    gsap.to([svg1Ref.current, svg2Ref.current], {
      repeat: -1,
      duration: 10,
      rotate: 360,
      ease: "steps(40)"
    });

    // Text character animation
    gsap.to('h1 span', {
      repeat: -1,
      duration: 1,
      y: () => gsap.utils.random(-6, 6),
      rotate: () => gsap.utils.random(-8, 8),
      scale: () => gsap.utils.random(0.8, 1.1),
      ease: "steps(2)",
      repeatRefresh: true,
      stagger: 0.1
    });

    // Scroll animation timeline
    const scrollAnim = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        scrub: 0.6,
        toggleActions: 'restart none none none'
      }
    });

    scrollAnim
      .to('.svgbox--1', {
        x: '50vw',
        ease: "steps(30)",
      })
      .to('.svgbox--2', {
        x: '-50vw',
        ease: "steps(20)",
      }, '<')
      .to('h1', {
        y: -30,
        ease: "steps(6)"
      }, '<');

    return () => {
      // Clean up GSAP animations
      ScrollTrigger.getAll().forEach(instance => instance.kill());
      gsap.globalTimeline.getChildren().forEach(animation => animation.kill());
    };
  }, []);

  return (
    <div className="overflow-x-hidden" style={{ height: '500vh', fontFamily: "'Pangolin', cursive", letterSpacing: '0.05em' }}>
      <h1 
        ref={headingRef}
        data-split
        className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
        style={{ letterSpacing: '0.1em' }}
      >
        Scroll Down!
      </h1>

      <div className="svgbox svgbox--1 fixed top-1/2 left-0 w-[150px] mt-[-75px]" ref={svg1Ref}>
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 300 300"
          className="w-full h-auto"
        >
          <path
            opacity="0.5"
            fill="#D83D3D"
            d="M52,47c0,0,14-30,41-21s58,93,106,101s88,86,63,111s-155,53-198-3S34,78,52,47z"
          />
        </svg>
      </div>

      <div className="svgbox svgbox--2 fixed top-1/2 right-0 w-[150px] mt-[-75px]" ref={svg2Ref}>
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 300 300"
          className="w-full h-auto"
        >
          <path
            opacity="0.5"
            fill="#EFD050"
            d="M103,25c0,0,25-15,79-12s94,102,94,128s-13,98-50,119S91,301,71,273s-56-54-53-113 S84,32,103,25z"
          />
        </svg>
      </div>
    </div>
  );
};

export default ScrollAnimation;