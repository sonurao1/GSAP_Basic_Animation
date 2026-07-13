import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useRef  } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function VideoComponent() {
  const videoContainerRef = useRef(null);
  const videoRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".spaceVideo",

        // Starting state: big video
        {
          scale: 60,
          transformOrigin: "center center",
        },

        // Ending state: original size
        {
          scale: 1,
          ease: "none",

          scrollTrigger: {
            trigger: videoContainerRef.current,

            // Animation starts
            start: "top top",

            // Scroll distance
            end: "+=1500",

            // Keep section fixed
            pin: true,

            // Connect animation with scroll
            scrub: 1,

            // Remove after testing
            markers: true,
          },
        }
      );
    },
    {
      scope: videoContainerRef,
    }
  );

  return (
    <section
      ref={videoContainerRef}
      className="
        h-screen
        w-full
        flex
        flex-col
        justify-center
        items-center
        overflow-hidden
        bg-black
        rounded
      "
    >
      <p
        className="
          w-[50%]
          text-6xl
          text-orange-600
          leading-tight
        "
      >
        Lorem ipsum dolor sit amet consectetur

        <video
          src="https://assets.mixkit.co/videos/45033/45033-720.mp4"
          autoPlay         
          muted
          loop
          playsInline
          preload="metadata"
          className="
            spaceVideo
            w-[100px]
            inline-block
            align-middle
            object-cover
            mx-4
          "
          ref={videoRef}
        />

        adipisicing elit. Perspiciatis fuga iste
        consequuntur nobis laboriosam fugiat deserunt
        placeat fugit, molestiae deleniti asperiores
        distinctio.

      </p>
      <div className="flex gap-6">
        <button className="px-4 py-2 bg-orange-800 rounded" onClick = {() => videoRef.current.play()}>Play</button>
        <button className="px-4 py-2 bg-orange-800 rounded" onClick = {() => videoRef.current.pause()}>Pause</button>
      </div>
    </section>
  );
}

export default VideoComponent;