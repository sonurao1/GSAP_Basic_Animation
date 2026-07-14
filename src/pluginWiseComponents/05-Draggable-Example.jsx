// 05-Draggable-Example.jsx
//
// GSAP PLUGIN: Draggable (+ InertiaPlugin)
// ---------------------------------------------------------------
// KAAM KYA HAI: Kisi bhi element ko mouse/touch se drag karne layak
// bana deta hai. InertiaPlugin ke saath, drag chhodne ke baad element
// apni "velocity" ke hisaab se aage tak flow karta hai — jaise ek
// physical object ka momentum hota hai — aur realistic tarike se
// khud rukta hai.
//
// INSTALL: npm install gsap @gsap/react
// ---------------------------------------------------------------

import { useRef } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(Draggable, InertiaPlugin, useGSAP);

const frames = Array.from({ length: 10 }, (_, i) => `Frame ${i + 1}`);

export default function DraggableExample() {
  const trackRef = useRef(null);
  const wrapperRef = useRef(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      const wrapper = wrapperRef.current;

      // drag ki "boundary" nikalne ke liye — track kitna wrapper se bada hai
      const maxDrag = () => -(track.scrollWidth - wrapper.offsetWidth);

      // ⚠️ GLITCH FIX — StrictMode dev mode mein ye effect do baar chalta
      // hai, jisse SAME element pe do Draggable instances ban jaate hain.
      // Dono ek saath drag events sunte hain toh element jump/rubber-band
      // karta hua glitchy lagta hai. Naya banane se pehle purana kill karo.
      Draggable.get(track)?.kill();

      Draggable.create(track, {
        type: "x", // sirf horizontal drag allowed
        inertia: true, // 👈 yahi InertiaPlugin ko activate karta hai (momentum/flick)
        bounds: { minX: () => maxDrag(), maxX: 0 }, // strip apni width se bahar drag nahi ho sakti
        edgeResistance: 0.7, // boundary ke paas thoda "resistance" — rubber-band feel
        cursor: "grab",
        activeCursor: "grabbing",
        onDragStart: function () {
          gsap.to(track, { scale: 0.98, duration: 0.2 }); // drag ke dauraan halka "pickup" feel
        },
        onDragEnd: function () {
          gsap.to(track, { scale: 1, duration: 0.3 });
        },
      });
    },
    { scope: wrapperRef }
  );

  return (
    <div className="bg-zinc-950 text-zinc-100 py-20">
      <p className="text-center text-zinc-500 text-sm uppercase tracking-widest mb-6">
        Drag / Flick the filmstrip →
      </p>
      <div ref={wrapperRef} className="overflow-hidden px-10">
        <div ref={trackRef} className="flex gap-4 w-max cursor-grab">
          {frames.map((f) => (
            <div
              key={f}
              className="w-48 h-64 flex-shrink-0 bg-zinc-900 border border-zinc-800 rounded flex items-end p-3 select-none"
            >
              <span className="text-xs text-amber-500 uppercase tracking-widest">{f}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}