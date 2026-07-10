import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function ScrollTriggerComponent() {
  const containerRef = useRef();

  useGSAP(
    () => {
      const paras = gsap.utils.toArray(".para");

      paras.forEach((para, index) => {
        gsap.from(para, {
          opacity: 0,
          x: index % 2 === 0 ? -100 : 100,
          y: 100,
          duration: 0.8,
          ease: "back.out(1.7)",

          scrollTrigger: {
            trigger: para,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
            markers: true,
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <>
    <div
      ref={containerRef}
      className="flex flex-col w-full min-h-screen justify-center items-center border-8 border-blue-900 gap-10"
    >
      <p className="para p-4 text-2xl border rounded bg-gray-900 overflow-hidden">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, fugit.
      </p>

      <p className="para p-4 text-2xl border rounded bg-gray-900 overflow-hidden">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, fugit.
      </p>

      <p className="para p-4 text-2xl border rounded bg-gray-900 overflow-hidden">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, fugit.
      </p>

      <p className="para p-4 text-2xl border rounded bg-gray-900 overflow-hidden">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, fugit.
      </p>

      <p className="para p-4 text-2xl border rounded bg-gray-900 overflow-hidden">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, fugit.
      </p>
    </div>
    <div className="w-full h-[100vh]">

    </div>
    </>
    
  );
}

export default ScrollTriggerComponent;