# GSAP Plugin Examples — Quick Reference

Sabhi files React + Tailwind + GSAP ke liye standalone examples hain.
Kisi bhi file ko apne project mein copy karo aur import karke render kar do.

## Setup (ek baar)

```bash
npm install gsap @gsap/react
```

Tailwind already configured hona chahiye (dark theme classes use hui hain).

## Files

| File | Plugin(s) | Kaam |
|---|---|---|
| `01-ScrollTrigger-Example.jsx` | ScrollTrigger | Scroll-reveal cards + pinned scrub section |
| `02-SplitText-Example.jsx` | SplitText | Char stagger-in heading + line-mask paragraph reveal |
| `03-Flip-Example.jsx` | Flip | Contact-sheet grid → fullscreen shot transition |
| `04-ScrollSmoother-Example.jsx` | ScrollSmoother | Buttery-smooth scroll + parallax (`data-speed`) |
| `05-Draggable-Example.jsx` | Draggable + InertiaPlugin | Drag/flick filmstrip gallery |
| `06-DrawSVG-MorphSVG-Example.jsx` | DrawSVG + MorphSVG | Hand-drawn underline + shape morph on click |
| `07-CustomEase-Example.jsx` | CustomEase + CustomBounce + CustomWiggle | Signature motion curves |
| `08-MegaMix-AllPlugins-Example.jsx` | **Sab kuch ek saath** | Mini photographer-portfolio landing page |

## Priority for NickPortfolio

Agar sabse pehle sirf 4 seekhne hain: **ScrollTrigger → SplitText → Flip → ScrollSmoother**.
Ye combo hi 80% awwwards-level scroll storytelling create kar deta hai. Baaki
plugins (Draggable, DrawSVG/MorphSVG, CustomEase) situational hain — jab
specific effect chahiye tab use karo.

## Real gotcha to remember

`ScrollSmoother` apne `#smooth-content` pe CSS transform lagata hai. Iske
ANDAR `position: fixed` elements true viewport-fixed nahi rehte. Isliye
`08-MegaMix` file mein fullscreen Flip overlay jaan-boojh kar
`#smooth-wrapper` ke BAHAR render kiya gaya hai — ye pattern file ke
comments mein detail mein explain kiya gaya hai.
