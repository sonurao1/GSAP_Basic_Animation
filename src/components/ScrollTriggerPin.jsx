import { useRef } from "react";
import { useGSAP } from "@gsap/react"; // React ke liye GSAP ka official hook — cleanup khud sambhal leta hai
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

// Plugins ko component ke BAHAR register karo — file ek baar load hote hi ho jaata hai,
// har render pe dobara register karne ki zaroorat nahi
gsap.registerPlugin(useGSAP, ScrollTrigger);

function ScrollTriggerPin() {
  // Do alag refs chahiye:
  // sectionRef -> poora section jo PIN (freeze) hoga
  // meterRef   -> sirf woh <p> jisme percentage TEXT update hoga
  const sectionRef = useRef();
  const meterRef = useRef();

  useGSAP(
    () => {
      // ScrollTrigger.create() use karte hain jab koi tween (animation) nahi chahiye,
      // sirf "scroll position watch karo aur events pe kuch karo" chahiye
      ScrollTrigger.create({
        trigger: sectionRef.current, // ref.current = seedha DOM node. ID selector ("#pinOnly")
                                      // se yeh better hai kyunki agar component 2 baar page pe
                                      // use ho, ID duplicate ho jaata — ref hamesha apne hi
                                      // instance ko point karta hai
        start: "top top",            // section ka TOP, screen ke TOP tak pahunche — tab shuru
        end: "+=800",                // start se 800px AAGE tak pinned rahega
        pin: true,                   // yehi line section ko "freeze" karti hai jab tak
                                      // end (800px) na aa jaaye
        onUpdate: (self) => {
          // self.progress GSAP khud deta hai — 0 (abhi shuru hua) se 1 (khatam)
          // tak, pin ke andar hum kitna scroll kar chuke hain uska LIVE value
          meterRef.current.textContent = Math.round(self.progress * 100) + "%";
        },
      });
    },
    { scope: sectionRef } // sirf sectionRef ke andar selectors dhundo — isse yeh
                           // component safe rehta hai agar page pe aur bhi GSAP
                           // animations chal rahi ho, unse clash nahi hoga
  );

  return (
    <>
      <div
        ref={sectionRef}
        className="w-full h-[100vh] bg-cyan-600 flex items-center justify-center"
      >
        {/* yeh <p> khud animate nahi ho raha — bas onUpdate isme text likh raha hai */}
        <p ref={meterRef} className="text-white text-3xl font-bold">
          0%
        </p>
      </div>

      {/* Is khaali div ki zaroorat hai — ScrollTrigger ko "aage aur scroll
          content hai" batane ke liye. Iske bina pin ke turant baad page
          khatam ho jaayega aur pin theek se kaam nahi karega */}
      <div className="w-full h-[100vh]"></div>
    </>
  );
}

export default ScrollTriggerPin;
