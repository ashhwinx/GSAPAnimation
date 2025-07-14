import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger, ScrollSmoother } from 'gsap/all';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const HorizontalGallery = () => {
  const smoothWrapperRef = useRef(null);
  const smoothContentRef = useRef(null);
  const portfolioRef = useRef(null);

  useEffect(() => {
    // Initialize ScrollSmoother
    const smoother = ScrollSmoother.create({
      wrapper: smoothWrapperRef.current,
      content: smoothContentRef.current,
      smooth: 2,
      normalizeScroll: true,
      ignoreMobileResize: true,
      effects: true,
      preventDefault: true
    });

    // Horizontal scroll galleries
    if (portfolioRef.current) {
      const horizontalSections = gsap.utils.toArray('.horiz-gallery-wrapper');

      horizontalSections.forEach((sec) => {
        const pinWrap = sec.querySelector(".horiz-gallery-strip");
        let pinWrapWidth;
        let horizontalScrollLength;
        
        const refresh = () => {
          pinWrapWidth = pinWrap.scrollWidth;
          horizontalScrollLength = pinWrapWidth - window.innerWidth;
        };

        refresh();
        
        // Pinning and horizontal scrolling
        const scrollTween = gsap.to(pinWrap, {
          scrollTrigger: {
            scrub: true,
            trigger: sec,
            pin: sec,
            start: "center center",
            end: () => `+=${pinWrapWidth}`,
            invalidateOnRefresh: true
          },
          x: () => -horizontalScrollLength,
          ease: "none"
        });
      
        pinWrap.querySelectorAll("[data-speed-x]").forEach((el) => {
          const speed = parseFloat(el.getAttribute("data-speed-x"));
          gsap.to(el, {
            x: () => (1 - speed) * (window.innerWidth + el.offsetWidth),
            ease: "none",
            scrollTrigger: {
              containerAnimation: scrollTween,
              trigger: el,
              onRefresh: self => {
                const start = Math.max(0, self.start);
                self.setPositions(start, start + (self.end - self.start) / Math.abs(speed));
                self.animation.progress(0);
              },
              scrub: true
            }
          });
        });

        ScrollTrigger.addEventListener("refreshInit", refresh);
      });
    }

    return () => {
      if (smoother) smoother.kill();
      ScrollTrigger.getAll().forEach(instance => instance.kill());
    };
  }, []);

  // Gallery data
  const galleryItems = [
    {
      src: "https://images.unsplash.com/photo-1570018144715-43110363d70a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2531&q=80",
      title: "Image 1"
    },
    {
      src: "https://images.unsplash.com/photo-1570824104967-27599c232b4b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2559&q=80",
      title: "Image 2"
    },
    {
      src: "https://images.unsplash.com/photo-1570018144715-43110363d70a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2531&q=80",
      title: "Image 3"
    },
    {
      src: "https://images.unsplash.com/photo-1570824104967-27599c232b4b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2559&q=80",
      title: "Image 4"
    }
  ];

  // Speed variations for parallax effect
  const speedVariations = [1.2, 0.8, 1.1, 0.9];

  return (
    <div 
      ref={smoothWrapperRef} 
      id="smooth-wrapper" 
      className="overflow-x-hidden  m-0"
    >
      <div 
        ref={smoothContentRef} 
        id="smooth-content"
      >
        <section className="py-20 text-center border-b border-yellow-50 text-white">
          <h1>Here comes the gallery</h1>
        </section>
        
        <section 
          ref={portfolioRef} 
          id="portfolio" 
          className="relative overflow-hidden"
        >
          <div className="w-full px-0 mx-auto">
            {/* First row with parallax effects */}
            <div className="horiz-gallery-wrapper flex flex-nowrap will-change-transform relative">
              <div className="horiz-gallery-strip flex flex-nowrap will-change-transform relative">
                {galleryItems.map((item, index) => (
                  <div 
                    key={`row1-${index}`}
                    className="project-wrap w-[50vw] p-8 box-content"
                    data-speed-x={speedVariations[index]}
                  >
                    <img src={item.src} alt={item.title} className="w-full h-auto" />
                    <h2>{item.title}</h2>
                  </div>
                ))}
              </div>
            </div>

            {/* Second row */}
            <div className="horiz-gallery-wrapper flex flex-nowrap will-change-transform relative">
              <div className="horiz-gallery-strip flex flex-nowrap will-change-transform relative">
                {galleryItems.map((item, index) => (
                  <div 
                    key={`row2-${index}`}
                    className="project-wrap w-[50vw] p-8 box-content"
                  >
                    <img src={item.src} alt={item.title} className="w-full h-auto" />
                    <h2>{item.title}</h2>
                  </div>
                ))}
              </div>
            </div>

            
          </div>
        </section>

        <section className="py-20 text-center border-t border-yellow-50 text-white">
          <h3>Bye gallery</h3>
        </section>
      </div>
    </div>
  );
};

export default HorizontalGallery;