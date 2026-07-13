import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

function TextAnimationHorizontalV2() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(
    () => {
      // Split heading into words
      const split = SplitText.create(textRef.current, {
        type: "words",
        mask: "words",
      });


      // Calculate horizontal movement
      const getDistance = () => {
        return (
          trackRef.current.scrollWidth -
          sectionRef.current.offsetWidth +
          300 // extra space for the last word
        );
      };


      // Horizontal scrolling animation
      const horizontalTween = gsap.to(trackRef.current, {
        x: () => -getDistance(),
        ease: "none",

        scrollTrigger: {
          trigger: sectionRef.current,

          start: "top top",

          end: () => `+=${getDistance()}`,

          pin: true,

          scrub: 1,

          invalidateOnRefresh: true,

          // Uncomment to debug
          // markers: true,
        },
      });


      // Animate each word when it enters viewport
      split.words.forEach((word) => {
        gsap.from(word, {
          opacity: 0,
          yPercent: 100,

          ease: "power3.out",

          scrollTrigger: {
            trigger: word,

            // Connect to horizontal movement
            containerAnimation: horizontalTween,

            start: "left 80%",
            end: "left 50%",

            scrub: true,

            // Uncomment for debugging
            // markers: true,
          },
        });
      });


      // Cleanup
      return () => {
        split.revert();

        ScrollTrigger.getAll().forEach((trigger) => {
          trigger.kill();
        });
      };
    },
    {
      scope: sectionRef,
    }
  );


  return (
    <>
      <section
        ref={sectionRef}
        className="
          h-screen
          w-full
          overflow-hidden
          flex
          items-center
          bg-black
        "
      >

        {/* Horizontal moving track */}
        <div
          ref={trackRef}
          className="
            flex
            w-max
            pr-[300px]
          "
        >

          <h1
            ref={textRef}
            className="
              whitespace-nowrap
              text-7xl
              font-bold
              text-white
              px-10
            "
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quisquam quod. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quisquam quod. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Quisquam quod.
          </h1>

        </div>

      </section>


      {/* Content after horizontal section */}
      <section className="h-screen bg-gray-200">
      </section>
    </>
  );
}

export default TextAnimationHorizontalV2;