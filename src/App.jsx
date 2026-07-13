import { useState, useEffect } from "react";
import Lenis from "lenis";

import Card from "./components/Card.jsx";
import Counter from "./components/Counter.jsx";
import ScrollTriggerComponent from "./components/ScrollTrigger.jsx";
import ScrollTriggerPin from "./components/ScrollTriggerPin.jsx";
import ScrollProgressBar from "./components/ScrollProgressBar.jsx";
import ScrollPinRotate from "./components/ScrollPinRotate.jsx";
import ScrollHorizontalGallery from "./components/ScrollHorizontalGallery.jsx";
import Cursor from "./components/Cursor.jsx"
// import ClickBracketCursor from "./components/ClickBracketCursor.jsx";
import Nav from "./components/Nav.jsx"
import TextAnimationHorizontal from "./components/TextAnimationHorizontal.jsx";
import TextAnimationHorizontalV2 from "./components/TextAnimationHorizontalV2.jsx";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(useGSAP, ScrollTrigger);



function App() {

  const [startCard, setStartCard] = useState(false);



  // ----------------------------------------------------
  // LENIS SMOOTH SCROLL SETUP
  // ----------------------------------------------------
  useEffect(() => {


    // Lenis object create
    const lenis = new Lenis({

      duration: 1.2,

      smoothWheel: true,

    });



    // Lenis scroll hone par
    // ScrollTrigger ko update karo
    lenis.on("scroll", ScrollTrigger.update);



    // GSAP ticker ke through
    // har frame Lenis update hoga
    const update = (time) => {

      lenis.raf(time * 1000);

    };



    gsap.ticker.add(update);




    // Lag smoothing off
    // Lenis ke saath better feel deta hai
    gsap.ticker.lagSmoothing(0);



    // Sabhi ScrollTriggers ki position
    // dobara calculate karo
    ScrollTrigger.refresh();



    return () => {


      // ticker remove
      gsap.ticker.remove(update);


      // Lenis destroy
      lenis.destroy();


      // saare triggers cleanup
      ScrollTrigger.killAll();


    };


  }, []);





  // ----------------------------------------------------
  // LOADER ANIMATION
  // ----------------------------------------------------
  useGSAP(() => {


    gsap.to(".loader-box", {


      top: "-100%",


      duration: 1,


      delay: 2.2,


      ease: "linear",



      onComplete: () => {


        setStartCard(true);


        // Loader hatne ke baad
        // layout change hota hai
        // isliye refresh
        ScrollTrigger.refresh();


      }


    });


  }, []);





  return (


    <div className="w-full bg-zinc-950 text-white relative">



      {/* LOADER */}

      <div
        className="
        loader-box
        fixed
        top-0
        left-0
        w-full
        h-screen
        bg-white
        flex
        justify-center
        items-center
        text-black
        z-50
        "
      >

        <Counter />

      </div>

      <Nav />




      {/* CARDS SECTION */}

      <section
        className="
        w-full
        h-screen
        flex
        justify-center
        items-center
        gap-6
        "
      >


        <Card
          startAnimation={startCard}
          delay={0}
        />


        <Card
          startAnimation={startCard}
          delay={0.15}
        />


        <Card
          startAnimation={startCard}
          delay={0.3}
        />


      </section>





      {/* SCROLL ANIMATIONS */}


      <ScrollTriggerComponent />


      <ScrollTriggerPin />


      <ScrollPinRotate />


      <ScrollProgressBar />
      <ScrollHorizontalGallery />
      <div className="w-full h-[100vh] bg-blue-900" >

      </div>
      <Cursor />

      {/* <ClickBracketCursor />  */}

      <TextAnimationHorizontal />
      <TextAnimationHorizontalV2 />



    </div>

  );

}



export default App;