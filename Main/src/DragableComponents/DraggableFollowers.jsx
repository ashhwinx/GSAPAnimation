import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

const DraggableFollowers = () => {
  const targetRef = useRef(null);
  const oneRef = useRef(null);
  const twoRef = useRef(null);
  const threeRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(Draggable, InertiaPlugin);
    gsap.config({ trialWarn: false });

    // Function to create follower animation
    const follower = (target, duration) => {
      const xTo = gsap.quickTo(target, "x", { duration, ease: "back" });
      const yTo = gsap.quickTo(target, "y", { duration, ease: "back" });
      return (x, y) => { xTo(x); yTo(y); };
    };

    // Create followers for each box in reverse order
    const followers = [
      oneRef.current,
      twoRef.current,
      threeRef.current
    ].reverse().map((el, i) => follower(el, 0.25 + i * 0.1));

    // Create draggable target
    const draggable = Draggable.create(targetRef.current, {
      bounds: window,
      inertia: true,
      onDrag: updateFollowers,
      onThrowUpdate: updateFollowers
    });

    function updateFollowers() {
      const { x, y } = draggable[0];
      followers.forEach(f => f(x, y));
    }

    return () => {
      if (draggable && draggable[0]) {
        draggable[0].kill();
      }
    };
  }, []);

  return (
    <div className="p-0 m-0 min-h-screen overflow-hidden flex flex-col justify-center items-center">
      <div ref={threeRef} id="three" className="box w-5 h-5 bg-gradient-to-br from-green-400 to-green-600 rounded-sm absolute"></div>
      <div ref={twoRef} id="two" className="box w-7 h-7 bg-gradient-to-br from-green-400 to-green-600 rounded-sm absolute"></div>
      <div ref={oneRef} id="one" className="box w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-sm absolute"></div>
      <div 
        ref={targetRef} 
        id="target" 
        className="box w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-sm absolute grid place-content-center cursor-move"
      >
        DRAG
      </div>
    </div>
  );
};

export default DraggableFollowers;