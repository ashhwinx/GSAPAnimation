import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger, MorphSVGPlugin } from 'gsap/all';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin);

const BouncyFooter = () => {
  useEffect(() => {
    // SVG path definitions
    const downPath = 'M0-0.3C0-0.3,464,156,1139,156S2278-0.3,2278-0.3V683H0V-0.3z';
    const centerPath = 'M0-0.3C0-0.3,464,0,1139,0s1139-0.3,1139-0.3V683H0V-0.3z';

    // Create scroll trigger for the bounce effect
    ScrollTrigger.create({
      trigger: '.footer',
      start: 'top bottom',
      toggleActions: 'play pause resume reverse',
    
      onEnter: self => {
        const velocity = self.getVelocity();
        const variation = Math.min(Math.abs(velocity) / 10000, 0.9); // Limit variation
        
        gsap.fromTo('#bouncy-path', 
          { morphSVG: downPath },
          {
            duration: 2, 
            morphSVG: centerPath, 
            ease: `elastic.out(${1 + variation}, ${1 - variation})`,
            overwrite: true
          }
        );
      }
    });

    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(instance => instance.kill());
    };
  }, []);

  return (
    // <div 
    //   className="relative h-[250vh] m-0" 
    //   style={{ backgroundColor: '#0e100f' }}
    // >
    <div className="footer z-50 absolute w-full bottom-0">
        {/* Noise overlay pseudo-element */}
        
        
        <svg 
          preserveAspectRatio="none" 
          id="footer-img" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 2278 683"
          className="h-full w-full block overflow-visible"
        >
         
          <defs>
            <linearGradient 
              id="grad-1" 
              x1="900" y1="0" 
              x2="2278" y2="683" 
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.2" stopColor="#000000" />
              <stop offset="0.8" stopColor="#ffffff" />
            </linearGradient>
          </defs>
          
          <path 
            id="bouncy-path" 
            className="footer-svg" 
            fill="url(#grad-1)" 
            d="M0-0.3C0-0.3,464,156,1139,156S2278-0.3,2278-0.3V683H0V-0.3z" 
          />
          
        </svg>

        {/* <div className='h-96 w-96 bg-red-500'></div> */}



    </div>
  // </div>
  );
};

export default BouncyFooter;