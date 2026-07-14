// 07-CustomEase-Example.jsx
//
// GSAP PLUGINS: CustomEase + CustomBounce + CustomWiggle
// ---------------------------------------------------------------
// KAAM KYA HAI: Built-in eases (power2, elastic, back...) kaafi hote
// hain, lekin jab ek "signature feel" chahiye ho (jo sirf tumhare
// brand jaisa lage), tab custom motion curve banate hain.
//
// CustomEase   — kisi bhi bezier path se apna khud ka ease banao.
// CustomBounce — realistic "ball bounce" physics ka ease.
// CustomWiggle — back-and-forth "shake/wiggle" ka ease.
//
// INSTALL: npm install gsap @gsap/react
// ---------------------------------------------------------------

import { useRef } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { CustomBounce } from "gsap/CustomBounce";
import { CustomWiggle } from "gsap/CustomWiggle";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(CustomEase, CustomBounce, CustomWiggle, useGSAP);

export default function CustomEaseExample() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // Custom ease ek baar DEFINE karo (naam + bezier path), fir
      // usse kahin bhi bas string se use kar sakte ho: ease: "hop"
      CustomEase.create("hop", "M0,0 C0.24,0.75 0.44,1.13 1,1"); // ek "confident snap" jaisa feel

      // CustomBounce ek naam deta hai jise seedha ease mein use kar sakte ho
      CustomBounce.create("myBounce", { strength: 0.6, endAtStart: false });

      // CustomWiggle bhi same tarike se
      CustomWiggle.create("myWiggle", { wiggles: 6, type: "easeOut" });
    },
    { scope: containerRef }
  );

  const playHop = () => {
    gsap.fromTo(".hop-box", { y: 0 }, { y: -40, duration: 0.5, ease: "hop", yoyo: true, repeat: 1 });
  };

  const playBounce = () => {
    gsap.fromTo(".bounce-box", { y: -150 }, { y: 0, duration: 1, ease: "myBounce" });
  };

  const playWiggle = () => {
    gsap.to(".wiggle-box", { rotation: 15, duration: 0.6, ease: "myWiggle" });
  };

  return (
    <div ref={containerRef} className="bg-zinc-950 text-zinc-100 p-16 flex gap-16 justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="hop-box w-16 h-16 bg-amber-500 rounded" />
        <button onClick={playHop} className="text-xs uppercase tracking-widest text-zinc-400 hover:text-white">
          Hop (CustomEase)
        </button>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="bounce-box w-16 h-16 bg-amber-500 rounded-full" />
        <button onClick={playBounce} className="text-xs uppercase tracking-widest text-zinc-400 hover:text-white">
          Bounce (CustomBounce)
        </button>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="wiggle-box w-16 h-16 bg-amber-500" />
        <button onClick={playWiggle} className="text-xs uppercase tracking-widest text-zinc-400 hover:text-white">
          Wiggle (CustomWiggle)
        </button>
      </div>
    </div>
  );
}
