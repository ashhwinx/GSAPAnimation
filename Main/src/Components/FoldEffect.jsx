import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const FoldEffect = () => {
  const marqueeRefs = useRef([]);
  const centerContentRef = useRef(null);
  const centerFoldRef = useRef(null);
  const foldsContentRefs = useRef([]);
  const wrapperRef = useRef(null);
  const animationRef = useRef(null);

  // Initialize animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Set initial body height
    const setBodyHeight = () => {
      if (centerContentRef.current && centerFoldRef.current) {
        const overflowHeight = centerContentRef.current.clientHeight - centerFoldRef.current.clientHeight;
        document.body.style.height = `${overflowHeight + window.innerHeight}px`;
      }
    };

    // Marquee animations with perfect timing
    marqueeRefs.current.forEach((el, index) => {
      if (!el) return;
      
      const track = el.querySelector('.track');
      const direction = index % 2 === 0 ? 1 : -1;
      const distance = 1000; // Increased distance for smoother effect
      
      gsap.fromTo(track, 
        { x: direction * -distance },
        {
          x: direction * distance,
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5, // Smoother scrubbing
            invalidateOnRefresh: true
          }
        }
      );
    });

    // Smooth scroll animation with improved physics
    let lastScroll = 0;
    let targetScroll = 0;
    let currentScroll = 0;
    let velocity = 0;
    const friction = 0.1;
    const mass = 0.8;

    const smoothScroll = () => {
      targetScroll = window.scrollY || document.documentElement.scrollTop;
      
      // Physics-based smoothing
      const force = (targetScroll - currentScroll) * 0.1;
      velocity = (velocity + force) * mass;
      currentScroll += velocity;
      
      // Apply to all fold contents
      foldsContentRefs.current.forEach(content => {
        if (content) {
          content.style.transform = `translateY(${-currentScroll}px)`;
        }
      });

      lastScroll = targetScroll;
      animationRef.current = requestAnimationFrame(smoothScroll);
    };

    // Initialize
    setBodyHeight();
    smoothScroll();

    // Handle resize
    const resizeHandler = () => {
      setBodyHeight();
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', resizeHandler);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeHandler);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Marquee content data
  const marqueeContent = [
    { text: "Creators.", focusIndex: 2 },
    { text: "Thinkers.", focusIndex: 2 },
    { text: "Innovators.", focusIndex: 2 },
    { text: "Rebels.", focusIndex: 3 }
  ];

  // Generate marquee track
  const renderTrack = (content) => {
    const items = Array(8).fill(content.text);
    return items.map((item, i) => (
      <React.Fragment key={i}>
        {i === content.focusIndex ? (
          <span className="text-black font-black inline-block px-2">{item}</span>
        ) : (
          <span className="inline-block px-2">{item}</span>
        )}
      </React.Fragment>
    ));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
      <div 
        className="relative perspective-[20vw] transform-style-preserve-3d w-full h-full"
        ref={wrapperRef}
      >
        {/* Top Fold */}
        <div className="absolute left-0 right-0 bottom-full overflow-hidden w-full h-[80vh] origin-bottom-center transform -rotate-x-[120deg]">
          <div className="w-full h-full translate-y-full">
            <div className="fold-content" ref={el => foldsContentRefs.current[0] = el}>
              {marqueeContent.map((content, i) => (
                <div 
                  key={`top-${i}`} 
                  className="marquee border-b border-black text-gray-300 text-[clamp(4.5rem,3.64rem+4.29vw,9rem)] font-bold h-[calc(170px+4rem)] overflow-hidden w-full"
                  ref={el => marqueeRefs.current[i] = el}
                >
                  <div className="track absolute h-full overflow-hidden py-8 whitespace-nowrap will-change-transform">
                    {renderTrack(content)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center Fold */}
        <div 
          className="w-full h-[80vh] overflow-hidden" 
          ref={centerFoldRef}
        >
          <div className="w-full h-full">
            <div 
              className="fold-content" 
              ref={el => {
                centerContentRef.current = el;
                foldsContentRefs.current[1] = el;
              }}
            >
              {marqueeContent.map((content, i) => (
                <div 
                  key={`center-${i}`} 
                  className="marquee border-b border-black text-gray-300 text-[clamp(4.5rem,3.64rem+4.29vw,9rem)] font-bold h-[calc(170px+4rem)] overflow-hidden w-full"
                  ref={el => marqueeRefs.current[i + 4] = el}
                >
                  <div className="track absolute h-full overflow-hidden py-8 whitespace-nowrap will-change-transform">
                    {renderTrack(content)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Fold */}
        <div className="absolute left-0 right-0 top-full overflow-hidden w-full h-[80vh] origin-top-center transform rotate-x-[120deg]">
          <div className="w-full h-full -translate-y-full">
            <div className="fold-content" ref={el => foldsContentRefs.current[2] = el}>
              {marqueeContent.map((content, i) => (
                <div 
                  key={`bottom-${i}`} 
                  className="marquee border-b border-black text-gray-300 text-[clamp(4.5rem,3.64rem+4.29vw,9rem)] font-bold h-[calc(170px+4rem)] overflow-hidden w-full"
                  ref={el => marqueeRefs.current[i + 8] = el}
                >
                  <div className="track absolute h-full overflow-hidden py-8 whitespace-nowrap will-change-transform">
                    {renderTrack(content)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoldEffect;