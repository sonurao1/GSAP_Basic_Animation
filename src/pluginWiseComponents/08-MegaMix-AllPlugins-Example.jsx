// 09-Awwwards-Darkroom-Reel.jsx
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { Observer } from "gsap/Observer";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(
  ScrollTrigger,
  ScrollSmoother,
  SplitText,
  Flip,
  Draggable,
  InertiaPlugin,
  Observer,
  DrawSVGPlugin,
  MorphSVGPlugin,
  CustomEase,
  useGSAP
);

const C = {
  void: "#0A0908",
  safelight: "#E8491D",
  fixer: "#7FB69E",
  paper: "#F0EBE1",
  negative: "#3A3630",
};

const shots = [
  { id: 1, stamp: "24A" },
  { id: 2, stamp: "24B" },
  { id: 3, stamp: "24C", selected: true },
  { id: 4, stamp: "25A" },
  { id: 5, stamp: "25B" },
  { id: 6, stamp: "25C" },
];

const prints = Array.from({ length: 9 }, (_, i) => `#${i + 1}`);

export default function AwwwardsDarkroomReel() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const trackWrapRef = useRef(null);
  const [activeShot, setActiveShot] = useState(null);
  const [flipState, setFlipState] = useState(null);

  useGSAP(
    () => {
      CustomEase.create("snap", "M0,0 C0.24,0.75 0.44,1.13 1,1");

      gsap
        .timeline()
        .to(".aperture-blade", {
          morphSVG: "M60,10 a50,50 0 1,0 0.1,0 Z",
          duration: 0.6,
          ease: "power2.inOut",
        })
        .to(
          ".shutter-overlay",
          { clipPath: "circle(0% at 50% 50%)", duration: 0.9, ease: "snap" },
          "-=0.1"
        )
        .set(".shutter-overlay", { autoAlpha: 0, pointerEvents: "none" });

      const smoother =
        ScrollSmoother.get() ||
        ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1.3,
          effects: true,
        });

      let heroSplit;
      document.fonts.ready.then(() => {
        heroSplit = SplitText.create(".hero-title", {
          type: "chars",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.chars, {
              opacity: 0,
              yPercent: 120,
              rotateZ: 8,
              stagger: 0.02,
              duration: 0.9,
              ease: "power4.out",
              delay: 1.2,
            }),
        });
      });

      gsap.set(".grease-circle, .select-mark, .ripple", { drawSVG: "0%" });
      gsap.to(".grease-circle", { drawSVG: "100%", duration: 1, delay: 1.8, ease: "power2.inOut" });

      gsap.utils.toArray(".sheet-frame").forEach((frame, i) => {
        gsap.from(frame, {
          opacity: 0,
          y: 50,
          duration: 0.7,
          delay: i * 0.04,
          ease: "power3.out",
          scrollTrigger: { trigger: frame, start: "top 88%", toggleActions: "play none none reverse" },
        });
      });
      ScrollTrigger.create({
        trigger: ".select-mark",
        start: "top 80%",
        onEnter: () => gsap.to(".select-mark", { drawSVG: "100%", duration: 0.8, ease: "power2.inOut" }),
      });

      const track = trackRef.current;
      const wrap = trackWrapRef.current;
      const maxDrag = () => -(track.scrollWidth - wrap.offsetWidth);

      Draggable.get(track)?.kill();
      Draggable.create(track, {
        type: "x",
        inertia: true,
        // BUG FIX: Draggable's `bounds` needs real numbers, not functions —
        // { minX: () => maxDrag(), maxX: 0 } was silently ignored (a function
        // isn't a valid bound), so the strip could be dragged infinitely off-screen.
        // Passing the wrapper element lets Draggable measure the real, live
        // scrollable range itself — same pattern as GSAP's own gallery demos.
        bounds: wrap,
        edgeResistance: 0.7,
        cursor: "grab",
        activeCursor: "grabbing",
      });

      Observer.create({
        target: wrap,
        // BUG FIX: "wheel,touch" made Observer handle touch drags on `wrap` at the
        // same time Draggable was already handling touch drags on the nested `track`
        // — two systems fighting over the same gesture caused jittery double-movement
        // on mobile. Touch is Draggable's job here, so Observer only needs "wheel".
        type: "wheel",
        // BUG FIX: without this, wheeling over the section also triggered
        // ScrollSmoother's normal vertical page scroll at the same time as this
        // horizontal conversion, so the two visibly fought each other.
        preventDefault: true,
        onChangeY: (self) => {
          const current = gsap.getProperty(track, "x");
          const next = gsap.utils.clamp(maxDrag(), 0, current - self.deltaY);
          gsap.to(track, { x: next, duration: 0.5, ease: "power3.out", overwrite: "auto" });
        },
      });

      gsap.to(".hang-print", {
        rotation: "+=2",
        duration: 2.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.4, from: "random" },
      });

      gsap
        .timeline({ scrollTrigger: { trigger: ".developing-section", start: "top 65%" } })
        .to(".ripple", { drawSVG: "100%", duration: 1, stagger: 0.25, ease: "power2.out" })
        .to(".developing-image", { clipPath: "circle(75% at 50% 50%)", duration: 1.4, ease: "power2.inOut" }, "-=0.6")
        .to(".developing-text", { opacity: 1, y: -10, duration: 1 }, "-=0.5");

      return () => {
        smoother.kill();
        heroSplit?.revert();
      };
    },
    { scope: containerRef }
  );

  const openShot = (id, el) => {
    setFlipState(Flip.getState(el));
    setActiveShot(id);
  };
  const closeShot = () => setActiveShot(null);

  useGSAP(
    () => {
      if (activeShot !== null && flipState) {
        // BUG FIX: wrapping this in requestAnimationFrame delayed it by a frame,
        // so the browser could paint ".loupe-panel" at its final full-screen layout
        // for one frame *before* Flip snapped it back to the thumbnail's captured
        // position to animate from — a visible flash. useGSAP already runs
        // synchronously before paint (like useLayoutEffect), so call it directly.
        Flip.from(flipState, { targets: ".loupe-panel", duration: 0.6, ease: "power2.inOut", absolute: true });
      }
    },
    { dependencies: [activeShot, flipState] }
  );

  const ctaEnter = (e) =>
    gsap.to(e.currentTarget, { scale: 1.05, borderColor: C.safelight, color: C.safelight, duration: 0.4, ease: "snap" });
  const ctaLeave = (e) =>
    gsap.to(e.currentTarget, { scale: 1, borderColor: C.fixer, color: C.fixer, duration: 0.4, ease: "snap" });

  return (
    <div ref={containerRef} className="relative">
      <svg className="fixed inset-0 w-full h-full pointer-events-none z-[70] opacity-[0.05] mix-blend-overlay">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      <div
        className="shutter-overlay fixed inset-0 z-[100] flex items-center justify-center"
        style={{ background: C.void, clipPath: "circle(150% at 50% 50%)" }}
      >
        <svg width="120" height="120" viewBox="0 0 120 120">
          <path
            className="aperture-blade"
            d="M110,60 L85,103.3 L35,103.3 L10,60 L35,16.7 L85,16.7 Z"
            fill="none"
            stroke={C.safelight}
            strokeWidth="2"
          />
        </svg>
      </div>

      {activeShot !== null && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center" style={{ background: `${C.void}f7` }}>
          <div
            className="loupe-panel relative w-[82vw] h-[82vh] flex items-center justify-center border-2"
            style={{ background: C.negative, borderColor: C.safelight }}
          >
            <div className="absolute top-4 left-4 font-mono text-[10px] tracking-widest" style={{ color: `${C.paper}99` }}>
              FRAME {shots.find((s) => s.id === activeShot)?.stamp}
            </div>
            <div className="absolute bottom-4 right-4 font-mono text-[10px] tracking-widest" style={{ color: `${C.paper}99` }}>
              f/2.8 · 1/125 · ISO 400
            </div>
            <span className="text-3xl font-black uppercase tracking-tight" style={{ color: `${C.paper}4d` }}>
              Negative
            </span>
          </div>
          <button
            onClick={closeShot}
            className="absolute top-8 right-8 font-mono text-xs tracking-widest hover:opacity-100"
            style={{ color: `${C.paper}b3` }}
          >
            CLOSE ✕
          </button>
        </div>
      )}

      <div id="smooth-wrapper">
        <div id="smooth-content" style={{ background: C.void, color: C.paper }}>
          <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6">
            <div
              data-speed="0.6"
              className="absolute inset-0 opacity-40"
              style={{ background: `radial-gradient(circle at 50% 40%, ${C.negative}, ${C.void} 70%)` }}
            />
            <p className="relative font-mono text-xs tracking-[0.3em] mb-4" style={{ color: C.safelight }}>
              ROLL NO. 24 — DARKROOM SESSION
            </p>
            <h1 className="hero-title relative text-center text-[13vw] md:text-[7rem] font-black uppercase tracking-tighter leading-[0.9]">
              Nick Verma
            </h1>
            <div className="relative mt-3">
              <span className="relative inline-block px-3 font-mono text-sm tracking-widest" style={{ color: `${C.paper}b3` }}>
                Photographer
                <svg className="absolute -inset-3 w-[calc(100%+24px)] h-[calc(100%+24px)]" viewBox="0 0 140 70">
                  <path
                    className="grease-circle"
                    d="M10,40 C10,15 40,5 75,8 C110,11 135,25 130,45 C125,65 95,72 60,70 C25,68 10,62 10,40 Z"
                    fill="none"
                    stroke={C.safelight}
                    strokeWidth="2"
                  />
                </svg>
              </span>
            </div>
            <button
              onMouseEnter={ctaEnter}
              onMouseLeave={ctaLeave}
              className="mt-12 px-8 py-3 border font-mono text-xs uppercase tracking-widest"
              style={{ borderColor: C.fixer, color: C.fixer }}
            >
              Enter the Darkroom
            </button>
          </section>

          <section className="py-28 px-6 md:px-16 max-w-5xl mx-auto">
            <p className="font-mono text-xs tracking-[0.3em] mb-8" style={{ color: `${C.paper}80` }}>
              CONTACT SHEET — SELECTS MARKED
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {shots.map((s) => (
                <div
                  key={s.id}
                  onClick={(e) => openShot(s.id, e.currentTarget)}
                  // BUG FIX: this div opens the loupe on click but had no keyboard
                  // or a11y affordance at all — keyboard/screen-reader users could
                  // never trigger it. role + tabIndex + onKeyDown make it a real
                  // interactive control (Enter/Space activation).
                  role="button"
                  tabIndex={0}
                  aria-label={`Open frame ${s.stamp}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openShot(s.id, e.currentTarget);
                    }
                  }}
                  className="sheet-frame relative aspect-[3/2] cursor-zoom-in"
                  style={{ background: C.negative }}
                >
                  <div className="absolute -top-1 left-0 right-0 flex justify-between px-2">
                    {Array.from({ length: 6 }).map((_, k) => (
                      <span key={k} className="w-1.5 h-1.5 rounded-full" style={{ background: C.void }} />
                    ))}
                  </div>
                  <span
                    className="absolute bottom-1.5 left-2 font-mono text-[10px]"
                    style={{ color: `${C.paper}80` }}
                  >
                    {s.stamp}
                  </span>
                  {s.selected && (
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 66">
                      <ellipse
                        className="select-mark"
                        cx="50"
                        cy="33"
                        rx="42"
                        ry="26"
                        fill="none"
                        stroke={C.safelight}
                        strokeWidth="2"
                      />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="py-28 relative">
            <p className="text-center font-mono text-xs tracking-[0.3em] mb-10" style={{ color: `${C.paper}80` }}>
              DRYING LINE — DRAG, OR SCROLL WITH YOUR WHEEL
            </p>
            <div ref={trackWrapRef} className="overflow-hidden px-10">
              <div className="h-px mb-6" style={{ background: `${C.paper}33` }} />
              <div ref={trackRef} className="flex gap-10 w-max cursor-grab">
                {prints.map((p, i) => (
                  <div
                    key={p}
                    className="hang-print relative w-40 h-52 flex-shrink-0 shadow-lg"
                    style={{ background: C.paper, transform: `rotate(${((i % 3) - 1) * 3}deg)` }}
                  >
                    <div
                      className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-2 rounded-sm"
                      style={{ background: C.safelight }}
                    />
                    <div
                      className="w-full h-full flex items-center justify-center font-mono text-[10px]"
                      style={{ color: C.negative }}
                    >
                      {p}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="developing-section py-32 flex flex-col items-center px-6">
            <div className="relative w-[70vw] max-w-md aspect-[4/5]">
              <svg className="absolute inset-0 w-full h-full z-10" viewBox="0 0 100 100">
                <circle className="ripple" cx="50" cy="50" r="15" fill="none" stroke={C.fixer} strokeWidth="0.5" />
                <circle className="ripple" cx="50" cy="50" r="30" fill="none" stroke={C.fixer} strokeWidth="0.5" />
                <circle className="ripple" cx="50" cy="50" r="45" fill="none" stroke={C.fixer} strokeWidth="0.5" />
              </svg>
              <div
                className="developing-image absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${C.negative}, ${C.void} 60%, ${C.negative})`,
                  clipPath: "circle(0% at 50% 50%)",
                }}
              />
            </div>
            <p
              className="developing-text mt-10 font-mono text-sm tracking-widest text-center opacity-0"
              style={{ color: `${C.paper}b3` }}
            >
              Every print begins in darkness.
            </p>
          </section>

          <section className="h-[30vh]" />
        </div>
      </div>
    </div>
  );
}