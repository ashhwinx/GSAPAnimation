import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

// Register GSAP plugins
gsap.registerPlugin(SplitText);

const TextDragAnimation = () => {
  const stageRef = useRef(null);
  const txtRef = useRef(null);
  const charsRef = useRef([]);
  const splitTextRef = useRef(null);

  useEffect(() => {
    // Initialize animation
    const init = () => {
      resize();
      
      gsap.set(stageRef.current, { autoAlpha: 1 });
      gsap.set(charsRef.current, {
        transformOrigin: 'center bottom'
      });
      
      animInTxt();
    };

    // Text entry animation
    const animInTxt = () => {
      const elem = document.querySelector('.char');
      const rect = elem.getBoundingClientRect();
      const charH = txtRef.current.offsetHeight;
      
      gsap.from(charsRef.current, {
        y: () => -1 * (rect.y + charH + 500),
        fontWeight: 400, // weightTarget
        fontStretch: '80%', // stretchTarget
        scaleY: 2,
        ease: "elastic(0.2, 0.1)",
        duration: 1.5,
        delay: 0.5,
        stagger: {
          each: 0.05,
          from: 'random'
        },
        onComplete: initEvents
      });
    };

    // Initialize event handlers
    const initEvents = () => {
      const body = document.body;
      const weightInit = 600;
      const weightTarget = 400;
      const weightDiff = weightInit - weightTarget;
      const stretchInit = 150;
      const stretchTarget = 80;
      const stretchDiff = stretchInit - stretchTarget;
      const maxYScale = 2.5;
      let isMouseDown = false;
      let mouseInitialY = 0;
      let mouseFinalY = 0;
      let distY = 0;
      let charIndexSelected = 0;
      let charH = txtRef.current.offsetHeight;
      const elasticDropOff = 0.8;
      let dragYScale = 0;

      const handleMouseUp = (e) => { 
        if(isMouseDown) {
          mouseFinalY = e.clientY;
          isMouseDown = false;
          snapBackText();
          body.classList.remove("grab");
        }
      };
      
      const handleMouseMove = (e) => { 
        if(isMouseDown) {
          mouseFinalY = e.clientY;
          calcDist();
          setFontDragDimensions();
        }
      };
      
      const handleMouseLeave = (event) => {  
        if (event.clientY <= 0 || event.clientX <= 0 || 
            (event.clientX >= window.innerWidth || event.clientY >= window.innerHeight)) {  
          snapBackText();
          isMouseDown = false;
        }  
      };

      const calcDist = () => {
        const maxYDragDist = charH * (maxYScale - 1);
        distY = mouseInitialY - mouseFinalY;
        dragYScale = distY / maxYDragDist;
        if(dragYScale > (maxYScale - 1)) {
          dragYScale = maxYScale - 1;
        }
        else if (dragYScale < -0.5) {
          dragYScale = -0.5;
        }
      };

      const calcFracDispersion = (index) => {
        const dispersion = 1 - (Math.abs(index - charIndexSelected)) / (charsRef.current.length * elasticDropOff);
        return dispersion * dragYScale;
      };

      const setFontDragDimensions = () => {
        gsap.to(charsRef.current, {
          y: (index) => {
            const fracDispersion = calcFracDispersion(index);
            return fracDispersion * -50;
          },
          fontWeight: (index) => {
            const fracDispersion = calcFracDispersion(index);
            return (weightInit - (fracDispersion * weightDiff));
          },
          fontStretch: (index) => {
            const fracDispersion = calcFracDispersion(index);
            return `${stretchInit - (fracDispersion * stretchDiff)}%`;
          },
          scaleY: (index) => {
            const fracDispersion = calcFracDispersion(index);
            let scaleY = 1 + fracDispersion;
            if(scaleY < 0.5) scaleY = 0.5;
            return scaleY;
          },
          ease: "power4",
          duration: 0.6
        });
      };

      const snapBackText = () => {
        gsap.to(charsRef.current, {
          y: 0,
          fontWeight: weightInit,
          fontStretch: `${stretchInit}%`,
          scale: 1,
          ease: "elastic(0.35, 0.1)",
          duration: 1,
          stagger: {
            each: 0.02,
            from: charIndexSelected
          }
        });
      };

      body.addEventListener('mouseup', handleMouseUp);
      body.addEventListener('mousemove', handleMouseMove);
      body.addEventListener('mouseleave', handleMouseLeave);

      charsRef.current.forEach((char, index) => {
        char.addEventListener("mousedown", function(e) {
          mouseInitialY = e.clientY;
          charIndexSelected = index;
          isMouseDown = true;
          body.classList.add("grab");
        });
      });

      return () => {
        body.removeEventListener('mouseup', handleMouseUp);
        body.removeEventListener('mousemove', handleMouseMove);
        body.removeEventListener('mouseleave', handleMouseLeave);
      };
    };

    const resize = () => {
      // Track character height for calculations
      if (txtRef.current) {
        const charH = txtRef.current.offsetHeight;
      }
    };

    // Initialize SplitText
    splitTextRef.current = new SplitText(txtRef.current, {
      type: "chars",
      charsClass: "char",
      position: "relative"
    });
    
    charsRef.current = document.querySelectorAll('.char');

    init();

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      if (splitTextRef.current) {
        splitTextRef.current.revert();
      }
    };
  }, []);

  return (
    <div 
      className="flex items-center min-h-screen justify-center w-full h-full bg-gray-700 font-['GT-Flexa'] text-white antialiased"
      style={{
        cursor: `url("data:image/svg+xml,%3Csvg width='64px' height='64px' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 700 700'%3E%3Cpath d='M419.99,560.0013c83.627,0,151.67-68.041,151.67-151.67v-198.33A46.6565,46.6565,0,0,0,499.047,171.22a46.6714,46.6714,0,0,0-70-23.3323,46.7853,46.7853,0,0,0-44.055-31.219,46.2641,46.2641,0,0,0-23.332,6.2773V46.669a46.668,46.668,0,1,0-93.336,0v272.79l-64.145-32.082a70.2983,70.2983,0,0,0-31.289-7.375,44.6638,44.6638,0,0,0-31.5,76.23l150.88,150.87A179.4167,179.4167,0,0,0,420,560ZM172.9,303.33a21.3182,21.3182,0,0,0-15.0035,36.379l150.9,150.88a156.058,156.058,0,0,0,111.18,46.082c70.77,0,128.36-57.562,128.36-128.33V210.001a23.332,23.332,0,1,0-46.664,0v58.332a11.668,11.668,0,0,1-23.336,0V186.669a23.332,23.332,0,1,0-46.664,0v81.668a11.668,11.668,0,0,1-23.336,0v-105a23.332,23.332,0,0,0-46.664,0v105a11.668,11.668,0,0,1-23.336,0V46.677a23.332,23.332,0,0,0-46.664,0v291.67a11.66,11.66,0,0,1-16.8712,10.43l-81.035-40.508a46.9273,46.9273,0,0,0-20.863-4.9258Z' transform='translate(0 -0.001)' fill='%23fff'/%3E%3Cpath d='M420,560a179.4167,179.4167,0,0,1-127.73-52.898L141.39,356.232a44.6638,44.6638,0,0,1,31.5-76.23,70.2983,70.2983,0,0,1,31.289,7.375l64.145,32.082V46.669a46.668,46.668,0,1,1,93.336,0v76.277a46.2641,46.2641,0,0,1,23.332-6.2773,46.7853,46.7853,0,0,1,44.055,31.219,46.6714,46.6714,0,0,1,70,23.3323A46.6565,46.6565,0,0,1,571.66,210.0013v198.33c0,83.629-68.043,151.67-151.67,151.67ZM172.9,303.33a21.3182,21.3182,0,0,0-15.0035,36.379l150.9,150.88a156.058,156.058,0,0,0,111.18,46.082c70.77,0,128.36-57.562,128.36-128.33V210.001a23.332,23.332,0,1,0-46.664,0v58.332a11.668,11.668,0,0,1-23.336,0V186.669a23.332,23.332,0,1,0-46.664,0v81.668a11.668,11.668,0,0,1-23.336,0v-105a23.332,23.332,0,0,0-46.664,0v105a11.668,11.668,0,0,1-23.336,0V46.677a23.332,23.332,0,0,0-46.664,0v291.67a11.66,11.66,0,0,1-16.8712,10.43l-81.035-40.508a46.9273,46.9273,0,0,0-20.863-4.9258Z' transform='translate(0 -0.001)'/%3E%3C/svg%3E%0A") 32 32, pointer`
      }}
    >
      <div 
        ref={stageRef}
        className="stage relative grid place-items-center w-full h-full invisible"
      >
        <div className="content text-center">
          <h1 
            ref={txtRef}
            className="txt text-[15vw] font-[600] leading-[0.6] tracking-[-1vw] select-none"
            style={{
              fontStretch: '150%',
              textShadow: '0 0.05em 0 #000000, 0 0.1em 0.1em rgba(70,0,35, 0.3), 0 0.4em 0.3em rgba(70,0,35, 0.1)'
            }}
          >
            WEBIER
          </h1>
        </div>
      </div>
    </div>
  );
};

export default TextDragAnimation;