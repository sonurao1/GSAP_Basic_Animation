// Card.jsx
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP); // 👈 add kiya

function Card({ startAnimation, delay = 0 }) {
  const cardRef = useRef();

useGSAP(
  () => {
    if (!startAnimation) return;

    const tl = gsap.timeline({
      delay,
      defaults: {
        duration: 0.25,
        ease: "power2.out",
      },
    });

    tl.from(".box", {
      rotate: -360,
      scale: 0,
      opacity: 0,
      duration: 1,
      ease: "back.out(1.7)",
    })
      .from(".card-heading", { y: 25, opacity: 0 })
      .from(".card-text", { y: 25, opacity: 0 })
      .from(".card-btn", { scale: 0, opacity: 0 });

  },
  {
    scope: cardRef,
    dependencies: [startAnimation],
  }
);

  return (
    <div
      ref={cardRef}
      className="flex flex-col items-center gap-8 p-4 px-8 w-fit rounded-xl bg-gray-900 text-white"
    >
      <div className="box h-[50px] w-[50px] bg-red-800 rounded"></div>
      <h1 className="card-heading text-2xl font-bold">Card One</h1>
      <p className="card-text text-gray-300">This is card one</p>

      {/* Pure GSAP hover — e.currentTarget use karo, alag ref ki zaroorat nahi */}
      <button
        className="card-btn rounded bg-green-800 px-4 py-2"
        onMouseEnter={(e) =>
          gsap.to(e.currentTarget, {
            scale: 1.08,
            backgroundColor: "#15803d",
            duration: 0.25,
            ease: "power2.out",
          })
        }
        onMouseLeave={(e) =>
          gsap.to(e.currentTarget, {
            scale: 1,
            backgroundColor: "#166534",
            duration: 0.25,
            ease: "power2.out",
          })
        }
      >
        Action
      </button>
    </div>
  );
}

export default Card;