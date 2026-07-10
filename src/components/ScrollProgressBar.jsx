import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Problem yeh solve karta hai: user ko batana ki poore PAGE mein se
// kitna padh/scroll liya hai — bilkul blog/article sites jaisa.
function ScrollProgressBar() {
  const fillRef = useRef(); // progress bar ka "fill" hissa — yehi grow hoga

  useGSAP(() => {
    // Initial state set kar do
    gsap.set(fillRef.current, {
      scaleX: 0,
      transformOrigin: "left center",
    });

    gsap.to(fillRef.current, {
      scaleX: 1, // 0 se 1 tak grow karega (100% scale)
      ease: "none", // scrub ke sath hamesha "none" — scroll khud hi
                    // apna curve bana raha hai, alag se ease lagaoge
                    // to jerky/laggy feel aayega

      scrollTrigger: {
        // NOTICE:
        // Trigger dene ki zarurat nahi hai kyunki
        // hume poore page ka scroll progress track karna hai.

        start: 0,

        // "max" = browser ka maximum scroll distance.
        // Ye Lenis aur normal scrolling dono ke saath
        // bahut reliable hota hai.
        end: "max",

        // Animation ko scrollbar ke saath 1:1 connect kar do
        scrub: true,
      },
    });
  }, []); // empty dependency array — sirf ek baar mount pe chalega

  return (
    // position: fixed isliye taaki bar khud scroll ke sath na hile,
    // hamesha screen ke top pe chipka rahe
    <div className="fixed top-0 left-0 right-0 h-1 bg-zinc-800 z-[9999]">
      {/* Shuru mein GSAP scaleX = 0 set karega,
          phir scroll ke saath 1 tak le jayega */}
      <div
        ref={fillRef}
        className="h-full w-full bg-orange-500"
      />
    </div>
  );
}

export default ScrollProgressBar;