import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Data ko component ke bahar rakha — agar panel add/remove karna ho,
// bas is array ko badlo, code kahi aur chhedne ki zaroorat nahi
const panels = [
  { num: "01", label: "Branding" },
  { num: "02", label: "Motion" },
  { num: "03", label: "Presentations" },
  { num: "04", label: "Templates" },
];

// Problem yeh solve karta hai: NORMAL scroll vertical hota hai, lekin
// portfolio/gallery sections aksar HORIZONTAL feel dena chahte hain —
// yehi wo classic "Awwwards" trick hai.
function ScrollHorizontalGallery() {
  const containerRef = useRef(); // pin hone wala outer wrapper
  const trackRef = useRef(); // panels wali lambi horizontal strip

  useGSAP(
    () => {
      // GENERAL FORMULA (vanilla JS wale example mein yeh hardcoded -75 tha,
      // yaha panels.length se khud calculate hota hai — agar kal panels
      // badhaye/ghataye, yeh apne aap sahi rahega):
      //
      // Track ki width = panels.length * 100% (of container)
      // Hume track ko left shift karna hai (panels.length - 1) container-widths jitna,
      // taaki AAKHRI panel bhi screen pe dikh jaaye.
      // xPercent track ki APNI width ke against percentage leta hai, isliye:
      const shiftPercent = -100 * ((panels.length - 1) / panels.length);
      // 4 panels ke liye: -100 * (3/4) = -75 (bilkul wahi jo pehle hardcoded tha)

      gsap.to(trackRef.current, {
        xPercent: shiftPercent,
        ease: "none", // scrub ke sath hamesha "none"
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=3000", // lambi scroll range — jitne zyada panels, utni
                          // zyada range chahiye hogi (feel free to tweak)
          pin: true,
          scrub: 1,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="w-full h-[100vh] overflow-hidden relative"
    >
      {/* track ki total width = panels.length * 100% — 4 panels = 400% */}
      <div
        ref={trackRef}
        className="flex h-full"
        style={{ width: `${panels.length * 100}%` }}
      >
        {panels.map((panel, i) => (
          <div
            key={panel.num}
            // har panel ki width = track ka (1 / panels.length) hissa
            style={{ width: `${100 / panels.length}%` }}
            className={`h-full flex flex-col items-center justify-center ${
              i % 2 === 0 ? "bg-zinc-900" : "bg-zinc-950"
            }`}
          >
            <span className="text-7xl font-extrabold text-zinc-700">
              {panel.num}
            </span>
            <span className="text-sm font-mono text-zinc-400 mt-2">
              {panel.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ScrollHorizontalGallery;
