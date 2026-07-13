import { useRef } from 'react'
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"

function Cursor() {
  const outShellRef = useRef()
  const innerDotRef = useRef()
  const hasMoved = useRef(false)
  const isHovering = useRef(false)

  useGSAP(() => {
    gsap.set([outShellRef.current, innerDotRef.current], {
      xPercent: -50,
      yPercent: -50,
      opacity: 0,
    })

    document.body.style.cursor = "none"

    // Sirf yehi 4 couriers hamesha x/y control karenge — kabhi kill nahi honge
    const xToDot = gsap.quickTo(innerDotRef.current, "x", { duration: 0.15, ease: "power3" })
    const yToDot = gsap.quickTo(innerDotRef.current, "y", { duration: 0.15, ease: "power3" })
    const xToShell = gsap.quickTo(outShellRef.current, "x", { duration: 0.4, ease: "power3" })
    const yToShell = gsap.quickTo(outShellRef.current, "y", { duration: 0.4, ease: "power3" })

    const handleMouseMove = (e) => {
      if (!hasMoved.current) {
        hasMoved.current = true
        gsap.to([outShellRef.current, innerDotRef.current], { opacity: 1, duration: 0.3 })
      }
      xToDot(e.clientX)
      yToDot(e.clientY)

      if (!isHovering.current) {
        xToShell(e.clientX)
        yToShell(e.clientY)
      }
    }

    const handleMouseOver = (e) => {
      const link = e.target.closest("a")
      if (link && !isHovering.current) {
        isHovering.current = true
        const rect = link.getBoundingClientRect()

        // x/y ko usi courier se redirect karo — kill nahi kar rahe
        xToShell(rect.left - 8)
        yToShell(rect.top - 8)

        // sirf shape/size ka alag tween — yeh x/y ko touch nahi karta
        gsap.to(outShellRef.current, {
          width: rect.width + 16,
          height: rect.height + 16,
          xPercent: 0,
          yPercent: 0,
          borderRadius: 8,
          duration: 0.4,
          ease: "power3.out",
        })
        gsap.to(innerDotRef.current, { opacity: 0, duration: 0.2 })
      }
    }

    const handleMouseOut = (e) => {
      const link = e.target.closest("a")
      if (link && !link.contains(e.relatedTarget)) {
        isHovering.current = false

        // wahi courier, wapas mouse ki current position pe redirect
        xToShell(e.clientX)
        yToShell(e.clientY)

        gsap.to(outShellRef.current, {
          width: 80,
          height: 80,
          xPercent: -50,
          yPercent: -50,
          borderRadius: "50%",
          duration: 0.4,
          ease: "power3.out",
        })
        gsap.to(innerDotRef.current, { opacity: 1, duration: 0.2 })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseover", handleMouseOver)
    window.addEventListener("mouseout", handleMouseOut)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseover", handleMouseOver)
      window.removeEventListener("mouseout", handleMouseOut)
      document.body.style.cursor = "auto"
    }
  }, [])

  return (
    <>
      <div
        className='w-20 h-20 rounded-full border border-white fixed top-0 left-0 pointer-events-none z-[9999]'
        ref={outShellRef}
      ></div>
      <span
        className='w-2 h-2 bg-white rounded-full fixed top-0 left-0 pointer-events-none z-[9999]'
        ref={innerDotRef}
      ></span>
    </>
  )
}

export default Cursor