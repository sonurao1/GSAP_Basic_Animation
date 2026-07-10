import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { useRef } from "react"

function Counter() {
    const counterText = useRef();

    let counter = {val: 0}
    
    useGSAP(() => {

     gsap.to(counter, {
        val: 100,
        duration:2,
        ease:"linear",
        onUpdate : () => {
          counterText.current.innerText = Math.floor(counter.val) + "%"
        }
     })

    }, [])
    
  return (
    <>
      <div className="w-fit bg-white">
        <h1 className="text-6xl font-bold counter" ref={counterText}>0%</h1>
      </div>
    </>
  )
}

export default Counter