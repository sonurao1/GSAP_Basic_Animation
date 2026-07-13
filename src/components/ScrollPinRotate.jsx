import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


// GSAP ko batana zaroori hai ki hum React hook
// aur ScrollTrigger plugin use kar rahe hain
gsap.registerPlugin(useGSAP, ScrollTrigger);



// Yeh component demonstrate karta hai:
// 1. Pin  -> section ko screen par rok deta hai
// 2. Scrub -> animation ko scroll ke saath connect karta hai
// 3. Scroll karte waqt shape rotate, scale aur color change karega

function ScrollPinRotate() {


  // ----------------------------------------------------
  // sectionRef:
  // Ye poora section hai jisko hum pin karna chahte hain.
  //
  // Jab user is section tak scroll karega,
  // ScrollTrigger isi section ko detect karega.
  // ----------------------------------------------------
  const sectionRef = useRef();



  // ----------------------------------------------------
  // shapeRef:
  // Ye actual element hai jis par animation chalegi.
  //
  // Is div ke andar:
  // rotate
  // scale
  // borderRadius
  // backgroundColor
  // change honge.
  // ----------------------------------------------------
  const shapeRef = useRef();





  useGSAP(() => {



    // ----------------------------------------------------
    // GSAP animation create kar rahe hain.
    //
    // Starting state:
    // rotate: 0deg
    // scale: 1
    // square shape
    // orange color
    //
    // Ending state:
    // rotate: 360deg
    // scale: 1.4
    // circle shape
    // green color
    // ----------------------------------------------------
    gsap.to(shapeRef.current, {


      // Shape ek full rotation complete karega
      rotate:360,


      // Shape apne original size se
      // 40% bada ho jayega
      scale:1.4,


      // Square se circle banega
      // kyunki border radius 50% hai
      borderRadius:"50%",


      // Background color change hoga
      backgroundColor:"#3ED598",





      scrollTrigger:{


        // ------------------------------------------------
        // Trigger:
        // Jab section viewport me enter karega
        // tab animation start hogi.
        //
        // Hum sectionRef use kar rahe hain kyunki
        // poore section ko track karna hai.
        // ------------------------------------------------
        trigger:sectionRef.current,



        // ------------------------------------------------
        // Start:
        // Jab section ka top,
        // viewport ke top se touch karega
        //
        // Animation start.
        // ------------------------------------------------
        start:"top top",




        // ------------------------------------------------
        // End:
        // Total kitna scroll animation ko milega.
        //
        // "+=700" ka matlab:
        // user 700px scroll karega
        // tab tak animation chalegi.
        // ------------------------------------------------
        end:"+=700",




        // ------------------------------------------------
        // Pin:
        // Section ko temporarily freeze kar deta hai.
        //
        // Matlab:
        // page scroll hota rahega
        // lekin section screen par rukega.
        // ------------------------------------------------
        pin:true,




        // ------------------------------------------------
        // Scrub:
        // Animation ko scrollbar ke saath bind karta hai.
        //
        // scrub:true:
        // direct connection
        //
        // scrub:1:
        // 1 second smoothing ke saath follow karega
        //
        // Isse premium smooth feel aati hai.
        // ------------------------------------------------
        scrub:1,




        // ------------------------------------------------
        // Markers:
        // Debugging ke liye.
        //
        // Green marker = start point
        // Red marker = end point
        //
        // Animation complete hone ke baad hata dena.
        // ------------------------------------------------
        markers:true,


      }



    });



  }, 
  {
    // Scope dene se ScrollTrigger aur animations
    // isi component ke andar limit rahenge.
    //
    // React component unmount hone par
    // GSAP automatically cleanup kar sakta hai.
    scope:sectionRef,
   dependencies:[]
  });





  return (


    <section

      // Ye section pin hoga
      ref={sectionRef}


      className="
      w-full
      h-screen
      bg-zinc-900
      flex
      items-center
      justify-center
      "

    >


      <div


        // Isi element par animation apply hogi
        ref={shapeRef}


        className="
        w-24
        h-24
        bg-orange-500
        "

      />


    </section>


  );

}



export default ScrollPinRotate;