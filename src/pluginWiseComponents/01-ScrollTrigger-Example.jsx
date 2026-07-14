// 01-ScrollTrigger-Example.jsx
//
// GSAP PLUGIN: ScrollTrigger
// ---------------------------------------------------------------
// KAAM KYA HAI: ScrollTrigger scroll position ko ek "remote control"
// bana deta hai — scroll karte hi kisi bhi tween/timeline ko play,
// reverse, ya scrub (seedha scrollbar se link) kiya ja sakta hai.
//
// YAHAN KYA DIKHAYA GAYA HAI:
// 1) "Reveal on scroll" — photo cards fade+slide in jab viewport mein
//    enter karte hain (sabse common real-world use case).
// 2) Ek PINNED section — scroll section ko "lock" kar deta hai jab tak
//    ek manifesto text scrub hoke poora nikal na jaaye, bilkul
//    awwwards-style case-study section jaisa.
//
// INSTALL: npm install gsap @gsap/react
// ---------------------------------------------------------------
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// ---------------------------------------------------------
// Register GSAP plugins once.
// ---------------------------------------------------------
gsap.registerPlugin(ScrollTrigger, useGSAP);

// ---------------------------------------------------------
// Dummy data
// ---------------------------------------------------------
const photos = [
  { id: 1, label: "Frame 01 — Golden Hour" },
  { id: 2, label: "Frame 02 — Backstage" },
  { id: 3, label: "Frame 03 — Candid" },
  { id: 4, label: "Frame 04 — Portrait" },
];

export default function ScrollTriggerExample() {
  // Root container
  const containerRef = useRef(null);

  // Section refs
  const cardsSectionRef = useRef(null);
  const pinSectionRef = useRef(null);
  const manifestoRef = useRef(null);

  useGSAP(
    () => {
      // -----------------------------------------------------
      // Grab all reveal cards inside this component.
      // -----------------------------------------------------
      const cards = gsap.utils.toArray(".reveal-card");

      // -----------------------------------------------------
      // Reveal Cards
      //
      // Every card gets its own ScrollTrigger.
      // This allows reverse animation while scrolling up.
      // -----------------------------------------------------
      cards.forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          y: 80,
          scale: 0.95,

          duration: 0.9,

          ease: "power3.out",

          delay: index * 0.05,

          scrollTrigger: {
            trigger: card,

            start: "top 85%",

            toggleActions: "play none none reverse",

            invalidateOnRefresh: true,

            // markers:true
          },
        });
      });

      // -----------------------------------------------------
      // Horizontal Manifesto Scroll
      // -----------------------------------------------------

      const manifesto = manifestoRef.current;

      const calculateDistance = () => {
        return -(manifesto.scrollWidth - window.innerWidth + 80);
      };

      gsap.to(manifesto, {
        x: calculateDistance,

        ease: "none",

        scrollTrigger: {
          trigger: pinSectionRef.current,

          start: "top top",

          end: () => "+=" + manifesto.scrollWidth,

          scrub: true,

          pin: true,

          anticipatePin: 1,

          invalidateOnRefresh: true,

          // markers:true
        },
      });
    },

    {
      scope: containerRef,
    }
  );


return (
  <div ref={containerRef} className="bg-zinc-950 text-zinc-100">
    {/* =====================================================
        PHOTO GRID
        ===================================================== */}
    <section
      ref={cardsSectionRef}
      className="max-w-5xl mx-auto px-6 py-20"
    >
      <div className="mb-14 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-amber-500">
          Portfolio
        </p>

        <h2 className="mt-3 text-4xl md:text-5xl font-bold">
          Featured Frames
        </h2>

        <p className="mt-5 text-zinc-400 max-w-xl mx-auto">
          Every frame tells a different story. Scroll down to reveal every
          photograph individually.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        {photos.map((photo) => (
          <article
            key={photo.id}
            className="reveal-card group aspect-[4/5] rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900"
          >
            {/* Image Placeholder */}
            <div className="h-full relative">

              <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900" />

              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />

              <div className="absolute bottom-0 left-0 right-0 p-6">

                <p className="text-xs uppercase tracking-[0.35em] text-amber-500">
                  Photography
                </p>

                <h3 className="mt-3 text-xl font-semibold">
                  {photo.label}
                </h3>

              </div>

            </div>
          </article>
        ))}
      </div>
    </section>

    {/* =====================================================
        PINNED SECTION
        ===================================================== */}
    <section
      ref={pinSectionRef}
      className="relative h-screen overflow-hidden flex items-center bg-black"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-black to-zinc-950" />

      <h2
        ref={manifestoRef}
        className="relative whitespace-nowrap text-[9vw] md:text-[7vw] font-black uppercase tracking-tight px-10"
      >
        Every frame tells a story — Every scroll reveals another chapter —
        Every frame tells a story — Every scroll reveals another chapter —
      </h2>
    </section>

    {/* =====================================================
        END SECTION
        ===================================================== */}
    <section className="h-[50vh] flex flex-col items-center justify-center">
      <p className="text-3xl font-bold">
        Thanks for Scrolling
      </p>

      <p className="mt-4 text-zinc-500">
        GSAP ScrollTrigger Demo Complete
      </p>
    </section>
  </div>
);
}
