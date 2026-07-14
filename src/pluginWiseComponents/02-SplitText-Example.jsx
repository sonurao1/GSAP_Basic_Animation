// 02-SplitText-Example.jsx
//
// GSAP PLUGIN: SplitText
// ---------------------------------------------------------------
// KAAM KYA HAI: Text ko characters / words / lines mein todta hai,
// taaki har piece ko ALAG SE animate kar sako (jaise letters ek-ek
// karke fade-in hote hain).
//
// GSAP 3.13+ mein ye 100% FREE hai + naya "autoSplit" option deta hai
// jo window resize hone par text ko dobara split kar deta hai —
// responsive text ke liye zaruri, warna resize pe layout tut sakta hai.
//
// INSTALL: npm install gsap @gsap/react
// ---------------------------------------------------------------

import { useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

/* ==========================================================
   Register GSAP Plugins
   ========================================================== */

gsap.registerPlugin(
  SplitText,
  ScrollTrigger,
  useGSAP
);

export default function SplitTextExample() {

  /* ==========================================================
     Refs
     ========================================================== */

  const containerRef = useRef(null);

  const heroRef = useRef(null);

  const paraRef = useRef(null);

  useGSAP(() => {

    /* ==========================================================
       Accessibility

       Respect user's reduced motion preference.
       ========================================================== */

    if (
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    ) {
      return;
    }

    /* ==========================================================
       Store every SplitText instance so cleanup
       becomes extremely easy.
       ========================================================== */

    const splitInstances = [];

    /* ==========================================================
       Wait until custom fonts are loaded.

       Otherwise SplitText calculates wrong
       character positions.
       ========================================================== */

    const initializeAnimations = () => {

      /* ======================================================
         HERO TITLE
         ====================================================== */

      const heroSplit = SplitText.create(
        heroRef.current,
        {

          type: "chars",

          autoSplit: true,

          onSplit(self) {

            return gsap.from(self.chars, {

              opacity: 0,

              y: 45,

              rotateX: -90,

              transformOrigin:
                "50% 50% -40",

              stagger: 0.03,

              duration: 0.8,

              ease: "back.out(1.7)",

              overwrite: "auto",

            });

          },

        }
      );

      splitInstances.push(heroSplit);

      /* ======================================================
         PARAGRAPH
         ====================================================== */

      const paraSplit = SplitText.create(
        paraRef.current,
        {

          type: "lines",

          mask: "lines",

          autoSplit: true,

          onSplit(self) {

            return gsap.from(self.lines, {

              yPercent: 120,

              opacity: 0,

              stagger: 0.08,

              duration: 1,

              ease: "power4.out",

              overwrite: "auto",

              scrollTrigger: {

                trigger: paraRef.current,

                start: "top 80%",

                once: true,

              },

            });

          },

        }
      );

      splitInstances.push(paraSplit);

      /* ===============================================
         Refresh ScrollTrigger after splitting.
         =============================================== */

      ScrollTrigger.refresh();

    };

    /* ==========================================================
       Font Loading
       ========================================================== */

    if (document.fonts?.ready) {

      document.fonts.ready.then(() => {

        initializeAnimations();

      });

    }

    else {

      initializeAnimations();

    }

    /* ==========================================================
       Cleanup
       ========================================================== */

    return () => {

      splitInstances.forEach((instance) => {

        instance.revert();

      });

    };

  }, {

    scope: containerRef,

  });


return (
  <div
    ref={containerRef}
    className="bg-zinc-950 text-zinc-100 min-h-screen"
  >
    {/* ======================================================
        Hero Section
        ====================================================== */}

    <section className="max-w-6xl mx-auto px-8 pt-24">

      <p className="uppercase tracking-[0.4em] text-amber-500 text-sm">
        SplitText Demo
      </p>

      <h1
        ref={heroRef}
        className="
          mt-6
          text-5xl
          md:text-7xl
          font-black
          uppercase
          tracking-tight
          leading-[0.9]
        "
      >
        Nick Verma
        <br />
        Photographer
      </h1>

    </section>

    {/* ======================================================
        About Section
        ====================================================== */}

    <section className="max-w-3xl mx-auto px-8 py-40">

      <p
        ref={paraRef}
        className="
          text-lg
          md:text-xl
          leading-relaxed
          text-zinc-400
        "
      >
        Every photograph is a negotiation between light and
        patience. I chase the moment before it knows it's
        being watched, and I print it exactly as it felt—
        nothing added, nothing apologized for.

        <br />
        <br />

        Every portrait carries a hidden conversation between
        the photographer and the subject. SplitText allows
        every line, word and character to become its own
        animated element, making storytelling feel more
        cinematic and engaging.
      </p>

    </section>

    {/* ======================================================
        Spacer
        ====================================================== */}

    <section className="h-screen flex items-center justify-center">

      <div className="text-center">

        <p className="text-3xl font-bold">
          SplitText Animation Finished
        </p>

        <p className="mt-5 text-zinc-500">
          Scroll back up to see the line reveal again.
        </p>

      </div>

    </section>

  </div>
);
}
