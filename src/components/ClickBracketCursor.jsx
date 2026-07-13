import { useRef } from 'react'
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"

function ClickBracketCursor() {
  const bracketRef = useRef()
  const hasMoved = useRef(false)

  useGSAP(() => {
    gsap.set(bracketRef.current, { xPercent: -50, yPercent: -50, opacity: 0 })

    document.body.style.cursor = "none"

    const xTo = gsap.quickTo(bracketRef.current, "x", { duration: 0.18, ease: "power3" })
    const yTo = gsap.quickTo(bracketRef.current, "y", { duration: 0.18, ease: "power3" })

    const handleMouseMove = (e) => {
      if (!hasMoved.current) {
        hasMoved.current = true
        gsap.to(bracketRef.current, { opacity: 1, duration: 0.3 })
      }
      xTo(e.clientX)
      yTo(e.clientY)
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.body.style.cursor = "auto"
    }
  }, [])

  return (
    <svg
      ref={bracketRef}
      className="w-8 h-8 fixed top-0 left-0 pointer-events-none z-[9999] text-orange-80"
      viewBox="0 0 100 100"
      fill="none"
    >
      <path d="M14 38 L14 22 Q14 14 22 14 L38 14" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      <path d="M14 38 L14 22 Q14 14 22 14 L38 14" stroke="currentColor" strokeWidth="6" strokeLinecap="round" transform="scale(-1,1) translate(-100,0)" />
      <path d="M14 38 L14 22 Q14 14 22 14 L38 14" stroke="currentColor" strokeWidth="6" strokeLinecap="round" transform="scale(1,-1) translate(0,-100)" />
      <path d="M14 38 L14 22 Q14 14 22 14 L38 14" stroke="currentColor" strokeWidth="6" strokeLinecap="round" transform="scale(-1,-1) translate(-100,-100)" />
    </svg>
  )
}

export default ClickBracketCursor