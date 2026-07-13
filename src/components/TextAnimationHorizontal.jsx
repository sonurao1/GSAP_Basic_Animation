import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// Register GSAP plugins
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

function TextAnimationHorizontal() {
  // Ref for the section that will trigger the animation
  const headingContainerRef = useRef(null);

  useGSAP(
    () => {
      // Split the heading into individual characters
      const split = SplitText.create(".headingText", {
        type: "chars",
        mask: "chars", // wraps each char in an overflow:hidden container
      });

      // Animate ALL characters together.
      // GSAP automatically animates them one after another using `stagger`.
      gsap.from(split.chars, {
        opacity: 0,

        // Even chars come from top, odd chars come from bottom
        yPercent: (index) => (index % 2 === 0 ? -100 : 100),

        duration: 0.8,

        // Delay between each character
        stagger: 0.2,
        rotate: (index) => (index % 2 === 0 ? -90 : 90),

        // ease: "elastic.inOut",

        scrollTrigger: {
          trigger: headingContainerRef.current,
          start: "top 70%", // animation starts when top reaches 70% of viewport
          end: "bottom center",

          // Remove this if you want the animation to play only once
          scrub: true,

          // Uncomment for debugging
          // markers: true,
        },
      });

      // Restore original HTML when component unmounts
      return () => {
        split.revert();
      };
    },
    {
      scope: headingContainerRef,
    }
  );

  return (
   <>
    <div
      ref={headingContainerRef}
      className="w-full h-screen flex items-center overflow-hidden px-10"
    >
      <h1 className="headingText text-6xl font-bold tracking-wide">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
        quod. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Quisquam, quod.
      </h1>
    </div>
    <div className="h-[50vh] w-full"></div>
   </>
  );
}

export default TextAnimationHorizontal;