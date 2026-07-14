// 03-Flip-Example.jsx
//
// GSAP PLUGIN: Flip
// ---------------------------------------------------------------
// KAAM KYA HAI: Flip = "First, Last, Invert, Play". Ye kisi bhi
// LAYOUT CHANGE ko automatically animate kar deta hai — tumhe khud
// x/y/scale calculate nahi karna padta. Bas "state before" record
// karo, DOM/CSS change karo, phir Flip.from() bula do.
//
// Ye tumhare NickPortfolio ke "contact sheet → fullscreen image" jaisa
// exact use-case ke liye perfect plugin hai.
//
// ⚠️ IMPORTANT PATTERN: Flip usi DOM element ko ek layout se doosre
// layout mein "move" hote hue animate karta hai. Isliye grid mein
// SAB shots hamesha mounted rehte hain — hum sirf CSS classes toggle
// karte hain (grid-position vs fullscreen-position), naya element
// create/destroy nahi karte. Yahi trick Flip ko reliably kaam karati hai.
//
// INSTALL: npm install gsap @gsap/react
// ---------------------------------------------------------------

import { useRef, useState, useEffect } from "react";
import { flushSync } from "react-dom";

import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(Flip, useGSAP);

/* ==========================================================
   Demo Data
   ========================================================== */

const shots = Array.from({ length: 6 }, (_, index) => ({
  id: index + 1,
  label: `Frame 0${index + 1}`,
}));

export default function FlipExample() {

  /* ==========================================================
     Refs
     ========================================================== */

  const containerRef = useRef(null);

  const gridRef = useRef(null);

  const overlayRef = useRef(null);

  /* ==========================================================
     State
     ========================================================== */

  const [activeId, setActiveId] = useState(null);

  /* ==========================================================
     Toggle Grid <-> Fullscreen

     Flip needs

     1. Capture current layout
     2. Update React state
     3. Animate difference
     ========================================================== */

  const toggleShot = (id) => {

    const state = Flip.getState(
      gridRef.current.querySelectorAll(".shot")
    );

    flushSync(() => {

      setActiveId((current) =>
        current === id ? null : id
      );

    });

    Flip.from(state, {

      duration: 0.7,

      ease: "power3.inOut",

      absolute: true,

      nested: true,

      simple: true,

      prune: true,

      onEnter(elements) {

        gsap.fromTo(
          elements,
          {
            opacity: 0,
            scale: 0.95,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.35,
          }
        );

      },

      onLeave(elements) {

        gsap.to(elements, {

          opacity: 0,

          duration: 0.25,

        });

      },

    });

  };

  /* ==========================================================
     ESC closes fullscreen
     ========================================================== */

  useEffect(() => {

    const handleKeyDown = (event) => {

      if (event.key === "Escape" && activeId !== null) {

        toggleShot(activeId);

      }

    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

    };

  }, [activeId]);

  /* ==========================================================
     Entrance Animation
     ========================================================== */

  useGSAP(() => {

    gsap.from(".shot", {

      opacity: 0,

      scale: 0.8,

      y: 40,

      duration: 0.8,

      stagger: 0.08,

      ease: "power3.out",

    });

  }, {
    scope: containerRef,
  });


  useGSAP(() => {}, { scope: containerRef }); // reserved — future entrance animation ke liye

  return (
  <div
    ref={containerRef}
    className="min-h-screen bg-zinc-950 text-zinc-100 overflow-hidden"
  >
    {/* ==========================================================
        Dark Overlay
        Appears only when a frame is opened.
        ========================================================== */}

    <div
      ref={overlayRef}
      onClick={() => activeId !== null && toggleShot(activeId)}
      className={`
        fixed inset-0 z-40
        transition-all duration-500
        ${
          activeId !== null
            ? "opacity-100 pointer-events-auto bg-black/90 backdrop-blur-md"
            : "opacity-0 pointer-events-none"
        }
      `}
    />

    {/* ==========================================================
        Header
        ========================================================== */}

    <header className="max-w-6xl mx-auto px-8 pt-16 pb-12">

      <p className="uppercase tracking-[0.45em] text-amber-500 text-xs">
        GSAP Flip Plugin
      </p>

      <h1 className="mt-5 text-5xl md:text-7xl font-black tracking-tight">
        Contact Sheet
      </h1>

      <p className="mt-5 max-w-2xl text-zinc-400 leading-relaxed">
        Flip automatically animates layout changes. Click any frame to
        transform it into a fullscreen preview without manually calculating
        position, scale or size.
      </p>

    </header>

    {/* ==========================================================
        Contact Sheet Grid
        ========================================================== */}

    <section
      ref={gridRef}
      className="relative max-w-6xl mx-auto px-8 pb-24"
    >

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">

        {shots.map((shot) => {

          const isActive = activeId === shot.id;

          return (

            <article
              key={shot.id}
              onClick={() => toggleShot(shot.id)}
              className={`
                shot
                overflow-hidden
                rounded-2xl
                cursor-pointer
                select-none
                transition-shadow
                duration-300

                ${
                  isActive
                    ? `
                      fixed
                      inset-0
                      z-50
                      m-auto
                      w-[90vw]
                      h-[85vh]
                      max-w-6xl
                    `
                    : `
                      aspect-[4/5]
                    `
                }
              `}
            >

              <div
                className={`
                  h-full
                  rounded-2xl
                  border

                  ${
                    isActive
                      ? "border-amber-500 bg-zinc-900 shadow-2xl"
                      : "border-zinc-800 bg-zinc-900 hover:border-amber-500"
                  }

                  transition-all duration-300
                `}
              >

                {/* Fake Image */}

                <div className="relative h-full">

                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black" />

                  <div className="absolute inset-0 bg-black/20" />

                  {/* Label */}

                  <div className="absolute bottom-0 left-0 right-0 p-6">

                    <p className="uppercase tracking-[0.35em] text-amber-500 text-xs">
                      Photography
                    </p>

                    <h2
                      className={`
                        mt-3
                        font-bold

                        ${
                          isActive
                            ? "text-4xl"
                            : "text-lg"
                        }
                      `}
                    >
                      {shot.label}
                    </h2>

                    {isActive && (

                      <p className="mt-5 max-w-xl text-zinc-300 leading-relaxed">

                        This layout transition is powered entirely by GSAP
                        Flip. Notice that React only changes the layout
                        classes—Flip calculates every transform
                        automatically and animates between both states.

                      </p>

                    )}

                  </div>

                </div>

              </div>

            </article>

          );

        })}

      </div>

    </section>

    {/* ==========================================================
        Footer
        ========================================================== */}

    <footer className="pb-24 text-center">

      <p className="text-zinc-500">
        Click any frame to open. Press ESC or click outside to close.
      </p>

    </footer>

  </div>
);

}

