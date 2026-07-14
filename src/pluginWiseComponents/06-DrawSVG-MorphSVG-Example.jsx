// 06-DrawSVG-MorphSVG-Example.jsx
//
// GSAP PLUGINS: DrawSVG + MorphSVG
// ---------------------------------------------------------------
// DrawSVG  — kisi bhi SVG line/path ko "hand-drawn" style mein reveal
//            karta hai (0% se 100% tak stroke dikhata hai).
// MorphSVG — do ALAG SHAPES ke beech smoothly morph karta hai (chahe
//            unke points ki count match na ho, plugin khud handle
//            kar leta hai).
//
// INSTALL: npm install gsap @gsap/react
// ---------------------------------------------------------------

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(DrawSVGPlugin, MorphSVGPlugin, useGSAP);

export default function DrawMorphExample() {
  const containerRef = useRef(null);
  const [isCircle, setIsCircle] = useState(true);

  useGSAP(
    () => {
      // --- DrawSVG: logo ke neeche underline "hand-drawn" reveal on load ---
      gsap.set(".logo-underline", { drawSVG: "0%" }); // shuru mein path invisible
      gsap.to(".logo-underline", {
        drawSVG: "100%", // pura path draw ho jaata hai
        duration: 1.2,
        delay: 0.3,
        ease: "power2.inOut",
      });
    },
    { scope: containerRef }
  );

  const handleMorph = () => {
    // --- MorphSVG: click pe circle <-> star shape morph ---
    gsap.to(".morph-shape", {
      morphSVG: isCircle ? "#starPath" : "#circlePath",
      duration: 0.8,
      ease: "power2.inOut",
    });
    setIsCircle((v) => !v);
  };

  return (
    <div ref={containerRef} className="bg-zinc-950 text-zinc-100 p-16 flex flex-col items-center gap-16">
      {/* --- DrawSVG demo: underline under heading --- */}
      <div className="relative">
        <h2 className="text-4xl font-bold uppercase">Nick Verma</h2>
        <svg width="220" height="20" className="absolute -bottom-2 left-0">
          <path
            className="logo-underline"
            d="M2 10 Q 55 2, 110 10 T 218 10"
            stroke="#f59e0b"
            strokeWidth="3"
            fill="none"
          />
        </svg>
      </div>

      {/* --- MorphSVG demo: click to morph circle -> star --- */}
      <button onClick={handleMorph} className="group">
        <svg width="120" height="120" viewBox="0 0 120 120">
          {/* hidden reference paths — inhi ke beech morph hota hai, khud kabhi visible nahi hote */}
          <defs>
            <path id="circlePath" d="M60,10 a50,50 0 1,0 0.1,0 Z" />
            <path
              id="starPath"
              d="M60,5 L72,45 L115,45 L80,68 L92,110 L60,85 L28,110 L40,68 L5,45 L48,45 Z"
            />
          </defs>
          {/* ye actual visible shape hai jo morph hoti hai */}
          <path className="morph-shape" d="M60,10 a50,50 0 1,0 0.1,0 Z" fill="#f59e0b" />
        </svg>
        <p className="text-xs text-zinc-500 mt-3 uppercase tracking-widest">Tap to morph</p>
      </button>
    </div>
  );
}
