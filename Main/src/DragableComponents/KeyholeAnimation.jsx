import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const KeyholeAnimation = () => {
  const mainRef = useRef(null);
  const keyholeRef = useRef(null);
  const arrowRef = useRef(null);
  const primarySectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Set up animations only if motion is allowed
    if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
      // Keyhole animation
      gsap.from(keyholeRef.current, {
        clipPath: "polygon(0% 0%, 0% 100%, 25% 100%, 25% 25%, 75% 25%, 75% 75%, 25% 75%, 25% 100%, 100% 100%, 100% 0%)",
        scrollTrigger: {
          trigger: primarySectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          markers: false,
          invalidateOnRefresh: true
        }
      });

      // Arrow animation
      gsap.to(arrowRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: primarySectionRef.current,
          start: "top top",
          end: "+=200",
          scrub: true,
          invalidateOnRefresh: true
        }
      });

      // Force ScrollTrigger recalculations
      ScrollTrigger.refresh();
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div 
      ref={mainRef}
      className="relative font-sans text-gray-800 bg-gray-100 w-full h-screen overflow-y-auto overflow-x-hidden"
    >
      {/* Keyhole overlay */}
      <div
        ref={keyholeRef}
        className="fixed inset-0 pointer-events-none bg-yellow-300 z-10"
        style={{
          clipPath: 'polygon(0% 0%, 0% 100%, 0 100%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%, 100% 100%, 100% 0%)'
        }}
        aria-hidden="true"
      />

      {/* Animated arrow */}
      <div
        ref={arrowRef}
        className="fixed top-[72.5vh] left-1/2 z-20 -translate-x-1/2"
        aria-hidden="true"
        style={{
          animation: 'float 1.5s ease-in-out infinite alternate'
        }}
      >
        <svg 
          width="32" 
          height="32" 
          viewBox="0 0 20 20"
          className="rotate-90"
        >
          <path 
            d="M 0 10 H 20 L 10 0 M 20 10 L 10 20"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="square"
            strokeLinejoin="round"
            className="text-gray-800"
            fill="none"
          />
        </svg>
      </div>

      {/* Main content sections */}
      <main className="relative z-0">
        {/* Primary section */}
        <section 
          ref={primarySectionRef}
          className="bg-yellow-200 min-h-screen pt-20"
        >
          <div className="max-w-4xl mx-auto px-10 pb-20">
            <figure className="w-full h-[60vh] mb-10">
              <img 
                src="https://picsum.photos/id/315/1600/1600" 
                alt="Decorative"
                className="w-full h-full object-cover"
              />
            </figure>
            <h1 className="text-5xl font-serif leading-tight mb-6">At vero eos et accusamus.</h1>
            <p className="mb-4">Cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia.</p>
            <p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.</p>
          </div>
        </section>

        {/* Secondary section */}
        <section className="bg-purple-300 min-h-screen py-20">
          <div className="max-w-4xl mx-auto px-10">
            <h2 className="text-4xl font-serif leading-tight mb-6">At vero eos et accusamus.</h2>
            <p className="mb-4">Sed ut perspiciatis unde omnis iste natus error sit voluptatem.</p>
          </div>
        </section>

        {/* Tertiary section */}
        <section className="bg-orange-300 min-h-screen py-20">
          <div className="max-w-4xl mx-auto px-10">
            <h2 className="text-4xl font-serif leading-tight mb-6">Qui officia deserunt</h2>
            <p>Et harum quidem rerum facilis est et expedita distinctio.</p>
          </div>
        </section>
      </main>

      {/* Injected styles */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translate(-50%, -20px); }
          100% { transform: translate(-50%, 20px); }
        }
        body {
          overflow: hidden;
        }
        .scroll-container {
          height: 100vh;
          overflow-y: scroll;
          scroll-snap-type: y mandatory;
        }
      `}</style>
    </div>
  );
};

export default KeyholeAnimation;