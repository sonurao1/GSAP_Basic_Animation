// 04-ScrollSmoother-Example.jsx
//
// GSAP PLUGIN: ScrollSmoother (ScrollTrigger ke saath milke kaam karta hai)
// ---------------------------------------------------------------
// KAAM KYA HAI: Native "jumpy" browser scroll ko buttery-smooth bana
// deta hai, aur har element ko alag-alag SPEED se scroll karne deta
// hai (parallax) sirf `data-speed` attribute se — manual math nahi
// karna padta.
//
// ⚠️ REQUIRED DOM STRUCTURE (ye zaruri hai, warna kaam nahi karega):
//   <div id="smooth-wrapper">
//     <div id="smooth-content">
//        ...saara scrollable content yahan...
//     </div>
//   </div>
//
// INSTALL: npm install gsap @gsap/react
// ---------------------------------------------------------------

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger, useGSAP);

export default function ScrollSmootherExample() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // ⚠️ GLITCH FIX — StrictMode dev mode mein effect mount→unmount→mount
      // hota hai. Agar hum seedha .create() call karein, toh do instances
      // ban sakte hain jo #smooth-content pe DO baar transform lagate hain
      // — isse scroll stutter/jump jaisa glitch dikhta hai. ScrollSmoother.get()
      // check karke pehle se maujood instance reuse karte hain, naya nahi banate.
      const smoother =
        ScrollSmoother.get() ||
        ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1.5, // 1.5 seconds ka "catch-up" lag — jitna zyada, utna floaty feel
          effects: true, // data-speed / data-lag attributes ko auto-enable karta hai
        });

      return () => smoother.kill(); // cleanup — warna route change pe duplicate instance ban jaayega
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      <div id="smooth-wrapper">
        <div id="smooth-content" className="bg-zinc-950 text-zinc-100">
          <section className="h-screen flex items-center justify-center relative overflow-hidden">
            {/* data-speed="0.5" => background HALF speed pe move karega (parallax "depth" effect) */}
            <div
              data-speed="0.5"
              className="absolute inset-0 bg-gradient-to-b from-zinc-800 to-zinc-950"
            />
            {/* data-speed="1.2" => text background se thoda FASTER move karega — depth ka illusion */}
            <h1 data-speed="1.2" className="relative text-7xl font-bold uppercase tracking-tight">
              Shadows & Light
            </h1>
          </section>

          <section className="h-screen flex items-center justify-center gap-10">
            <div data-speed="0.8" className="w-64 h-80 bg-zinc-900 border border-zinc-800 rounded" />
            {/* data-lag="0.4" => ye element thoda "der se" follow karega, jaise trailing shadow */}
            <div data-lag="0.4" className="w-64 h-80 bg-zinc-900 border border-amber-500 rounded" />
          </section>
        </div>
      </div>
    </div>
  );
}