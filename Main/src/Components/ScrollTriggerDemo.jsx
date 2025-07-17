import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

const ScrollTriggerDemo = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const navs = gsap.utils.toArray("nav a");

    gsap.utils.toArray(".panel").forEach((panel, i) => {
      const trigger = ScrollTrigger.create({
        trigger: panel,
        start: "top top", 
        pin: true, 
        pinSpacing: false 
      });
        
      const nav = navs[i];
      
      nav.addEventListener("click", function(e) {
        e.preventDefault();
        gsap.to(window, {
          duration: 1, 
          scrollTo: trigger.start
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="relative">
      {/* Sections */}
      <section id="one" className="panel h-screen w-full bg-red-500 flex items-center justify-center text-white text-6xl font-bold">
        ONE
      </section>
      <section id="two" className="panel h-screen w-full bg-orange-500 flex items-center justify-center text-white text-6xl font-bold">
        TWO
      </section>
      <section id="three" className="panel h-screen w-full bg-purple-500 flex items-center justify-center text-white text-6xl font-bold">
        THREE
      </section>
      <section id="four" className="panel h-screen w-full bg-green-500 flex items-center justify-center text-white text-6xl font-bold">
        FOUR
      </section>

      {/* Navigation */}
      <nav className="fixed top-2.5 right-2.5 bg-black p-0 px-2.5 z-10">
        <div><a href="#one" className="text-white text-xl leading-relaxed no-underline hover:underline">Section one</a></div>
        <div><a href="#two" className="text-white text-xl leading-relaxed no-underline hover:underline">Section two</a></div>
        <div><a href="#three" className="text-white text-xl leading-relaxed no-underline hover:underline">Section three</a></div>
        <div><a href="#four" className="text-white text-xl leading-relaxed no-underline hover:underline">Section four</a></div>
      </nav>

      {/* Header */}
      <header className="fixed top-0 left-0 z-10">
        <a href="https://greensock.com/scrolltrigger">
          <img 
            className="greensock-icon" 
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/scroll-trigger-logo-light.svg" 
            width="200" 
            height="64" 
            alt="GreenSock Logo"
          />
        </a> 
      </header>
    </div>
  );
};

export default ScrollTriggerDemo;